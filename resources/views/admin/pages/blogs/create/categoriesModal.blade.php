<div class="modal fade" g-ref="categoryModal" tabindex="-1" role="dialog" aria-labelledby="custom-payment-modalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-lg modal-dialog-scrollable" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">{{ __('Catégories') }}</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <div class="row">
                    <div class="col-lg-6">
                        <form autocomplete="off" g-ref="storeCategory" method="POST">
                            <div class=" form-group">
                                <span>{{ __('Nom') }}</span>
                                <input type="text" name="name" required class="form-control form-control-sm"
                                    placeholder="{{ __('Nom') }} {{ __('Catégorie') }}">
                            </div>
                            <div class="form-group">
                                <span>{{ __('Icon') }}</span>
                                <textarea disabled class="form-control" name="icon" placeholder="{{ __('Icon') }}"
                                    rows="3"></textarea>
                            </div>
                            <button type="submit" class="btn btn-primary btn-sm">{{ __('Enregistrer') }}</button>
                        </form>
                    </div>
                    <div class="col-lg-6">
                        <div class="table-responsive">
                            <table class="table">
                                <thead>
                                    <tr>
                                        <th scope="col">{{ __('Icon') }}</th>
                                        <th scope="col">{{ __('Nom') }}</th>
                                        <th scope="col"></th>
                                    </tr>
                                </thead>
                                <tbody g-ref="categoryList">
                                    @foreach ($categories as $category)
                                    <tr>
                                        <td></td>
                                        <td>{{ $category->name }}</td>
                                        <td>
                                            <button type="button" data-category-del="{{ $category->id }}"
                                                class="btn btn-secondary btn-sm text-danger active">
                                                <i class="ni ni-fat-remove clickable-a text-primary"></i>
                                            </button>
                                        </td>
                                    </tr>
                                    @endforeach
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>