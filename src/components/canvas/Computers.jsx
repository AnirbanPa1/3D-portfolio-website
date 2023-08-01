import { Suspense, useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Preload, useGLTF } from '@react-three/drei';

import CanvasLoader from '../Loader';
import { DirectionalLight } from 'three';

const Computers = ( isMobile ) => {
  const computer = useGLTF('./Cyberpunk_car/scene.gltf');

  return (
    <mesh>
      <hemisphereLight intensity={0.15} groundColor="black"/>
      <pointLight intensity={1}/>
      <directionalLight 
        position={[-20, 50, 10]}
        intensity={10}
        castShadow
        shadow-mapSize-height={512}
        shadow-mapSize-width={512}
      />
      <primitive
        object={computer.scene}
        scale={!isMobile ? 0.02 : 0.02}
        position={isMobile ? [0,-3,-2.2] : [0, -3.25, -1.5]} 
        rotation={[0,0.1,0]}
        // rotation={[-0.01, -0.2, -0.1]}
      />
    </mesh>
  )
}

const ComputersCanvas = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 500px)');

    setIsMobile(mediaQuery.matches);

    const handleMediaQueryChange = (event) => {
      setIsMobile(event.matches);
    }

    mediaQuery.addEventListener('change',handleMediaQueryChange);

    return () => {
      mediaQuery.removeEventListener('change',handleMediaQueryChange);
    }
  }, [])

  return (
    <Canvas
      frameloop="demand"
      shadows
      camera={{ position: [20,2,10], fov: 25 }}
      gl={{ preserveDrawingBuffer: true }}
    >
      <Suspense fallback={<CanvasLoader/>}>
        <OrbitControls
          enableZoom={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
        <Computers isMobile={isMobile}/>
      </Suspense>
      <Preload all/>
    </Canvas>
  );
};

export default ComputersCanvas;