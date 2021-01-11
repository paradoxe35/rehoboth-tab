
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
    const style = window.getComputedStyle(el);
    return (style.display === 'none')
}

const getIdYtLink = (url) => {
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