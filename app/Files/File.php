<?php

namespace App\Files;

use App\Files\Images\ImageCompression;
use Illuminate\Support\Facades\File as FacadesFile;
use Illuminate\Support\Facades\Storage;

class File
{
    /**
     * @var int SIZE
     */
    public const SIZE = 1024;

    /**
     * @var array
     */
    public const IMAGE_RULES = ['required', 'image', "max:" . (self::SIZE * 5) . "", "mimes:jpeg,png"];


    public const IMAGE_RULES_OPTIONAL = ['nullable', 'image', "max:" . (self::SIZE * 5) . "", "mimes:jpeg,png"];

    /**
     * @var string MUSIC_IMG_PATH
     */
    public const BLOG_IMG_PATH = 'blogs/images';

    /**
     * @var string SERMONS_PATH
     */
    public const SERMONS_PATH = 'sermons';

    /**
     * @var string EVENTS_COVERS_PATH
     */
    public const EVENTS_COVERS_PATH = 'events/covers';


    /**
     * @var string EVENTS_COVERS_PATH
     */
    public const PROFILES_IMAGE_PATH = 'profiles/images';

    /**
     * @var string EVENTS_PHOTOS_PATH
     */
    public const EVENTS_PHOTOS_PATH = 'events/photos';

    /**
     * @var string GALLERY_IMAGES_PATH
     */
    public const GALLERY_IMAGES_PATH = 'galleries/images';


    /**
     * store file form http request object
     * 
     * @param \Illuminate\Http\UploadedFile|\Illuminate\Http\UploadedFile[]|array|null $file
     * @param string $path
     * @param object $modelImage
     * @param object $model
     * @param string $type
     * @param string $caption
     * @param string $date
     * @param boolean $store
     * 
     * @return object
     */
    public static function storeImageMorph(
        $file,
        $path,
        $modelImage,
        $model,
        $type = null,
        $caption = null,
        $date = null,
        $store = true
    ) {
        $uploaded = $file->storePublicly($path . "/{$model->id}");
        [$width, $height] = getimagesize($file->getPathname());

        $thumbnail = self::blurLazyImageBase64($uploaded);

        $fillable = [
            'thumbnail' => $thumbnail,
            'path' => $uploaded,
            'width' => $width,
            'height' => $height,
            'type' => $type,
            'caption' => $caption ?: $file->getClientOriginalName(),
            'date' => $date
        ];

        return $store ? $modelImage->create($fillable) : $fillable;
    }


    /**
     * @param string $filePath
     * @param string $dest
     * @param string $ext
     * 
     * @return string
     */
    public static function blurLazyImageBase64($filePath)
    {
        $image = new ImageCompression;

        $absolutePathImage = Storage::path($filePath);

        return $image->blurLazyImage($absolutePathImage, null, 6, true);
    }


    /**
     * store file form http request object
     * 
     * @param \Illuminate\Http\UploadedFile|\Illuminate\Http\UploadedFile[]|array|null $file
     * @param string $path
     * @param object $modelImage
     * @param object $model
     * @param string $fileTmp
     * @param string $type
     * @param string $caption
     * @param string $date
     * @param boolean $store
     * 
     * @return object|array
     */
    public static function storeImageMorphWithFileTmp(
        $file,
        $path,
        $modelImage,
        $model,
        $fileTmp,
        $type = null,
        $caption = null,
        $date = null,
        $store = true
    ) {
        $uploaded = $file->storePublicly($path . "/{$model->id}");
        [$width, $height] = getimagesize($fileTmp);

        $thumbnail = self::blurLazyImageBase64($uploaded);

        $fillable = [
            'thumbnail' => $thumbnail,
            'path' => $uploaded,
            'width' => $width,
            'height' => $height,
            'type' => $type,
            'caption' => $caption ?: $file->getClientOriginalName(),
            'date' => $date
        ];

        return $store ? $modelImage->create($fillable) : $fillable;
    }
}
