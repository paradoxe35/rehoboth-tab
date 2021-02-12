
const inLoading = {}

export const loadScript = (url, callback = null) => {
    if (url in inLoading) {
        if (inLoading[url].loaded) {
            callback && callback()
        } else {
            inLoading[url].callbacks.push(callback)
        }
        return
    }

    inLoading[url] = {
        loaded: false,
        callbacks: [callback]
    }

    const script = document.createElement('script');
    script.setAttribute('src', url);
    script.async = true

    script.onload = () => {
        inLoading[url].loaded = true;
        inLoading[url]
            .callbacks.forEach((cb) => (cb && cb()))
    };

    script.setAttribute('charset', 'utf-8');

    document.head.appendChild(script);
}

const loadedScripts = [];
export const loadStylesheet = (url, callback = null) => {
    if (loadedScripts.includes(url)) {
        callback && callback()
        return
    }
    const script = document.createElement('link');

    script.href = url;
    script.onload = callback;
    script.rel = 'stylesheet';
    loadedScripts.push(url)

    document.head.appendChild(script);
}