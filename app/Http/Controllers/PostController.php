<?php

namespace App\Http\Controllers;

use App\Http\Requests\StorePostRequest;
use App\Http\Requests\UpdatePostRequest;
use App\Models\Post;
use App\Models\Tag;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        $pageSize = request()->get('page-size') ?? PAGE_SIZE;

        $posts = Post::with('tags');

        if (request()->get('search')) {
            $posts = $posts->where('title', 'like', '%' . request()->get('search') . '%');
        }

        if (request()->get('status') && request()->get('status') !== 'all') {
            $posts = $posts->where('status', request()->get('status'));
        }

        return Inertia::render('Post/Index', [
            'posts' => $posts->orderBy('created_at', 'desc')->paginate($pageSize),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StorePostRequest $request): \Illuminate\Http\Response
    {
        $request = $this->processRequest($request);

        $post = Post::create($request->all());

        if (! empty($request->tags)) {
            $tagsIds = Tag::tagNameToIdArray($request->tags);
            $post->tags()->sync($tagsIds);
        }

        return response()->noContent();
    }

    private function processRequest($request, $post = null)
    {
        $request->merge([
            'content_raw' => json_encode($request->content),
            'content' => removeNbsp(editorJsParser($request->content)),
            'slug' => $post ? Str::slug($request->slug) : Str::slug($request->title),
        ]);

        if ($request->status === 'published') {
            $request->merge([
                'published_at' => now(),
            ]);
        }

        return $request;
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): Response
    {
        return Inertia::render('Post/FormHolder');
    }

    /**
     * Display the specified resource.
     */
    public function show(Post $post)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Post $post): Response
    {
        $post->content = json_decode($post->content_raw);

        return Inertia::render('Post/FormHolder', [
            'postData' => $post->load('tags'),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatePostRequest $request, Post $post): \Illuminate\Http\Response
    {
        $request = $this->processRequest($request, $post);

        $post->update($request->except('tags'));

        if (! empty($request->tags)) {
            $tagsIds = Tag::tagNameToIdArray($request->tags);
            $post->tags()->sync($tagsIds);
        } else {
            $post->tags()->detach();
        }

        return response()->noContent();
    }

    public function postList(): JsonResponse
    {
        $query = request('query');

        $cacheKey = $query ? 'posts_' . $query : 'posts';

        $posts = Cache::remember($cacheKey, CACHE_TTL, function () use ($query) {
            $posts = Post::query()
                ->select('id', 'title', 'slug', 'excerpt', 'status', 'featured_image', 'published_at')
                ->where('status', 'published')
                ->with('tags')
                ->orderBy('published_at', 'desc')
                ->when($query, function ($query) {
                    $query->where('title', 'like', '%' . request('query') . '%');
                    $query->orWhere('excerpt', 'like', '%' . request('query') . '%');
                })
                ->get();

            $posts->map(function ($post) {
                $tagsArray = [];
                foreach ($post->tags as $key => $tag) {
                    $tagsArray[$key]['name'] = $tag->name;
                    $tagsArray[$key]['slug'] = $tag->slug;
                }

                unset($post->tags);
                $post->tags = $tagsArray;
            });

            return $posts;
        });

        return response()->json($posts);
    }

    public function latestPost(): JsonResponse
    {
        $post = Post::query()
            ->with('tags')
            ->orderBy('created_at', 'desc')
            ->first();

        $post->content = json_decode($post->content_raw);

        return response()->json($post);
    }

    public function tagList(): Collection|array
    {
        return Tag::query()->withCount('posts')->get();
    }

    public function postShow(): JsonResponse
    {
        $post = Cache::remember('post_' . request()->route('slug'), CACHE_TTL, function () {
            return Post::query()
                ->where('slug', request()->route('slug'))
                ->with('tags')
                ->first();
        });

        if (! $post) {
            return response()->json([
                'status' => false,
                'message' => 'Post not found',
            ], 404);
        }

        $tagsArray = Cache::remember('post_' . request()->route('slug') . '_tags',
            CACHE_TTL,
            function () use ($post) {
                $tagsArray = [];
                foreach ($post->tags as $key => $tag) {
                    $tagsArray[$key]['name'] = $tag->name;
                    $tagsArray[$key]['slug'] = $tag->slug;
                }

                return $tagsArray;
            });

        $post->related_posts = Cache::remember(
            'post_' . request()->route('slug') . '_related_posts',
            CACHE_TTL,
            function () use ($post) {
                return $this->getRelatedPosts($post->tags, $post->slug);
            });

        unset($post->tags);
        unset($post->content_raw);

        $post->tags = $tagsArray;

        return response()->json($post);
    }

    private function getRelatedPosts($postTags, $currentPostSlug): Collection|array
    {
        return Post::query()
            ->select('title', 'slug', 'excerpt', 'featured_image', 'published_at')
            ->whereHas('tags', function ($query) use ($postTags) {
                $query->whereIn('name', $postTags->pluck('name'));
            })
            ->where('status', 'published')
            ->where('slug', '!=', $currentPostSlug)
            ->orderBy('published_at', 'desc')
            ->limit(10)
            ->get();
    }

    public function postTag(): JsonResponse
    {
        $query = request('query');

        $posts = Tag::query()
            ->where('slug', request()->route('tag'))
            ->with('posts', 'posts.tags')
            ->first();

        if ($query) {
            $posts->posts = $posts->posts->filter(function ($post) use ($query) {
                return Str::contains($post->title, $query) || Str::contains($post->excerpt, $query);
            });

            $posts->posts = $posts->posts->values();
        }

        if (! $posts) {
            return response()->json([
                'status' => false,
                'message' => 'Tag not found',
            ], 404);
        }

        $posts->posts->map(function ($post) {
            unset($post->content_raw);
            unset($post->content);
            $tagsArray = [];

            foreach ($post->tags as $key => $tag) {
                $tagsArray[$key]['name'] = $tag->name;
                $tagsArray[$key]['slug'] = $tag->slug;
            }

            unset($post->tags);
            unset($post->pivot);

            $post->tags = $tagsArray;
        });

        return response()->json($posts->posts);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Post $post)
    {
        $post->tags()->detach();
        $post->delete();

        return response()->json([
            'message' => 'Post deleted successfully',
        ]);
    }
}
