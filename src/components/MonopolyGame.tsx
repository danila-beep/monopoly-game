import { useState, useCallback } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { Physics } from '@react-three/cannon'
import { GameBoard } from './GameBoard'
import { Dice } from './Dice'
import { Player } from './Player'

// Позиции ячеек на поле (упрощенная версия)
const BOARD_POSITIONS = [
  [-7, 0, 7],    // Старт
  [-7, 0, 3.5],  // Позиция 1
  [-7, 0, 0],    // Позиция 2
  [-7, 0, -3.5], // Позиция 3
  [-7, 0, -7],   // Позиция 4
  [-3.5, 0, -7], // Позиция 5
  [0, 0, -7],    // Позиция 6
  [3.5, 0, -7],  // Позиция 7
  [7, 0, -7],    // Позиция 8
  [7, 0, -3.5],  // Позиция 9
  [7, 0, 0],     // Позиция 10
  [7, 0, 3.5],   // Позиция 11
  [7, 0, 7],     // Позиция 12
  [3.5, 0, 7],   // Позиция 13
  [0, 0, 7],     // Позиция 14
  [-3.5, 0, 7],  // Позиция 15
] as [number, number, number][]

export const MonopolyGame = () => {
  const [rollTrigger, setRollTrigger] = useState(0)
  const [playerPosition, setPlayerPosition] = useState(0) // Индекс текущей позиции
  const [diceValue, setDiceValue] = useState(0)
  const [isRolling, setIsRolling] = useState(false)

  const handleRollDice = useCallback(() => {
    if (isRolling) return
    setIsRolling(true)
    setRollTrigger(prev => prev + 1)
  }, [isRolling])

  const handleDiceSettled = useCallback((value: number) => {
    setDiceValue(value)
    setIsRolling(false)
    
    // Перемещаем игрока на новую позицию
    setPlayerPosition(prev => {
      const newPosition = (prev + value) % BOARD_POSITIONS.length
      console.log(`Бросок: ${value}, новая позиция: ${newPosition + 1} (${BOARD_POSITIONS[newPosition].join(', ')})`)
      return newPosition
    })
  }, [])

  return (
    <div style={{ width: '100vw', height: '100vh', position: 'relative' }}>
      <Canvas camera={{ position: [0, 20, 20], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <Physics gravity={[0, -30, 0]}>
          <GameBoard />
          <Dice
            position={[-2, 5, 0]}
            onSettled={handleDiceSettled}
            rollTrigger={rollTrigger}
          />
          <Player
            position={BOARD_POSITIONS[0]}
            targetPosition={BOARD_POSITIONS[playerPosition]}
          />
        </Physics>
        <OrbitControls />
      </Canvas>
      <div style={{
        position: 'absolute',
        bottom: '20px',
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '10px'
      }}>
        <button
          onClick={handleRollDice}
          disabled={isRolling}
          style={{
            padding: '10px 20px',
            fontSize: '18px',
            backgroundColor: isRolling ? '#ccc' : '#4287f5',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: isRolling ? 'not-allowed' : 'pointer'
          }}
        >
          {isRolling ? 'Бросаем...' : 'Бросить кубик'}
        </button>
        {diceValue > 0 && !isRolling && (
          <div style={{ color: 'white', fontSize: '16px' }}>
            Выпало: {diceValue}
          </div>
        )}
      </div>
    </div>
  )
} 