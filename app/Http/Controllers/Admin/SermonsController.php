<?php

namespace App\Http\Controllers\Admin;

use App\Files\File;
use App\Http\Controllers\Controller;
use App\Models\Sermon;
use App\Models\WebPush;
use App\Notifications\Sermon\SermonCreatedNotification;
use Illuminate\Http\Request;

class SermonsController extends Controller
{
    public function __construct()
    {
        $this->middleware(['optimizeImages'])
            ->only(['store', 'update']);
    }

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
        $web = WebPush::query()->first();
        $web->notify(new SermonCreatedNotification($sermon));

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
        $saveds = collect();

        collect($models)
            ->each(function ($file) use ($sermon, $type, &$saveds) {
                $uploaded = $file->storePublicly(File::SERMONS_PATH . "/{$sermon->id}/{$type}");
                $created = $sermon->files()->create([
                    'path' => $uploaded,
                    'type' => $type,
                    'name' => $file->getClientOriginalName()
                ]);
                $saveds->add($created);
            });

        return $saveds;
    }

    private function updateCover(Request $request, Sermon $sermon)
    {
        $request->validate([
            'image' => File::IMAGE_RULES
        ]);

        if ($sermon->image) {
            $sermon->image->delete();
        }

        $this->storeImage($sermon, $request->file('image'));

        $sermon->refresh();

        return $sermon->image;
    }

    private function updateVideo(Request $request, Sermon $sermon)
    {
        $request->validate([
            'video' => [
                'required',
                'regex:/^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/',
                'string'
            ],
        ]);

        if ($sermon->video) {
            $sermon->video->delete();
        }

        $this->storeVideo($sermon, $request->video);

        $sermon->refresh();

        return $sermon->video;
    }

    private function updateAudios(Request $request, Sermon $sermon)
    {
        $request->validate([
            'files' => ['required'],
            'files.*' => [
                'nullable',
                'file',
                'max:' . (200 * 1024),
                "mimes:mp3,oga,aac,wav"
            ],
        ]);

        $max = 10;
        abort_if(
            ($sermon->audios->count() + count($request->file('files')) > 10),
            422,
            trans("Vous ne pouvez enregistrer que {$max} fichiers audios")
        );

        return $this->storeFiles($sermon, $request->file('files'), 'audio');;
    }

    private function updateDocuments(Request $request, Sermon $sermon)
    {
        $request->validate([
            'files' => ['required'],
            'documents.*' => [
                'nullable',
                'file',
                'max:' . (30 * 1024),
                "mimes:pdf"
            ]
        ]);

        $max = 10;
        abort_if(
            ($sermon->documents->count() + count($request->file('files')) > 10),
            422,
            trans("Vous pouvez enregistrer que {$max} fichiers documents")
        );

        return $this->storeFiles($sermon, $request->file('files'), 'document');;
    }

    public function update(Request $request, Sermon $sermon)
    {
        switch ($request->query('section')) {
            case 'cover':
                $res = $this->updateCover($request, $sermon);
                break;
            case 'video':
                $res = $this->updateVideo($request, $sermon);
                break;
            case 'audio':
                $res = $this->updateAudios($request, $sermon);
                break;
            case 'document':
                $res = $this->updateDocuments($request, $sermon);
                break;
        }

        return $res ?? abort(400);
    }
}
