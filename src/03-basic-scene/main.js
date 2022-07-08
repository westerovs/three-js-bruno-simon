const canvas = document.querySelector('#canvas')

const sizes = {
  w: 800,
  h: 600
}

// scene
const scene = new THREE.Scene()

// object
const cubGeometry = new THREE.BoxGeometry(1, 1, 1)
const cubeMaterial = new THREE.MeshBasicMaterial({ color: '#0800FF'})
const cubeMesh = new THREE.Mesh(cubGeometry, cubeMaterial)

// camera
const camera = new THREE.PerspectiveCamera(75, sizes.w / sizes.h)
camera.position.z = 3

scene.add(cubeMesh)
scene.add(camera)

// renderer
const renderer = new THREE.WebGLRenderer({ canvas })
renderer.setSize(sizes.w, sizes.h)
renderer.render(scene, camera)

















