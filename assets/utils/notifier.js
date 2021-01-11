import toastr from 'toastr'


const asyncTimer = (time = 5000) => new Promise(resolve => {
    window.setTimeout(() => resolve(true), time)
})

toastr.options = {
    "closeButton": false,
    "debug": false,
    "newestOnTop": false,
    "progressBar": false,
    "positionClass": "toast-bottom-center",
    "preventDuplicates": false,
    "onclick": null,
    "showDuration": 300,
    "hideDuration": 1000,
    "timeOut": 5000,
    "extendedTimeOut": 1000,
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut"
}

export const Notifier = {
    success(message = '', time = 5000) {
        toastr.success(message)
        return asyncTimer(time)
    },
    error(message = '', time = 5000) {
        toastr.error(message)
        return asyncTimer(time)
    },
}
