import {
  useBox,
  useContactMaterial,
} from "@react-three/cannon";
import { useLoader } from "@react-three/fiber";
import { forwardRef, useImperativeHandle } from "react";
import * as THREE from "three";

interface DiceProps {
  position: [number, number, number];
  mass: number;
}

export interface DiceHandle {
  applyForce: (
    x: number,
    y: number,
    z: number
  ) => void; // Метод, который будет вызываться извне
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Dice = forwardRef<DiceHandle, DiceProps>(
  ({ position, mass }, ref) => {
    const [diceRef, api] = useBox(() => ({
      mass,
      position,
      rotation: [
        2 * Math.PI * Math.random(),
        0,
        2 * Math.PI * Math.random(),
      ],
      material: "dice",
      args: [1, 1, 1], // Размер вашего кубика
    }));

    useContactMaterial("board", "dice", {
      restitution: 0.5,
    });

    const diceTexturesPath = [
      "textures/diceSides/diceSide-1.jpg",
      "textures/diceSides/diceSide-2.jpg",
      "textures/diceSides/diceSide-3.jpg",
      "textures/diceSides/diceSide-4.jpg",
      "textures/diceSides/diceSide-5.jpg",
      "textures/diceSides/diceSide-6.jpg",
    ];

    const diceTextures = useLoader(
      THREE.TextureLoader,
      diceTexturesPath
    );

    useImperativeHandle(ref, () => ({
      applyForce: (x, y, z) => {
        api.velocity.set(-10, 0, 0)
        api.position.set(10, 10, 0)
      }
    }));

    return (
      <mesh ref={diceRef}>
        <boxGeometry args={[1, 1, 1]} />
        {diceTextures.map((texture, index) => {
          return (
            <meshBasicMaterial
              attach={`material-${index}`}
              map={texture}
              key={index}
            />
          );
        })}
      </mesh>
    );
  }
);

export default Dice;
