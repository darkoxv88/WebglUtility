/**
  * 
	* @author Darko Petrovic
  * @Link Facebook: https://www.facebook.com/WitchkingOfAngmarr
  * @Link GitHub: https://github.com/darkoxv88
  * 
  
  Permission is hereby granted, free of charge, to any person obtaining a copy
	of this software and associated documentation files (the "Software"), to deal
	in the Software without restriction, including without limitation the rights
	to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	copies of the Software, and to permit persons to whom the Software is
	furnished to do so, subject to the following conditions:
	The above copyright notice and this permission notice shall be included in
	all copies or substantial portions of the Software.

	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
	THE SOFTWARE.


exports:

  window.WebglUtility;

**/

declare type FloatArrayType = Float32Array | Array<number>;

declare class Vec2 {

	public get x(): number;
	public get y(): number;

	constructor(objToCopy?: FloatArrayType | Vec2);

	public size(): number;
	public iterate(proc: (key: number, value: number) => void): void;
	public toString(): string;
	public toArray(): FloatArrayType;
	public get(pos: number): number;
	public set(pos: number, value: number): void;
	public add(v: Vec2): Vec2;
	public sub(v: Vec2): Vec2;
	public normalize(): Vec2;
	public static getConstructionObject(): Float32ArrayConstructor | ArrayConstructor;
	public static copy(m: Vec2): Vec2;
	public static empty(): Vec2;
	public static create(v0: number, v1: number): Vec2;
	public static add(v1: Vec2, v2: Vec2): Vec2;
	public static sub(v1: Vec2, v2: Vec2): Vec2;
	public static mul(v1: Vec2, v2: Vec2): Vec2;
	public static div(v1: Vec2, v2: Vec2): Vec2;
	public static min(v1: Vec2, v2: Vec2): Vec2;
	public static max(v1: Vec2, v2: Vec2): Vec2;
	public static scale(v1: Vec2, scale: number): Vec2;
	public static distance(v1: Vec2, v2: Vec2): number;
	public static distanceSqrt(v1: Vec2, v2: Vec2): number;
	public static negate(v1: Vec2): Vec2;
	public static dotProduct(v1: Vec2, v2: Vec2): number;
	public static vecLenght(v1: Vec2): number;
	public static inverse(v1: Vec2): Vec2;
	public static normalize(v1: Vec2): Vec2;
}

declare class Vec3 {

	public get x(): number;
	public get y(): number;
	public get z(): number;

	constructor(objToCopy?: FloatArrayType | Vec3);

	public size(): number;
	public iterate(proc: (key: number, value: number) => void): void;
	public toString(): string;
	public toArray(): FloatArrayType;
	public toVec2(): Vec2;
	public xy(): Vec2;
	public get(pos: number): number;
	public set(pos: number, value: number): void;
	public add(v: Vec3): Vec3;
	public sub(v: Vec3): Vec3;
	public normalize(): Vec3;
	public static getConstructionObject(): Float32ArrayConstructor | ArrayConstructor;
	public static copy(m: Vec3): Vec3;
	public static empty(): Vec3;
	public static create(v0: number, v1: number, v2: number): Vec3;
	public static add(v1: Vec3, v2: Vec3): Vec3;
	public static sub(v1: Vec3, v2: Vec3): Vec3;
	public static mul(v1: Vec3, v2: Vec3): Vec3;
	public static div(v1: Vec3, v2: Vec3): Vec3;
	public static min(v1: Vec3, v2: Vec3): Vec3;
	public static max(v1: Vec3, v2: Vec3): Vec3;
	public static scale(v1: Vec3, scale: number): Vec3;
	public static distance(v1: Vec3, v2: Vec3): number;
	public static distanceSqrt(v1: Vec3, v2: Vec3): number;
	public static negate(v1: Vec3): Vec3;
	public static dotProduct(v1: Vec3, v2: Vec3): number;
	public static vecLenght(v1: Vec3): number;
	public static inverse(v1: Vec3): Vec3;
	public static normalize(v1: Vec3): Vec3;
	public static crossProduct(v1: Vec3, v2: Vec3): Vec3;

}

declare class Vec4 {

	public get x(): number;
	public get y(): number;
	public get z(): number;
	public get w(): number;

	constructor(objToCopy?: FloatArrayType | Vec4);

