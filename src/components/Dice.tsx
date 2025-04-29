import { useRef, useState, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import { useBox } from '@react-three/cannon'
import * as THREE from 'three'

interface DiceProps {
  position: [number, number, number]
  onSettled?: (value: number) => void
  rollTrigger: number
}

export const Dice = ({ position, onSettled, rollTrigger }: DiceProps) => {
  const [settled, setSettled] = useState(false)
  const velocityRef = useRef<[number, number, number]>([0, 0, 0])
  const angularVelocityRef = useRef<[number, number, number]>([0, 0, 0])
  const rotationRef = useRef<[number, number, number]>([0, 0, 0])
  const stableFrames = useRef(0)
  const hasNotifiedSettled = useRef(false)
  const lastRollTrigger = useRef(rollTrigger)
  
  const [ref, api] = useBox(() => ({
    mass: 1,
    position,
    rotation: [
      Math.random() * Math.PI,
      Math.random() * Math.PI,
      Math.random() * Math.PI
    ],
    linearDamping: 0.5,
    angularDamping: 0.5,
    type: 'Dynamic',
    allowSleep: false,
  }))

  useEffect(() => {
    const unsubVelocity = api.velocity.subscribe((v) => {
      velocityRef.current = v
    })
    const unsubAngularVelocity = api.angularVelocity.subscribe((v) => {
      angularVelocityRef.current = v
    })
    const unsubRotation = api.rotation.subscribe((r) => {
      rotationRef.current = r
    })

    return () => {
      unsubVelocity()
      unsubAngularVelocity()
      unsubRotation()
    }
  }, [api])

  useEffect(() => {
    if (rollTrigger === lastRollTrigger.current) {
      return
    }
    lastRollTrigger.current = rollTrigger

    const throwDice = () => {
      setSettled(false)
      stableFrames.current = 0
      hasNotifiedSettled.current = false

      // Увеличиваем силу броска
      const impulseX = (Math.random() - 0.5) * 12
      const impulseY = 7 + Math.random() * 5
      const impulseZ = (Math.random() - 0.5) * 12
      
      // Увеличиваем начальное вращение
      const angularX = (Math.random() - 0.5) * 15
      const angularY = (Math.random() - 0.5) * 15
      const angularZ = (Math.random() - 0.5) * 15

      api.position.set(...position)
      api.rotation.set(
        Math.random() * Math.PI * 2, // Полный оборот
        Math.random() * Math.PI * 2,
        Math.random() * Math.PI * 2
      )

      // Добавляем дополнительные импульсы во время полета
      const addExtraRotation = () => {
        if (!hasNotifiedSettled.current) {
          const extraAngularX = (Math.random() - 0.5) * 10
          const extraAngularY = (Math.random() - 0.5) * 10
          const extraAngularZ = (Math.random() - 0.5) * 10
          api.angularVelocity.set(extraAngularX, extraAngularY, extraAngularZ)
        }
      }

      setTimeout(() => {
        if (!hasNotifiedSettled.current) {
          api.velocity.set(impulseX, impulseY, impulseZ)
          api.angularVelocity.set(angularX, angularY, angularZ)
          
          // Добавляем случайные вращательные импульсы во время полета
          setTimeout(addExtraRotation, 100 + Math.random() * 200)
          setTimeout(addExtraRotation, 300 + Math.random() * 200)
        }
      }, 50)
    }

    throwDice()
  }, [api, position, rollTrigger])

  // Массив нормалей для определения, какая грань кубика направлена вверх
  const normals = [
    [0, 1, 0],   // Верх (1)
    [0, -1, 0],  // Низ (6)
    [0, 0, 1],   // Перед (2)
    [0, 0, -1],  // Зад (5)
    [1, 0, 0],   // Право (3)
    [-1, 0, 0],  // Лево (4)
  ]

  useFrame(() => {
    if (settled || hasNotifiedSettled.current) return

    const [vx, vy, vz] = velocityRef.current
    const [ax, ay, az] = angularVelocityRef.current

    // Проверяем, остановился ли кубик
    const isStable = 
      Math.abs(vx) < 0.01 &&
      Math.abs(vy) < 0.01 &&
      Math.abs(vz) < 0.01 &&
      Math.abs(ax) < 0.01 &&
      Math.abs(ay) < 0.01 &&
      Math.abs(az) < 0.01

    if (isStable) {
      stableFrames.current++
    } else {
      stableFrames.current = 0
    }

    // Ждем 30 стабильных кадров перед определением значения
    if (stableFrames.current >= 30 && !hasNotifiedSettled.current) {
      // Преобразуем ротацию в матрицу
      const matrix = new THREE.Matrix4()
      matrix.makeRotationFromEuler(new THREE.Euler(
        rotationRef.current[0],
        rotationRef.current[1],
        rotationRef.current[2]
      ))
      
      // Вектор "вверх" в мировых координатах
      const up = new THREE.Vector3(0, 1, 0)
      
      // Находим, какая грань наиболее близка к направлению "вверх"
      let maxDot = -1
      let value = 1
      normals.forEach((normal, index) => {
        const normalVector = new THREE.Vector3(...normal)
        normalVector.applyMatrix4(matrix)
        const dot = normalVector.dot(up)
        if (dot > maxDot) {
          maxDot = dot
          // Теперь значения соответствуют правильным граням
          value = [1, 6, 2, 5, 3, 4][index]
        }
      })

      setSettled(true)
      hasNotifiedSettled.current = true
      onSettled?.(value)
    }
  })

  return (
    <mesh ref={ref}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="#ffffff" />
      
      {/* 
        РАСПОЛОЖЕНИЕ ТОЧЕК НА КУБИКЕ:
        - position задает положение точки на грани [x, y, z]
        - rotation задает поворот точки
        - размер точки регулируется первым параметром в args={[0.1, 32]} для circleGeometry
        
        СООТВЕТСТВИЕ ЗНАЧЕНИЙ ГРАНЯМ:
        1 - верхняя грань (смотрит вверх) - одна точка
        2 - передняя грань (смотрит на вас) - две точки
        3 - правая грань (смотрит вправо) - три точки
        4 - левая грань (смотрит влево) - четыре точки
        5 - задняя грань (смотрит от вас) - пять точек
        6 - нижняя грань (смотрит вниз) - шесть точек

        Координаты точек:
        x: влево/вправо (-/+)
        y: вниз/вверх (-/+)
        z: назад/вперед (-/+)
        
        Для размещения точек на грани используйте:
        - ±0.501 для позиции (чтобы точки были чуть выше поверхности)
        - Расстояние между точками примерно 0.25
      */}
      <group>
        {/* Грань 6 (нижняя) - шесть точек */}
        <mesh position={[0.25, -0.501, 0.25]} rotation={[Math.PI / 2, 0, 0]}>
          <circleGeometry args={[0.1, 32]} />
          <meshBasicMaterial color="black" />
        </mesh>
        <mesh position={[-0.25, -0.501, 0.25]} rotation={[Math.PI / 2, 0, 0]}>
          <circleGeometry args={[0.1, 32]} />
          <meshBasicMaterial color="black" />
        </mesh>
        <mesh position={[0.25, -0.501, -0.25]} rotation={[Math.PI / 2, 0, 0]}>
          <circleGeometry args={[0.1, 32]} />
          <meshBasicMaterial color="black" />
        </mesh>
        <mesh position={[-0.25, -0.501, -0.25]} rotation={[Math.PI / 2, 0, 0]}>
          <circleGeometry args={[0.1, 32]} />
          <meshBasicMaterial color="black" />
        </mesh>
        <mesh position={[0, -0.501, -0.25]} rotation={[Math.PI / 2, 0, 0]}>
          <circleGeometry args={[0.1, 32]} />
          <meshBasicMaterial color="black" />
        </mesh>
        <mesh position={[0, -0.501, 0.25]} rotation={[Math.PI / 2, 0, 0]}>
          <circleGeometry args={[0.1, 32]} />
          <meshBasicMaterial color="black" />
        </mesh>

        {/* Грань 2 (передняя) - две точки по вертикали */}
        <mesh position={[0, -0.25, 0.501]}>
          <circleGeometry args={[0.1, 32]} />
          <meshBasicMaterial color="black" />
        </mesh>
        <mesh position={[0, 0.25, 0.501]}>
          <circleGeometry args={[0.1, 32]} />
          <meshBasicMaterial color="black" />
        </mesh>

        {/* Грань 3 (правая) - три точки по диагонали */}
        <mesh position={[0.501, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
          <circleGeometry args={[0.1, 32]} />
          <meshBasicMaterial color="black" />
        </mesh>
        <mesh position={[0.501, 0.25, 0]} rotation={[0, Math.PI / 2, 0]}>
          <circleGeometry args={[0.1, 32]} />
          <meshBasicMaterial color="black" />
        </mesh>
        <mesh position={[0.501, -0.25, 0]} rotation={[0, Math.PI / 2, 0]}>
          <circleGeometry args={[0.1, 32]} />
          <meshBasicMaterial color="black" />
        </mesh>

        {/* Грань 4 (левая) - четыре точки по углам */}
        <mesh position={[-0.501, 0.25, 0.25]} rotation={[0, -Math.PI / 2, 0]}>
          <circleGeometry args={[0.1, 32]} />
          <meshBasicMaterial color="black" />
        </mesh>
        <mesh position={[-0.501, 0.25, -0.25]} rotation={[0, -Math.PI / 2, 0]}>
          <circleGeometry args={[0.1, 32]} />
          <meshBasicMaterial color="black" />
        </mesh>
        <mesh position={[-0.501, -0.25, 0.25]} rotation={[0, -Math.PI / 2, 0]}>
          <circleGeometry args={[0.1, 32]} />
          <meshBasicMaterial color="black" />
        </mesh>
        <mesh position={[-0.501, -0.25, -0.25]} rotation={[0, -Math.PI / 2, 0]}>
          <circleGeometry args={[0.1, 32]} />
          <meshBasicMaterial color="black" />
        </mesh>

        {/* Грань 5 (задняя) - пять точек (4 по углам + 1 в центре) */}
        <mesh position={[0.2, 0.2, -0.501]} rotation={[0, Math.PI, 0]}>
          <circleGeometry args={[0.1, 32]} />
          <meshBasicMaterial color="black" />
        </mesh>
        <mesh position={[-0.2, 0.2, -0.501]} rotation={[0, Math.PI, 0]}>
          <circleGeometry args={[0.1, 32]} />
          <meshBasicMaterial color="black" />
        </mesh>
        <mesh position={[0.2, -0.2, -0.501]} rotation={[0, Math.PI, 0]}>
          <circleGeometry args={[0.1, 32]} />
          <meshBasicMaterial color="black" />
        </mesh>
        <mesh position={[-0.2, -0.2, -0.501]} rotation={[0, Math.PI, 0]}>
          <circleGeometry args={[0.1, 32]} />
          <meshBasicMaterial color="black" />
        </mesh>
        <mesh position={[0, 0, -0.501]} rotation={[0, Math.PI, 0]}>
          <circleGeometry args={[0.1, 32]} />
          <meshBasicMaterial color="black" />
        </mesh>

        {/* Грань 1 (верхняя) - одна точка в центре */}
        <mesh position={[0, 0.501, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <circleGeometry args={[0.1, 32]} />
          <meshBasicMaterial color="black" />
        </mesh>
      </group>
    </mesh>
  )
}