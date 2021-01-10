declare module "*.jpg" {
    const value: string;
    export default value;
}

declare module "*.jpeg" {
    const value: string;
    export default value;
}

declare module "*.svg" {
    const value: string;
    export default value;
}


declare const Livewire: any;

declare const $swup = new (await import('swup')).default;

declare const route = (await import('ziggy-js')).default;