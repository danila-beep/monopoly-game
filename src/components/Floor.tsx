import { usePlane } from "@react-three/cannon";
import { useTexture } from "@react-three/drei";
import { useRef } from "react";

function Floor() {
  const floorTexture = useTexture("wood.jpg");

  const [floorRef] = usePlane(
    () => ({
      rotation: [-Math.PI / 2, 0, 0],
      position: [0, 1, 0],
    }),
    useRef(null)
  );

  return (
    <mesh ref={floorRef}>
      <planeGeometry args={[10, 10]} />
      <meshBasicMaterial map={floorTexture} />
    </mesh>
  );
}

export default Floor;
