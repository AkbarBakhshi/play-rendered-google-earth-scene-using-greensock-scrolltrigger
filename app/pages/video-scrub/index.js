import gsap from 'gsap'


import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

export default class VideoScrub {
    constructor() {
    }
    create() {

        // gsap.utils.toArray(".video-scrub").forEach(video => videoScrub(video, {
        //     scrollTrigger: {
        //         trigger: video,
        //         start: "center center",
        //         end: "+=5000",
        //         scrub: true,
        //     }
        // }))

        // function videoScrub(video, vars) {
        //     video = gsap.utils.toArray(video)[0] 
        //     let once = (el, event, fn) => {
        //         let onceFn = function () {
        //             el.removeEventListener(event, onceFn)
        //             fn.apply(this, arguments)
        //         }
        //         el.addEventListener(event, onceFn)
        //         return onceFn
        //     },
        //         prepFunc = () => { video.play(); video.pause() },
        //         prep = () => once(document.documentElement, "touchstart", prepFunc),
        //         src = video.currentSrc || video.src,
        //         tween = gsap.fromTo(video, { currentTime: 0 }, { paused: true, immediateRender: false, currentTime: video.duration || 1, ease: "none", ...vars }),
        //         resetTime = () => (tween.vars.currentTime = video.duration || 1) && tween.invalidate()
        //     once(video, "loadedmetadata", resetTime)
        //     prep()
        //     return tween
        // }

        const canvas = document.querySelector('.image__sequence');
        const context = canvas.getContext("2d");

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const frameCount = 601;
        const currentFrame = index => (
            `images/MonacoF1/footage/MonacoF1_${(index).toString().padStart(3, '0')}.jpeg`
        );

        const images = []
        const monaco = {
            frame: 0
        };

        for (let i = 0; i < frameCount; i++) {
            const img = new Image();
            img.src = currentFrame(i);
            images.push(img);
        }

        gsap.to(monaco, {
            frame: frameCount - 1,
            snap: "frame",
            scrollTrigger: {
                trigger: '.image__sequence',
                start: "center center",
                scrub: true,
                pin: true,
            },
            onUpdate: render
        });

        images[0].onload = render;

        function render() {
            context.clearRect(0, 0, canvas.width, canvas.height);
            context.drawImage(images[monaco.frame], 0, 0);
        }


    }

    animateIn() {
    }

    animateOut() {
    }

}