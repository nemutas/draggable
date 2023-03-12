class Mouse2D {
  position: [number, number] = [0, 0]

  constructor() {
    window.addEventListener('mousemove', this.handleMouseMove)
    window.addEventListener('touchmove', this.handleTouchMove)
  }

  private handleMouseMove = (e: MouseEvent) => {
    const x = (e.clientX / window.innerWidth) * 2 - 1
    const y = -1 * ((e.clientY / window.innerHeight) * 2 - 1)
    this.position = [x, y]
  }

  private handleTouchMove = (e: TouchEvent) => {
    const { pageX, pageY } = e.touches[0]
    const x = (pageX / window.innerWidth) * 2 - 1
    const y = -1 * ((pageY / window.innerHeight) * 2 - 1)
    this.position = [x, y]
  }

  dispose() {
    window.removeEventListener('mousemove', this.handleMouseMove)
    window.removeEventListener('touchmove', this.handleTouchMove)
  }
}

export const mouse2d = new Mouse2D()
