<?php

namespace App\Http\Controllers\Admin;

use App\Files\File;
use App\Http\Controllers\Controller;
use App\Models\Sermon;
use Illuminate\Http\Request;

class SermonsController extends Controller
{
    public function index()
    {
        return view('admin.pages.sermons.index');
    }

    public function create()
    {
        return view('admin.pages.sermons.create');
    }

    public function edit(Sermon $sermon)
    {
        return view('admin.pages.sermons.edit', compact('sermon'));
    }


    public function store(Request $request)
    {
        $request->validate([
            'subject' => ['required', 'string', 'max:255', 'min:2'],
            'preacher' => ['required', 'string', 'max:255', 'min:2'],
            'description' => ['nullable', 'string', 'min:10'],
            'date' => ['required', 'date'],
            'image' => File::IMAGE_RULES_OPTIONAL,
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
        ]);

        abort_if(
            !$request->video && empty($request->file('audios')) && empty($request->file('documents')),
            422,
            trans("Veuillez remplir au moins un des champs média, (Video, audio, documents)")
        );

        $sermon = Sermon::create([
            'subject' => $request->subject,
            'preacher' => $request->preacher,
            'description' => $request->description,
            'date' => $request->date,
        ]);

        if ($image = $request->file('image')) {
            $this->storeImage($sermon, $image);
        }

        if ($video = $request->video) {
            $this->storeVideo($sermon, $video);
        }

        $this->storeFiles($sermon, $request->file('audios'), 'audio');

        $this->storeFiles($sermon, $request->file('documents'), 'document');

        $sermon->save();

        return [
            'message' => trans("Enregistré avec succès")
        ];
    }

    private function storeImage(Sermon $sermon, $file)
    {
        File::storeImageMorph(
            $file,
            File::SERMONS_PATH,
            $sermon->image(),
            $sermon
        );
    }


    private function storeVideo(Sermon $sermon, $video)
    {
        $sermon->files()->create([
            'path' => $video,
            'type' => 'video'
        ]);
    }

    private function storeFiles(Sermon $sermon, $models, $type)
    {
        collect($models)
            ->each(function ($file) use ($sermon, $type) {
                $uploaded = $file->storePublicly(File::SERMONS_PATH . "/{$sermon->id}/{$type}");
                $sermon->files()->create([
                    'path' => $uploaded,
                    'type' => $type,
                    'name' => $file->getClientOriginalName()
                ]);
            });
    }
}
