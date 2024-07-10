<?php

namespace App\Repository;

use App\Models\Post;
use App\Utils\EditorJs;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Str;

class PostRepository
{
    public function postQuery($query)
    {
        return Post::query()
            ->select('id', 'title', 'slug', 'excerpt', 'status', 'featured_image', 'published_at')
            ->where('status', 'published')
            ->with('tags')
            ->orderBy('published_at', 'desc')
            ->when($query, function ($query) {
                $query->where('title', 'like', '%' . request('query') . '%');
                $query->orWhere('excerpt', 'like', '%' . request('query') . '%');
            });
    }

    public function postListPaginated($query, $page)
    {
        $cacheKey = $query ? 'posts_paginated_' . $query . '_page_' . $page : 'posts_paginated_page_' . $page;

        return Cache::remember($cacheKey, CACHE_TTL, function () use ($query, $page) {
            $posts = $this->postQuery($query)
                ->paginate(PAGE_SIZE, ['*'], 'page', $page);

            collect($posts->items())->map(function ($post) {
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
    }

    public function postListNonPaginated($query)
    {
        $cacheKey = $query ? 'posts_' . $query : 'posts';

        return Cache::remember($cacheKey, CACHE_TTL, function () use ($query) {
            $posts = $this->postQuery($query)->get();

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
    }

    public function processRequest($request, $post = null)
    {
        $parsedHtmlContent = (new EditorJs())->parse($request->content);

        $request->merge([
            'content_raw' => json_encode($request->content),
            'content' => removeNbsp($parsedHtmlContent),
            'slug' => $post ? Str::slug($request->slug) : Str::slug($request->title),
        ]);

        if ($request->status === 'published') {
            if ($post) {
                $request->merge(['published_at' => $post->published_at ?? now()]);
            } else {
                $request->merge(['published_at' => now()]);
            }
        }

        return $request;
    }
}
