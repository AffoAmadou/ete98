
import { useEffect, useRef } from 'react';
import { Box, PositionalAudio, useGLTF, useTexture } from '@react-three/drei';
import res from '../../../public/img/third.jpg'
import boat from '../../../public/img/fourth.jpg'
import { Effects } from './Effects';
import GSAP from 'gsap';


export const Scene = ({ tlr, click }) => {
  const sphereRef = useRef();
  const topRef = useRef();
  const bottomRef = useRef();

  let texture = useTexture(boat.src)
  let texture2 = useTexture(res.src)

  const tl = GSAP.timeline({ paused: true });
  tlr.current = tl;

  useEffect(() => {
    tl.to(sphereRef.current.rotation, {
      duration: 2.5,
      z: "+=" + Math.PI,
    }, 0)

    tl.to(topRef.current.scale, {
      duration: 2.5,
      y: click ? 2.2 : 1,
      x: click ? 2.2 : 1,
      z: click ? 2.2 : 1,
    }, 0)
    tl.to(bottomRef.current.scale, {
      duration: 2.5,
      y: click ? 1 : 2.2,
      x: click ? 1 : 2.2,
      z: click ? 1 : 2.2,
    }, 0)

    tl.to(topRef.current.position, {
      duration: 2.5,
      z: click ? 0 : -6,
    }, 0)

    tl.to(bottomRef.current.position, {
      duration: 2.5,
      z: click ? -6 : 0,
    }, 0)

    // tl.to(topRef.current.rotation, {
    //   duration: 2.5,
    //   z: "+=" + Math.PI,
    //   x: "-=" + Math.PI,
    // }, 0)

    // tl.to(bottomRef.current.rotation, {
    //   duration: 2.5,
    //   z: "+=" + Math.PI,
    //   x: "-=" + Math.PI,
    // }, 0)
  }
    , [])



  const handleMove = () => {


  }
  return (
    <>
      <ambientLight intensity={2.5} />
      <pointLight intensity={7} position={[2, 0, 2]} />
      <mesh ref={sphereRef} position={[0, 0, 0]} >
        <sphereGeometry args={[2, 44, 44]} />
        <meshBasicMaterial opacity={0} wireframe attach="material" color="green" transparent />


        {/* <mesh scale={[4.4, 4.4, 4.4]} ref={bottomRef} position={[0, -1, 0]} > */}
        <mesh onPointerEnter={handleMove} scale={[2.2, 2.2, 2.2]} ref={bottomRef} position={[0, -1, 0]} >

          {/* <boxGeometry args={[.3, .3, .3, 16]} /> */}
          <planeGeometry args={[2, 1.2, 1]} />
          <meshStandardMaterial map={texture} />
          {/* <PositionalAudio url="/public/sound/lily.mp3" distance={10} /> */}
        </mesh>


        {/* <mesh ref={topRef} scale={[1, 1, 1]} position={[0, 1, -6]} > */}
        <mesh scale={[1, 1, 1]} ref={topRef} position={[0, 1, -6]} >

          {/* <boxGeometry args={[.3, .3, .3, 16]} /> */}
          <planeGeometry args={[2, 1.2, 1]} />
          <meshStandardMaterial map={texture2} />
        </mesh>
      </mesh>
      {/* <Effects /> */}
    </>
  )
}
