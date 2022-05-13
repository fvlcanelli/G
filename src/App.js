import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { useGLTF, Environment, Loader, OrbitControls } from '@react-three/drei'
import { useControls } from 'leva'

function Suzi(props) {
  const { nodes } = useGLTF('/suzanne-draco.glb')
  const materialProps = useControls({
    thickness: { value: 5, min: 0, max: 20 },
    roughness: { value: 0, min: 0, max: 1, step: 0.1 },
    clearcoat: { value: 1, min: 0, max: 1, step: 0.1 },
    clearcoatRoughness: { value: 0, min: 0, max: 1, step: 0.1 },
    transmission: { value: 1, min: 0.9, max: 1, step: 0.01 },
    ior: { value: 1.25, min: 1, max: 2.3, step: 0.05 },
    envMapIntensity: { value: 25, min: 0, max: 100, step: 1 },
    color: '#ffffff',
    attenuationTint: '#ffe79e',
    attenuationDistance: { value: 0, min: 0, max: 1 }
  })
  return (
    <mesh geometry={nodes.Suzanne.geometry} {...props}>
      <meshPhysicalMaterial {...materialProps} />
    </mesh>
  )
}

export default function App() {
  const envProps = useControls({ background: false })
  return (
    <>
      <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 2.5] }} gl={{ alpha: false }}>
        <color attach="background" args={['#151518']} />
        <Suspense fallback={null}>
          <Suzi />
          <Environment {...envProps} files="adams_place_bridge_1k.hdr" />
          <group rotation={[0, 0, Math.PI / 4]}>
            <mesh position={[0, 0, -10]} material-color="hotpink">
              <planeGeometry args={[20, 2]} />
            </mesh>
            <mesh position={[0, 0, -10]} material-color="hotpink">
              <planeGeometry args={[2, 20]} />
            </mesh>
          </group>
        </Suspense>
        <OrbitControls />
      </Canvas>
      <Loader />
    </>
  )
}
