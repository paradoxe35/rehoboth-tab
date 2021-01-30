<?php

namespace App\Files;

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
     * @var string EVENTS_PHOTOS_PATH
     */
    public const EVENTS_PHOTOS_PATH = 'events/photos';

    /**
     * @var string GALLERY_IMAGES_PATH
     */
    public const GALLERY_IMAGES_PATH = 'galleries/images';
}
