<?php

namespace App\Files\Images;

class ImageCompression
{
    public function createImageResource($source_url)
    {
        $info = getimagesize($source_url);
        switch ($info['mime']) {
            case 'image/jpeg':
                $image = imagecreatefromjpeg($source_url);
                break;
            case 'image/jpg':
                $image = imagecreatefromjpeg($source_url);
                break;
            case 'image/gif':
                $image = imagecreatefromgif($source_url);
                break;
            case 'image/png':
                $image = imagecreatefrompng($source_url);
                break;
            case 'image/JPG':
                $image = imagecreatefromjpeg($source_url);
                break;
            case 'image/JPEG':
                $image = imagecreatefromjpeg($source_url);
                break;
            case 'image/GIF':
                $image = imagecreatefromgif($source_url);
                break;
            case 'image/PNG':
                $image = imagecreatefrompng($source_url);
                break;
            default:
                $image = null;
                break;
        }

        return [$image, $info];
    }


    public function compress_image($source_url, $destination_url = null, $quality = 50, $widths = 1080)
    {
        if (is_null($destination_url)) {
            $destination_url = $source_url;
        }

        [$image, $info] = $this->createImageResource($source_url);

        if (!isset($image) || !$image) {
            return $source_url;
        }

        $width = explode('"', $info[3]);
        $width = intval($width[1]);

        if (!is_null($widths) && $width > $widths) {
            $width = $widths;
        }

        $imageH = $this->createTheImage($source_url, $image, $width);
        imagejpeg($imageH, $destination_url, $quality);
        return $destination_url;
    }


    /**
     * [createTheImage description]
     * @param  [type] $file_temp_name [description]
     * @param  [type] $srce           [description]
     * @return [type]                 [description]
     */
    public function createTheImage($file_temp_name, $srce, $newwidth_min = 800)
    {
        list($width_min, $height_min) = getimagesize($file_temp_name);
        $newheight_min = ($height_min / $width_min) * $newwidth_min;
        $tmp_min = imagecreatetruecolor($newwidth_min, $newheight_min);
        imagecopyresampled($tmp_min, $srce, 0, 0, 0, 0, $newwidth_min, $newheight_min, $width_min, $height_min);
        return $tmp_min;
    }

    /**
     * @param string $imagePath
     * @param string $dest_filename
     * @param int $width
     * @param int $blurFactor
     * @param boolean $base64
     * @return GD|string image resource
     */
    public function blurLazyImage(
        string $imagePath,
        ?string $dest_filename,
        int $blurFactor = 3,
        bool $base64 = false,
        int $width = 24
    ) {
        [$image] = $this->createImageResource($imagePath);

        $newResource = $this->blur($image, $blurFactor, $width);

        if ($base64) {
            ob_start();

            imagejpeg($newResource);
            $contents = ob_get_contents();

            ob_end_clean();

            return "data:image/jpeg;base64," . base64_encode($contents);
        } else {
            imagejpeg($newResource, $dest_filename);
        }
    }


    /**
     * Strong Blur
     *
     * @param resource $gdImageResource
     * @param int $blurFactor optional
     *  This is the strength of the blur
     *  0 = no blur, 3 = default, anything over 5 is extremely blurred
     * @return GD image resource
     * @author Martijn Frazer, idea based on http://stackoverflow.com/a/20264482
     */
    function blur($gdImageResource, $blurFactor = 3, $width = null)
    {
        // blurFactor has to be an integer
        $blurFactor = round($blurFactor);

        $originalWidth = imagesx($gdImageResource);
        $originalHeight = imagesy($gdImageResource);

        $smallestWidth = ceil($originalWidth * pow(0.5, $blurFactor));
        $smallestHeight = ceil($originalHeight * pow(0.5, $blurFactor));

        // for the first run, the previous image is the original input
        $prevImage = $gdImageResource;
        $prevWidth = $originalWidth;
        $prevHeight = $originalHeight;

        // scale way down and gradually scale back up, blurring all the way
        for ($i = 0; $i < $blurFactor; $i += 1) {
            // determine dimensions of next image
            $nextWidth = $smallestWidth * pow(2, $i);
            $nextHeight = $smallestHeight * pow(2, $i);

            // resize previous image to next size
            $nextImage = imagecreatetruecolor($nextWidth, $nextHeight);
            imagecopyresized(
                $nextImage,
                $prevImage,
                0,
                0,
                0,
                0,
                $nextWidth,
                $nextHeight,
                $prevWidth,
                $prevHeight
            );

            // apply blur filter
            imagefilter($nextImage, IMG_FILTER_GAUSSIAN_BLUR);

            // now the new image becomes the previous image for the next step
            $prevImage = $nextImage;
            $prevWidth = $nextWidth;
            $prevHeight = $nextHeight;
        }

        // scale back to original size and blur one more time
        imagecopyresized(
            $gdImageResource,
            $nextImage,
            0,
            0,
            0,
            0,
            $originalWidth,
            $originalHeight,
            $nextWidth,
            $nextHeight
        );
        imagefilter($gdImageResource, IMG_FILTER_GAUSSIAN_BLUR);

        // clean up
        imagedestroy($prevImage);

        if (!is_null($width) && is_numeric($width)) {
            $newwidth_min = $width ?: $originalWidth;

            $width_min = $originalWidth;
            $height_min = $originalHeight;

            $newheight_min = ($height_min / $width_min) * $newwidth_min;


            $newheight_min = ($height_min / $width_min) * $newwidth_min;
            $tmp_min = imagecreatetruecolor($newwidth_min, $newheight_min);
            imagecopyresampled($tmp_min, $gdImageResource, 0, 0, 0, 0, $newwidth_min, $newheight_min, $width_min, $height_min);
            imagedestroy($gdImageResource);

            $gdImageResource = $tmp_min;
        }

        // return result
        return $gdImageResource;
    }
}
