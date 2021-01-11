<?php

namespace App\Http\Livewire\Admin\Sermons;

use App\Files\File;
use App\Files\Images\ImageCompression;
use App\Models\File as ModelsFile;
use App\Models\Image;
use App\Models\Sermon;
use Illuminate\Support\Facades\Storage;
use Livewire\Component;
use Livewire\WithFileUploads;


class Edit extends Component
{

    use WithFileUploads;

    public Sermon $sermon;

    public $image;

    public $audios;

    public $documents;

    public $video;

    public $imageModel;

    public $audiosModel = [];

    public $documentsModel = [];

    public function mount(Sermon $sermon)
    {
        $this->image = $sermon->image()->first();
        $this->audios = $sermon->audios()->get();
        $this->video = $sermon->video()->first();

        $this->documents = $sermon->documents()->get();
    }

    public function render()
    {
        return view('livewire.admin.sermons.edit');
    }

    public function deleteImage($id)
    {
        $image = Image::find($id);
        if ($image) {
            Storage::delete($image->path);

            $image->delete();

            $this->image = null;
        }
    }

    public function saveImage()
    {
        $this->validate([
            'imageModel' => [
                'required',
                'image',
                'max:' . (5 * 1024),
                'mimes:jpeg,png'
            ],
        ]);

        if ($this->image) {

            Storage::delete($this->image->path);

            $this->image->fill($this->storeImage())
                ->save();
        } else {

            $this->image = $this->sermon->image()
                ->create($this->storeImage());
        }
    }

    private function storeImage()
    {
        $sermon = $this->sermon;
        $filetmp = $this->imageModel->getRealPath();

        (new ImageCompression)
            ->compress_image($filetmp);

        $uploaded = $this->imageModel->storePublicly(File::SERMONS_PATH . "/{$sermon->id}");

        [$width, $height] = getimagesize($filetmp);

        return [
            'path' => $uploaded,
            'width' => $width,
            'height' => $height,
            'caption' => $this->imageModel->getClientOriginalName()
        ];
    }


    public function deleteFile($id, $type)
    {
        $file = ModelsFile::find($id);

        return null;
        if ($file) {
            Storage::delete($file->path);

            $file->delete();

            switch ($type) {
                case 'video':
                    $this->video = null;
                    break;
                case 'audio':
                    $this->audios = $this->audios->filter(fn ($f) => $f != $id);
                    break;
                case 'document':
                    $this->documents = $this->documents->filter(fn ($f) => $f != $id);
                    break;
            }
        }
    }
}
