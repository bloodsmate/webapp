import { gsap } from 'gsap'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'

gsap.registerPlugin(ScrollToPlugin)

export function smoothScroll(target: string, duration = 1) {
  gsap.to(window, {
    duration,
    scrollTo: {
      y: target,
      offsetY: 80 // Adjust this value based on your navbar height
    },
    ease: 'power2.inOut'
  })
}

