import './styles/main.scss'
import * as THREE from 'three'
import sushi from './assets/sushi.jpg'

// Scene
const scene = new THREE.Scene()

// Camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)

// Textures
const textureLoader = new THREE.TextureLoader()

// Geometry
const geometry = new THREE.PlaneBufferGeometry(1, 1, 32, 32)

// Material
const material = new THREE.RawShaderMaterial({
    vertexShader: '',
    fragmentShader: ''
})

// Mesh
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

// Renderer
const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

// Animate
function animate() {
    requestAnimationFrame(animate)
    renderer.render(scene, camera)
}
animate()