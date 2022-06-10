import { FloatArray, FloatArrayType } from "../helpers/float-array";
import { Vec3 } from "./vec3";
import { Vec4 } from "./vec4";
import { Mat3 } from "./mat3";
import { Mat4 } from "./mat4";

const epsilon = 1e-16;
const dotThreshold = 0.9995; 
const baseSize: number = 4;
const baseSizeReducedByOne = baseSize - 1;

function logHypot(a: number, b: number): number {

  const _a = Math.abs(a);
  const _b = Math.abs(b);

  if (a === 0) {
    return Math.log(_b);
  }

  if (b === 0) {
    return Math.log(_a);
  }

  if (_a < 3000 && _b < 3000) {
    return Math.log(a * a + b * b) * 0.5;
  }

  return Math.log(a / Math.cos(Math.atan2(b, a)));
}

export class Quaternion {

  private vec: FloatArrayType;

  public get w(): number {
    return this.vec[0];
  }

  public get x(): number {
    return this.vec[1];
  }

  public get y(): number {
    return this.vec[2];
  }

  public get z(): number {
    return this.vec[3];
  }

  constructor(objToCopy?: Quaternion | Vec4 | FloatArrayType) {
    this.vec = new FloatArray(baseSize);

    this.vec[0] = 1;
    this.vec[1] = 0;
    this.vec[2] = 0;
    this.vec[3] = 0;

    if (!objToCopy) {
      return this;
    }

    if ((objToCopy instanceof Quaternion) || objToCopy instanceof Vec4) {
      this.vec[0] = objToCopy.get(0);
      this.vec[1] = objToCopy.get(1);
      this.vec[2] = objToCopy.get(2);
      this.vec[3] = objToCopy.get(3);

      return this;
    }

    if (objToCopy instanceof FloatArray) {
      this.vec[0] = objToCopy[0];
      this.vec[1] = objToCopy[1];
      this.vec[2] = objToCopy[2];
      this.vec[3] = objToCopy[3];

      return this;
    }

    return this;
  }

  public size(): number {
    return this.vec.length;
  }

  public iterate(proc: (key: number, value: number) => void): void {
    try
    {
      for (let key: number = 0; key < this.vec.length; key++) {
        proc(key, this.vec[key]);
      }
    }
    catch (err)
    {
      console.log(err);
    }
  }

  public toString(): string {
    return this.vec.toString();
  }

  public toArray(): FloatArrayType {
    return this.vec.slice();
  }

  public toVec4(): Vec4 {
    return Vec4.create(this.w, this.x, this.y, this.z);
  }

  public toMat3(): Mat3 {
    const out = Mat3.empty();

    const n = Quaternion.normSquared(this);
    const s = (n === 0) ? 0 : (2 / n);

    const wx = s * this.w * this.x, wy = s * this.w * this.y, wz = s * this.w * this.z;
    const xx = s * this.x * this.x, xy = s * this.x * this.y, xz = s * this.x * this.z;
    const yy = s * this.y * this.y, yz = s * this.y * this.z, zz = s * this.z * this.z;

    out.set(0, 1 - (yy + zz));
    out.set(1, xy - wz);
    out.set(2, xz + wy);
    out.set(3, xy + wz);
    out.set(4, 1 - (xx + zz));
    out.set(5, yz - wx);
    out.set(6, xz - wy);
    out.set(7, yz + wx);
    out.set(8, 1 - (xx + yy));

    return out; 
  }

