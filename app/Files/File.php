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
    public const IMAGE_RULES = ['required', 'file', "max:" . (self::SIZE * 5) . "", 'dimensions:min_width=400', 'mimes:jpeg,jpg,png,gif'];

    /**
     * @var string MUSIC_IMG_PATH
     */
    public const BLOG_IMG_PATH = 'blog/articles';

    /**
     * @var string AGENTS_IMG_PATH
     */
    public const AGENTS_IMG_PATH = 'agents';

    /**
     * @var string SERMONS_PATH
     */
    public const SERMONS_PATH = 'sermons';

    /**
     * @var string EVENTS_PATH
     */
    public const EVENTS_PATH = 'events';

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
    public const GALLERY_IMAGES_PATH = 'gallery/images';
}
