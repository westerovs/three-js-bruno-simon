import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()
const matcapTexture = textureLoader.load('./static/textures/matcaps/9.jpg')


const arr = []
/**
 * Fonts
 */
const fontLoader = new THREE.FontLoader()

fontLoader.load(
  '/fonts/helvetiker_regular.typeface.json',
  font => {
    fontLoader.load(
      '/fonts/helvetiker_regular.typeface.json',
      font => {
        // Material
        const material = new THREE.MeshMatcapMaterial({ matcap: matcapTexture })

        // Text
        const textGeometry = new THREE.TextBufferGeometry(
          'Web Start',
          {
            font          : font,
            size          : 0.5,
            height        : 0.2,
            curveSegments : 12,
            bevelEnabled  : true,
            bevelThickness: 0.03,
            bevelSize     : 0.02,
            bevelOffset   : 0,
            bevelSegments : 5,
          }
        )
        textGeometry.center()

        const text = new THREE.Mesh(textGeometry, material)
        scene.add(text)

        // Donuts
        const donutGeometry = new THREE.TorusBufferGeometry(0.3, 0.2, 32, 64)

        for (let i = 0; i < 50; i++) {
          const donut      = new THREE.Mesh(donutGeometry, material)
          donut.position.x = (Math.random() - 0.5) * 10
          donut.position.y = (Math.random() - 0.5) * 10
          donut.position.z = (Math.random() - 0.5) * 10
          donut.rotation.x = Math.random() * Math.PI
          donut.rotation.y = Math.random() * Math.PI
          const scale      = Math.random()
          donut.scale.set(scale, scale, scale)

          arr.push(donut)
          scene.add(donut)
        }
      }
    )
  }
)


/**
 * Sizes
 */
const sizes = {
  width : window.innerWidth,
  height: window.innerHeight,
}

window.addEventListener('resize', () => {
  // Update sizes
  sizes.width  = window.innerWidth
  sizes.height = window.innerHeight

  // Update camera
  camera.aspect = sizes.width / sizes.height
  camera.updateProjectionMatrix()

  // Update renderer
  renderer.setSize(sizes.width, sizes.height)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
      // Base camera
const camera      = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 1
camera.position.y = 1
camera.position.z = 2
scene.add(camera)

// Controls
const controls         = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () => {
  const elapsedTime = clock.getElapsedTime()

  arr.forEach(part => {
    part.position.x += 0.0003
    part.position.y += 0.0003
    part.position.z += 0.0003
  })
  // Update controls
  controls.update()

  // Render
  renderer.render(scene, camera)

  // Call tick again on the next frame
  window.requestAnimationFrame(tick)
}

tick()