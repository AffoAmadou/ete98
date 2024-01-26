
import { useEffect, useRef } from 'react';
import { Box, useGLTF, RenderTexture, shaderMaterial } from '@react-three/drei';
import vertexShader from './shaders/vertex.glsl'
import fragmentShader from './shaders/fragment.glsl'
import { extend, useFrame, useThree } from '@react-three/fiber';
import { DepthOfField, EffectComposer } from '@react-three/postprocessing'
import GSAP from 'gsap';

const FadeMaterial = shaderMaterial({
  uTextureA: null,
  uTextureB: null,
  uThreshold: 1,
  vertexShader,
  fragmentShader
})
extend({ FadeMaterial })
export const Crossfade = ({ sceneA = () => null, sceneB = () => null, nextScene }) => {
  const materialRef = useRef()
  const meshRef = useRef()

  // useFrame(({ clock }) => {
  //   materialRef.current.uniforms.uThreshold.value = 1
  // })

  const firstScene = () => {
    GSAP.to(materialRef.current.uniforms.uThreshold, {
      duration: 2.5,
      value: 1,
    })
  }

  const secondScene = () => {
    GSAP.to(materialRef.current.uniforms.uThreshold, {
      duration: 2.5,
      value: 0,
    })
  }

  useEffect(() => {
    if (!nextScene) {
      firstScene()
    } else {
      secondScene()
    }
  }, [nextScene])

  const { viewport, camera } = useThree()
  const { width, height } = viewport.getCurrentViewport(camera, [0, 0, 0])
  return (
    <>
      {/* <EffectComposer >
        <DepthOfField
          focusDistance={10}
          focalLength={0.22}
          bokehScale={2}
        />
      </EffectComposer> */}


      <mesh ref={meshRef}>
        <planeGeometry args={[width, height, 5, 5]} />
        <fadeMaterial ref={materialRef}>
          <RenderTexture attach="uTextureA">{sceneA}</RenderTexture>
          <RenderTexture attach="uTextureB">{sceneB}</RenderTexture>
        </fadeMaterial>
      </mesh >
    </>
  )
}
