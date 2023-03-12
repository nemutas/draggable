export function calcCoveredTextureScale(texture: THREE.Texture, aspect: number, target?: THREE.Vector2) {
  const imageAspect = texture.image.width / texture.image.height

  let result: [number, number] = [1, 1]
  if (aspect < imageAspect) result = [aspect / imageAspect, 1]
  else result = [1, imageAspect / aspect]

  target?.set(result[0], result[1])

  return result
}

export function coveredTexture(texture: THREE.Texture, screenAspect: number) {
  texture.matrixAutoUpdate = false
  const scale = calcCoveredTextureScale(texture, screenAspect)
  texture.matrix.setUvTransform(0, 0, scale[0], scale[1], 0, 0.5, 0.5)

  return texture
}
