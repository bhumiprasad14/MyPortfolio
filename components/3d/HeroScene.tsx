'use client';

import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sphere, Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

// Procedural floating particles
function ParticleField({ count = 1200 }: { count?: number }) {
  const pointsRef = useRef<THREE.Points>(null);

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const cyan = new THREE.Color('#00f0ff');
    const violet = new THREE.Color('#8b5cf6');
    const blue = new THREE.Color('#3b82f6');

    for (let i = 0; i < count; i++) {
      // Distribute in a spherical cloud around the center
      const r = 8 + Math.random() * 18;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);

      const chosenColor = Math.random() > 0.6 ? cyan : Math.random() > 0.3 ? violet : blue;
      col[i * 3] = chosenColor.r;
      col[i * 3 + 1] = chosenColor.g;
      col[i * 3 + 2] = chosenColor.b;
    }
    return [pos, col];
  }, [count]);

  useFrame((state, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.05;
      pointsRef.current.rotation.x += delta * 0.02;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={colors.length / 3}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <PointMaterial
        transparent
        vertexColors
        size={0.06}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

// Interactive Central Futuristic Quantum Core
function CyberCore() {
  const meshRef = useRef<THREE.Mesh>(null);
  const ringRef1 = useRef<THREE.Group>(null);
  const ringRef2 = useRef<THREE.Group>(null);
  const ringRef3 = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.3;
      meshRef.current.rotation.x = Math.sin(t * 0.5) * 0.2;
    }
    if (ringRef1.current) {
      ringRef1.current.rotation.x += delta * 0.4;
      ringRef1.current.rotation.y += delta * 0.2;
    }
    if (ringRef2.current) {
      ringRef2.current.rotation.y += delta * 0.35;
      ringRef2.current.rotation.z += delta * 0.25;
    }
    if (ringRef3.current) {
      ringRef3.current.rotation.z += delta * 0.5;
      ringRef3.current.rotation.x += delta * 0.15;
    }
  });

  return (
    <group position={[0, 0, 0]}>
      {/* Central Pulsing Plasma Sphere */}
      <Float speed={2} rotationIntensity={0.6} floatIntensity={0.8}>
        <Sphere ref={meshRef} args={[1.5, 64, 64]}>
          <MeshDistortMaterial
            color="#081026"
            emissive="#00f0ff"
            emissiveIntensity={0.35}
            roughness={0.15}
            metalness={0.9}
            distort={0.42}
            speed={2.2}
            wireframe={false}
          />
        </Sphere>
      </Float>

      {/* Wireframe Hologram Overlay */}
      <Sphere args={[1.58, 28, 28]}>
        <meshBasicMaterial
          color="#8b5cf6"
          wireframe={true}
          transparent={true}
          opacity={0.32}
        />
      </Sphere>

      {/* Orbiting Tech Rings */}
      <group ref={ringRef1}>
        <mesh>
          <torusGeometry args={[2.5, 0.02, 16, 100]} />
          <meshBasicMaterial color="#00f0ff" transparent opacity={0.7} />
        </mesh>
      </group>

      <group ref={ringRef2}>
        <mesh>
          <torusGeometry args={[3.1, 0.015, 16, 100]} />
          <meshBasicMaterial color="#8b5cf6" transparent opacity={0.6} />
        </mesh>
      </group>

      <group ref={ringRef3}>
        <mesh>
          <torusGeometry args={[3.8, 0.012, 16, 100]} />
          <meshBasicMaterial color="#38bdf8" transparent opacity={0.5} />
        </mesh>
      </group>
    </group>
  );
}

// Mouse-responsive camera controller
function MouseRig() {
  useFrame((state) => {
    // Smooth lerp towards cursor offset
    state.camera.position.x = THREE.MathUtils.lerp(
      state.camera.position.x,
      state.pointer.x * 1.5,
      0.05
    );
    state.camera.position.y = THREE.MathUtils.lerp(
      state.camera.position.y,
      state.pointer.y * 1.2,
      0.05
    );
    state.camera.lookAt(0, 0, 0);
  });
  return null;
}

export default function HeroScene() {
  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none select-none z-0">
      <Canvas
        camera={{ position: [0, 0, 7.5], fov: 48 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        dpr={[1, 1.5]}
      >
        <ambientLight intensity={0.6} />
        <directionalLight position={[10, 10, 5]} intensity={1.2} color="#00f0ff" />
        <pointLight position={[-10, -10, -5]} intensity={0.9} color="#8b5cf6" />
        <pointLight position={[0, 0, 0]} intensity={2.0} color="#00f0ff" distance={6} />

        <CyberCore />
        <ParticleField count={1000} />
        <MouseRig />
      </Canvas>
    </div>
  );
}
