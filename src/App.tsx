import "./App.css";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import Box from "./components/Box";
import Floor from "./components/Floor";
import { Physics } from "@react-three/cannon";
import { OrbitControls } from "@react-three/drei";

function App() {
  return (
    <div id="scene_container">
      <Canvas
        gl={{ preserveDrawingBuffer: true }}
        camera={{ position: [0, 10, 10] }}
      >
        <Physics>
          <ambientLight intensity={0.1} />
          <pointLight position={[-2, 0, 0]} />
          <Suspense fallback={null}>
            <Box position={[-1, 3, 0]} mass={1} />
            <Box position={[1, 2, 0]} mass={1} />
            <Floor />
          </Suspense>
        </Physics>

        <OrbitControls
          enableZoom={true}
          maxPolarAngle={Math.PI / 2.5}
        />
      </Canvas>
    </div>
  );
}

export default App;
