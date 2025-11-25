import React, { useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere, Environment, Stars } from '@react-three/drei';
import * as THREE from 'three';

const EarthSphere: React.FC = () => {
    const meshRef = useRef<THREE.Mesh>(null);

    // Auto-rotate the Earth
    useFrame(() => {
        if (meshRef.current) {
            meshRef.current.rotation.y += 0.001;
        }
    });

    // Create textures
    const dayTexture = new THREE.TextureLoader().load(
        'https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/earth_atmos_2048.jpg'
    );
    const nightTexture = new THREE.TextureLoader().load(
        'https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/earth_lights_2048.png'
    );
    const cloudsTexture = new THREE.TextureLoader().load(
        'https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/earth_clouds_1024.png'
    );

    return (
        <group>
            {/* Main Earth with day texture */}
            <Sphere ref={meshRef} args={[2.5, 64, 64]}>
                <meshStandardMaterial
                    map={dayTexture}
                    roughness={0.7}
                    metalness={0.1}
                />
            </Sphere>

            {/* Night lights layer */}
            <Sphere args={[2.51, 64, 64]}>
                <meshBasicMaterial
                    map={nightTexture}
                    blending={THREE.AdditiveBlending}
                    opacity={0.3}
                    transparent
                />
            </Sphere>

            {/* Clouds layer */}
            <Sphere args={[2.52, 64, 64]}>
                <meshStandardMaterial
                    map={cloudsTexture}
                    transparent
                    opacity={0.4}
                    depthWrite={false}
                />
            </Sphere>

            {/* Atmosphere glow - updated color */}
            <Sphere args={[2.7, 64, 64]}>
                <meshBasicMaterial
                    color="#00d4ff"
                    transparent
                    opacity={0.15}
                    side={THREE.BackSide}
                />
            </Sphere>
        </group>
    );
};

const Earth3D: React.FC = () => {
    return (
        <div style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0 }}>
            <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
                <Suspense fallback={null}>
                    <ambientLight intensity={0.3} />
                    <directionalLight position={[5, 3, 5]} intensity={1.5} />
                    <Stars radius={300} depth={60} count={5000} factor={7} saturation={0} fade speed={1} />
                    <EarthSphere />
                    <OrbitControls
                        enableZoom={true}
                        enablePan={false}
                        minDistance={5}
                        maxDistance={15}
                        autoRotate
                        autoRotateSpeed={0.5}
                    />
                </Suspense>
            </Canvas>
        </div>
    );
};

export default Earth3D;
