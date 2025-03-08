import { useBox } from "@react-three/cannon";
import { useTexture } from "@react-three/drei";
import { useRef } from "react";

type BoxPropsType = {
    position: [x: number, y: number, z: number],
    mass: number
}

function Box(props: BoxPropsType) {
  const [boxRef] = useBox(
    () => ({
      position: props.position,
      mass: props.mass,
    }),
    useRef(null)
  );

  const boxTexture = useTexture("crate.gif");

  return (
    <mesh ref={boxRef}>
      <boxGeometry />
      <meshBasicMaterial map={boxTexture} />
    </mesh>
  );
}

export default Box;
