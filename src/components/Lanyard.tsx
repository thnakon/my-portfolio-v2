"use client"

import * as THREE from 'three'
import { useEffect, useRef, useState } from 'react'
import { Canvas, extend, useFrame } from '@react-three/fiber'
import { useGLTF, useTexture, Environment, Lightformer } from '@react-three/drei'
import { BallCollider, CuboidCollider, Physics, RigidBody, useRopeJoint, useSphericalJoint, RapierRigidBody } from '@react-three/rapier'
import { MeshLineGeometry, MeshLineMaterial } from 'meshline'
import { ThreeElement } from '@react-three/fiber'

// @ts-ignore
extend({ MeshLineGeometry, MeshLineMaterial })

// Declare custom elements for JSX
declare global {
  namespace JSX {
    interface IntrinsicElements {
      meshLineGeometry: ThreeElement<typeof MeshLineGeometry>
      meshLineMaterial: ThreeElement<typeof MeshLineMaterial>
    }
  }
}

interface LanyardProps {
  position?: [number, number, number]
  gravity?: [number, number, number]
  fov?: number
  transparent?: boolean
}

export default function Lanyard({ position = [0, 0, 13], gravity = [0, -40, 0], fov = 20, transparent = true }: LanyardProps) {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    setIsMobile(window.innerWidth < 768)
    const handleResize = () => setIsMobile(window.innerWidth < 768)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <div className="w-full h-full relative z-0 min-h-[200px]">
      <Canvas
        camera={{ position: position, fov: fov }}
        dpr={[1, isMobile ? 1.5 : 2]}
        gl={{ alpha: transparent }}
        onCreated={({ gl }) => {
          gl.setClearColor(new THREE.Color(0x000000), transparent ? 0 : 1)
        }}
        className="w-full h-full"
      >
        <ambientLight intensity={Math.PI} />
        <Physics gravity={gravity} timeStep={isMobile ? 1 / 30 : 1 / 60}>
          <Band isMobile={isMobile} />
        </Physics>
        <Environment blur={0.75}>
          <Lightformer intensity={2} color="white" position={[0, -1, 5]} rotation={[0, 0, Math.PI / 3]} scale={[100, 0.1, 1]} />
          <Lightformer intensity={3} color="white" position={[-1, -1, 1]} rotation={[0, 0, Math.PI / 3]} scale={[100, 0.1, 1]} />
          <Lightformer intensity={3} color="white" position={[1, 1, 1]} rotation={[0, 0, Math.PI / 3]} scale={[100, 0.1, 1]} />
          <Lightformer intensity={10} color="white" position={[-10, 0, 14]} rotation={[0, Math.PI / 2, Math.PI / 3]} scale={[100, 10, 1]} />
        </Environment>
      </Canvas>
    </div>
  )
}

