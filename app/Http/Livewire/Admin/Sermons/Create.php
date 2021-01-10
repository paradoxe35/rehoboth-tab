<?php

namespace App\Http\Livewire\Admin\Sermons;

use App\Files\File;
use App\Files\Images\ImageCompression;
use App\Models\Sermon;
use Livewire\Component;
use Livewire\WithFileUploads;


class Create extends Component
{
    use WithFileUploads;

    public $image;
    public $subject;
    public $preacher;
    public $date;
    public $description = null;
    public $video;
    public $audios = [];
    public $documents = [];

    public $rules = [
        'subject' => ['required', 'string', 'max:255', 'min:2'],
        'preacher' => ['required', 'string', 'max:255', 'min:2'],
        'description' => ['nullable', 'string', 'max:255', 'max:10'],
        'date' => ['required', 'date'],
        'image' => [
            'nullable',
            'image',
            'max:' . (5 * 1024),
            'mimes:jpeg,png'
        ],
        'video' => [
            'nullable',
            'regex:/^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/',
            'string'
        ],
        'audios.*' => [
            'nullable',
            'file',
            'max:' . (200 * 1024),
            "mimes:mp3,oga,aac,wav"
        ],
        'documents.*' => [
            'nullable',
            'file',
            'max:' . (30 * 1024),
            "mimes:pdf"
        ]
    ];


    public function updated($propertyName)
    {
        $this->validateOnly($propertyName);
    }

    public function store()
    {
        $this->validate();

        if (!$this->video && empty($this->audios) && empty($this->documents)) {
            session()->flash("failed", "Veuillez remplir au moins un des champs média, (Video, audio, documents)");
            return null;
        }

        // store sermon model
        $sermon = Sermon::create([
            'subject' => $this->subject,
            'preacher' => $this->preacher,
            'description' => $this->description,
            'date' => $this->date,
        ]);

        $this->storeImage($sermon);

        $this->storeAudios($sermon);

        $this->storeVideo($sermon);

        $this->storeDocuments($sermon);

        $sermon->save();

        session()->flash("created", "Enregistré avec succès");
    }

    private function storeImage(Sermon $sermon)
    {
        if ($this->image) {
            $filetmp = $this->image->getRealPath();

            (new ImageCompression)
                ->compress_image($filetmp);

            $uploaded = $this->image->storePublicly(File::SERMONS_PATH . "/{$sermon->id}");

            [$width, $height] = getimagesize($filetmp);

            $sermon->image()->create([
                'path' => $uploaded,
                'width' => $width,
                'height' => $height,
                'caption' => $this->image->getClientOriginalName()
            ]);
        }
    }

    private function storeAudios(Sermon $sermon)
    {
        collect($this->audios)
            ->each(function ($file) use ($sermon) {
                $uploaded = $file->storePublicly(File::SERMONS_PATH . "/{$sermon->id}");
                $sermon->files()->create([
                    'path' => $uploaded,
                    'type' => 'audio'
                ]);
            });
    }

    private function storeDocuments(Sermon $sermon)
    {
        collect($this->documents)
            ->each(function ($file) use ($sermon) {
                $uploaded = $file->storePublicly(File::SERMONS_PATH . "/{$sermon->id}");
                $sermon->files()->create([
                    'path' => $uploaded,
                    'type' => 'document'
                ]);
            });
    }

    private function storeVideo(Sermon $sermon)
    {
        if ($this->video) {
            $sermon->files()->create([
                'path' => $this->video,
                'type' => 'video'
            ]);
        }
    }

    public function render()
    {
        return view('livewire.admin.sermons.create');
    }
}
