import anime from "animejs";
import { regBackButton } from "/@/components/site-overlay/SiteOverlay";
import animate from "/@/functions/animation/animate";
import animationOverlay from "/@/functions/animation/animation-overlay";
import { clientClickPosition, dispatch, listen, select, selectAll } from "/@/functions/animation/functions";

const page = {}

page.visible = false;
page.overlay = {}
page.keys = {}
page.pageOffset = {}


page.keys.handleESC = () => {
    dispatch("pressed:ESC");
    if (page.visible) page.hide()
}

page.overlay.init = (ctx) => {
    listen(document, "keyup", e => { if (e.keyCode == animationOverlay.keys.ESC) page.keys.handleESC() });
    return animationOverlay.init(ctx)
}

page.toggle = (e) => {
    if (page.visible) {
        page.hide(e)
    } else {
        page.reveal(e)
    }
}

page.toggleStates = () => {
    document.body.classList.toggle('no-scroll');
    select('.js-reg').classList.toggle('site-active');
}


page.reveal = (e) => {
    page.visible = true;

    page.pageOffset.x = window.pageXOffset
    page.pageOffset.y = window.pageYOffset

    page.toggleStates();

    dispatch("app:regPageWillShow");

    animationOverlay.overlay.show({
        position: clientClickPosition(e),
        fill: "#bcac76"
    });

    anime.remove('.js-reg, .js-reg-animate');

    let containerDelay = 200;

    const t = select(".composition-source-text")
    t && (t.style.opacity = 0);
    select(".composition-source").scrollTo({ top: 0 })
    select(".composition-source").style.display = "block";
    select(".composition-source-container").style.transform = "scaleX(0)";
    select(".composition-source-container").style.display = "block";

    // Animate in overlay elements
    anime.timeline()
        .add({
            targets: ".composition-source-container",
            scaleX: [0, 1],
            duration: 900,
            delay: 500,
            easing: "easeOutExpo",
        }).add({
            targets: ".composition-source-text",
            opacity: [0, 1],
            translateY: [-50, 0],
            delay: (el, i) => 50 * i,
            easing: "easeOutExpo",
            offset: "-=150"
        })

    animate('.js-reg', {
        opacity: [0, 1],
        delay: containerDelay,
        duration: 200,
        easing: "easeInOutExpo"
    });

    const menuItemDelay = 90;
    containerDelay += 90;

    // @ts-ignore
    for (let animated of selectAll(".js-reg-animate")) {
        animated.style.opacity = 0;
        animated.style.transform.replace(/scale\([0-9|\.]*\)/, 'scale(0.9)');
    }

    animate('.js-reg-animate', [
        { opacity: 0, scale: 0.9, translateY: '-7px' },
        { opacity: 1, scale: 1, translateY: 0 }
    ], {
        delay: (el, i) => containerDelay + menuItemDelay * (i + 1),
        duration: 1100,
        easing: "easeOutExpo"
    }).then(() => dispatch('app:regPageDidReveal'));

    regBackButton.show()


    const textWrapper = document.querySelector('.ml3');
    textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");

    anime.timeline({ loop: false })
        .add({
            targets: '.ml3 .letter',
            opacity: [0, 1],
            easing: "easeInOutQuad",
            duration: 500,
            delay: (el, i) => 100 * (i + 1)
        });
}


page.hide = (_) => {
    page.visible = false;
    page.toggleStates();

    window.scrollTo(page.pageOffset.x, page.pageOffset.y)

    dispatch("app:regPageWillHide");

    animationOverlay.overlay.hide({
        position: animationOverlay.overlay.lastStartingPoint,
        fill: "#bcac76",
        complete: () => dispatch("app:regPageDidHide")
    });


    anime({
        targets: ".composition-source-container",
        translateX: "100%",
        duration: 500,
        easing: "easeInQuad",
        complete: function () {
            const comp = select(".composition-source");
            comp.scrollTop = 0;
            comp.style.display = "none";
        }
    });

    animate('.js-reg', {
        opacity: [1, 0],
        duration: 200,
        easing: "easeInOutExpo"
    });

    animate('.js-reg-animate', [
        { translateY: '0px', opacity: 1, scale: 1 },
        { translateY: '10px', opacity: 0, scale: 0.9 }
    ], {
        duration: 200,
        easing: "easeInExpo"
    });

    regBackButton.hide()
}



export default page