uniform vec2 uSpeed;
varying vec2 vUv;
varying vec3 vWorldPos;

void main() {
  vUv = uv;

  vec4 worldPos = modelViewMatrix * vec4( position, 1.0 );
  vWorldPos = worldPos.xyz;
  float dist = length(worldPos.xy);
  dist = pow(dist, 1.5);
  worldPos.xy -= dist * uSpeed.xy * 0.03;
  worldPos.z += dist * length(uSpeed) * 0.04;

  gl_Position = projectionMatrix * worldPos;
}