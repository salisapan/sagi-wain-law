import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

import { createSparkTexture } from './sparkTexture'
import { liquidMetalVertexShader } from './shaders/liquidMetal.vert'
import { liquidMetalFragmentShader } from './shaders/liquidMetal.frag'
import { getHomeScrollProgress } from '@/lib/cinematicScroll'

const ASSET_BASE_URL = 'https://api.getlayers.ai/storage/v1/object/public/public/assets/laocoon-59f84455c6'
const GLB_URL = `${ASSET_BASE_URL}/bronze_horse.glb`

const SPARK_COUNT_FULL = 450
const SPARK_COUNT_LOW = 180

interface SparkDatum {
  speedX: number
  speedY: number
  speedZ: number
  swaySpeed: number
  swayRadius: number
  phase: number
}

export function CinematicScene() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const location = useLocation()
  const isHomeRef = useRef(location.pathname === '/')

  useEffect(() => {
    isHomeRef.current = location.pathname === '/'
  }, [location.pathname])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const isLowPower = window.innerWidth < 768 || (navigator.hardwareConcurrency ?? 8) <= 4
    const sparkCount = isLowPower ? SPARK_COUNT_LOW : SPARK_COUNT_FULL

    const sizes = { width: window.innerWidth, height: window.innerHeight }

    const scene = new THREE.Scene()
    scene.background = new THREE.Color('#000000')
    scene.fog = new THREE.FogExp2('#000000', 0.01)

    const camera = new THREE.PerspectiveCamera(50, sizes.width / sizes.height, 0.1, 100)
    camera.position.set(0, 0.2, 3.0)
    scene.add(camera)

    const shaderUniforms = {
      uTime: { value: 0 },
      uResolution: { value: new THREE.Vector2(sizes.width, sizes.height) },
      uMouse: { value: new THREE.Vector2(0, 0) },
      uScroll: { value: 0 },
    }

    const bgMaterial = new THREE.ShaderMaterial({
      vertexShader: liquidMetalVertexShader,
      fragmentShader: liquidMetalFragmentShader,
      uniforms: shaderUniforms,
      depthWrite: false,
      depthTest: false,
    })
    const bgGeometry = new THREE.PlaneGeometry(30, 30)
    const bgMesh = new THREE.Mesh(bgGeometry, bgMaterial)
    bgMesh.position.set(0.0, 0.0, -8.0)
    bgMesh.renderOrder = -10
    camera.add(bgMesh)

    let renderer: THREE.WebGLRenderer
    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: true,
        alpha: false,
        powerPreference: 'high-performance',
      })
    } catch {
      return
    }
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isLowPower ? 1.5 : 2))
    renderer.shadowMap.enabled = !isLowPower
    renderer.shadowMap.type = THREE.PCFSoftShadowMap
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 2.2

    const ambientLight = new THREE.AmbientLight('#ffffff', 0.1)
    scene.add(ambientLight)

    const keyLight = new THREE.SpotLight('#ffffff', 18.0)
    keyLight.position.set(4, 6, 3)
    keyLight.angle = Math.PI / 4
    keyLight.penumbra = 0.9
    keyLight.castShadow = !isLowPower
    keyLight.shadow.mapSize.width = isLowPower ? 1024 : 2048
    keyLight.shadow.mapSize.height = isLowPower ? 1024 : 2048
    keyLight.shadow.camera.near = 1.0
    keyLight.shadow.camera.far = 15
    keyLight.shadow.bias = -0.001
    scene.add(keyLight)

    const rimLight = new THREE.DirectionalLight('#e3f2ff', 10.0)
    rimLight.position.set(-5, 3, -4)
    scene.add(rimLight)

    const fillLight = new THREE.DirectionalLight('#fff3e6', 0.8)
    fillLight.position.set(-2, -4, 2)
    scene.add(fillLight)

    // Spark particles
    const sparkGeometry = new THREE.BufferGeometry()
    const positions = new Float32Array(sparkCount * 3)
    const colors = new Float32Array(sparkCount * 3)
    const sparkData: SparkDatum[] = []

    for (let i = 0; i < sparkCount; i++) {
      const x = (Math.random() - 0.5) * 6.5
      const y = (Math.random() - 0.5) * 5.0 - 0.5
      const z = (Math.random() - 0.5) * 6.5
      positions[i * 3] = x
      positions[i * 3 + 1] = y
      positions[i * 3 + 2] = z

      if (Math.random() < 0.6) {
        colors[i * 3] = 1.0
        colors[i * 3 + 1] = 0.4 + Math.random() * 0.15
        colors[i * 3 + 2] = 0.05 + Math.random() * 0.1
      } else {
        colors[i * 3] = 0.55 + Math.random() * 0.15
        colors[i * 3 + 1] = 0.82 + Math.random() * 0.12
        colors[i * 3 + 2] = 1.0
      }

      sparkData.push({
        speedX: (Math.random() - 0.5) * 0.4,
        speedY: 0.15 + Math.random() * 0.3,
        speedZ: (Math.random() - 0.5) * 0.4,
        swaySpeed: 0.5 + Math.random() * 1.5,
        swayRadius: 0.05 + Math.random() * 0.15,
        phase: Math.random() * Math.PI * 2,
      })
    }

    sparkGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    sparkGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))

    const sparkMaterial = new THREE.PointsMaterial({
      size: 0.025,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      map: createSparkTexture(),
    })

    const sparkParticles = new THREE.Points(sparkGeometry, sparkMaterial)
    scene.add(sparkParticles)

    // Model
    let modelPivot: THREE.Group | null = null
    let mixer: THREE.AnimationMixer | null = null
    const loader = new GLTFLoader()
    loader.load(
      GLB_URL,
      (gltf) => {
        const gltfModel = gltf.scene
        modelPivot = new THREE.Group()
        scene.add(modelPivot)
        modelPivot.add(gltfModel)

        gltfModel.traverse((child) => {
          if ((child as THREE.Mesh).isMesh) {
            const mesh = child as THREE.Mesh
            mesh.castShadow = true
            mesh.receiveShadow = true
            const material = mesh.material as THREE.MeshStandardMaterial
            if (material) {
              material.roughness = 0.42
              material.metalness = 0.92
              material.flatShading = false
              if (material.map) {
                material.map.anisotropy = 16
              }
            }
          }
        })

        if (gltf.animations && gltf.animations.length > 0) {
          mixer = new THREE.AnimationMixer(gltfModel)
          gltf.animations.forEach((clip) => {
            mixer!.clipAction(clip).play()
          })
        }

        const boxInitial = new THREE.Box3().setFromObject(gltfModel)
        const sizeInitial = boxInitial.getSize(new THREE.Vector3())
        const maxDim = Math.max(sizeInitial.x, sizeInitial.y, sizeInitial.z)
        const targetScale = 3.5 / (maxDim > 0.0001 ? maxDim : 1)
        gltfModel.scale.setScalar(targetScale)

        gltfModel.updateMatrixWorld(true)

        const boxScaled = new THREE.Box3().setFromObject(gltfModel)
        const centerScaled = boxScaled.getCenter(new THREE.Vector3())
        gltfModel.position.sub(centerScaled)

        modelPivot.position.y = -0.4
      },
      undefined,
      (error) => {
        console.error('Error loading bronze horse model:', error)
      },
    )

    // Mutable animation state (not React state)
    let currentScroll = 0
    let mouseX = 0
    let mouseY = 0
    let targetMouseX = 0
    let targetMouseY = 0
    let idleAngle = 0
    const clock = new THREE.Clock()
    let rafId = 0

    function handleMouseMove(event: MouseEvent) {
      targetMouseX = (event.clientX / window.innerWidth) * 2 - 1
      targetMouseY = (event.clientY / window.innerHeight) * 2 - 1
    }
    window.addEventListener('mousemove', handleMouseMove)

    function handleResize() {
      sizes.width = window.innerWidth
      sizes.height = window.innerHeight
      camera.aspect = sizes.width / sizes.height
      camera.updateProjectionMatrix()
      renderer.setSize(sizes.width, sizes.height)
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, isLowPower ? 1.5 : 2))
      shaderUniforms.uResolution.value.set(sizes.width, sizes.height)
    }
    window.addEventListener('resize', handleResize)

    function animate() {
      rafId = requestAnimationFrame(animate)
      const deltaTime = clock.getDelta()
      if (mixer) mixer.update(deltaTime)

      const targetScroll = isHomeRef.current ? getHomeScrollProgress() : 0
      currentScroll += (targetScroll - currentScroll) * 0.025

      mouseX += (targetMouseX - mouseX) * 0.05
      mouseY += (targetMouseY - mouseY) * 0.05

      if (modelPivot) {
        modelPivot.rotation.y = mouseX * 0.25
        modelPivot.rotation.x = mouseY * 0.15
      }

      if (!prefersReducedMotion) {
        idleAngle += deltaTime * 0.06
      }

      const scrollVelocity = Math.abs(targetScroll - currentScroll)
      const speedMultiplier = isHomeRef.current ? 1.0 + scrollVelocity * 9.0 : 1.0
      const turbulence = isHomeRef.current ? scrollVelocity * 0.8 : 0

      const posAttr = sparkGeometry.attributes.position.array as Float32Array
      const time = clock.getElapsedTime()
      for (let i = 0; i < sparkCount; i++) {
        const idx = i * 3
        const data = sparkData[i]
        posAttr[idx] += data.speedX * deltaTime * speedMultiplier
        posAttr[idx + 1] += data.speedY * deltaTime * speedMultiplier
        posAttr[idx + 2] += data.speedZ * deltaTime * speedMultiplier

        const currentSway = data.swayRadius * (1.0 + turbulence * 4.0)
        posAttr[idx] += Math.sin(time * data.swaySpeed + data.phase) * currentSway * deltaTime
        posAttr[idx + 2] += Math.cos(time * data.swaySpeed + data.phase) * currentSway * deltaTime

        if (posAttr[idx + 1] > 3.0 || Math.abs(posAttr[idx]) > 3.5 || Math.abs(posAttr[idx + 2]) > 3.5) {
          posAttr[idx + 1] = -2.5
          posAttr[idx] = (Math.random() - 0.5) * 3.0
          posAttr[idx + 2] = (Math.random() - 0.5) * 3.0
        }
      }
      sparkGeometry.attributes.position.needsUpdate = true

      let targetPos: THREE.Vector3
      let targetLookAt: THREE.Vector3

      if (isHomeRef.current) {
        const phi = currentScroll * Math.PI * 2.0
        const y = 0.35 + Math.sin(currentScroll * Math.PI) * 0.8
        const radius = 4.2 - Math.sin(currentScroll * Math.PI) * 0.6
        const x = radius * Math.sin(phi)
        const z = radius * Math.cos(phi)

        const transitionProgress = Math.min(1.0, currentScroll / 0.28)
        const easeFactor = (Math.cos(transitionProgress * Math.PI) + 1.0) * 0.5
        // RTL: text columns sit on the right, so the camera clears room on the
        // right by easing lookAt toward +x (mirror of the original LTR -0.9 offset).
        const lookAtXOffset = 0.9 * easeFactor

        targetPos = new THREE.Vector3(x, y, z)
        targetLookAt = new THREE.Vector3(lookAtXOffset, -0.15, 0)
      } else {
        const phi = idleAngle
        const y = 0.5
        const radius = 4.0
        const x = radius * Math.sin(phi)
        const z = radius * Math.cos(phi)
        targetPos = new THREE.Vector3(x, y, z)
        targetLookAt = new THREE.Vector3(0, -0.1, 0)
      }

      camera.position.lerp(targetPos, 0.025)
      camera.lookAt(targetLookAt)

      shaderUniforms.uTime.value = clock.getElapsedTime()
      shaderUniforms.uMouse.value.set(mouseX, -mouseY)
      shaderUniforms.uScroll.value = isHomeRef.current ? currentScroll : 0

      renderer.render(scene, camera)
    }
    animate()

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('resize', handleResize)

      sparkGeometry.dispose()
      sparkMaterial.map?.dispose()
      sparkMaterial.dispose()
      bgGeometry.dispose()
      bgMaterial.dispose()

      scene.traverse((obj) => {
        const mesh = obj as THREE.Mesh
        if (mesh.isMesh) {
          mesh.geometry?.dispose()
          const material = mesh.material
          if (Array.isArray(material)) {
            material.forEach((m) => m.dispose())
          } else {
            material?.dispose()
          }
        }
      })

      // Note: deliberately not calling renderer.forceContextLoss() here — under
      // React StrictMode's dev-mode double-invoke, forcing context loss on the
      // (reused) canvas ref leaves the second, real mount without a usable
      // WebGL context. dispose() alone releases GPU resources safely.
      renderer.dispose()
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="cinematic-scene pointer-events-none fixed inset-0 z-0 h-full w-full outline-none"
    />
  )
}
