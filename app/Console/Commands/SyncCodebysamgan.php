<?php

namespace App\Console\Commands;

use App\Models\Post;
use App\Models\Tag;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Str;

class SyncCodebysamgan extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:sync-cbs';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Sync CodeBySamgan data with our database';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $this->info('Syncing CodeBySamgan data with our database...');

        $postData = Http::get('https://codebysamgan.com/post/list')->json();

        foreach ($postData as $post) {
            $formattedPost = $this->formatPost($post);
            $this->info('Syncing post: ' . $formattedPost['title']);


            dump($formattedPost);

            /* $existingPost = Post::where('slug', $formattedPost['slug'])->first();

            if ($existingPost) {
                $existingPost->update($formattedPost);
            } else {
                $existingPost = Post::create($formattedPost);
            }

            $tagList = $this->getTagList($post['tags']);
            $tagIds = $this->getTagIds($tagList);

            $existingPost->tags()->sync($tagIds); */
        }

        $this->info('Syncing completed!');
    }

    private function getTagIds($tagList)
    {
        $tagIds = [];

        foreach ($tagList as $tag) {
            $tagData = Tag::firstOrCreate([
                'name' => $tag,
                'slug' => Str::slug($tag)
            ]);
            $tagIds[] = $tagData->id;
        }

        return $tagIds;
    }

    private function getTagList($tags)
    {
        $tagList = [];

        foreach ($tags as $tag) {
            $tagList[] = $tag['name'];
        }

        return $tagList;
    }

    private function formatPost($post)
    {

        $postData = [
            'title' => $post['title'],
            'slug' => $post['slug'],
            'content' => $post['body'],
            'content_raw' => htmlToEditorJsBlockParser($post['body']),
            'excerpt' => $post['excerpt'],
            'status' => 'draft',
            "meta_description"  => $post['meta']['meta_description'] ?? null,
        ];

        if ($post['published']) {
            $postData['published_at'] = $post['publish_date'];
            $postData['status'] = 'published';
        }

        if ($post['featured_image'] != null || $post['featured_image'] != '') {
            $featuredImage = $this->downloadImage($post['featured_image'], $post['slug']);
            $postData['featured_image'] = $featuredImage;
        }

        return $postData;
    }


    private function downloadImage($imageUrl, $imageName)
    {
        // download if image have "storage" in url
        if (!strpos($imageUrl, 'storage')) {
            return $imageUrl;
        }

        $imageUrlPrefix = "https://codebysamgan.com";

        if (strpos($imageUrl, $imageUrlPrefix) === false) {
            $imageUrl = $imageUrlPrefix . $imageUrl;
        }

        try {
            $imageData = file_get_contents($imageUrl);
            $imageExtension = pathinfo($imageUrl, PATHINFO_EXTENSION);
            $imagePath = public_path('images/' . $imageName . '.' . $imageExtension);
            file_put_contents($imagePath, $imageData);

            return url('images/' . $imageName . '.' . $imageExtension);
        } catch (\Exception $e) {
            return null;
        }
    }
}
