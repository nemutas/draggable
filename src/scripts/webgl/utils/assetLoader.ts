import * as THREE from 'three'
import { GLTF, GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader'
import { resolvePath } from '../../utils'

export type Assets = {
  [key in string]: {
    data?: THREE.Texture | THREE.VideoTexture | GLTF
    path: string
    encoding?: boolean
    flipY?: boolean
  }
}

export async function loadAssets(assets: Assets) {
  const textureLoader = new THREE.TextureLoader()
  const gltfLoader = new GLTFLoader()
  const rgbeLoader = new RGBELoader()

  const getExtension = (path: string) => {
    const s = path.split('.')
    return s[s.length - 1]
  }

  await Promise.all(
    Object.values(assets).map(async (v) => {
      const path = resolvePath(v.path)
      const extension = getExtension(path)

      if (['jpg', 'png', 'webp'].includes(extension)) {
        const texture = await textureLoader.loadAsync(path)
        texture.userData.aspect = texture.image.width / texture.image.height
        v.encoding && (texture.encoding = THREE.sRGBEncoding)
        v.flipY !== undefined && (texture.flipY = v.flipY)
        v.data = texture
      } else if (['glb'].includes(extension)) {
        const gltf = await gltfLoader.loadAsync(path)
        v.data = gltf
      } else if (['webm', 'mp4'].includes(extension)) {
        const video = document.createElement('video')
        video.src = path
        video.muted = true
        video.loop = true
        video.autoplay = true
        video.preload = 'metadata'
        video.playsInline = true
        // await video.play()
        const texture = new THREE.VideoTexture(video)
        texture.userData.aspect = video.videoWidth / video.videoHeight
        v.encoding && (texture.encoding = THREE.sRGBEncoding)
        v.data = texture
      } else if (['hdr'].includes(extension)) {
        const texture = await rgbeLoader.loadAsync(path)
        texture.mapping = THREE.EquirectangularReflectionMapping
        v.data = texture
      }
    }),
  )
}
