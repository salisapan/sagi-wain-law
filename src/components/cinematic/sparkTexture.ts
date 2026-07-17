import * as THREE from 'three'

export function createSparkTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas')
  canvas.width = 16
  canvas.height = 16
  const ctx = canvas.getContext('2d')!
  const gradient = ctx.createRadialGradient(8, 8, 0, 8, 8, 8)
  gradient.addColorStop(0, 'rgba(255, 255, 255, 1)')
  gradient.addColorStop(0.25, 'rgba(255, 255, 255, 0.85)')
  gradient.addColorStop(0.6, 'rgba(255, 255, 255, 0.3)')
  gradient.addColorStop(1, 'rgba(0, 0, 0, 0)')
  ctx.fillStyle = gradient
  ctx.fillRect(0, 0, 16, 16)
  return new THREE.CanvasTexture(canvas)
}
