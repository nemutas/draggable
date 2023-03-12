import { lerp, qs } from '../scripts/utils'

class MouseStalker {
  private mouseStalker = qs<HTMLDivElement>('.mouse-stalker')
  private mouseTarget = { x: 0, y: 0 }
  private mouseCurrent = { x: 0, y: 0 }
  private animeID?: number

  private lerpRatio = 0.3

  constructor() {
    this.addEvents()
    this.anime()
  }

  private addEvents() {
    window.addEventListener('mousemove', this.handleMouseMove)
  }

  private handleMouseMove = (e: MouseEvent) => {
    const rect = this.mouseStalker.getBoundingClientRect()
    this.mouseTarget.x = e.clientX - rect.width / 2
    this.mouseTarget.y = e.clientY - rect.height / 2
  }

  private anime = () => {
    this.mouseCurrent.x = lerp(this.mouseCurrent.x, this.mouseTarget.x, this.lerpRatio)
    this.mouseCurrent.y = lerp(this.mouseCurrent.y, this.mouseTarget.y, this.lerpRatio)
    this.mouseStalker.style.setProperty('translate', `${this.mouseCurrent.x}px ${this.mouseCurrent.y}px`)
    this.animeID = requestAnimationFrame(this.anime)
  }

  dispse() {
    window.removeEventListener('mousemove', this.handleMouseMove)
    this.animeID && cancelAnimationFrame(this.animeID)
  }
}

export const mouseStalker = new MouseStalker()
