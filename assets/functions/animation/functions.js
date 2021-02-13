

export const dispatch = e => document.dispatchEvent(new Event(e));
export const select = selector => document.querySelector(selector)
export const selectAll = selector => document.querySelectorAll(selector)


export const listen = (obj, event, callback) => {
    obj = typeof obj === "string" ? select(obj) : obj;
    obj.addEventListener(event, callback);
}

export const listenAll = (objs, event, callback) => {
    objs = typeof objs === "string" ? selectAll(objs) : objs;
    for (const obj of objs) { listen(obj, event, callback) }
}


export const clientClickPosition = (e) => {
    if (e.touches) e = e.touches[0];

    if (e.clientX && e.clientY) return {
        x: e.clientX,
        y: e.clientY
    }

    // If there was no clientX and Y set, use the center position of
    // the target as a backup
    var rect = e.target.getBoundingClientRect();
    return {
        x: rect.top + (rect.bottom - rect.top) / 2,
        y: rect.left + (rect.right - rect.left) / 2
    }
}
