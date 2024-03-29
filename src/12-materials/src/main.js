import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

const textureLoader = new THREE.TextureLoader()
const texture = textureLoader.load('./images/cover.png')

// Canvas
const canvas = document.querySelector('canvas.webgl')
// Scene
const scene = new THREE.Scene()

// Objects
// const geometry = new THREE.BoxBufferGeometry(1, 1, 1)
// // const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
// const material = new THREE.MeshBasicMaterial({ map: texture })
// const mesh = new THREE.Mesh(geometry, material)
// scene.add(mesh)

// Objects
// ↓ ------------------------------------------------------------ ↓
const material = new THREE.MeshBasicMaterial({ color: 0x1E8A76 })
// material.wireframe = true


const sphere = new THREE.Mesh(
  new THREE.SphereBufferGeometry(1, 15, 15),
  material
)

const plane = new THREE.Mesh(
  new THREE.PlaneGeometry(1, 3),
  material
)

const torus = new THREE.Mesh(
  new THREE.TorusGeometry(1, 0.3, 25, 50),
  material
)

plane.position.set(3, 0)
torus.position.set(-3, 0)

scene.add(sphere, plane, torus)
// ↑ ------------------------------------------------------------ ↑

// Sizes
const sizes = {
  width: window.innerWidth,
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

// Camera
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.z = 6
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

// Animate
const clock = new THREE.Clock()

const tick = () => {
  const elapsedTime = clock.getElapsedTime()

  // Update controls
  controls.update()

  // Render
  renderer.render(scene, camera)

  // Call tick again on the next frame
  window.requestAnimationFrame(tick)
}

tick()
