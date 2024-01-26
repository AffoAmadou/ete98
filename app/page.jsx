'use client'

import dynamic from 'next/dynamic'
import { Suspense, useEffect, useRef, useState } from 'react'


const View = dynamic(() => import('@/components/canvas/View').then((mod) => mod.View), {
  ssr: false,
  loading: () => (
    <div className='flex h-96 w-full flex-col items-center justify-center'>
      <svg className='-ml-1 mr-3 h-5 w-5 animate-spin text-black' fill='none' viewBox='0 0 24 24'>
        <circle className='opacity-25' cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='4' />
        <path
          className='opacity-75'
          fill='currentColor'
          d='M4 12a8 8 0 0 1 8-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 0 1 4 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
        />
      </svg>
    </div>
  ),
})
const Common = dynamic(() => import('@/components/canvas/View').then((mod) => mod.Common), { ssr: false })

const Scene = dynamic(() => import('@/components/canvas/Examples').then((mod) => mod.Scene), { ssr: false })

const Scene2 = dynamic(() => import('@/components/canvas/Scene2').then((mod) => mod.Scene), { ssr: false })

const Scene3 = dynamic(() => import('@/components/canvas/Scene3').then((mod) => mod.Scene), { ssr: false })

const Crossfade = dynamic(() => import('@/components/canvas/Crossfade').then((mod) => mod.Crossfade), { ssr: false })

export default function Page() {

  const [countClick, setCountClick] = useState(true)
  const [nextScene, setNextScene] = useState(false)
  const [rangeValue, setRangeValue] = useState(0); // State to track range input value
  const tlRef = useRef();
  const tl2Ref = useRef();

  const [isStarted, setIsStarted] = useState(false);



  const handleClick = () => {
    // setCountClick(!countClick)

    setNextScene(!nextScene)
  }



  const handleRangeChange = (event) => {
    const progress = event.target.value;
    // setRangeValue(progress);
    tlRef.current.progress(progress);
  };

  const handleRangeChange2 = (event) => {
    const progress = event.target.value;
    // setRangeValue(progress);
    tl2Ref.current.progress(progress);
  }

  const handleStart = () => {
    setIsStarted(true)
  }
  return (
    <>
      <div className='scene '>

        {/* {
          !isStarted ? (
            <div className="start flex w-full h-screen justify-center">
              <button onMouseDown={handleStart}>Start</button>
            </div>
          ) :
            (
              <> */}

        {/* <input
                  style={{ visibility: nextScene ? 'visible' : 'hidden' }}
                  className='absolute range'
                  type="range"
                  min={0}
                  max={1}
                  step={0.01}
                  onChange={handleRangeChange2}
                />

                <input
                  style={{ visibility: nextScene ? 'hidden' : 'visible' }}
                  className='absolute range l'
                  type="range"
                  min={0}
                  max={1}
                  step={0.01}
                  onChange={handleRangeChange}
                /> */}


        {/* 
                <button disabled={nextScene ? true : false} onMouseDown={handleClick} className='absolute btn-next'>Scene suivante</button>

                <button disabled={!nextScene ? true : false} onMouseDown={handleClick} className='absolute btn-prev'>Scene precedente</button>

                <View orbit={false} className='relative h-full  sm:w-full'>
                  <Suspense fallback={null}> */}
        {/* <fog attach='fog' color="#00ff00" near={0} far={16} /> */}
        {/* <Scene2 />
          
            <Scene3 /> */}
        {/* 
                    <Crossfade sceneA={<Scene2 tlr={tlRef} click={countClick} />} sceneB={<Scene3 tlr={tl2Ref} click={countClick} />} nextScene={nextScene} /> */}
        {/* <Scene click={countClick} tlr={tlRef} rangeValue={rangeValue} /> */}
        {/* <Common color={'#ffffff'} />
                  </Suspense>
                </View>
              </>
            )
        } */}



        <div style={{ display: isStarted ? "none" : "flex" }} className="loading">
          <h1>Été 90</h1>
          <button onMouseDown={handleStart}>Start</button>
        </div>


        <input
          style={{ display: isStarted ? 'block' : 'none' }}
          className='absolute range l'
          type="range"
          min={0}
          max={1}
          // value={rangeValue}
          step={0.01}
          onChange={handleRangeChange}
        />
        <View orbit={false} className='relative h-full  sm:w-full'>
          <Suspense fallback={null}>
            <Scene2 tlr={tlRef} click={countClick} />
            <Common color={'#ffffff'} />
          </Suspense>
        </View>



      </div>
    </>
  )
}
