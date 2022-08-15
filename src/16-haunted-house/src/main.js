import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

/* eslint-disable */

// constants
const canvas = document.querySelector('canvas.webgl')
const scene = new THREE.Scene()
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
}

// ======================= Textures =====================
const createTextures = () => {
  const textureLoader = new THREE.TextureLoader()

  const textures = {
    doorColorTexture           : textureLoader.load('./static/textures/door/color.jpg'),
    doorAlphaTexture           : textureLoader.load('./static/textures/door/alpha.jpg'),
    doorAmbientOcclusionTexture: textureLoader.load('./static/textures/door/ambientOcclusion.jpg'),
    doorHeightTexture          : textureLoader.load('./static/textures/door/height.jpg'),
    doorNormalTexture          : textureLoader.load('./static/textures/door/normal.jpg'),
    doorMetalnessTexture       : textureLoader.load('./static/textures/door/metalness.jpg'),
    doorRoughnessTexture       : textureLoader.load('./static/textures/door/roughness.jpg'),

    bricksColorTexture           : textureLoader.load('./static/textures/bricks/color.jpg'),
    bricksAmbientOcclusionTexture: textureLoader.load('./static/textures/bricks/ambientOcclusion.jpg'),
    bricksNormalTexture          : textureLoader.load('./static/textures/bricks/normal.jpg'),
    bricksRoughnessTexture       : textureLoader.load('./static/textures/bricks/roughness.jpg'),

    grassColorTexture           : textureLoader.load('./static/textures/grass/color.jpg'),
    grassAmbientOcclusionTexture: textureLoader.load('./static/textures/grass/ambientOcclusion.jpg'),
    grassNormalTexture          : textureLoader.load('./static/textures/grass/normal.jpg'),
    grassRoughnessTexture       : textureLoader.load('./static/textures/grass/roughness.jpg'),
  }

  textures.grassColorTexture.repeat.set(8, 8)
  textures.grassAmbientOcclusionTexture.repeat.set(8, 8)
  textures.grassNormalTexture.repeat.set(8, 8)
  textures.grassRoughnessTexture.repeat.set(8, 8)

  textures.grassColorTexture.wrapS = THREE.RepeatWrapping
  textures.grassAmbientOcclusionTexture.wrapS = THREE.RepeatWrapping
  textures.grassNormalTexture.wrapS = THREE.RepeatWrapping
  textures.grassRoughnessTexture.wrapS = THREE.RepeatWrapping

  textures.grassColorTexture.wrapT = THREE.RepeatWrapping
  textures.grassAmbientOcclusionTexture.wrapT = THREE.RepeatWrapping
  textures.grassNormalTexture.wrapT = THREE.RepeatWrapping
  textures.grassRoughnessTexture.wrapT = THREE.RepeatWrapping

  return textures
}
const textures = createTextures()


// ======================= OBJECTS ======================
// ======================= House
const createHouseContainer = () => {
  //  container
  const house = new THREE.Group()
  scene.add(house)

  return house
}
const house = createHouseContainer()


// ======================= Walls
// const walls = new THREE.Mesh(
//   new THREE.BoxBufferGeometry(4, 2.5, 4),
//   new THREE.MeshStandardMaterial({
//     map: bricksColorTexture,
//     aoMap: bricksAmbientOcclusionTexture,
//     normalMap: bricksNormalTexture,
//     roughnessMap: bricksRoughnessTexture
//   })
// )
// walls.castShadow = true
// walls.geometry.setAttribute('uv2', new THREE.Float32BufferAttribute(walls.geometry.attributes.uv.array, 2))
// walls.position.y = 1.25
// house.add(walls)
//
// // ======================= Roof
// const roof = new THREE.Mesh(
//   new THREE.ConeBufferGeometry(3.5, 1, 4),
//   new THREE.MeshStandardMaterial({ color: '#b35f45' })
// )
// roof.rotation.y = Math.PI * 0.25
// roof.position.y = 2.5 + 0.5
// house.add(roof)
//

// ======================= Door
const createDoor = () => {
  const door = new THREE.Mesh(
    new THREE.PlaneBufferGeometry(2, 2, 100, 100),
    new THREE.MeshStandardMaterial({
      map: textures.doorColorTexture,
      transparent: true,
      alphaMap: textures.doorAlphaTexture,
      aoMap: textures.doorAmbientOcclusionTexture,
      displacementMap: textures.doorHeightTexture,
      displacementScale: 0.1,
      normalMap: textures.doorNormalTexture,
      metalnessMap: textures.doorMetalnessTexture,
      roughnessMap: textures.doorRoughnessTexture
    })
  )
  door.geometry.setAttribute('uv2', new THREE.Float32BufferAttribute(door.geometry.attributes.uv.array, 2))
  door.position.y = 1
  door.position.z = 2 + 0.01
  house.add(door)
}
createDoor()


