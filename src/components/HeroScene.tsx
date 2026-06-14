"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";
import { useTheme } from "@/providers/ThemeProvider";
import { useReducedMotion } from "@/lib/useReducedMotion";

function ParticleField({ reduced }: { reduced: boolean }) {
  const points = useRef<THREE.Points>(null!);
  const count = 2000;
  const { currentColors } = useTheme();

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }
    return pos;
  }, []);

  useFrame((state) => {
    if (reduced) return;
    if (points.current) {
      const targetRotationY = state.clock.elapsedTime * 0.02 + state.pointer.x * 0.15;
      const targetRotationX = state.clock.elapsedTime * 0.01 + state.pointer.y * 0.15;

      points.current.rotation.y = THREE.MathUtils.lerp(
        points.current.rotation.y,
        targetRotationY,
        0.05
      );
      points.current.rotation.x = THREE.MathUtils.lerp(
        points.current.rotation.x,
        targetRotationX,
        0.05
      );
    }
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.02}
        color={currentColors.accent}
        sizeAttenuation
        transparent
        opacity={0.8}
      />
    </points>
  );
}

function FloatingBlob({ reduced }: { reduced: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null!);
  const { currentColors } = useTheme();

  useFrame((state) => {
    if (reduced) return;
    if (meshRef.current) {
      // Rotation combining elapsed time and pointer position
      const targetRotationX = state.clock.elapsedTime * 0.1 + state.pointer.y * 0.4;
      const targetRotationY = state.clock.elapsedTime * 0.15 + state.pointer.x * 0.4;

      meshRef.current.rotation.x = THREE.MathUtils.lerp(
        meshRef.current.rotation.x,
        targetRotationX,
        0.05
      );
      meshRef.current.rotation.y = THREE.MathUtils.lerp(
        meshRef.current.rotation.y,
        targetRotationY,
        0.05
      );

      // Parallax drifting position
      const targetPosX = state.pointer.x * 0.6;
      const targetPosY = state.pointer.y * 0.6;
      meshRef.current.position.x = THREE.MathUtils.lerp(
        meshRef.current.position.x,
        targetPosX,
        0.05
      );
      meshRef.current.position.y = THREE.MathUtils.lerp(
        meshRef.current.position.y,
        targetPosY,
        0.05
      );
    }
  });

  return (
    <Float speed={reduced ? 0 : 1.5} rotationIntensity={reduced ? 0 : 0.3} floatIntensity={reduced ? 0 : 1}>
      <mesh ref={meshRef} scale={2.2}>
        <icosahedronGeometry args={[1, 64]} />
        <MeshDistortMaterial
          color={currentColors.accent}
          roughness={0.1}
          metalness={0.8}
          distort={reduced ? 0 : 0.4}
          speed={reduced ? 0 : 2}
          transparent
          opacity={0.35}
        />
      </mesh>
    </Float>
  );
}

export default function HeroScene() {
  const { currentColors } = useTheme();
  const reduced = useReducedMotion();

  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 60 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
        frameloop={reduced ? "demand" : "always"}
      >
        <ambientLight intensity={0.35} />
        <directionalLight position={[5, 5, 5]} intensity={0.6} />
        <pointLight position={[-5, -5, -5]} intensity={0.4} color={currentColors.accent} />
        {/* Accent-tinted rim glow for extra depth. */}
        <pointLight position={[0, 0, 4]} intensity={0.5} color={currentColors.accentLight} />
        <ParticleField reduced={reduced} />
        <FloatingBlob reduced={reduced} />
      </Canvas>
    </div>
  );
}