	public size(): number;
	public iterate(proc: (key: number, value: number) => void): void;
	public toString(): string;
	public toArray(): FloatArrayType;
	public toVec2(): Vec2;
	public xy(): Vec2;
	public toVec3(): Vec3;
	public xyz(): Vec3;
	public get(pos: number): number;
	public set(pos: number, value: number): void;
	public add(v: Vec4): Vec4;
	public sub(v: Vec4): Vec4;
	public normalize(): Vec4;
	public static getConstructionObject(): Float32ArrayConstructor | ArrayConstructor;
	public static copy(m: Vec4): Vec4;
	public static empty(): Vec4;
	public static create(v0: number, v1: number, v2: number, v3: number): Vec4;
	public static add(v1: Vec4, v2: Vec4): Vec4;
	public static sub(v1: Vec4, v2: Vec4): Vec4;
	public static mul(v1: Vec4, v2: Vec4): Vec4;
	public static div(v1: Vec4, v2: Vec4): Vec4;
	public static min(v1: Vec4, v2: Vec4): Vec4;
	public static max(v1: Vec4, v2: Vec4): Vec4;
	public static scale(v1: Vec4, scale: number): Vec4;
	public static distance(v1: Vec4, v2: Vec4): number;
	public static distanceSqrt(v1: Vec4, v2: Vec4): number;
	public static negate(v1: Vec4): Vec4;
	public static dotProduct(v1: Vec4, v2: Vec4): number;
	public static vecLenght(v1: Vec4): number;
	public static inverse(v1: Vec4): Vec4;
	public static normalize(v1: Vec4): Vec4;

}

declare class Mat2 {

	constructor(objToCopy?: FloatArrayType | Mat2);

	public size(): number;
	public iterate(proc: (key: number, value: number) => void): void;
	public toString(): string;
	public toArray(): FloatArrayType;
	public get(pos: number): number;
	public set(pos: number, value: number): void;
	public transpose(): Mat2;
	public static getConstructionObject(): Float32ArrayConstructor | ArrayConstructor;
	public static copy(m: Mat2): Mat2;
	public static empty(): Mat2;
	public static createIdentityMatrix(): Mat2;
	public static transpose(m: Mat2): Mat2;
	public static determinant(m: Mat2): number;
	public static invert(m: Mat2): Mat2;
	public static mul(m1: Mat2, m2: Mat2): Mat2;
	public static scale(m: Mat2, v: Vec2): Mat2;
	public static adjugate(m: Mat2): Mat2;

}

declare class Mat3 {

	constructor(objToCopy?: FloatArrayType | Mat3);

	public size(): number;
	public iterate(proc: (key: number, value: number) => void): void;
	public toString(): string;
	public toArray(): FloatArrayType;
	public get(pos: number): number;
	public set(pos: number, value: number): void;
	public transpose(): Mat3;
	public static getConstructionObject(): Float32ArrayConstructor | ArrayConstructor;
	public static copy(m: Mat3): Mat3;
	public static empty(): Mat3;
	public static createIdentityMatrix(): Mat3;
	public static transpose(m: Mat3): Mat3;
	public static determinant(m: Mat3): number;
	public static invert(m: Mat3): Mat3;
	public static mul(m1: Mat3, m2: Mat3): Mat3;
	public static scale(m: Mat3, v: Vec3): Mat3;

}

declare class Mat4 {

	constructor(objToCopy?: FloatArrayType | Mat4);

	public size(): number;
	public iterate(proc: (key: number, value: number) => void): void;
	public toString(): string;
	public toArray(): FloatArrayType;
	public get(pos: number): number;
	public set(pos: number, value: number): void;
	public transpose(): Mat4;
	public transformVector(v: Vec4): Vec4;
	public transformPoint(v: Vec3): Vec3;
	public transformNormal(v: Vec3): Vec3;
	public static getConstructionObject(): Float32ArrayConstructor | ArrayConstructor;
	public static copy(m: Mat3): Mat3;
	public static empty(): Mat4;
	public static createIdentityMatrix(): Mat4;
	public static createPerspective(fieldOfViewInRadians: number, aspect: number, near: number, far: number): Mat4;
	public static createOrthographic(left: number, right: number, bottom: number, top: number, near: number, far: number): Mat4;
	public static createFrustum(left: number, right: number, bottom: number, top: number, near: number, far: number): Mat4;
	public static createTranslation(x: number, y: number, z: number): Mat4;
	public static createRotationX(angleInRadians: number): Mat4;
	public static createRotationY(angleInRadians: number): Mat4;
	public static createRotationZ(angleInRadians: number): Mat4;
	public static createAxisRotation(axis: Vec3, angleInRadians: number): Mat4;
	public static createScalingMat(v3: Vec3): Mat4;
	public static transpose(m: Mat4): Mat4;
	public static mul(m1: Mat4, m2: Mat4): Mat4;
	public static scale(m: Mat4, v: Vec4): Mat4;
	public static translate(m: Mat4, x: number, y: number, z: number): Mat4;
	public static rotateX(m: Mat4, angleInRadians: number): Mat4;
	public static rotateY(m: Mat4, angleInRadians: number): Mat4;
	public static rotateZ(m: Mat4, angleInRadians: number): Mat4;
	public static rotateAxis(m: Mat4, axis: Vec3, angleInRadians: number): Mat4;
	public static scaleWithScalingMat(m: Mat4, v: Vec3 | Mat4): Mat4;
	public static determinate(m: Mat4): number;
	public static inverse(m: Mat4): Mat4;

}

declare class Quaternion {

	public get w(): number;
	public get x(): number;
	public get y(): number;
	public get z(): number;

	constructor(objToCopy: Quaternion | Vec4 | FloatArrayType | null);