  public toMat4(): Mat4 {
    const out = Mat4.empty();

    const n = Quaternion.normSquared(this);
    const s = (n === 0) ? 0 : (2 / n);

    const wx = s * this.w * this.x, wy = s * this.w * this.y, wz = s * this.w * this.z;
    const xx = s * this.x * this.x, xy = s * this.x * this.y, xz = s * this.x * this.z;
    const yy = s * this.y * this.y, yz = s * this.y * this.z, zz = s * this.z * this.z;

    out.set(0, 1 - (yy + zz));
    out.set(1, xy - wz);
    out.set(2, xz + wy);
    out.set(3, 0);
    out.set(4, xy + wz);
    out.set(5, 1 - (xx + zz));
    out.set(6, yz - wx);
    out.set(7, 0);
    out.set(8, xz - wy);
    out.set(9, yz + wx);
    out.set(10, 1 - (xx + yy));
    out.set(11, 0);
    out.set(12, 0);
    out.set(13, 0);
    out.set(14, 0);
    out.set(15, 1);
    
    return out;
  }

  public getReal(): number {
    return this.w;
  }

  public getImaginary(): Vec3 {
    return Vec3.create(this.x, this.y, this.z);
  }

  public get(pos: number): number {
    try
    {
      return this.vec[pos];
    }
    catch(err)
    {
      return 0;
    }
  }

  public set(pos: number, value: number): void {
    if (typeof(pos) !== 'number' || typeof(value) !== 'number') {
      return;
    }

    if (pos > baseSizeReducedByOne) {
      return;
    }

    this.vec[pos] = value;
  }

  public isFinite(): boolean {
    return isFinite(this.w) && isFinite(this.x) && isFinite(this.y) && isFinite(this.z);
  }

  public isNaN(): boolean {
    return isNaN(this.w) || isNaN(this.x) || isNaN(this.y) || isNaN(this.z);
  }

  public rotateVec3(v: Vec3): Vec3 {
    const tx = 2 * (this.y * v.z - this.z * v.y);
    const ty = 2 * (this.z * v.x - this.x * v.z);
    const tz = 2 * (this.x * v.y - this.y * v.x);

    return Vec3.create(
      v.x + this.w * tx + this.y * tz - this.z * ty,
      v.y + this.w * ty + this.z * tx - this.x * tz,
      v.z + this.w * tz + this.x * ty - this.y * tx
    );
  }

  public static getConstructionObject(): Float32ArrayConstructor | ArrayConstructor {
    return FloatArray;
  }

  public static copy(q: Quaternion): Quaternion {
    try
    {
      return new Quaternion(q);
    }
    catch (err)
    {
      return null;
    }
  }

  public static empty(): Quaternion {
    return new Quaternion();
  }

  public static create(v0: number, v1: number, v2: number, v3: number): Quaternion {
    const out: Quaternion = this.empty();

    out.set(0, v0);
    out.set(1, v1);
    out.set(2, v2);
    out.set(3, v3);

    return out;
  }

  public static createZero(): Quaternion {
    const out: Quaternion = this.empty();

    out.set(0, 0);

    return out;
  }

  
  public static createFromAxisAngle(axis: Vec3, angleInRadians: number): Quaternion {
    const halfAngle = angleInRadians * 0.5;
    const sinNorm = Math.sin(halfAngle) / Math.sqrt(axis.x * axis.x + axis.y * axis.y + axis.z * axis.z);

    return this.create(Math.cos(halfAngle), axis.x * sinNorm, axis.y * sinNorm, axis.z * sinNorm);
  }

  public static createFromBetweenVectors(v1: Vec3, v2: Vec3): Quaternion {
    const dot = v1.x * v2.x + v1.y * v2.y + v1.z * v2.z;
    const w1 = v1.y * v2.z - v1.z * v2.y;
    const w2 = v1.z * v2.x - v1.x * v2.z;
    const w3 = v1.x * v2.y - v1.y * v2.x;

    const q1 = this.create(dot + Math.sqrt(dot * dot + w1 * w1 + w2 * w2 + w3 * w3), w1, w2, w3);

    return this.normalize(q1);
  }

  public static createRandom(): Quaternion {
    const x = Math.random();
    const y = Math.random();
    const z = Math.random();

    const a = Math.sqrt(1 - x);
    const b = Math.sqrt(x);

    return this.create(
      b * Math.cos(2 * Math.PI * z),
      a * Math.sin(2 * Math.PI * y),
      a * Math.cos(2 * Math.PI * y),
      b * Math.sin(2 * Math.PI * z)
    );
  }

