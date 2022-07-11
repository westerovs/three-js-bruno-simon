import * as THREE from 'three'
import { AxesHelper } from 'three'
// import gsap from 'greensock'
import gsap from 'gsap'

// Canvas
const canvas = document.querySelector('canvas.webgl')
// Scene
const scene = new THREE.Scene()
// Objects
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
const mesh = new THREE.Mesh(geometry, material)


mesh.position.set(1, 0.5, 1)
mesh.rotation.reorder('YXZ')
mesh.rotation.set(Math.PI * 0.25, Math.PI * 0.25, 0)

// Sizes
const sizes = {
  width: 800,
  height: 600,
}

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.set(0, 0.5,3)
scene.add(camera)

const axesHelper = new THREE.AxesHelper()
scene.add(axesHelper)

const cub2 = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({ color: 0xfff444 })
)

const group = new THREE.Group()
group.add(mesh, cub2)
scene.add(group)

gsap.to(group.position, { duration: 1, delay: 0, x: 2 })
gsap.to(group.position, { duration: 1, delay: 1, x: 0 })

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
})

renderer.setSize(sizes.width, sizes.height)


const tick = () => {
  renderer.render(scene, camera)
  window.requestAnimationFrame(tick)
}
tick()