function Band({ maxSpeed = 50, minSpeed = 0, isMobile = false }) {
  const band = useRef<any>(null)
  const fixed = useRef<RapierRigidBody>(null)
  const j1 = useRef<RapierRigidBody & { lerped?: THREE.Vector3 }>(null)
  const j2 = useRef<RapierRigidBody & { lerped?: THREE.Vector3 }>(null)
  const j3 = useRef<RapierRigidBody>(null)
  const card = useRef<RapierRigidBody>(null)
  
  const vec = new THREE.Vector3()
  const ang = new THREE.Vector3()
  const rot = new THREE.Vector3()
  const dir = new THREE.Vector3()

  const { nodes, materials } = useGLTF('/assets/lanyard/card.glb') as any
  const texture = useTexture('/assets/lanyard/lanyard.png')
  const profileTexture = useTexture('/projects/warm.png') // User's profile image

  const [curve] = useState(
    () => new THREE.CatmullRomCurve3([new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3()])
  )
  const [dragged, drag] = useState<THREE.Vector3 | false>(false)
  const [hovered, hover] = useState(false)

  // @ts-ignore
  useRopeJoint(fixed, j1, [[0, 0, 0], [0, 0, 0], 1])
  // @ts-ignore
  useRopeJoint(j1, j2, [[0, 0, 0], [0, 0, 0], 1])
  // @ts-ignore
  useRopeJoint(j2, j3, [[0, 0, 0], [0, 0, 0], 1])
  // @ts-ignore
  useSphericalJoint(j3, card, [[0, 0, 0], [0, 1.5, 0]])

  useEffect(() => {
    if (hovered) {
      document.body.style.cursor = dragged ? 'grabbing' : 'grab'
      return () => { document.body.style.cursor = 'auto' }
    }
  }, [hovered, dragged])

  useFrame((state, delta) => {
    if (dragged && card.current) {
      vec.set(state.pointer.x, state.pointer.y, 0.5).unproject(state.camera)
      dir.copy(vec).sub(state.camera.position).normalize()
      vec.add(dir.multiplyScalar(state.camera.position.length()))
      ;[card, j1, j2, j3, fixed].forEach((ref) => ref.current?.wakeUp())
      card.current.setNextKinematicTranslation({ 
        x: vec.x - dragged.x, 
        y: vec.y - dragged.y, 
        z: vec.z - dragged.z 
      })
    }

    if (fixed.current && j1.current && j2.current && j3.current && card.current && band.current) {
      ;[j1, j2].forEach((ref) => {
        if (ref.current) {
          if (!ref.current.lerped) ref.current.lerped = new THREE.Vector3().copy(ref.current.translation() as THREE.Vector3)
          const clampedDistance = Math.max(0.1, Math.min(1, ref.current.lerped.distanceTo(ref.current.translation() as THREE.Vector3)))
          ref.current.lerped.lerp(
            ref.current.translation() as THREE.Vector3,
            delta * (minSpeed + clampedDistance * (maxSpeed - minSpeed))
          )
        }
      })
      
      curve.points[0].copy(j3.current.translation() as THREE.Vector3)
      curve.points[1].copy(j2.current.lerped!)
      curve.points[2].copy(j1.current.lerped!)
      curve.points[3].copy(fixed.current.translation() as THREE.Vector3)
      
      band.current.geometry.setPoints(curve.getPoints(isMobile ? 16 : 32))
      
      ang.copy(card.current.angvel() as THREE.Vector3)
      const rotation = card.current.rotation() as any
      card.current.setAngvel({ x: ang.x, y: ang.y - rotation.y * 0.25, z: ang.z }, true)
    }
  })

  curve.curveType = 'chordal'
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping

  const [processedTexture, setProcessedTexture] = useState<THREE.Texture | null>(null)

  // Pre-process the profile image: create a clean framed card
  // IMPORTANT: The GLTF card UV maps ONLY the LEFT HALF (0-256px) to the front face.
  useEffect(() => {
    const img = new Image()
    img.crossOrigin = 'anonymous'
    img.onload = () => {
      const canvas = document.createElement('canvas')
      canvas.width = 512
      canvas.height = 680
      const ctx = canvas.getContext('2d')!

      const W = 256  // usable width (left half only)
      const H = 680

      // --- White Card Background ---
      const r = 12
      ctx.fillStyle = '#ffffff'
      ctx.beginPath()
      ctx.moveTo(r, 0)
      ctx.lineTo(W - r, 0)
      ctx.quadraticCurveTo(W, 0, W, r)
      ctx.lineTo(W, H - r)
      ctx.quadraticCurveTo(W, H, W - r, H)
      ctx.lineTo(r, H)
      ctx.quadraticCurveTo(0, H, 0, H - r)
      ctx.lineTo(0, r)
      ctx.quadraticCurveTo(0, 0, r, 0)
      ctx.closePath()
      ctx.fill()

      // --- Centered Photo (equal padding all sides) ---
      const pad = 14
      const photoX = pad
      const photoY = pad
      const photoW = W - pad * 2
      const photoH = H - pad * 2
      const pr = 10

      // Clip to rounded rect
      ctx.save()
      ctx.beginPath()
      ctx.moveTo(photoX + pr, photoY)
      ctx.lineTo(photoX + photoW - pr, photoY)
      ctx.quadraticCurveTo(photoX + photoW, photoY, photoX + photoW, photoY + pr)
      ctx.lineTo(photoX + photoW, photoY + photoH - pr)
      ctx.quadraticCurveTo(photoX + photoW, photoY + photoH, photoX + photoW - pr, photoY + photoH)
      ctx.lineTo(photoX + pr, photoY + photoH)
      ctx.quadraticCurveTo(photoX, photoY + photoH, photoX, photoY + photoH - pr)
      ctx.lineTo(photoX, photoY + pr)
      ctx.quadraticCurveTo(photoX, photoY, photoX + pr, photoY)
      ctx.closePath()
      ctx.clip()

      // Draw profile image - cover the photo area, centered on face
      const imgAspect = img.width / img.height
      const photoAspect = photoW / photoH
      let srcX = 0, srcY = 0, srcW = img.width, srcH = img.height

      if (imgAspect > photoAspect) {
        // Image wider than card: crop sides
        srcW = img.height * photoAspect
        srcX = (img.width - srcW) / 2
      } else {
        // Image taller than card: crop top/bottom, bias toward face (upper area)
        srcH = img.width / photoAspect
        srcY = (img.height - srcH) * 0.3  // bias upward to center face
      }

      ctx.drawImage(img, srcX, srcY, srcW, srcH, photoX, photoY, photoW, photoH)
      ctx.restore()

      // --- Subtle Photo Border ---
      ctx.strokeStyle = 'rgba(0,0,0,0.08)'
      ctx.lineWidth = 1.5
      ctx.beginPath()
      ctx.moveTo(photoX + pr, photoY)
      ctx.lineTo(photoX + photoW - pr, photoY)
      ctx.quadraticCurveTo(photoX + photoW, photoY, photoX + photoW, photoY + pr)
      ctx.lineTo(photoX + photoW, photoY + photoH - pr)
      ctx.quadraticCurveTo(photoX + photoW, photoY + photoH, photoX + photoW - pr, photoY + photoH)
      ctx.lineTo(photoX + pr, photoY + photoH)
      ctx.quadraticCurveTo(photoX, photoY + photoH, photoX, photoY + photoH - pr)
      ctx.lineTo(photoX, photoY + pr)
      ctx.quadraticCurveTo(photoX, photoY, photoX + pr, photoY)
      ctx.closePath()
      ctx.stroke()

      const tex = new THREE.CanvasTexture(canvas)
      tex.flipY = false
      tex.needsUpdate = true
      setProcessedTexture(tex)
    }
    img.src = '/projects/warm.png'
  }, [])

  return (
    <>
      {/* Fixed anchor point — position [0, 4, 0] pushes the pin to the 
          top of the visible area. We lower it so the strap starts from 
          the card border edge. */}
      <group position={[0, 4, 0]}>
        <RigidBody ref={fixed} type="fixed" />
        <RigidBody position={[0.5, 0, 0]} ref={j1} type="dynamic" angularDamping={4} linearDamping={4}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[1, 0, 0]} ref={j2} type="dynamic" angularDamping={4} linearDamping={4}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[1.5, 0, 0]} ref={j3} type="dynamic" angularDamping={4} linearDamping={4}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody 
          position={[2, 0, 0]} 
          ref={card} 
          type={dragged ? 'kinematicPosition' : 'dynamic'} 
          angularDamping={4} 
          linearDamping={4}
        >
          <CuboidCollider args={[0.8, 1.125, 0.01]} />
          <group
            scale={2.25}
            position={[0, -1.2, -0.05]}
            onPointerOver={() => hover(true)}
            onPointerOut={() => hover(false)}
            onPointerUp={(e: any) => {
              if (e.target.releasePointerCapture) {
                e.target.releasePointerCapture(e.pointerId)
              }
              drag(false)
            }}
            onPointerDown={(e: any) => {
              if (e.target.setPointerCapture) {
                e.target.setPointerCapture(e.pointerId)
              }
              drag(new THREE.Vector3().copy(e.point).sub(vec.copy(card.current?.translation() as THREE.Vector3)))
            }}
          >
            <mesh geometry={nodes.card.geometry}>
              <meshPhysicalMaterial
                map={processedTexture || profileTexture}
                map-anisotropy={16}
                clearcoat={isMobile ? 0 : 1}
                clearcoatRoughness={0.15}
                roughness={0.9}
                metalness={0.8}
              />
            </mesh>
            <mesh geometry={nodes.clip.geometry} material={materials.metal} material-roughness={0.3} />
            <mesh geometry={nodes.clamp.geometry} material={materials.metal} />
          </group>
        </RigidBody>
      </group>
      <mesh ref={band}>
        {/* @ts-ignore */}
        <meshLineGeometry attach="geometry" />
        {/* @ts-ignore */}
        <meshLineMaterial
          attach="material"
          color="white"
          depthTest={false}
          resolution={isMobile ? [1000, 2000] : [1000, 1000]}
          useMap
          map={texture}
          repeat={[-4, 1]}
          lineWidth={1}
        />
      </mesh>
    </>
  )
}

useGLTF.preload('/assets/lanyard/card.glb')
