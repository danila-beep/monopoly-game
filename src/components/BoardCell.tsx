interface BoardCellProps {
  position: [number, number, number]
}

export const BoardCell = ({ position }: BoardCellProps) => {
  return (
    <mesh position={position}>
      <boxGeometry args={[1, 0.2, 1]} />
      <meshStandardMaterial color="#3498db" />
    </mesh>
  )
} 