  public static createFromRotationMatrix(m: Mat4): Quaternion {
    const trace = m.get(0) + m.get(5) + m.get(10);

    if (trace > 0) {
      const s = 0.5 / Math.sqrt(trace + 1);

      return this.create(
        0.25 / s,
        (m.get(6) - m.get(9)) * s,
        (m.get(8) - m.get(2)) * s,
        (m.get(1) - m.get(4)) * s
      );
    } 

    if (m.get(0) > m.get(5) && m.get(0) > m.get(10)) {
      const s = 2 * Math.sqrt(1 + m.get(0) - m.get(5) - m.get(10));

      return this.create(
        (m.get(6) - m.get(9)) / s,
        0.25 * s,
        (m.get(4) + m.get(1)) / s,
        (m.get(8) + m.get(2)) / s
      );
    } 

    if (m.get(5) > m.get(10)) {
      const s = 2 * Math.sqrt(1 + m.get(5) - m.get(0) - m.get(10));

      return this.create(
        (m.get(8) - m.get(2)) / s,
        (m.get(4) + m.get(1)) / s,
        0.25 * s,
        (m.get(9) + m.get(6)) / s
      );
    } 

    const s = 2 * Math.sqrt(1 + m.get(10) - m.get(0) - m.get(5));

    return this.create(
      (m.get(1) - m.get(4)) / s,
      (m.get(8) + m.get(2)) / s,
      (m.get(9) + m.get(6)) / s,
      0.25 * s
    );
  }

  public static createFromEuler(
      phi: number, 
      theta: number, 
      psi: number, 
      order: undefined | null | 'ZXY' | 'XYZ' | 'RPY' | 'YXZ' | 'ZYX' | 'YPR' | 'YZX' | 'XZY'): Quaternion {
    const x = phi * 0.5;
    const y = theta * 0.5;
    const z = psi * 0.5;

    const cX = Math.cos(x);
    const cY = Math.cos(y);
    const cZ = Math.cos(z);

    const sX = Math.sin(x);
    const sY = Math.sin(y);
    const sZ = Math.sin(z);

    if (!order || order === 'ZXY') {
      return this.create(
        cX * cY * cZ - sX * sY * sZ,
        cX * cZ * sY - cY * sX * sZ,
        cX * cY * sZ + cZ * sX * sY,
        cY * cZ * sX + cX * sY * sZ
      );
    }

    if (order === 'XYZ' || order === 'RPY') {
      return this.create(
        cX * cY * cZ - sX * sY * sZ,
        cY * cZ * sX + cX * sY * sZ,
        cX * cZ * sY - cY * sX * sZ,
        cX * cY * sZ + cZ * sX * sY
      );
    }

    if (order === 'YXZ') {
      return this.create(
        cX * cY * cZ + sX * sY * sZ,
        cX * cZ * sY + cY * sX * sZ,
        cY * cZ * sX - cX * sY * sZ,
        cX * cY * sZ - cZ * sX * sY
      );
    }

    if (order === 'ZYX' || order === 'YPR') {
      return this.create(
        cX * cY * cZ + sX * sY * sZ,
        cX * cY * sZ - cZ * sX * sY,
        cX * cZ * sY + cY * sX * sZ,
        cY * cZ * sX - cX * sY * sZ
      );
    }

    if (order === 'YZX') {
      return this.create(
        cX * cY * cZ - sX * sY * sZ,
        cX * cY * sZ + cZ * sX * sY,
        cY * cZ * sX + cX * sY * sZ,
        cX * cZ * sY - cY * sX * sZ
      );
    }

    if (order === 'XZY') {
      return this.create(
        cX * cY * cZ + sX * sY * sZ,
        cY * cZ * sX - cX * sY * sZ,
        cX * cY * sZ - cZ * sX * sY,
        cX * cZ * sY + cY * sX * sZ
      );
    }

    return this.create(
      cX * cY * cZ - sX * sY * sZ,
      cX * cZ * sY - cY * sX * sZ,
      cX * cY * sZ + cZ * sX * sY,
      cY * cZ * sX + cX * sY * sZ
    );
  }

