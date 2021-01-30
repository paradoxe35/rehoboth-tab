<?php

namespace App\Http\Livewire\Admin\Sermons;

use App\Files\File;
use App\Files\Images\ImageCompression;
use App\Models\Morphs\File as ModelsFile;
use App\Models\Morphs\Image;
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

    public $videoModel;

    public $imageModel;

    public $audiosModel = [];

    public $documentsModel = [];

    public function mount(Sermon $sermon)
    {
        $this->image = $sermon->image()->first();
        $this->video = $sermon->video()->first();

        $this->audios = $sermon->audios()->get();
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

    public function deleteFile($id, $type)
    {
        $file = ModelsFile::find($id);

        if ($file) {
            Storage::delete($file->path);

            $file->delete();

            switch ($type) {
                case 'video':
                    $this->video = null;
                    break;
                case 'audio':
                    $this->audios = $this->sermon->audios()->get();
                    break;
                case 'document':
                    $this->documents = $this->sermon->documents()->get();
                    break;
            }
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

    private function storeFiles($models, $type)
    {
        collect($models)
            ->each(function ($file) use ($type) {
                $uploaded = $file->storePublicly(File::SERMONS_PATH . "/{$this->sermon->id}");
                $this->sermon->files()->create([
                    'path' => $uploaded,
                    'type' => $type,
                    'name' => $file->getClientOriginalName()
                ]);
            });
    }

    public function saveImage()
    {
        $this->validate([
            'imageModel' => File::IMAGE_RULES,
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

    public function saveVideo()
    {
        $this->validate([
            'videoModel' => [
                'required',
                'regex:/^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/',
                'string'
            ],
        ]);

        if ($this->video) {
            $this->video->delete();
        }

        $this->video = $this->sermon->files()->create([
            'path' => $this->videoModel,
            'type' => 'video'
        ]);

        $this->videoModel = null;
    }

    public function saveAudios()
    {
        $this->validate([
            'audiosModel.*' => [
                'required',
                'file',
                'max:' . (200 * 1024),
                "mimes:mp3,oga,aac,wav"
            ],
        ]);

        $max = 10;

        if (($this->audios->count() + count($this->audiosModel)) > $max) {
            $this->addError('audiosModel.*', "Vous ne pouvez enregistrer que {$max} fichiers");
            return;
        }

        $this->storeFiles($this->audiosModel, 'audio');

        $this->audios = $this->sermon->audios()->get();
    }


    public function saveDocuments()
    {
        $this->validate([
            'documentsModel.*' => [
                'required',
                'file',
                'max:' . (30 * 1024),
                "mimes:pdf"
            ]
        ]);

        $max = 10;

        if (($this->documents->count() + count($this->documentsModel)) > $max) {
            $this->addError('documentsModel.*', "Vous ne pouvez enregistrer que {$max} fichiers");
            return;
        }

        $this->storeFiles($this->documentsModel, 'document');

        $this->documents = $this->sermon->documents()->get();
    }
}