//
// // ======================= Bushes
// const bushGeometry = new THREE.SphereBufferGeometry(1, 16, 16)
// const bushMaterial = new THREE.MeshStandardMaterial({ color: '#89c854' })
//
// const bush1 = new THREE.Mesh(bushGeometry, bushMaterial)
// bush1.castShadow = true
// bush1.scale.set(0.5, 0.5, 0.5)
// bush1.position.set(0.8, 0.2, 2.2)
//
// const bush2 = new THREE.Mesh(bushGeometry, bushMaterial)
// bush2.castShadow = true
// bush2.scale.set(0.25, 0.25, 0.25)
// bush2.position.set(1.4, 0.1, 2.1)
//
// const bush3 = new THREE.Mesh(bushGeometry, bushMaterial)
// bush3.castShadow = true
// bush3.scale.set(0.4, 0.4, 0.4)
// bush3.position.set(- 0.8, 0.1, 2.2)
//
// const bush4 = new THREE.Mesh(bushGeometry, bushMaterial)
// bush4.castShadow = true
// bush4.scale.set(0.15, 0.15, 0.15)
// bush4.position.set(- 1, 0.05, 2.6)
//
// house.add(bush1, bush2, bush3, bush4)
//
// // ======================= Graves
// const graves = new THREE.Group()
// scene.add(graves)
//
// const graveGeometry = new THREE.BoxBufferGeometry(0.6, 0.8, 0.1)
// const graveMaterial = new THREE.MeshStandardMaterial({ color: '#727272' })
//
// for (let i = 0; i < 50; i++) {
//   const angle  = Math.random() * Math.PI * 2 // Random angle
//   const radius = 3 + Math.random() * 6       // Random radius
//   const x = Math.cos(angle) * radius // Get the x position using cos
//   const z = Math.sin(angle) * radius // Get the z position using sin
//
//   // Create the mesh
//   const grave = new THREE.Mesh(graveGeometry, graveMaterial)
//   grave.castShadow = true
//
//   // Position
//   grave.position.set(x, 0.3, z)
//   // Rotation
//   grave.rotation.z = (Math.random() - 0.5) * 0.4
//   grave.rotation.y = (Math.random() - 0.5) * 0.4
//   // Add to the graves container
//   graves.add(grave)
// }


// ======================= Floor
const createFloor = () => {
  const floor = new THREE.Mesh(
    new THREE.PlaneBufferGeometry(20, 20),
    new THREE.MeshStandardMaterial({
      map: textures.grassColorTexture,
      aoMap: textures.grassAmbientOcclusionTexture,
      normalMap: textures.grassNormalTexture,
      roughnessMap: textures.grassRoughnessTexture
    })
  )
  floor.receiveShadow = true
  floor.geometry.setAttribute('uv2', new THREE.Float32BufferAttribute(floor.geometry.attributes.uv.array, 2))
  floor.rotation.x = - Math.PI * 0.5
  floor.position.y = 0
  scene.add(floor)
}
createFloor()


// ======================= Lights =======================
const createLights = () => {
  // Ambient light
  const ambientLight = new THREE.AmbientLight('#b9d5ff', 0.3)
  scene.add(ambientLight)

  // Directional light
  // const moonLight = new THREE.DirectionalLight('#b9d5ff', 0.12)
  // moonLight.castShadow = true
  // moonLight.shadow.mapSize.width = 256
  // moonLight.shadow.mapSize.height = 256
  // moonLight.shadow.camera.far = 15
  // moonLight.position.set(4, 5, - 2)
  // scene.add(moonLight)

  // Door light
  const doorLight = new THREE.PointLight('#ff7d46', 1, 7)
  doorLight.castShadow = true
  doorLight.shadow.mapSize.width = 256
  doorLight.shadow.mapSize.height = 256
  doorLight.shadow.camera.far = 7

  doorLight.position.set(0, 2.2, 2.7)
  house.add(doorLight)
}
createLights()

// Ghosts
// const ghost1 = new THREE.PointLight('#ff00ff', 3, 3)
// ghost1.castShadow = true
// ghost1.shadow.mapSize.width = 256
// ghost1.shadow.mapSize.height = 256
// ghost1.shadow.camera.far = 7
// scene.add(ghost1)
//
// const ghost2 = new THREE.PointLight('#00ffff', 3, 3)
// ghost2.castShadow = true
// ghost2.shadow.mapSize.width = 256
// ghost2.shadow.mapSize.height = 256
// ghost2.shadow.camera.far = 7
// scene.add(ghost2)
//
// const ghost3 = new THREE.PointLight('#ff7800', 3, 3)
// ghost3.castShadow = true
// ghost3.shadow.mapSize.width = 256
// ghost3.shadow.mapSize.height = 256
// ghost3.shadow.camera.far = 7
// scene.add(ghost3)

// ======================================================
// ======================= Fog ==========================
// ======================================================
// const fog = new THREE.Fog('#262837', 1, 15)
// scene.fog = fog


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


// ======================================================
// ======================= Controls =====================
// ======================================================
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

  // Ghosts
  // const ghost1Angle = elapsedTime * 0.5
  // ghost1.position.x = Math.cos(ghost1Angle) * 4
  // ghost1.position.z = Math.sin(ghost1Angle) * 4
  // ghost1.position.y = Math.sin(elapsedTime * 3)
  //
  // const ghost2Angle = -elapsedTime * 0.32
  // ghost2.position.x = Math.cos(ghost2Angle) * 5
  // ghost2.position.z = Math.sin(ghost2Angle) * 5
  // ghost2.position.y = Math.sin(elapsedTime * 4) + Math.sin(elapsedTime * 2.5)
  //
  // const ghost3Angle = -elapsedTime * 0.18
  // ghost3.position.x = Math.cos(ghost3Angle) * (7 + Math.sin(elapsedTime * 0.32))
  // ghost3.position.z = Math.sin(ghost3Angle) * (7 + Math.sin(elapsedTime * 0.5))
  // ghost3.position.y = Math.sin(elapsedTime * 4) + Math.sin(elapsedTime * 2.5)

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
