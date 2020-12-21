
/**
 * @param { any } el 
 * @param { boolean } smooth 
 * @param { string } displayStyle 
 */
export function fadeOut(el, smooth = true, displayStyle = 'none') {
    if (!el || el.style.display == "none")
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
    if (!el || el.style.display == "block")
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