
const init = (btn, settings = {}) => {
    const defaults = {
        scrollSpeed: 10,
        cancelByScroll: true,
        cancelByClick: true,
        cancelByKeydown: true
    };

    const w = window;
    const d = w.document;
    const opts = Object.assign(defaults, settings);
    const isTouchDevice = (typeof w.ontouchstart !== 'undefined');

    let isScrolling = false;
    let beforeScroll = 0;
    let scrollAnimation;

    // For canceling scroll
    const cancelScrolling = () => {
        if (isScrolling) {
            clearInterval(scrollAnimation);
            isScrolling = false;
        }
    };

    // Fade in and out
    w.addEventListener('scroll', () => {
        const scroll = d.body.scrollTop || d.documentElement.scrollTop;
        // Canceling scroll by reverse scrolling
        if (!isTouchDevice && opts.cancelByScroll) {
            if (scroll > beforeScroll) cancelScrolling();
            beforeScroll = scroll;
        }
    });

    // Canceling scroll on click or tap
    if (opts.cancelByClick) {
        w.addEventListener((isTouchDevice) ? 'touchstart' : 'click', (e) => {
            if (e.target !== btn) cancelScrolling();
        });
    }

    // Canceling scroll on any keypress
    if (opts.cancelByKeydown) {
        w.addEventListener('keydown', () => {
            cancelScrolling();
        });
    }

    // Scroll to top
    btn.addEventListener('click', () => {
        const scrollPage = (x, y) => {
            w.scrollTo(x, Math.floor(y - y / (opts.scrollSpeed * 2)));
            if (y <= 0) {
                clearInterval(scrollAnimation);
                isScrolling = false;
                btn.style.opacity = 0.0;
            }
        };
        if (!isScrolling) {
            isScrolling = true;
            clearInterval(scrollAnimation);
            scrollAnimation = setInterval(() => {
                const x = d.body.scrollLeft || d.documentElement.scrollLeft;
                const y = d.body.scrollTop || d.documentElement.scrollTop;
                scrollPage(x, y);
            }, opts.scrollSpeed);
        }
        return false;
    });
};

export default {
    init: init
};
