uniform sampler2D tImage;
uniform vec2 uUvScale;
uniform float uAspect;
varying vec2 vUv;
varying vec3 vWorldPos;

float luma(vec3 color) {
  return dot(color, vec3(0.299, 0.587, 0.114));
}

void main() {
  vec2 uv = (vUv - 0.5) * uUvScale * 0.8 + 0.5;
  vec4 tex = texture2D(tImage, uv + vWorldPos.xy * 0.05);
  float gray = luma(tex.rgb);

  float dist = length(vWorldPos.xy);
  float threshold = smoothstep(1.0, 2.5, dist);
  vec3 color = mix(tex.rgb, vec3(gray), threshold);

  gl_FragColor = vec4(color, 1.0);
}