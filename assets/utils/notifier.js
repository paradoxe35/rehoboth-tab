import toastr from 'toastr'
import 'toastr/build/toastr.css'


const asyncTimer = (time = 5000) => new Promise(resolve => {
    window.setTimeout(() => resolve(true), time)
})

toastr.options = {
    "closeButton": false,
    "debug": false,
    "newestOnTop": false,
    "progressBar": false,
    "positionClass": "toast-bottom-left",
    "preventDuplicates": false,
    "onclick": null,
    "showDuration": 300,
    "hideDuration": 300,
    "timeOut": 5000,
    "extendedTimeOut": 1000,
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut"
}

export const Notifier = {
    success(message = '', time = 5000) {
        toastr.success(message, null, { timeOut: time })
        return asyncTimer(time)
    },
    error(message = '', time = 5000) {
        toastr.error(message, null, { timeOut: time })
        return asyncTimer(time)
    },
}
