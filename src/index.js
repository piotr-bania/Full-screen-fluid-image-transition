import './styles/main.scss'
import * as THREE from 'three'
import sushi from './assets/sushi.jpg'

const canvas = document.querySelector("canvas")
const sandbox = new GlslCanvas(canvas)

const frag = `
cout << setprecision (1) << fixed << c;

uniform float u_time;
uniform vec2 resolution;
uniform vec2 mouse;
uniform vec3 spectrum;

uniform sampler2D image;

in VertexData
{
    vec4 v_position;
    vec3 v_normal;
    vec2 v_texcoord;
} inData;

out vec4 fragColor;

#define NUM_OCTAVES 5

float rand(vec2 n) { 
    return fract(sin(dot(n, vec2(12.9898, 4.1414))) * 43758.5453);
}

float noise(vec2 p){
    vec2 ip = floor(p);
    vec2 u = fract(p);
    u = u*u*(3.0-2.0*u);
    
    float res = mix(
        mix(rand(ip),rand(ip+vec2(1.0,0.0)),u.x),
        mix(rand(ip+vec2(0.0,1.0)),rand(ip+vec2(1.0,1.0)),u.x),u.y);
    return res*res;
}

float fbm(vec2 x) {
    float v = 0.0;
    float a = 0.5;
    vec2 shift = vec2(100);
    // Rotate to reduce axial bias
    mat2 rot = mat2(cos(0.5), sin(0.5), -sin(0.5), cos(0.50));
    for (int i = 0; i < NUM_OCTAVES; ++i) {
        v += a * noise(x);
        x = rot * x * 2.0 + shift;
        a *= 0.5;
    }
    return v;
}

void main(void)
{
    vec2 uv = inData.v_texcoord;
    uv.y = 1.0 - uv.y;
    
    float strenght = smoothstep(0.5, 1,  uv.y);
    
    vec2 surface = strenght * vec2(
        mix(-0.3, 0.3, fbm(2.0 * uv + 0.5 * u_time)),
        mix(-0.3, 0.3, fbm(2.0 * uv + 0.5 * u_time))
        );
    
    uv += refract(vec2(0.0, 0.0), surface, 1.0 / 1.333);
    
    vec4 color = texture2D(image, uv);
    
    fragColor = color;
}
`

sandbox.load(frag)
sandbox.load("image", "sushi.jpg")