  public static add(q1: Quaternion, q2: Quaternion): Quaternion {
    return this.create(q1.w + q2.w, q1.x + q2.x, q1.y + q2.y, q1.z + q2.z);
  }

  public static sub(q1: Quaternion, q2: Quaternion): Quaternion {
    return this.create(q1.w - q2.w, q1.x - q2.x, q1.y - q2.y, q1.z - q2.z);
  }

  public static normSquared(q1: Quaternion): number {
    return (q1.w * q1.w) + (q1.x * q1.x) + (q1.y * q1.y) + (q1.z * q1.z);
  }

  public static norm(q1: Quaternion): number {
    return Math.sqrt(this.normSquared(q1));
  }

  public static normalize(q1: Quaternion): Quaternion {
    let norm: number = this.norm(q1);

    if (norm < epsilon) {
      return this.createZero();
    }

    norm = 1 / norm;

    return this.create(q1.w * norm, q1.x * norm, q1.y * norm, q1.z * norm);
  }

  public static negate(q1: Quaternion): Quaternion {
    return this.create(0 - q1.w, 0 - q1.x, 0 - q1.y, 0 - q1.z);
  }

  public static mul(q1: Quaternion, q2: Quaternion): Quaternion {
    return this.create(
      (q1.w * q2.w) - (q1.x * q2.x) - (q1.y * q2.y) - (q1.z * q2.z),
      (q1.w * q2.x) + (q1.x * q2.w) + (q1.y * q2.z) - (q1.z * q2.y),
      (q1.w * q2.y) + (q1.y * q2.w) + (q1.z * q2.x) - (q1.x * q2.z),
      (q1.w * q2.z) + (q1.z * q2.w) + (q1.x * q2.y) - (q1.y * q2.x)
    );
  }

  public static scale(q1: Quaternion, s: number): Quaternion {
    return this.create(s * q1.w, s * q1.x, s * q1.y, s * q1.z);
  }

  public static inverse(q1: Quaternion): Quaternion {
    let normSq: number = this.normSquared(q1);

    if (normSq === 0) {
      return this.createZero();
    }

    normSq = 1 / normSq;

    return this.create(q1.w * normSq, (0 - q1.x) * normSq, (0 - q1.y) * normSq, (0 - q1.z) * normSq);
  }

  public static div(q1: Quaternion, q2: Quaternion): Quaternion {
    let normSq: number = this.normSquared(q2);

    if (normSq === 0) {
      return this.createZero();
    }

    normSq = 1 / normSq;

    return this.create(
      ((q1.w * q2.w) + (q1.x * q2.x) + (q1.y * q2.y) + (q1.z * q2.z)) * normSq,
      ((q1.x * q2.w) - (q1.w * q2.x) - (q1.y * q2.z) + (q1.z * q2.y)) * normSq,
      ((q1.y * q2.w) - (q1.w * q2.y) - (q1.z * q2.x) + (q1.x * q2.z)) * normSq,
      ((q1.z * q2.w) - (q1.w * q2.z) - (q1.x * q2.y) + (q1.y * q2.x)) * normSq
    );
  }

  public static conjugate(q1: Quaternion): Quaternion {
    return this.create(q1.w, 0 - q1.x, 0 - q1.y, 0 - q1.z);
  }

  public static exp(q1: Quaternion): Quaternion {
    const vNorm = Math.sqrt((q1.x * q1.x) + (q1.y * q1.y) + (q1.z * q1.z));
    const wExp = Math.exp(q1.w);
    const scale = wExp / vNorm * Math.sin(vNorm);

    if (vNorm === 0) {
      return this.create(wExp, 0, 0, 0);
    }

    return this.create(wExp * Math.cos(vNorm), q1.x * scale, q1.y * scale, q1.z * scale);
  }