	public size(): number;
	public iterate(proc: (key: number, value: number) => void): void;
	public toString(): string;
	public toArray(): FloatArrayType;
	public toVec4(): Vec4;
	public toMat3(): Mat3;
	public toMat4(): Mat4;
	public getReal(): number;
	public getImaginary(): Vec3;
	public get(pos: number): number;
	public set(pos: number, value: number): void;
	public isFinite(): boolean;
	public isNaN(): boolean;
	public rotateVec3(v: Vec3): Vec3;
	public static getConstructionObject(): Float32ArrayConstructor | ArrayConstructor;
	public static copy(m: Quaternion): Quaternion;
	public static empty(): Quaternion;
	public static create(v0: number, v1: number, v2: number, v3: number): Quaternion;
	public static createZero(): Quaternion;
	public static createFromAxisAngle(axis: Vec3, angleInRadians: number): Quaternion;
	public static createFromBetweenVectors(v1: Vec3, v2: Vec3): Quaternion;
	public static createRandom(): Quaternion;
	public static createFromRotationMatrix(m: Mat4): Quaternion;
	public static createFromEuler(
		phi: number, 
		theta: number, 
		psi: number, 
		order: undefined | null | 'ZXY' | 'XYZ' | 'RPY' | 'YXZ' | 'ZYX' | 'YPR' | 'YZX' | 'XZY'
	): Quaternion
	public static add(q1: Quaternion, q2: Quaternion): Quaternion;
	public static sub(q1: Quaternion, q2: Quaternion): Quaternion;
	public static normSquared(q1: Quaternion): number;
	public static norm(q1: Quaternion): number;
	public static normalize(q1: Quaternion): Quaternion;
	public static negate(q1: Quaternion): Quaternion;
	public static mul(q1: Quaternion, q2: Quaternion): Quaternion;
	public static scale(q1: Quaternion, s: number): Quaternion;
	public static inverse(q1: Quaternion): Quaternion;
	public static div(q1: Quaternion, q2: Quaternion): Quaternion;
	public static conjugate(q1: Quaternion): Quaternion;
	public static exp(q1: Quaternion): Quaternion
	public static pow(q1: Quaternion, q2: Quaternion): Quaternion;
	public static slerp(q1: Quaternion, q2: Quaternion, pct: number): Quaternion;

}

declare class UniformData {
  type: '1f' | '1fv' | '1i' | '1iv' | '2f' | '2fv' | '2i' | '2iv' | '3f' | '3fv' | '3i' | '3iv' | '4f' | '4fv' | '4i' | '4iv' | 'Matrix2fv' | 'Matrix3fv' | 'Matrix4fv';
  name: string;
  value: any;
}

export declare class WebglUtility {

	public static Vec2: typeof Vec2;
	public static Vec3: typeof Vec3;
	public static Vec4: typeof Vec4;
	public static Mat2: typeof Mat2;
	public static Mat3: typeof Mat3;
	public static Mat4: typeof Mat4;
	public static Quaternion: typeof Quaternion;

	public static onStartFrame(cb: () => void): void;
	public static onUpdateFrame(cb: (currentTime: number, deltaTime: number, totalElapsedTime: number) => void): void;
	public static startFrames(): void;
	public static killFrames(): void;
	public static pauseFrames(): void;
	public static unpauseFrames(): void;
	public static stopFrames(): void;
	public static resumeFrames(): void;

	public static radToDeg(rad: number): number;
	public static degToRad(deg: number): number;
	public static colorTemperatureToRgb(value: number): Vec3;
	public static compose(translation: Vec3, quaternion: Quaternion, scale: Vec3): Mat4;
	
	public static verifyWebGl1(): boolean;
	public static verifyWebGl2(): boolean;
	public static createCanvas(): HTMLCanvasElement;
	public static createWebgl1(canvas?: HTMLCanvasElement, options?: WebGLContextAttributes): WebGLRenderingContext;
	public static createWebgl2(canvas?: HTMLCanvasElement, options?: WebGLContextAttributes): WebGL2RenderingContext;
	public static createProgram(gl: WebGLRenderingContext | WebGL2RenderingContext, vertexShader: WebGLShader, fragmentShader: WebGLShader): WebGLProgram;
	public static webglResize(gl: WebGLRenderingContext | WebGL2RenderingContext, canvas: HTMLCanvasElement, width: number, height: number): void;
	public static compileShader(gl: WebGLRenderingContext | WebGL2RenderingContext, shaderType: number, shaderSource: string): WebGLShader
	public static setRectangle(gl: WebGLRenderingContext | WebGL2RenderingContext, x: number, y: number, width: number, height: number): void;

	public get canvas(): HTMLCanvasElement;
	public get gl(): WebGLRenderingContext | WebGL2RenderingContext;
	public get program(): WebGLProgram;

	constructor(allowWebGL2Only: boolean, webGLoptions?: WebGLContextAttributes);

	public resize(width: number, height: number): void;
	public createProgram(programName: string, vertexShader: string, fragmentShader: string): void;
	public enableDepthTest(): void;
	public enableCullFace(): void
	public setUniforms(uniforms: Array<UniformData>): void;
	public useProgram(programName: string): void;

}
