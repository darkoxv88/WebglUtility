import { byte } from '../utility/byte';
import { Vec2 } from './vec2';
import { Vec3 } from './vec3';
import { Vec4 } from './vec4';
import { Mat2 } from './mat2';
import { Mat3 } from './mat3';
import { Mat4 } from './mat4';
import { Quaternion } from './quaternion';
import { onStart, onUpdate, startFrames, pauseFrames, unpauseFrames, stopFrames, resumeFrames, killFrames } from './frame';

// https://webgl2fundamentals.org/webgl/resources/m4.js

const defaulTemperatures: { [key: number]: Array<number> } = {
  1000: [255, 56, 0],
  1500: [255, 109, 0],
  1900: [255, 131, 0],
  2000: [255, 137, 18],
  2200: [255, 147, 44],
  2500: [255, 161, 72],
  2700: [255, 169, 87],
  2800: [255, 173, 94],
  2900: [255, 177, 101],
  3000: [255, 180, 107],
  3500: [255, 196, 137],
  4000: [255, 209, 163],
  4100: [255, 211, 168],
  4300: [255, 215, 177],
  4500: [255, 219, 186],
  5000: [255, 228, 206],
  5100: [255, 230, 210],
  5200: [255, 232, 213],
  5300: [255, 233, 217],
  5400: [255, 235, 220],
  5500: [255, 236, 224],
  5600: [255, 238, 227],
  5700: [255, 239, 230],
  6000: [255, 243, 239],
  6500: [255, 249, 253],
  6600: [254, 249, 255],
  6700: [252, 247, 255],
  6800: [249, 246, 255],
  6900: [247, 245, 255],
  7000: [245, 243, 255],
  7100: [243, 242, 255],
  7200: [240, 241, 255],
  7300: [239, 240, 255],
  7400: [237, 239, 255],
  7500: [235, 238, 255],
  8000: [227, 233, 255],
  8500: [220, 229, 255],
  9000: [214, 225, 255],
  9300: [210, 223, 255],
  9500: [208, 222, 255],
  9600: [207, 221, 255],
  9700: [207, 221, 255],
  9800: [206, 220, 255],
  9900: [205, 220, 255],
  10000: [204, 219, 255],
  10500: [200, 217, 255],
  11000: [200, 213, 255],
  11500: [193, 213, 255],
  12000: [191, 211, 255],
  12500: [188, 210, 255],
  13000: [186, 208, 255],
  13500: [184, 207, 255],
  14000: [182, 206, 255],
  14500: [180, 205, 255],
  15000: [179, 204, 255],
  15500: [177, 203, 255],
  16000: [176, 202, 255],
  16500: [175, 201, 255],
  17000: [174, 200, 255],
  17500: [173, 200, 255],
}

const forceGL1: boolean = false;
const gl1: boolean = !!WebGLRenderingContext;
const gl2: boolean = !!WebGL2RenderingContext;



class UniformData {
  type: '1f' | '1fv' | '1i' | '1iv' | '2f' | '2fv' | '2i' | '2iv' | '3f' | '3fv' | '3i' | '3iv' | '4f' | '4fv' | '4i' | '4iv' | 'Matrix2fv' | 'Matrix3fv' | 'Matrix4fv';
  name: string;
  value: any;
}

export class WebglUtility {

  public static Vec2: typeof Vec2 = Vec2;
  public static Vec3: typeof Vec3 = Vec3;
  public static Vec4: typeof Vec4 = Vec4;
  public static Mat2: typeof Mat2 = Mat2;
  public static Mat3: typeof Mat3 = Mat3;
  public static Mat4: typeof Mat4 = Mat4;
  public static Quaternion: typeof Quaternion = Quaternion;

  public static onStartFrame: typeof onStart = onStart;
  public static onUpdateFrame: typeof onUpdate = onUpdate;
  public static startFrames: typeof startFrames = startFrames;
  public static pauseFrames: typeof pauseFrames = pauseFrames;
  public static unpauseFrames: typeof unpauseFrames = unpauseFrames;
  public static stopFrames: typeof stopFrames = stopFrames;
  public static resumeFrames: typeof resumeFrames = resumeFrames;
  public static killFrames: typeof killFrames = killFrames;

  public static radToDeg(rad: number): number {
    return rad * 180 / Math.PI;
  }

  public static degToRad(deg: number): number {
    return deg * Math.PI / 180;
  }