  public static log(q1: Quaternion): Quaternion {
    if (q1.y === 0 && q1.z === 0) {
      return this.create(logHypot(q1.w, q1.x), Math.atan2(q1.x, q1.w), 0, 0);
    }

    const qNorm = this.normSquared(q1);
    const vNorm = Math.sqrt((q1.x * q1.x) + (q1.y * q1.y) + (q1.z * q1.z));
    const scale = Math.atan2(vNorm, q1.w) / vNorm;

    return this.create(
      Math.log(qNorm) * 0.5,
      q1.x * scale,
      q1.y * scale,
      q1.z * scale
    );
  }

  public static pow(q1: Quaternion, q2: Quaternion): Quaternion {
    if (q2.y !== 0 || q2.z !== 0) {
      return this.exp(this.mul(this.log(q1), q2));
    }
    
    if (q2.w === 1 && q2.x === 0) {
      return this.create(q1.w, q1.x, q1.y, q1.z);
    }

    if (q2.w === 0 && q2.x === 0) {
      return this.empty();
    }

    if (q1.y === 0 && q1.z === 0) {
      if (q1.w === 0 && q1.x === 0) {
        return this.createZero();
      }

      if (q2.x === 0) {
        if (q1.x === 0 && q1.w >= 0) {
          return this.create(Math.pow(q1.w, q2.w), 0, 0, 0);
        }

        if (q1.w === 0) {
          switch (q2.w % 4) {
            case 0:
              return this.create(Math.pow(q1.x, q2.w), 0, 0, 0);
            case 1:
              return this.create(0, Math.pow(q1.x, q2.w), 0, 0);
            case 2:
              return this.create(-Math.pow(q1.x, q2.w), 0, 0, 0);
            case 3:
              return this.create(0, -Math.pow(q1.x, q2.w), 0, 0);
          }
        }
      }

      const arg = Math.atan2(q1.x, q1.w);
      const loh = logHypot(q1.w, q1.x);
      const a = Math.exp((q2.w * loh) - (q2.x  * arg));
      const b = (q2.x * loh) + (q2.w * arg);
      
      return this.create(a * Math.cos(b), a * Math.sin(b), 0, 0);
    }

    return this.exp(this.mul(this.log(q1), q2));
  }

  public static slerp(q1: Quaternion, q2: Quaternion, pct: number): Quaternion {
    let w1 = q1.w;
    let x1 = q1.x;
    let y1 = q1.y;
    let z1 = q1.z;

    let w2 = q2.w;
    let x2 = q2.x;
    let y2 = q2.y;
    let z2 = q2.z;

    let cosTheta0 = w1 * w2 + x1 * x2 + y1 * y2 + z1 * z2;

    if (cosTheta0 < 0) {
      w1 = -w1;
      x1 = -x1;
      y1 = -y1;
      z1 = -z1;
      cosTheta0 = -cosTheta0;
    }

    if (cosTheta0 > dotThreshold) {
      const q = this.create(
        w1 + pct * (w2 - w1),
        x1 + pct * (x2 - x1),
        y1 + pct * (y2 - y1),
        z1 + pct * (z2 - z1)
      );

      return this.normalize(q);
    }

    const Theta0 = Math.acos(cosTheta0);
    const sinTheta0 = Math.sin(Theta0);
    const Theta = Theta0 * pct;
    const sinTheta = Math.sin(Theta);
    const cosTheta = Math.cos(Theta);
    const s0 = cosTheta - cosTheta0 * sinTheta / sinTheta0;
    const s1 = sinTheta / sinTheta0;

    return this.create(
      s0 * w1 + s1 * w2,
      s0 * x1 + s1 * x2,
      s0 * y1 + s1 * y2,
      s0 * z1 + s1 * z2
    );
  }

}
