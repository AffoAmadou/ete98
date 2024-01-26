import cnoise from './cnoise.glsl'
export default `
uniform sampler2D uTextureA;
uniform sampler2D uTextureB;
uniform float uThreshold;
varying vec2 vUv;
${cnoise}
void main() {
  vec4 texture1 = texture2D(uTextureA, vUv);
  vec4 texture2 = texture2D(uTextureB, vUv);

  float _noise = cnoise(vUv * 30.0) / 3. + 0.4;
  float factor = step(uThreshold, _noise);

  gl_FragColor = mix(texture1, texture2, factor);
}
`