  public static colorTemperatureToRgb(value: number): Vec3 {
    let r: number = 255, g: number = 1255, b: number = 255;
  
    if (typeof(value) !== 'number' || !value) {
      return Vec3.create(255, 255, 255);
    }
  
    if (value < 0) value = 0;
  
    if (value == 0) {
      return Vec3.create(255, 255, 255);
    }
  
    if (defaulTemperatures[value]) {
      return Vec3.create(defaulTemperatures[value][0], defaulTemperatures[value][1], defaulTemperatures[value][2]);
    }
  
    value /= 100;
  
    if (value <= 66) {
      r = 255;
      g = parseFloat((99.4708025861 * Math.log(value) - 161.1195681661).toFixed(0));
    } else {
      r = parseFloat((329.698727446 * Math.pow(value - 60, -0.1332047592)).toFixed(0));
      g = parseFloat((288.1221695283 * Math.pow(value - 60, -0.0755148492)).toFixed(0));
    }
  
    if (value >= 66) {
      b = 255;
    } else if (value <= 19) {
      b = 0;
    } else {
      b = parseFloat((138.5177312231 * Math.log(value - 10) - 305.0447927307).toFixed(0));
    }
  
    return Vec3.create(byte(r), byte(g), byte(b));
  }

  public static compose(translation: Vec3, quaternion: Quaternion, scale: Vec3): Mat4 {
    const x = quaternion.x;
    const y = quaternion.y;
    const z = quaternion.z;
    const w = quaternion.w;

    const x2 = x + x;
    const y2 = y + y;
    const z2 = z + z;

    const xx = x * x2;
    const xy = x * y2;
    const xz = x * z2;

    const yy = y * y2;
    const yz = y * z2;
    const zz = z * z2;

    const wx = w * x2;
    const wy = w * y2;
    const wz = w * z2;

    const sx = scale.x;
    const sy = scale.y;
    const sz = scale.z;

    const out: Mat4 = Mat4.empty();

    out.set(0, (1 - (yy + zz)) * sx);
    out.set(1, (xy + wz) * sx);
    out.set(2, (xz - wy) * sx);
    out.set(3, 0);
    out.set(4, (xy - wz) * sy);
    out.set(5, (1 - (xx + zz)) * sy);
    out.set(6, (yz + wx) * sy);
    out.set(7, 0);
    out.set(8, (xz + wy) * sz);
    out.set(9, (yz - wx) * sz);
    out.set(10, (1 - (xx + yy)) * sz);
    out.set(11, 0);
    out.set(12, translation.x);
    out.set(13, translation.y);
    out.set(14, translation.z);
    out.set(15, 1);

    return out;
  }

  public static verifyWebGl1(): boolean {
    return gl1;
  }

  public static verifyWebGl2(): boolean {
    return (gl2 && !forceGL1);
  }

  public static createCanvas(): HTMLCanvasElement {
    let canvas: HTMLCanvasElement = document.createElement('canvas');
    canvas.innerHTML = 'This browser does not support HTML5';
  
    return canvas;
  }

  public static createWebgl1(canvas?: HTMLCanvasElement, options?: WebGLContextAttributes): WebGLRenderingContext {
    if (WebglUtility.verifyWebGl1() == false) {
      return null;
    }
  
    if (!canvas) {
      canvas = WebglUtility.createCanvas();
    }
  
    let gl: WebGLRenderingContext = canvas.getContext('webgl', options);
  
    if (!gl) {
      throw new Error('Could not get context, there was an unknown error.');
    }
  
    return gl;
  }

  public static createWebgl2(canvas?: HTMLCanvasElement, options?: WebGLContextAttributes): WebGL2RenderingContext {
    if (WebglUtility.verifyWebGl2() == false) {
      return null;
    }
  
    if (!canvas) {
      canvas = WebglUtility.createCanvas();
    }
  
    let gl: WebGL2RenderingContext = canvas.getContext('webgl2', options);
  
    if (!gl) {
      throw new Error('Could not get context, there was an unknown error.');
    }
  
    return gl;
  }

  public static createProgram(
      gl: WebGLRenderingContext | WebGL2RenderingContext,
      vertexShader: WebGLShader,
      fragmentShader: WebGLShader): WebGLProgram {
    let program: WebGLProgram = gl.createProgram();

    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);

    gl.linkProgram(program);

