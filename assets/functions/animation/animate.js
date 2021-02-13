//@ts-nocheck
import { selectAll } from "./functions";

const animate = (elements, keyframeTemplates, optionsTemplate = {}) => {
    elements = typeof elements === "string" ? selectAll(elements) : elements;

    if (!elements.length) return {
        then: (_) => null
    }

    // shorthand version, move out options and construct keysFrom and keysTo
    if (!Array.isArray(keyframeTemplates) && typeof keyframeTemplates === 'object') {
        const optionProps = ['delay', 'direction', 'duration', 'easing', 'endDelay', 'fill', 'iterationStart', 'iterations'];
        for (const [key, value] of Object.entries(keyframeTemplates)) {
            if (optionProps.includes(key)) {
                optionsTemplate[key] = value;
                delete keyframeTemplates[key];
            }
        }

        const keysFrom = {}, keysTo = {};
        for (const [key, value] of Object.entries(keyframeTemplates)) {
            // if any keyframe is _not_ defined through an array (to, from), use its current value as from
            if (Array.isArray(value)) {
                keysFrom[key] = value[0];
                keysTo[key] = value[1];
            } else {
                // TODO: set to a keyword ('current'?) that can later be used to get its current value for keysFrom
                // keysFrom[key] = 'current'
                keysTo[key] = value;
            }
        }

        keyframeTemplates = [keysFrom, keysTo];
    }

    const animations = [];
    const easings = {
        easeInSine: '0.12, 0, 0.39, 0',
        easeOutSine: '0.61, 1, 0.88, 1',
        easeInOutSine: '0.37, 0, 0.63, 1',
        easeInQuad: '0.11, 0, 0.5, 0',
        easeOutQuad: '0.5, 1, 0.89, 1',
        easeInOutQuad: '0.45, 0, 0.55, 1',
        easeInCubic: '0.32, 0, 0.67, 0',
        easeOutCubic: '0.33, 1, 0.68, 1',
        easeInOutCubic: '0.65, 0, 0.35, 1',
        easeInQuart: '0.5, 0, 0.75, 0',
        easeOutQuart: '0.25, 1, 0.5, 1',
        easeInOutQuart: '0.76, 0, 0.24, 1',
        easeInQuint: '0.64, 0, 0.78, 0',
        easeOutQuint: '0.22, 1, 0.36, 1',
        easeInOutQuint: '0.83, 0, 0.17, 1',
        easeInExpo: '0.7, 0, 0.84, 0',
        easeOutExpo: '0.16, 1, 0.3, 1',
        easeInOutExpo: '0.87, 0, 0.13, 1',
        easeInCirc: '0.55, 0, 1, 0.45',
        easeOutCirc: '0, 0.55, 0.45, 1',
        easeInOutCirc: '0.85, 0, 0.15, 1',
        easeInBack: '0.36, 0, 0.66, -0.56',
        easeOutBack: '0.34, 1.56, 0.64, 1',
        easeInOutBack: '0.68, -0.6, 0.32, 1.6'
    }

    const transformProps = ['matrix', 'matrix3d', 'perspective', 'rotate', 'rotate3d', 'rotateX', 'rotateY', 'rotateZ', 'translate', 'translate3d', 'translateX', 'translateY', 'translateZ', 'scale', 'scale3d', 'scaleX', 'scaleY', 'scaleZ', 'skew', 'skewX', 'skew'];

    for (let i = 0; i < elements.length; i++) {
        const element = elements[i];
        const keyframes = [];

        for (const keyframeTemplate of keyframeTemplates) {
            const keyframe = { ...keyframeTemplate };
            const transforms = [];
            for (const [key, value] of Object.entries(keyframe)) {
                keyframe[key] = typeof value === 'function' ? value(element, i) : value;
                if (transformProps.includes(key)) {
                    transforms.push(`${key}(${keyframe[key]})`);
                    delete keyframe[key];
                }
            }
            if (transforms.length > 0) keyframe.transform = transforms.join(' ');
            keyframes.push(keyframe);
        }

        const options = { ...optionsTemplate };
        let finishCallback;
        if (options.finish !== null) {
            finishCallback = options.finish;
            delete options.finish;
        }

        for (const [key, value] of Object.entries(options)) {
            options[key] = typeof value === 'function' ? value(element, i) : value;
        }
        options.duration = options.duration || 600;
        options.easing = options.easing || "easeOutExpo";
        options.easing = easings[options.easing] !== null ? `cubic-bezier(${easings[options.easing]})` : options.easing;

        const animation = element.animate(keyframes, { ...options, fill: 'both' });
        animation.addEventListener('finish', () => {
            try { animation.commitStyles(); } catch (error) { console.error({ elements, error }); }
            animation.cancel();
            if (finishCallback !== null && typeof finishCallback === 'function') finishCallback(element, i, i == elements.length - 1);
        });

        animations.push(animation);
    }

    return {
        animations,
        then: (callback) => {
            animations[animations.length - 1].addEventListener('finish', () => {
                callback();
            });
        }
    };
}

export default animate