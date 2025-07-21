<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Product;

class ProductApi extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return response()->json(Product::all(), 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255|min:2',
            'price' => 'required|numeric',
            'description' => 'nullable|string',
            'photo_path' => 'nullable|file|mimes:jpg,jpeg,png,gif|max:2048',
            'video_path' => 'nullable|file|mimes:mp4,mov,avi,wmv|max:1000000',
        ]);

        $photo_path = null;
        if ($request->hasFile('photo_path')) {
            $photo_path = $request->file('photo_path')->store('photos', 'public');
        }

        $video_path = null;
        if ($request->hasFile('video_path')) {
            $video_path = $request->file('video_path')->store('videos', 'public');
        }

        $product = Product::create([
            'name' => $request->input('name'),
            'price' => $request->input('price'),
            'description' => $request->input('description'),
            'user_id' => $request->input('user_id'),
            'photo_path' => $photo_path,
            'video_path' => $video_path
        ]);

        return response()->json($product, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        return response()->json(Product::findOrFail($id), 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $request->validate([
            'name' => 'string|max:255|min:2',
            'price' => 'numeric',
            'description' => 'string'
        ]);

        $product = Product::findOrFail($id);
        $product->update($request->input());

        return response()->json($product, 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $product = Product::findOrFail($id);
        $product->delete();

        return response()->json(null, 204);
    }
}
