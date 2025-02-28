// 'use client'

// import { Canvas } from '@react-three/fiber'
// import { useRef } from 'react'
// import { useFrame } from '@react-three/fiber'
// import { PerspectiveCamera, Environment, Float } from '@react-three/drei'

// function TShirt() {
//   const meshRef = useRef()

//   useFrame((state, delta) => {
//     meshRef.current.rotation.y += delta * 0.2
//   })

//   return (
//     <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
//       <mesh ref={meshRef} scale={[2, 2, 2]}>
//         <boxGeometry args={[1, 1.2, 0.2]} />
//         <meshStandardMaterial color="#ffffff" />
//       </mesh>
//     </Float>
//   )
// }

// export default function Scene() {
//   return (
//     <div className="h-[50vh] w-full">
//       <Canvas>
//         <PerspectiveCamera makeDefault position={[0, 0, 5]} />
//         <ambientLight intensity={0.5} />
//         <pointLight position={[10, 10, 10]} />
//         <TShirt />
//         <Environment preset="sunset" />
//       </Canvas>
//     </div>
//   )
// }

