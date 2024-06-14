<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreMediaRequest;
use App\Http\Requests\UpdateMediaRequest;
use App\Models\Media;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class MediaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        return Inertia::render('Media/Index');
    }

    public function unsplash(): Response
    {
        if (request()->get('search')) {
            $response = Http::get('https://api.unsplash.com/search/photos', [
                'query' => request('search'),
                'page' => request('page') ?: 1,
                'per_page' => 30,
                'client_id' => config('app.unsplash_access_key'),
            ]);

            return Inertia::render('Media/Index', [
                'photos' => $response->json()['results'],
            ]);
        }

        return Inertia::render('Media/Index');
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreMediaRequest $request): void
    {
        $file = $request->file('files');
        $file->store('images', 'public');
    }

    /**
     * Display the specified resource.
     */
    public function show(Media $media)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Media $media)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateMediaRequest $request, Media $media)
    {
        //
    }

    public function photos(): Collection
    {
        $files = collect(Storage::disk('public')->files('images'));

        return $files->map(function ($file) {

            $fileUrl = config('app.env') === 'production'
                ? url('storage/images/' . basename($file))
                : url('images/' . basename($file));

            return [
                'url' => $fileUrl,
                'name' => basename($file),
            ];
        });
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Media $media)
    {
        //
    }
}
