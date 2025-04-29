import { usePlane } from '@react-three/cannon'
import * as THREE from 'three'

// Создаем геометрию для ячейки один раз
const cellGeometry = new THREE.BoxGeometry(3, 0.1, 3)
const cellMaterial = new THREE.MeshStandardMaterial({ color: '#2ecc71', transparent: true, opacity: 0.3 })

// Определяем позиции ячеек
const CELL_POSITIONS = [
  [-7, 0, 3.5], [-7, 0, 0], [-7, 0, -3.5], // Левая сторона
  [7, 0, 3.5], [7, 0, 0], [7, 0, -3.5],    // Правая сторона
  [-3.5, 0, 7], [0, 0, 7], [3.5, 0, 7],    // Верхняя сторона
  [-3.5, 0, -7], [0, 0, -7], [3.5, 0, -7]  // Нижняя сторона
] as [number, number, number][]

export const GameBoard = () => {
  const [ref] = usePlane(() => ({
    rotation: [-Math.PI / 2, 0, 0],
    position: [0, -0.1, 0],
  }))

  return (
    <group>
      {/* Основное поле */}
      <mesh ref={ref}>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial color="#8395a7" />
      </mesh>

      {/* Ячейки по углам */}
      <mesh position={[-7, 0, 7]}>
        <boxGeometry args={[3, 0.1, 3]} />
        <meshStandardMaterial color="#3498db" />
      </mesh>
      <mesh position={[7, 0, 7]}>
        <boxGeometry args={[3, 0.1, 3]} />
        <meshStandardMaterial color="#3498db" />
      </mesh>
      <mesh position={[7, 0, -7]}>
        <boxGeometry args={[3, 0.1, 3]} />
        <meshStandardMaterial color="#3498db" />
      </mesh>
      <mesh position={[-7, 0, -7]}>
        <boxGeometry args={[3, 0.1, 3]} />
        <meshStandardMaterial color="#3498db" />
      </mesh>

      {/* Ячейки по сторонам */}
      {CELL_POSITIONS.map((position, index) => (
        <mesh
          key={index}
          position={position}
          geometry={cellGeometry}
          material={cellMaterial}
        />
      ))}
    </group>
  )
} 