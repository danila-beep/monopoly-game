import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

interface PlayerProps {
  position: [number, number, number]
  targetPosition: [number, number, number]
}

export const Player = ({ position, targetPosition }: PlayerProps) => {
  const ref = useRef<THREE.Group>(null)
  const currentPosition = useRef(new THREE.Vector3(...position))
  const targetVec = new THREE.Vector3(...targetPosition)

  useFrame(() => {
    if (!ref.current) return

    // Плавное перемещение к целевой позиции
    currentPosition.current.lerp(targetVec, 0.1)
    ref.current.position.copy(currentPosition.current)
  })

  return (
    <group ref={ref} position={position}>
      {/* Тело */}
      <mesh position={[0, 0.5, 0]}>
        <capsuleGeometry args={[0.3, 0.5, 8, 16]} />
        <meshStandardMaterial color="#4287f5" />
      </mesh>
      {/* Голова */}
      <mesh position={[0, 1.15, 0]}>
        <sphereGeometry args={[0.25, 32, 32]} />
        <meshStandardMaterial color="#ffd3b6" />
      </mesh>
    </group>
  )
} 