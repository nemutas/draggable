import { mouseStalker } from '../components/MouseStalker'
import { qs } from './utils'
import { TCanvas } from './webgl/TCanvas'

const canvas = new TCanvas(qs<HTMLDivElement>('.canvas-container'))

window.addEventListener('beforeunload', () => {
  canvas.dispose()
  mouseStalker.dispse()
})
