
import { useEffect, useRef } from 'react';
import { Box, PositionalAudio, useGLTF, useTexture } from '@react-three/drei';
import montagne2 from '../../../public/img/scenetwo/montagne.png'
import mount from '../../../public/img/scenetwo/mount.png'
import phone from '../../../public/img/scenetwo/phone.png'
import boat from '../../../public/img/scenetwo/boat.png'
import palm from '../../../public/img/scenetwo/palm.png'
import plane from '../../../public/img/scenetwo/plane.png'
import wall2 from '../../../public/img/scenetwo/wall.png'
import scarf from '../../../public/img/scenetwo/scarf.png'
import ball from '../../../public/img/scenetwo/ball.png'
import hear from '../../../public/img/scenetwo/hear.png'
import castle from '../../../public/img/scenetwo/castle.png'
import bracelet from '../../../public/img/scenetwo/bracelet.png'
import obj from '../../../public/img/scenetwo/obj.png'
import moon from '../../../public/img/scenetwo/moon.png'

import montagne from '../../../public/img/sceneone/montagne.png'
import wall from '../../../public/img/sceneone/wall.png'
import cloud from '../../../public/img/sceneone/cloud.png'
import rain from '../../../public/img/sceneone/rain.png'
import cup from '../../../public/img/sceneone/cup.png'
import water from '../../../public/img/sceneone/water.png'
import umbrella from '../../../public/img/sceneone/umbrella.png'
import cigarette from '../../../public/img/sceneone/cigarette.png'
import chair from '../../../public/img/sceneone/chair.png'
import medal from '../../../public/img/sceneone/medal.png'


import { Effects } from './Effects';
import GSAP from 'gsap';

import birds from '../../../public/sound/birds.wav'
import sea from '../../../public/sound/sea.mp3'
import ambient from '../../../public/sound/ete90.wav'
import { MathUtils } from 'three';



