import "./App.css";
import { Canvas } from "@react-three/fiber";
import { Suspense, useRef } from "react";
import Board from "./components/Board";
import {
  Physics,
  useBox,
} from "@react-three/cannon";
import { CameraControls } from "@react-three/drei";
import Dice, { DiceHandle } from "./components/Dice";

function App() {
  const diceRef1 = useRef<DiceHandle>(null);
  const diceRef2 = useRef<DiceHandle>(null);


  const handleButtonClick = () => {
    if (diceRef1.current && diceRef2.current) {
      console.log(123)
      // Изменяем физическое состояние объекта
      diceRef1.current.applyForce(0, 5, 0); // Пример изменения состояния: применяемая мощность вверх
      diceRef2.current.applyForce(0, -5, 0); // Пример изменения состояния: применяемая мощность вверх
    }
  };

  return (
    <div id="scene_container">
      <Canvas
        gl={{ preserveDrawingBuffer: true }}
        camera={{ position: [0, 10, 10] }}
      >
        <Physics
          gravity={[0, -50, 0]}
          isPaused={false}
        >
          <Suspense fallback={null}>
            <Dice ref={diceRef1} position={[0, 5, 0]} mass={1}/>
            <Dice ref={diceRef2} position={[0, 7, 0]} mass={1}/>

            <Board />
          </Suspense>
        </Physics>

        <CameraControls enabled={true} />
      </Canvas>

      <button className={"resetBtn"} onClick={handleButtonClick}>
        Throw dices
      </button>
    </div>
  );
}

export default App;
