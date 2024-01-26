import { useEffect, useRef } from 'react';
import { Box, useGLTF, useTexture } from '@react-three/drei';
import GSAP from 'gsap';
import { extend, useThree, useFrame } from '@react-three/fiber';
import { EffectComposer, DepthOfField } from '@react-three/postprocessing';
import { Perf } from 'r3f-perf';
import rest from '../../../public/img/res.jpg'
import boat from '../../../public/img/boat.jpg'
import { Effects } from "./Effects"

export const Scene = ({ click, tlr, rangeValue }) => {

  const sphereRef = useRef();
  const topRef = useRef();
  const bottomRef = useRef();
  const tl = GSAP.timeline({ paused: true });
  tlr.current = tl;
  console.log(tlr.current)
  let texture = useTexture(boat.src)
  let texture2 = useTexture(rest.src)


  useEffect(() => {
    tl.to(sphereRef.current.rotation, {
      duration: 2.5,
      z: "+=" + Math.PI,
    }, 0)

    tl.to(topRef.current.scale, {
      duration: 2.5,
      y: click ? 4.4 : 1,
      x: click ? 4.4 : 1,
      z: click ? 4.4 : 1,
    }, 0)
    tl.to(bottomRef.current.scale, {
      duration: 2.5,
      y: click ? 1 : 4.4,
      x: click ? 1 : 4.4,
      z: click ? 1 : 4.4,
    }, 0)

    tl.to(topRef.current.position, {
      duration: 2.5,
      z: click ? 0 : -6,
    }, 0)

    tl.to(bottomRef.current.position, {
      duration: 2.5,
      z: click ? -6 : 0,
    }, 0)

    tl.to(topRef.current.rotation, {
      duration: 2.5,
      z: "+=" + Math.PI,
      x: "-=" + Math.PI,
    }, 0)

    tl.to(bottomRef.current.rotation, {
      duration: 2.5,
      z: "+=" + Math.PI,
      x: "-=" + Math.PI,
    }, 0)
  }
    , [])

  console.log(boat)





  return (
    <>
      {/* <Perf openByDefault trackGPU={true} position={'bottom-right'} /> */}

      {/* <EffectComposer disableNormalPass >

        <DepthOfField
          focusDistance={0}
          focalLength={0.02}
          bokehScale={30}
        />

      </EffectComposer> */}

      <mesh ref={sphereRef} position={[0, 0, 0]} >
        <sphereGeometry args={[2, 44, 44]} />
        <meshBasicMaterial opacity={0} wireframe attach="material" color="green" transparent />


        <mesh scale={[4.4, 4.4, 4.4]} ref={bottomRef} position={[0, -1, 0]} >
          <boxGeometry args={[.3, .3, .3, 16]} />
          <meshStandardMaterial map={texture} />
        </mesh>


        <mesh ref={topRef} scale={[1, 1, 1]} position={[0, 1, -6]} >
          <boxGeometry args={[.3, .3, .3, 16]} />
          <meshStandardMaterial map={texture2} />
        </mesh>
      </mesh>
      {/* <Effects /> */}
      {/* <PostProcessing /> */}
    </>
  );
};