export const Scene = ({ tlr, click, isStarted }) => {
  const sphereRef = useRef();
  const topRef = useRef();
  const bottomRef = useRef();

  const topMontagneRef = useRef()
  const topCigaretteRef = useRef()
  const topMedalRef = useRef()
  const topUmbrellaRef = useRef()

  const keyBottomRef = useRef()


  const sound1Ref = useRef();
  const sound2Ref = useRef();
  const ambientRef = useRef();

  let montagneTexture = useTexture(montagne.src)
  let wallTexture = useTexture(wall.src)
  let cloudTexture = useTexture(cloud.src)
  let rainTexture = useTexture(rain.src)
  let cupTexture = useTexture(cup.src)
  let waterTexture = useTexture(water.src)
  let umbrellaTexture = useTexture(umbrella.src)
  let cigaretteTexture = useTexture(cigarette.src)
  let chairTexture = useTexture(chair.src)
  let medalTexture = useTexture(medal.src)

  let montagneTexture2 = useTexture(montagne2.src)
  let mountTexture = useTexture(mount.src)
  let phoneTexture = useTexture(phone.src)
  let boatTexture = useTexture(boat.src)
  let palmTexture = useTexture(palm.src)
  let planeTexture = useTexture(plane.src)
  let wallTexture2 = useTexture(wall2.src)
  let scarfTexture = useTexture(scarf.src)
  let ballTexture = useTexture(ball.src)
  let hearTexture = useTexture(hear.src)
  let castleTexture = useTexture(castle.src)
  let braceletTexture = useTexture(bracelet.src)
  let objTexture = useTexture(obj.src)
  let moonTexture = useTexture(moon.src)

  //change colorencoding
  const tl = GSAP.timeline({ paused: true });
  const loopTl = GSAP.timeline({ repeat: -1 });
  const loopCig = GSAP.timeline({ repeat: -1 });

  useEffect(() => {
    if (isStarted) {
      if (ambientRef.current) {
        ambientRef.current.setVolume(0.5)
        ambientRef.current.play()
      }
    }
  }, [isStarted])
  useEffect(() => {
    tlr.current = tl;

    GSAP.set(topRef.current.rotation, {
      z: "-=" + Math.PI,
    })

    if (ambientRef.current) {
      ambientRef.current.setVolume(0.5)
      ambientRef.current.play()
    }

    if (sound1Ref.current) {
      sound1Ref.current.setVolume(1.5)
      sound1Ref.current.play()
      sound1Ref.current.setMaxDistance(4)
      sound1Ref.current.setRolloffFactor(4)
    }

    if (sound2Ref.current) {
      sound2Ref.current.play()
      sound2Ref.current.setVolume(1.5)
      sound2Ref.current.setMaxDistance(4)
      sound2Ref.current.setRolloffFactor(4)
    }

    loopTl.to(topMedalRef.current.scale, {
      duration: 5,
      y: 2,
      x: 2,
      z: 2,
    }).to(topMedalRef.current.scale, {
      duration: 5,
      y: 2.2,
      x: 2.2,
      z: 2.2
    })

    loopCig.to(topCigaretteRef.current.rotation, {
      duration: 30,
      z: "+=" + 1 / Math.PI * 2,
    })

    // loopTl.to(topMedalRef.current.position, {
    //   duration: 4,
    //   y: 0,
    //   x: -1,
    //   z: 0,
    // }, 0).to(topMedalRef.current.position, {
    //   duration: 4,
    //   y: 0,
    //   x: -1,
    //   z: 1,
    // })




    tl.to(sphereRef.current.rotation, {
      duration: 2.5,
      z: "+=" + Math.PI,
    }, 0)
      .to(topCigaretteRef.current.position, {
        duration: 4,
        y: click ? 0 : 1,
        x: click ? -1 : -2,
        z: 2,
      }, 0)


    tl.to(topRef.current.scale, {
      duration: 5.5,
      y: click ? 2.2 : 1,
      x: click ? 2.2 : 1,
      z: click ? 2.2 : 1,
    }, 0)
    tl.to(bottomRef.current.scale, {
      duration: 5.5,
      y: click ? .4 : 2.2,
      x: click ? .4 : 2.2,
      z: click ? .4 : 2.2,
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
    //   z: "-=" + Math.PI / 2,
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
      {/* <ambientLight intensity={2.5} />
      <pointLight intensity={7} position={[2, 0, 2]} /> */}
      <mesh ref={sphereRef} position={[0, 0, 0]} >
        <sphereGeometry args={[2, 44, 44]} />
        <meshBasicMaterial visible={false} wireframe={true} opacity={1} attach="material" color="green" transparent />

        <group transparent position={[0, 0, 0]} ref={bottomRef}>

          <mesh ref={topMontagneRef} scale={[2.2, 2.2, 2.2]} position={[0, -1, 0]} >
            <planeGeometry args={[2, 1.2, 1]} />
            <meshStandardMaterial transparent map={montagneTexture} />
          </mesh>
          <mesh position={[0, -1, -1]} scale={[2.2, 2.2, 2.2]} >
            <planeGeometry args={[2, 1.2, 1]} />
            <meshStandardMaterial transparent map={wallTexture} />
          </mesh>

          <mesh position={[0, -1, 1]} scale={[2.2, 2.2, 2.2]} >
            <planeGeometry args={[2, 1.2, 1]} />
            <meshStandardMaterial transparent map={cloudTexture} />
          </mesh>

          <mesh position={[0, -1, 1]} scale={[2.2, 2.2, 2.2]} >
            <planeGeometry args={[2, 1.2, 1]} />
            <meshStandardMaterial transparent map={rainTexture} />
          </mesh>

          <mesh position={[0, -1, 0]} scale={[2.2, 2.2, 2.2]} >
            <planeGeometry args={[2, 1.2, 1]} />
            <meshStandardMaterial transparent map={cupTexture} />
          </mesh>

          <mesh position={[0, -1, 0]} scale={[2.2, 2.2, 2.2]} >
            <planeGeometry args={[2, 1.2, 1]} />
            <meshStandardMaterial transparent map={waterTexture} />
          </mesh>

          <mesh ref={topUmbrellaRef} position={[0, -1, 0]} scale={[2.2, 2.2, 2.2]} >
            <planeGeometry args={[2, 1.2, 1]} />
            <meshStandardMaterial transparent map={umbrellaTexture} />
          </mesh>

          <mesh ref={topCigaretteRef} position={[0, -1, 1]} scale={[2.2, 2.2, 2.2]} >
            <planeGeometry args={[2, 1.2, 1]} />
            <meshStandardMaterial transparent map={cigaretteTexture} />
          </mesh>

          <mesh position={[0, -1, 1]} scale={[2.2, 2.2, 2.2]} >
            <planeGeometry args={[2, 1.2, 1]} />
            <meshStandardMaterial transparent map={chairTexture} />
          </mesh>

          <mesh ref={topMedalRef} position={[0, -1, 1]} scale={[2.2, 2.2, 2.2]} >
            <planeGeometry args={[2, 1.2, 1]} />
            <meshStandardMaterial transparent map={medalTexture} />
          </mesh>

          <PositionalAudio ref={sound1Ref} url={birds} distance={7} />

        </group>


        <group ref={topRef} position={[0, 1, -6]} >

          <mesh   >
            <planeGeometry args={[2, 1.2, 1]} />
            <meshStandardMaterial transparent map={montagneTexture2} />
            {/* <PositionalAudio ref={sound2Ref} url={sound2} distance={7} /> */}
          </mesh>

          <mesh  >
            <planeGeometry args={[2, 1.2, 1]} />
            <meshStandardMaterial transparent map={mountTexture} />
          </mesh>

          <mesh  >
            <planeGeometry args={[2, 1.2, 1]} />
            <meshStandardMaterial transparent map={phoneTexture} />
          </mesh>

          <mesh  >
            <planeGeometry args={[2, 1.2, 1]} />
            <meshStandardMaterial transparent map={boatTexture} />
          </mesh>

          <mesh  >
            <planeGeometry args={[2, 1.2, 1]} />
            <meshStandardMaterial transparent map={palmTexture} />
          </mesh>

          <mesh  >
            <planeGeometry args={[2, 1.2, 1]} />
            <meshStandardMaterial transparent map={planeTexture} />
          </mesh>

          <mesh  >
            <planeGeometry args={[2, 1.2, 1]} />
            <meshStandardMaterial transparent map={wallTexture2} />
          </mesh>

          <mesh  >
            <planeGeometry args={[2, 1.2, 1]} />
            <meshStandardMaterial transparent map={scarfTexture} />
          </mesh>

          <mesh  >
            <planeGeometry args={[2, 1.2, 1]} />
            <meshStandardMaterial transparent map={ballTexture} />
          </mesh>

          <mesh  >
            <planeGeometry args={[2, 1.2, 1]} />
            <meshStandardMaterial transparent map={hearTexture} />
          </mesh>


          <mesh  >
            <planeGeometry args={[2, 1.2, 1]} />
            <meshStandardMaterial transparent map={castleTexture} />
          </mesh>

          <mesh  >
            <planeGeometry args={[2, 1.2, 1]} />
            <meshStandardMaterial transparent map={braceletTexture} />
          </mesh>

          <mesh  >
            <planeGeometry args={[2, 1.2, 1]} />
            <meshStandardMaterial transparent map={objTexture} />
          </mesh>

          <mesh  >
            <planeGeometry args={[2, 1.2, 1]} />
            <meshStandardMaterial transparent map={moonTexture} />
          </mesh>

          <PositionalAudio ref={sound2Ref} url={sea} distance={7} />
        </group >

        <PositionalAudio ref={ambientRef} url={ambient} distance={7} />
      </mesh>
      <Effects />
    </>
  )
}
