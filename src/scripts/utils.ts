export function resolvePath(path: string) {
  const p = path.startsWith('/') ? path.substring(1) : path
  return import.meta.env.BASE_URL + p
}

export function qs<T extends HTMLElement>(selectors: string) {
  return document.querySelector<T>(selectors)!
}

export function qsAll<T extends HTMLElement>(selectors: string) {
  return document.querySelectorAll<T>(selectors)
}

export function lerp(x: number, y: number, t: number) {
  return x * (1 - t) + y * t
}
