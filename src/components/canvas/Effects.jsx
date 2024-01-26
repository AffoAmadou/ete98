import * as THREE from 'three'
import React, { useMemo, useEffect } from 'react'
import { useThree, useFrame } from '@react-three/fiber';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer'
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass'
import { SavePass } from 'three/examples/jsm/postprocessing/SavePass'
import { CopyShader } from 'three/examples/jsm/shaders/CopyShader'
import { BlendShader } from 'three/examples/jsm/shaders/BlendShader'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass'
import { BokehPass } from 'three/examples/jsm/postprocessing/BokehPass'
export function Effects() {
  const { scene, gl, size, camera } = useThree()
  const composer = useMemo(() => {

    const composer = new EffectComposer(gl)

    const renderPass = new RenderPass(scene, camera)

    const savePass = new SavePass(new THREE.WebGLRenderTarget(size.width, size.height))

    const blendPass = new ShaderPass(BlendShader, 'tDiffuse1')
    blendPass.uniforms['tDiffuse2'].value = savePass.renderTarget.texture
    blendPass.uniforms['mixRatio'].value = 0.9

    const bokehPass = new BokehPass(scene, camera, {
      focus: 8,
      focalLength: 0.005,
      maxblur: .0018,
      width: size.width,
      height: size.height
    })

    const outputPass = new ShaderPass(CopyShader)
    composer.addPass(renderPass)
    composer.addPass(blendPass)
    composer.addPass(savePass)
    composer.addPass(outputPass)
    composer.addPass(bokehPass)

    return composer
  }, [camera, scene, gl, size])
  useEffect(() => void composer.setSize(size.width, size.height), [size, composer])
  useFrame(() => composer.render(), 1)
  return null
}
