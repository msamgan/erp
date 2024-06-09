<?php

namespace App\Http\Controllers;

use App\Http\Requests\StorePostRequest;
use App\Http\Requests\UpdatePostRequest;
use App\Models\Post;
use App\Models\Tag;
use Illuminate\Support\Str;
use Inertia\Inertia;

class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $posts = Post::with('tags');

        if (request()->get('search')) {
            $posts = $posts->where('title', 'like', '%' . request()->get('search') . '%');
        }

        return Inertia::render('Post/Index', [
            'posts' => $posts->get()
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Post/FormHolder');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StorePostRequest $request)
    {
        $request = $this->processRequest($request);

        $post = Post::create($request->all());

        if (!empty($request->tags)) {
            $tagsIds = Tag::tagNameToIdArray($request->tags);
            $post->tags()->sync($tagsIds);
        }

        return response()->noContent();
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
    public function edit(Post $post)
    {
        $post->content = json_decode($post->content_raw);

        return Inertia::render('Post/FormHolder', [
            'postData' => $post->load('tags')
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatePostRequest $request, Post $post)
    {
        $request = $this->processRequest($request, $post);

        $post->update($request->except('tags'));

        if (!empty($request->tags)) {
            $tagsIds = Tag::tagNameToIdArray($request->tags);
            $post->tags()->sync($tagsIds);
        } else {
            $post->tags()->detach();
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

    public function tagList()
    {
        return Tag::all();
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Post $post)
    {
        $post->tags()->detach();
        $post->delete();

        return response()->json([
            'message' => 'Post deleted successfully'
        ]);
    }
}