    if (!(gl.getProgramParameter(program, gl.LINK_STATUS))) {
      throw ('Program failed to link: ' + gl.getProgramInfoLog (program));
    }

    return program;
  }

  public static webglResize(gl: WebGLRenderingContext | WebGL2RenderingContext, width: number, height: number): void {  
    gl.canvas.width = width;
    gl.canvas.height = height;
  
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
    gl.clearColor(1, 1, 1, 1);
    gl.clearDepth(1.0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
  }

  public static compileShader(gl: WebGLRenderingContext | WebGL2RenderingContext, shaderType: number, shaderSource: string): WebGLShader {
    let shader = gl.createShader(shaderType);
  
    gl.shaderSource(shader, shaderSource);
    gl.compileShader(shader);
  
    if (!(gl.getShaderParameter(shader, gl.COMPILE_STATUS))) {
      gl.deleteShader(shader);
  
      throw 'Could not compile shader: ' + gl.getShaderInfoLog(shader);
    }
  
    return shader;
  }

  public static setRectangle(gl: WebGLRenderingContext | WebGL2RenderingContext, x: number, y: number, width: number, height: number): void {
    const x1 = x;
    const x2 = x + width;
    const y1 = y;
    const y2 = y + height;

    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
      x1, y1,
      x2, y1,
      x1, y2,
      x1, y2,
      x2, y1,
      x2, y2,
    ]), gl.STATIC_DRAW);
  }

  private _canvas: HTMLCanvasElement;
  public get canvas(): HTMLCanvasElement {
    return this._canvas;
  }

  private _gl: WebGLRenderingContext | WebGL2RenderingContext;
  public get gl(): WebGLRenderingContext | WebGL2RenderingContext {
    return this._gl;
  }

  private _programs: Map<string, WebGLProgram>;
  private _programInUse: string;
  public get program(): WebGLProgram {
    return this._programs.get(this._programInUse);
  }

  constructor(allowWebGL2Only: boolean, webGLoptions?: WebGLContextAttributes) {
    this._canvas = WebglUtility.createCanvas();
    this._programs = new Map();
    this._programInUse = '';

    if (allowWebGL2Only == true && WebglUtility.verifyWebGl2() == false) {
      throw 'WebGL2 not supported!';
    }

    if (WebglUtility.verifyWebGl2()) {
      this._gl = WebglUtility.createWebgl2(this.canvas, webGLoptions);

      return;
    }

    if (WebglUtility.verifyWebGl1()) {
      this._gl = WebglUtility.createWebgl1(this.canvas, webGLoptions);

      return;
    }
  }

  public resize(width: number, height: number): void {
    WebglUtility.webglResize(this.gl, width, height);
  }

  public createProgram(programName: string, vertexShader: string, fragmentShader: string): void {
    try
    {
      const program = WebglUtility.createProgram(
        this.gl,
        WebglUtility.compileShader(this.gl, this.gl.VERTEX_SHADER, vertexShader),
        WebglUtility.compileShader(this.gl, this.gl.FRAGMENT_SHADER, fragmentShader),
      );
  
      this._programInUse = programName;
      this._programs.set(this._programInUse, program);
    }
    catch(err)
    {
      console.error(err);
    }

  }

  public enableDepthTest(): void {
    this.gl.enable(this.gl.DEPTH_TEST);
  }

  public enableCullFace(): void {
    this.gl.enable(this.gl.CULL_FACE);
  }

  public setUniforms(uniforms: Array<UniformData>): void {
		for (let uniform of uniforms) {
      try
      {
        const uniformLocation: WebGLUniformLocation = this.gl.getUniformLocation(this.program, uniform.name);
        const setter: 'uniform1f' | 'uniform1fv' | 'uniform1i' | 'uniform1iv' | 'uniform2f' | 'uniform2fv' | 'uniform2i' | 'uniform2iv' | 'uniform3f' | 'uniform3fv' | 'uniform3i' | 'uniform3iv' | 'uniform4f' | 'uniform4fv' | 'uniform4i' | 'uniform4iv' | 'uniformMatrix2fv' | 'uniformMatrix3fv' | 'uniformMatrix4fv' = ('uniform' + uniform.type) as any;
  
        (this.gl[setter]).apply(this.gl, [uniformLocation, uniform.value]);
      }
      catch(err)
      {
        console.error(err);
      }
    }
	}

  public useProgram(programName: string): void {
    this._programInUse = programName;
  }

}
