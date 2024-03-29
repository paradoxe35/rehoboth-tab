
/**
 * @param { any } el 
 * @param { boolean } smooth 
 * @param { string } displayStyle 
 */
export function fadeOut(el, smooth = true, displayStyle = 'none') {
    if (!el || isHidden(el))
        return;

    if (smooth) {
        let opacity = el.style.opacity;
        let request;
        const animation = () => {
            el.style.opacity = opacity -= 0.04;
            if (opacity <= 0) {
                opacity = 0;
                el.style.display = displayStyle;
                cancelAnimationFrame(request);
            }
        };
        const rAf = () => {
            request = requestAnimationFrame(rAf);
            animation();
        };
        rAf();
    } else {
        el.style.opacity = 0;
    }
}

/**
 * @param { any } el 
 * @param { boolean } smooth 
 * @param { string } displayStyle 
 */
export function fadeIn(el, smooth = true, displayStyle = 'block') {
    if (!el || !isHidden(el))
        return;

    el.style.opacity = 0;
    el.style.display = displayStyle;
    if (smooth) {
        let opacity = 0;
        let request;

        const animation = () => {
            el.style.opacity = opacity += 0.04;
            if (opacity >= 1) {
                opacity = 1;
                cancelAnimationFrame(request);
            }
        };

        const rAf = () => {
            request = requestAnimationFrame(rAf);
            animation();
        };
        rAf();
    } else {
        el.style.opacity = 1;
    }
}

export function debounce(callback, delay) {
    let timer;
    return function () {
        let args = arguments;
        let context = this;
        clearTimeout(timer);
        timer = setTimeout(function () {
            callback.apply(context, args);
        }, delay)
    }
}


export function throttle(callback, delay) {
    let last;
    let timer;
    return function () {
        let context = this;
        let now = +new Date();
        let args = arguments;
        if (last && now < last + delay) {
            // le délai n'est pas écoulé on reset le timer
            clearTimeout(timer);
            timer = setTimeout(function () {
                last = now;
                callback.apply(context, args);
            }, delay);
        } else {
            last = now;
            callback.apply(context, args);
        }
    };
}

export function isHidden(el) {
    const style = window.getComputedStyle ? window.getComputedStyle(el) : el;
    return (style.display === 'none')
}

export const getIdYtLink = (url) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);

    return (match && match[2].length === 11)
        ? match[2]
        : null;
}

export function ytLinkToEmbedCode(url, width = 560, height = 315) {
    const videoId = getIdYtLink(url);
    return !videoId ? null : `<iframe width="${width}" height="${height}" src="//www.youtube.com/embed/${videoId}" frameborder="0" allowfullscreen></iframe>`
}

export async function ytLinkToEmbedCodeApi(url) {
    const videoId = getIdYtLink(url);
    return !videoId ? null : await fetch(`https://www.youtube.com/oembed?url=${url}`).then(r => r.json())
}


export const capitalize = (s) => {
    if (typeof s !== 'string') return ''
    return s.charAt(0).toUpperCase() + s.slice(1)
}


export const eventListenOne = (parent = null, eventName, callback) => {
    const el = (parent || window);
    const h = (e) => {
        callback(e)
        el.removeEventListener(eventName, h);
    }
    el.removeEventListener(eventName, h);
    el.addEventListener(eventName, h);
}

export function confirmed() {
    return confirm("Êtes-vous sûr ?")
}

export const triggerOnChangeEvent = el => el && el.dispatchEvent(new Event('change'))

export function valueAtPath(object, path) {
    if (!object || path.length === 0) return object
    return valueAtPath(object[path.shift()], path)
}

export function setValueAtPath(object, path, value) {
    if (!object || path.length === 0) return null
    if (!object[path[0]]) object[path[0]] = {}
    if (path.length === 1) object[path[0]] = value
    else return setValueAtPath(object[path.shift()], path, value)
}

export function shuffle(arr) {
    let array = [...arr]
    let currentIndex = array.length, temporaryValue, randomIndex;

    while (0 !== currentIndex) {

        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

export function urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
        .replace(/\-/g, '+')
        .replace(/_/g, '/');

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}

export const respondToVisibility = (element, callback) => {
    const options = {
        root: document.documentElement
    }
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            callback(entry.intersectionRatio > 0);
        });
    }, options);
    observer.observe(element);
    return () => observer.unobserve(element)
}


export function letterLimit(text = '', limit = 24) {
    if (!text) return;
    const length = text.length
    if (length <= limit) {
        return text
    }
    return text.slice(0, limit) + '...'
}

export const getBrowserWidth = function () {
    if (window.innerWidth < 768) {
        return 'xs';
    } else if (window.innerWidth < 991) {
        return 'sm';
    } else if (window.innerWidth < 1199) {
        return 'md';
    } else {
        return 'lg';
    }
}


export const timeWithNoSeconds = (t = '') => t.split(':').slice(0, 2).join(':')


export const monthDayYear = (d = '') => {
    const date = d.split(' ')
    return { month: date[0], day: date[1].slice(0, date[1].length - 1), year: date[2] }
}

export const parallax = function (img) {
    const speed = 3;
    let pos = `calc(-${window.pageYOffset / speed}px + 40%)`;
    img.style.backgroundPosition = `50% ${pos}`;
}

export const isLocalhost = () => Boolean(
    window.location.hostname === 'localhost' ||
    // [::1] is the IPv6 localhost address.
    window.location.hostname === '[::1]' ||
    // 127.0.0.1/8 is considered localhost for IPv4.
    window.location.hostname.match(
        /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
    )
);