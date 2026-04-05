import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere, MeshDistortMaterial, Float, Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

interface BrainProps {
  amygdalaActivation: number;
  prefrontalActivation: number;
}

const NeuralNetwork = ({ count = 1000 }) => {
  const points = useMemo(() => {
    const p = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      const r = 2.2 + Math.random() * 0.8;
      p[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      p[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 1.4;
      p[i * 3 + 2] = r * Math.cos(phi);
    }
    return p;
  }, [count]);

  const pointsRef = useRef<THREE.Points>(null);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += 0.001;
      pointsRef.current.rotation.z += 0.0005;
    }
  });

  return (
    <Points ref={pointsRef} positions={points} stride={3}>
      <PointMaterial
        transparent
        color="#1a1a1a"
        size={0.03}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.NormalBlending}
        opacity={0.2}
      />
    </Points>
  );
};

const BrainModel = ({ amygdalaActivation, prefrontalActivation }: BrainProps) => {
  const brainRef = useRef<THREE.Group>(null);
  const amygdalaRef = useRef<THREE.Mesh>(null);
  const prefrontalRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (brainRef.current) {
      brainRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
    }
    
    if (amygdalaRef.current) {
      const scale = 1 + (Math.sin(state.clock.elapsedTime * 8) * 0.15 * (amygdalaActivation / 100));
      amygdalaRef.current.scale.set(scale, scale, scale);
    }

    if (prefrontalRef.current) {
      const scale = 1 + (Math.sin(state.clock.elapsedTime * 3) * 0.08 * (prefrontalActivation / 100));
      prefrontalRef.current.scale.set(scale, scale, scale);
    }
  });

  return (
    <group ref={brainRef}>
      {/* Main Brain Structure - Semi-transparent glass look */}
      <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.3}>
        <Sphere args={[2, 64, 64]} scale={[1, 1.1, 1.4]}>
          <MeshDistortMaterial
            color="#1a1a1a"
            speed={1.5}
            distort={0.15}
            radius={1}
            transparent
            opacity={0.05}
            roughness={0.5}
            metalness={0.2}
          />
        </Sphere>
        
        {/* Inner Core Glow */}
        <Sphere args={[1.5, 32, 32]} scale={[1, 1.1, 1.4]}>
          <meshBasicMaterial 
            color="#1a1a1a" 
            transparent 
            opacity={0.02} 
            side={THREE.BackSide}
          />
        </Sphere>
      </Float>

      {/* Amygdala (Emotional Center) - Red Pulse */}
      <mesh ref={amygdalaRef} position={[0.6, -0.4, 0.3]}>
        <sphereGeometry args={[0.25, 32, 32]} />
        <meshStandardMaterial 
          color={amygdalaActivation > 50 ? "#EF4444" : "#e5e5e5"} 
          emissive="#EF4444"
          emissiveIntensity={amygdalaActivation / 100}
          transparent
          opacity={0.8}
        />
      </mesh>

      {/* Prefrontal Cortex (Logical Center) - Emerald Glow */}
      <mesh ref={prefrontalRef} position={[0, 0.8, 1.2]}>
        <sphereGeometry args={[0.4, 32, 32]} />
        <meshStandardMaterial 
          color={prefrontalActivation > 50 ? "#10b981" : "#e5e5e5"} 
          emissive="#10b981"
          emissiveIntensity={prefrontalActivation / 100}
          transparent
          opacity={0.8}
        />
      </mesh>

      <NeuralNetwork />
    </group>
  );
};

export const BrainView: React.FC<BrainProps> = ({ amygdalaActivation, prefrontalActivation }) => {
  return (
    <div className="w-full h-full min-h-[500px] relative cursor-grab active:cursor-grabbing">
      <Canvas camera={{ position: [0, 0, 7], fov: 40 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={0.8} />
        <spotLight position={[-10, 10, 10]} angle={0.15} penumbra={1} intensity={0.8} />
        <pointLight position={[0, -5, 5]} intensity={0.5} color="#1a1a1a" />
        
        <BrainModel 
          amygdalaActivation={amygdalaActivation} 
          prefrontalActivation={prefrontalActivation} 
        />
        
        <OrbitControls 
          enableZoom={false} 
          autoRotate 
          autoRotateSpeed={0.3}
          maxPolarAngle={Math.PI / 1.5}
          minPolarAngle={Math.PI / 3}
        />
      </Canvas>
      
      {/* Technical Overlay */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none border border-black/5 rounded-3xl overflow-hidden">
        <div className="absolute top-4 left-4 flex flex-col gap-1">
          <div className="col-header text-[8px] opacity-30">Coordinate System</div>
          <div className="data-value text-[10px] opacity-50">X: 0.12 Y: -0.45 Z: 1.02</div>
        </div>
        
        <div className="absolute bottom-4 right-4 flex flex-col gap-1 text-right">
          <div className="col-header text-[8px] opacity-30">Render Engine</div>
          <div className="data-value text-[10px] opacity-50">WEBGL_2.0_STABLE</div>
        </div>
      </div>
    </div>
  );
};
