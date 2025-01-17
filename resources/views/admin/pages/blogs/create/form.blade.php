<form g-ref="store"
    action="{{ $blog ? route('admin.blogs.update', ['blog' => $blog->id]) : route('admin.blogs.store') }}" method="post"
    autocomplete="off" enctype="multipart/form-data">
    <div class="row">
        <div class="col-lg-6">

            <div class="mb-3">
                <span>{{ __('Titre') }}</span>
                <input type="text" g-ref="title" value="{{ $blog ? $blog->title : '' }}" class="form-control"
                    name="title">
            </div>

            <div class="mb-3">
                <span>{{ __('Auteur') }}</span>
                <input name="author" class="form-control" value="{{ $blog ? $blog->author : $app_name }}"
                    placeholder="{{ __('Auteur') }}">
            </div>

            <div class="mb-3">
                <label for="categories" class="d-flex align-items-center gap-1 mb-2">
                    <span>{{ __('Catégories') }}</span>
                    <button type="button" g-ref="categoryBtn" class="btn btn-secondary btn-sm text-white">
                        {{ __('Ajouter') }}
                    </button>
                </label>
                <select g-ref="categories" id="categories" class="form-control" name="category">
                    <option value=" ">{{ __('Catégories') }}</option>
                    @foreach ($categories as $category)
                    <option value="{{ $category->id }}"
                        {{ $blog && $blog->blog_category_id == $category->id ? 'selected': '' }}>
                        {{ $category->name }}
                    </option>
                    @endforeach
                </select>
            </div>
            <div class="mb-3">
                <label>{{ __('Description') }}</label>
                <textarea class="form-control" name="description"
                    rows="2">{{ $blog ? $blog->description : '' }}</textarea>
            </div>
        </div>

        <div class="col-lg-6">
            <div class="mb-3">
                <label>{{ __('Image') }}</label>
                <x-card>
                    <div g-ref="coverImage"></div>
                </x-card>
            </div>
            @if ($blog)
            <div class="mb-3">
                <x-card>
                    <img class="img-fluid img-thumbnail" src="{{ $blog->image->public_path }}" alt="{{ $blog->title }}">
                </x-card>
            </div>
            @endif
        </div>

    </div>

    <div class="row py-3">
        <div class="col-12">
            <div class="news">
                <div class="editor-landing">
                    <div class="text-center mb-3"><b>{{ __('Contenu') }}</b></div>
                    <x-card>
                        <div id="editorjs"></div>
                    </x-card>
                </div>
            </div>
        </div>
    </div>

    <div>
        <button type="submit" class="btn text-white btn-primary btn-sm">{{ __('Enregistrer') }}</button>
        <a type="button" g-ref="preview" class="btn btn-secondary btn-sm text-white">{{ __('Aperçu') }}</a>
    </div>
</form>