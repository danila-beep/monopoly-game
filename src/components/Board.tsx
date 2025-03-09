import { usePlane } from "@react-three/cannon";
import { useTexture } from "@react-three/drei";
import { useRef } from "react";

function Board() {
  const boardTexture = useTexture("textures/boardTexture.jpg");

  const [boardRef] = usePlane(
    () => ({
      rotation: [-Math.PI / 2, 0, 0],
      position: [0, 1, 0],
      material: "board"
    }),
    useRef(null)
  );

  return (
    <mesh ref={boardRef}>
      <planeGeometry args={[20, 20]} />
      <meshBasicMaterial map={boardTexture} />
    </mesh>
  );
}

export default Board;
