import anime from "animejs"
import { listen } from "./functions";

const animation = {}

animation.overlay = {}
animation.overlay.circle = {};
animation.keys = {};


// Keyboard Key handling
animation.keys.ESC = 27;
animation.keys.arrowUp = 38;
animation.keys.arrowDown = 40;
animation.keys.enter = 13;


animation.overlay.circle.draw = function (options) {
    if (options.targetRadius < options.startRadius) {
        animation.overlay.ctx.clearRect(0, 0, animation.overlay.cW, animation.overlay.cH);
    }

    animation.overlay.ctx.beginPath();
    animation.overlay.ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI, false);
    animation.overlay.ctx.fillStyle = this.fill;
    animation.overlay.ctx.fill();
    animation.overlay.ctx.closePath();
}

animation.overlay.calcPageFillRadius = function (x, y) {
    var l = Math.max(x - 0, animation.overlay.cW - x);
    var h = Math.max(y - 0, animation.overlay.cH - y);
    return Math.sqrt(Math.pow(l, 2) + Math.pow(h, 2));
}

animation.overlay.resizeCanvas = function () {
    animation.overlay.cW = window.innerWidth;
    animation.overlay.cH = window.innerHeight;
    animation.overlay.c.width = animation.overlay.cW * window.devicePixelRatio;
    animation.overlay.c.height = animation.overlay.cH * window.devicePixelRatio;
    animation.overlay.ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    animation.overlay.ctx.fillStyle = animation.overlay.bgColor;
    animation.overlay.ctx.fillRect(0, 0, animation.overlay.cW, animation.overlay.cH);
}

animation.overlay.animate = (options) => {
    const minCoverDuration = 750;
    animation.overlay.bgColor = options.fill;

    animation.overlay.circle.x = options.position.x;
    animation.overlay.circle.y = options.position.y;
    animation.overlay.circle.r = options.startRadius;
    animation.overlay.circle.fill = options.fill;

    anime.remove(animation.overlay.circle)

    anime({
        targets: animation.overlay.circle,
        r: options.targetRadius,
        duration: Math.max(options.targetRadius / 2, minCoverDuration),
        easing: options.easing,
        complete: options.complete ? options.complete : null,
        update: () => animation.overlay.circle.draw({
            startRadius: options.startRadius,
            targetRadius: options.targetRadius
        })
    });
}

animation.overlay.show = options => {
    animation.overlay.c.style.display = "block";
    animation.overlay.lastStartingPoint = options.position;

    options.targetRadius = animation.overlay.calcPageFillRadius(options.position.x, options.position.y);
    options.startRadius = 0;
    options.easing = "easeOutQuart";
    animation.overlay.animate(options);
}

animation.overlay.hide = options => {
    options.targetRadius = 0;
    options.easing = "easeInOutQuart";

    const callback = options.complete;
    options.complete = () => {
        animation.overlay.c.style.display = "none";
        animation.overlay.bgColor = "transparent";
        if (callback) callback();
    };

    options.startRadius = animation.overlay.calcPageFillRadius(options.position.x, options.position.y);
    animation.overlay.animate(options);
}

animation.init = (canvas) => {
    animation.overlay.c = canvas;
    animation.overlay.ctx = animation.overlay.c.getContext("2d");
    animation.overlay.cH;
    animation.overlay.cW;
    animation.overlay.bgColor = "transparent";
    animation.overlay.resizeCanvas();
    animation.overlay.lastStartingPoint = { x: 0, y: 0 };

    listen(window, "resize", animation.overlay.resizeCanvas);

    return animation
}

export default animation
