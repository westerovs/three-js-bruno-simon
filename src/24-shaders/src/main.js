import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
// import testVertexShader from './shaders/vertex.glsl'
import testFragmentShader from './shaders/vertex.glsl'
//
/* eslint-disable */
// constants
const canvas = document.querySelector('canvas.webgl')
const scene = new THREE.Scene()
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
}

const geometry = new THREE.PlaneGeometry(5, 5, 32, 32)

const material = new THREE.RawShaderMaterial({
  vertexShader  : `
      uniform mat4 projectionMatrix;
      uniform mat4 viewMatrix;
      uniform mat4 modelMatrix;

      attribute vec3 position;

      void main() {
        gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(position, 1.0);
      }
    `,
  fragmentShader: `
      precision mediump float;

      void main() {
        gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
      }
  `
})

const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

// ======================= Textures =====================

const createCube = () => {
  const geometry = new THREE.BoxGeometry()
  const material = new THREE.MeshBasicMaterial({ color: 0xcc4400 })

  return  new THREE.Mesh(geometry, material)
}

const cube = createCube()
// scene.add(cube)

// ======================= Camera =======================
// Base camera
const createCamera = () => {
  const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
  camera.position.x = 4
  camera.position.y = 2
  camera.position.z = 5
  scene.add(camera)

  return camera
}
const camera = createCamera()


// ======================= Controls =====================
const createControls = () => {
  const controls = new OrbitControls(camera, canvas)
  controls.enableDamping = true

  return controls
}
const controls = createControls()


// ======================= Renderer =====================
const createRenderer = () => {
  const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
  })
  renderer.shadowMap.enabled = true
  renderer.shadowMap.type = THREE.PCFSoftShadowMap
  renderer.setClearColor('#262837')
  renderer.setSize(sizes.width, sizes.height)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

  return renderer
}
const renderer = createRenderer()


// ======================= Tick =========================
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

// ======================= resize =======================
const initSignals = () => {
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
}
initSignals()

const initGame = () => {
  tick()
}

initGame()
