import { FloatArray, FloatArrayType } from "../helpers/float-array";
import { IArrayLike } from "../interfaces/i-array-like";
import { matTranspose } from "../helpers/mat-transpose";
import { matMul } from "../helpers/mat-mul";
import { Vec3 } from './vec3';
import { Vec4 } from "./vec4";

const baseSize: number = 16;
const baseSizeReducedByOne = baseSize - 1;

export class Mat4 implements IArrayLike {

  private mat: FloatArrayType;

  constructor(objToCopy?: FloatArrayType | Mat4) {
    this.mat = new FloatArray(baseSize);

    for (let i = 0; i < baseSize; i++) {
      this.mat[i] = 0;
    }

    if (!objToCopy) {
      return this;
    }

    if (objToCopy instanceof Mat4) {
      this.mat[0] = objToCopy.get(0);
      this.mat[1] = objToCopy.get(1);
      this.mat[2] = objToCopy.get(2);
      this.mat[3] = objToCopy.get(3);
      this.mat[4] = objToCopy.get(4);
      this.mat[5] = objToCopy.get(5);
      this.mat[6] = objToCopy.get(6);
      this.mat[7] = objToCopy.get(7);
      this.mat[8] = objToCopy.get(8);
      this.mat[9] = objToCopy.get(9);
      this.mat[10] = objToCopy.get(10);
      this.mat[11] = objToCopy.get(11);
      this.mat[12] = objToCopy.get(12);
      this.mat[13] = objToCopy.get(13);
      this.mat[14] = objToCopy.get(14);
      this.mat[15] = objToCopy.get(15);
      return this;
    }

    if ((objToCopy instanceof FloatArray) || Array.isArray(objToCopy)) {
      this.mat[0] = objToCopy[0];
      this.mat[1] = objToCopy[1];
      this.mat[2] = objToCopy[2];
      this.mat[3] = objToCopy[3];
      this.mat[4] = objToCopy[4];
      this.mat[5] = objToCopy[5];
      this.mat[6] = objToCopy[6];
      this.mat[7] = objToCopy[7];
      this.mat[8] = objToCopy[8];
      this.mat[9] = objToCopy[9];
      this.mat[10] = objToCopy[10];
      this.mat[11] = objToCopy[11];
      this.mat[12] = objToCopy[12];
      this.mat[13] = objToCopy[13];
      this.mat[14] = objToCopy[14];
      this.mat[15] = objToCopy[15];
      return this;
    }
  }

  public size(): number {
    return this.mat.length;
  }

  public iterate(proc: (key: number, value: number) => void): void {
    try
    {
      for (let key: number = 0; key < this.mat.length; key++) {
        proc(key, this.mat[key]);
      }
    }
    catch (err)
    {
      console.log(err);
    }
  }

  public toString(): string {
    return this.mat.toString();
  }

  public toArray(): FloatArrayType {
    return this.mat.slice();
  }

  public get(pos: number): number {
    try
    {
      return this.mat[pos];
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

    this.mat[pos] = value;
  }

  public transpose(): Mat4 {
    return Mat4.transpose(this);
  }

  public transformVector(v: Vec4): Vec4 {
    const out = Vec4.empty();

    out.set(0, 0.0);
    out.set(1, 0.0);
    out.set(2, 0.0);
    out.set(3, 0.0);

    for (var i = 0; i < 4; ++i) {
      for (var j = 0; j < 4; ++j) {
        out.set(
          i, 
          out.get(i) + (v.get(j) * this.get(j * 4 + i))
        );
      }
    }

    return out;
  }

  public transformPoint(v: Vec3): Vec3 {
    const d = v.x * this.get(3) + v.y * this.get(7) + v.z * this.get(11) + this.get(15);

    return Vec3.create(
      (v.x * this.get(0) + v.y * this.get(4) + v.z * this.get(8) + this.get(12)) / d,
      (v.x * this.get(1) + v.y * this.get(5) + v.z * this.get(9) + this.get(13)) / d,
      (v.x * this.get(2) + v.y * this.get(6) + v.z * this.get(10) + this.get(14)) / d
    );
  }

  public transformNormal(v: Vec3): Vec3 {
    const mi: Mat4 = Mat4.inverse(this);

    return Vec3.create(
      v.x * mi.get(0) + v.y * mi.get(1) + v.z * mi.get(2),
      v.x * mi.get(4) + v.y * mi.get(5) + v.z * mi.get(6),
      v.x * mi.get(8) + v.y * mi.get(9) + v.z * mi.get(10)
    );
  }

  public static getConstructionObject(): Float32ArrayConstructor | ArrayConstructor {
    return FloatArray;
  }

  public static copy(m: Mat4): Mat4 {
    try
    {
      return new Mat4(m);
    }
    catch (err)
    {
      return null;
    }
  }

  public static empty(): Mat4 {
    return new Mat4();
  }

  public static createIdentityMatrix(): Mat4 {
    const out: Mat4 = this.empty();

    out.set(0, 1);
    out.set(1, 0);
    out.set(2, 0);
    out.set(3, 0);
    out.set(4, 0);
    out.set(5, 1);
    out.set(6, 0);
    out.set(7, 0);
    out.set(8, 0);
    out.set(9, 0);
    out.set(10, 1);
    out.set(11, 0);
    out.set(12, 0);
    out.set(13, 0);
    out.set(14, 0);
    out.set(15, 1);

    return out;
  }

  public static createPerspective(fieldOfViewInRadians: number, aspect: number, near: number, far: number): Mat4 {
    const f: number = Math.tan(Math.PI * 0.5 - 0.5 * fieldOfViewInRadians);
    const rangeInv: number = 1.0 / (near - far);

    const out: Mat4 = this.empty();

    out.set(0, f / aspect);
    out.set(1, 0);
    out.set(2, 0);
    out.set(3, 0);
    out.set(4, 0);
    out.set(5, f);
    out.set(6, 0);
    out.set(7, 0);
    out.set(8, 0);
    out.set(9, 0);
    out.set(10, (near + far) * rangeInv);
    out.set(11, -1);
    out.set(12, 0);
    out.set(13, 0);
    out.set(14, 0);
    out.set(15, near * far * rangeInv * 2);

    return out;
  }

  public static createOrthographic(left: number, right: number, bottom: number, top: number, near: number, far: number): Mat4 {
    const out: Mat4 = this.empty();

    out.set(0, 2 / (right - left));
    out.set(1, 0);
    out.set(2, 0);
    out.set(3, 0);
    out.set(4, 0);
    out.set(5, 2 / (top - bottom));
    out.set(6, 0);
    out.set(7, 0);
    out.set(8, 0);
    out.set(9, 0);
    out.set(10, 2 / (near - far));
    out.set(11, 0);
    out.set(12, (left + right) / (left - right));
    out.set(13, (bottom + top) / (bottom - top));
    out.set(14, (near + far) / (near - far));
    out.set(15, 1);

    return out;
  }

  public static createFrustum(left: number, right: number, bottom: number, top: number, near: number, far: number): Mat4 {
    const x: number = right - left;
    const y: number = top - bottom;
    const z: number = far - near;

    const out: Mat4 = this.empty();

    out.set(0, 2 * near / x);
    out.set(1, 0);
    out.set(2, 0);
    out.set(3, 0);
    out.set(4, 0);
    out.set(5, 2 * near / y);
    out.set(6, 0);
    out.set(7, 0);
    out.set(8, (left + right) / x);
    out.set(9, (top + bottom) / y);
    out.set(10, -(far + near) / z);
    out.set(11, -1);
    out.set(12, 0);
    out.set(13, 0);
    out.set(14, -2 * near * far / z);
    out.set(15, 0);

    return out;
  }

  public static createTranslation(x: number, y: number, z: number): Mat4 {
    const out: Mat4 = this.empty();

    out.set(0, 1);
    out.set(1, 0);
    out.set(2, 0);
    out.set(3, 0);
    out.set(4, 0);
    out.set(5, 1);
    out.set(6, 0);
    out.set(7, 0);
    out.set(8, 0);
    out.set(9, 0);
    out.set(10, 1);
    out.set(11, 0);
    out.set(12, x);
    out.set(13, y);
    out.set(14, z);
    out.set(15, 1);

    return out;
  }

  public static createRotationX(angleInRadians: number): Mat4 {
    const out: Mat4 = this.empty();

    const a: number = Math.cos(angleInRadians);
    const b: number = Math.sin(angleInRadians);

    out.set(0, a);
    out.set(1, 0);
    out.set(2, -1 * b);
    out.set(3, 0);
    out.set(4, 0);
    out.set(5, 1);
    out.set(6, 0);
    out.set(7, 0);
    out.set(8, b);
    out.set(9, 0);
    out.set(10, a);
    out.set(11, 0);
    out.set(12, 0);
    out.set(13, 0);
    out.set(14, 0);
    out.set(15, 1);

    return out;
  }

  public static createRotationZ(angleInRadians: number): Mat4 {
    const out: Mat4 = this.empty();

    const a: number = Math.cos(angleInRadians);
    const b: number = Math.sin(angleInRadians);

    out.set(0, a);
    out.set(1, b);
    out.set(2, 0);
    out.set(3, 0);
    out.set(4, -1 * b);
    out.set(5, a);
    out.set(6, 0);
    out.set(7, 0);
    out.set(8, 0);
    out.set(9, 0);
    out.set(10, 1);
    out.set(11, 0);
    out.set(12, 0);
    out.set(13, 0);
    out.set(14, 0);
    out.set(15, 1);

    return out;
  }

  public static createRotationY(angleInRadians: number): Mat4 {
    const out: Mat4 = this.empty();

    const a: number = Math.cos(angleInRadians);
    const b: number = Math.sin(angleInRadians);

    out.set(0, 1);
    out.set(1, 0);
    out.set(2, 0);
    out.set(3, 0);
    out.set(4, 0);
    out.set(5, a);
    out.set(6, b);
    out.set(7, 0);
    out.set(8, 0);
    out.set(9, -1 * b);
    out.set(10, a);
    out.set(11, 0);
    out.set(12, 0);
    out.set(13, 0);
    out.set(14, 0);
    out.set(15, 1);

    return out;
  }

  public static createAxisRotation(axis: Vec3, angleInRadians: number): Mat4 {
    const out: Mat4 = this.empty();

    const n: number = Math.sqrt(axis.x * axis.x + axis.y * axis.y + axis.z * axis.z);
    const x: number = axis.x / n;
    const y: number = axis.y / n;
    const z: number = axis.z / n;
    const xx: number = x * x;
    const yy: number = y * y;
    const zz: number = z * z;
    const c: number = Math.cos(angleInRadians);
    const s: number = Math.sin(angleInRadians);
    const oneMinusCosine: number = 1 - c;

    out.set(0, xx + (1 - xx) * c);
    out.set(1, x * y * oneMinusCosine + z * s);
    out.set(2, x * z * oneMinusCosine - y * s);
    out.set(3, 0);
    out.set(4, x * y * oneMinusCosine - z * s);
    out.set(5, yy + (1 - yy) * c);
    out.set(6, y * z * oneMinusCosine + x * s);
    out.set(7, 0);
    out.set(8, x * z * oneMinusCosine + y * s);
    out.set(9, y * z * oneMinusCosine - x * s);
    out.set(10, zz + (1 - zz) * c);
    out.set(11, 0);
    out.set(12, 0);
    out.set(13, 0);
    out.set(14, 0);
    out.set(15, 1);

    return out;
  }

  public static createScalingMat(v3: Vec3): Mat4 {
    const out: Mat4 = this.empty();

    out.set(0, v3.x);
    out.set(1, 0);
    out.set(2, 0);
    out.set(3, 0);
    out.set(4, 0);
    out.set(5, v3.y);
    out.set(6, 0);
    out.set(7, 0);
    out.set(8, 0);
    out.set(9, 0);
    out.set(10, v3.z);
    out.set(11, 0);
    out.set(12, 0);
    out.set(13, 0);
    out.set(14, 0);
    out.set(15, 1);

    return out;
  }

  public static transpose(m: Mat4): Mat4 {
    const out: Mat4 = this.empty();

    matTranspose(m, 3, out);
    
    return out;
  }

  public static mul(m1: Mat4, m2: Mat4): Mat4 {
    const out: Mat4 = this.empty();

    matMul(m1, m2, 4, out);

    return out;
  }

  public static scale(m: Mat4, v: Vec4): Mat4 {
    const out: Mat4 = this.empty();

    out.set(0, m.get(0) * v.x);
    out.set(1, m.get(1) * v.x);
    out.set(2, m.get(2) * v.x);
    out.set(3, m.get(3) * v.x);
    out.set(4, m.get(4) * v.y);
    out.set(5, m.get(5) * v.y);
    out.set(6, m.get(6) * v.y);
    out.set(7, m.get(7) * v.y);
    out.set(8, m.get(8) * v.z);
    out.set(9, m.get(9) * v.z);
    out.set(10, m.get(10) * v.z);
    out.set(11, m.get(11) * v.z);
    out.set(12, m.get(12) * v.w);
    out.set(13, m.get(13) * v.w);
    out.set(14, m.get(14) * v.w);
    out.set(15, m.get(15) * v.w);

    return out;
  }

  public static lookAt(cameraPosition: Vec3, target: Vec3, up: Vec3): Mat4 {
    const zAxis: Vec3 = Vec3.normalize(Vec3.sub(cameraPosition, target));
    const xAxis: Vec3 = Vec3.normalize(Vec3.crossProduct(up, zAxis));
    const yAxis: Vec3 = Vec3.normalize(Vec3.crossProduct(zAxis, xAxis));

    const out: Mat4 = this.empty();

    out.set(0, xAxis.x);
    out.set(1, xAxis.y);
    out.set(2, xAxis.z);
    out.set(3, 0);
    out.set(4, yAxis.x);
    out.set(5, yAxis.y);
    out.set(6, yAxis.z);
    out.set(7, 0);
    out.set(8, zAxis.x);
    out.set(9, zAxis.y);
    out.set(10, zAxis.z);
    out.set(11, 0);
    out.set(12, cameraPosition.x);
    out.set(13, cameraPosition.y);
    out.set(14, cameraPosition.z);
    out.set(15, 1);

    return out;
  }

  public static translate(m: Mat4, x: number, y: number, z: number): Mat4 {
    return this.mul(m, this.createTranslation(x, y, z));
  }

  public static rotateX(m: Mat4, angleInRadians: number): Mat4 {
    return this.mul(m, this.createRotationX(angleInRadians));
  }

  public static rotateY(m: Mat4, angleInRadians: number): Mat4 {
    return this.mul(m, this.createRotationY(angleInRadians));
  }

  public static rotateZ(m: Mat4, angleInRadians: number): Mat4 {
    return this.mul(m, this.createRotationZ(angleInRadians));
  }

  public static rotateAxis(m: Mat4, axis: Vec3, angleInRadians: number): Mat4 {
    return this.mul(m, this.createAxisRotation(axis, angleInRadians));
  }

  public static scaleWithScalingMat(m: Mat4, v: Vec3 | Mat4): Mat4 {
    if (v instanceof Vec3) {
      return this.mul(m, this.createScalingMat(v));
    }

    return this.mul(m, v);
  }

  public static determinate(m: Mat4): number {
    const tmp_0  = m.get(10) * m.get(15);
    const tmp_1  = m.get(14) * m.get(11);
    const tmp_2  = m.get(6) * m.get(15);
    const tmp_3  = m.get(14) * m.get(7);
    const tmp_4  = m.get(6) * m.get(11);
    const tmp_5  = m.get(10) * m.get(7);
    const tmp_6  = m.get(2) * m.get(15);
    const tmp_7  = m.get(14) * m.get(3);
    const tmp_8  = m.get(2) * m.get(11);
    const tmp_9  = m.get(10) * m.get(3);
    const tmp_10 = m.get(2) * m.get(7);
    const tmp_11 = m.get(6) * m.get(3);

    const t0 = (tmp_0 * m.get(5) + tmp_3 * m.get(9) + tmp_4 * m.get(13)) - (tmp_1 * m.get(5) + tmp_2 * m.get(9) + tmp_5 * m.get(13));
    const t1 = (tmp_1 * m.get(1) + tmp_6 * m.get(9) + tmp_9 * m.get(13)) - (tmp_0 * m.get(1) + tmp_7 * m.get(9) + tmp_8 * m.get(13));
    const t2 = (tmp_2 * m.get(1) + tmp_7 * m.get(5) + tmp_10 * m.get(13)) - (tmp_3 * m.get(1) + tmp_6 * m.get(5) + tmp_11 * m.get(13));
    const t3 = (tmp_5 * m.get(1) + tmp_8 * m.get(5) + tmp_11 * m.get(9)) - (tmp_4 * m.get(1) + tmp_9 * m.get(5) + tmp_10 * m.get(9));

    return 1.0 / (m.get(0) * t0 + m.get(4) * t1 + m.get(8) * t2 + m.get(12) * t3);
  }

  public static inverse(m: Mat4): Mat4 {
    const out: Mat4 = this.empty();

    const m00 = m.get(0);
    const m01 = m.get(1);
    const m02 = m.get(2);
    const m03 = m.get(3);
    const m10 = m.get(4);
    const m11 = m.get(5);
    const m12 = m.get(6);
    const m13 = m.get(7);
    const m20 = m.get(8);
    const m21 = m.get(9);
    const m22 = m.get(10);
    const m23 = m.get(11);
    const m30 = m.get(12);
    const m31 = m.get(13);
    const m32 = m.get(14);
    const m33 = m.get(15);

    const tmp_0  = m22 * m33;
    const tmp_1  = m32 * m23;
    const tmp_2  = m12 * m33;
    const tmp_3  = m32 * m13;
    const tmp_4  = m12 * m23;
    const tmp_5  = m22 * m13;
    const tmp_6  = m02 * m33;
    const tmp_7  = m32 * m03;
    const tmp_8  = m02 * m23;
    const tmp_9  = m22 * m03;
    const tmp_10 = m02 * m13;
    const tmp_11 = m12 * m03;
    const tmp_12 = m20 * m31;
    const tmp_13 = m30 * m21;
    const tmp_14 = m10 * m31;
    const tmp_15 = m30 * m11;
    const tmp_16 = m10 * m21;
    const tmp_17 = m20 * m11;
    const tmp_18 = m00 * m31;
    const tmp_19 = m30 * m01;
    const tmp_20 = m00 * m21;
    const tmp_21 = m20 * m01;
    const tmp_22 = m00 * m11;
    const tmp_23 = m10 * m01;

    const t0 = (tmp_0 * m11 + tmp_3 * m21 + tmp_4 * m31) - (tmp_1 * m11 + tmp_2 * m21 + tmp_5 * m31);
    const t1 = (tmp_1 * m01 + tmp_6 * m21 + tmp_9 * m31) - (tmp_0 * m01 + tmp_7 * m21 + tmp_8 * m31);
    const t2 = (tmp_2 * m01 + tmp_7 * m11 + tmp_10 * m31) - (tmp_3 * m01 + tmp_6 * m11 + tmp_11 * m31);
    const t3 = (tmp_5 * m01 + tmp_8 * m11 + tmp_11 * m21) - (tmp_4 * m01 + tmp_9 * m11 + tmp_10 * m21);
    const t4 = (tmp_1 * m10 + tmp_2 * m20 + tmp_5 * m30) - (tmp_0 * m10 + tmp_3 * m20 + tmp_4 * m30);
    const t5 = (tmp_0 * m00 + tmp_7 * m20 + tmp_8 * m30) - (tmp_1 * m00 + tmp_6 * m20 + tmp_9 * m30);
    const t6 = (tmp_3 * m00 + tmp_6 * m10 + tmp_11 * m30) - (tmp_2 * m00 + tmp_7 * m10 + tmp_10 * m30);
    const t7 = (tmp_4 * m00 + tmp_9 * m10 + tmp_10 * m20) - (tmp_5 * m00 + tmp_8 * m10 + tmp_11 * m20);
    const t8 = (tmp_12 * m13 + tmp_15 * m23 + tmp_16 * m33) - (tmp_13 * m13 + tmp_14 * m23 + tmp_17 * m33);
    const t9 = (tmp_13 * m03 + tmp_18 * m23 + tmp_21 * m33) - (tmp_12 * m03 + tmp_19 * m23 + tmp_20 * m33);
    const t10 = (tmp_14 * m03 + tmp_19 * m13 + tmp_22 * m33) - (tmp_15 * m03 + tmp_18 * m13 + tmp_23 * m33);
    const t11 = (tmp_17 * m03 + tmp_20 * m13 + tmp_23 * m23) - (tmp_16 * m03 + tmp_21 * m13 + tmp_22 * m23);
    const t12 = (tmp_14 * m22 + tmp_17 * m32 + tmp_13 * m12) - (tmp_16 * m32 + tmp_12 * m12 + tmp_15 * m22);
    const t13 = (tmp_20 * m32 + tmp_12 * m02 + tmp_19 * m22) - (tmp_18 * m22 + tmp_21 * m32 + tmp_13 * m02);
    const t14 = (tmp_18 * m12 + tmp_23 * m32 + tmp_15 * m02) - (tmp_22 * m32 + tmp_14 * m02 + tmp_19 * m12);
    const t15 = (tmp_22 * m22 + tmp_16 * m02 + tmp_21 * m12) - (tmp_20 * m12 + tmp_23 * m22 + tmp_17 * m02);

    const d = 1.0 / (m00 * t0 + m10 * t1 + m20 * t2 + m30 * t3);

    out.set(0, d * t0);
    out.set(1, d * t1);
    out.set(2, d * t2);
    out.set(3, d * t3);
    out.set(4, d * t4);
    out.set(5, d * t5);
    out.set(6, d * t6);
    out.set(7, d * t7);
    out.set(8, d * t8);
    out.set(9, d * t9);
    out.set(10, d * t10);
    out.set(11, d * t11);
    out.set(12, d * t12);
    out.set(13, d * t13);
    out.set(14, d * t14);
    out.set(15, d * t15);

    return out;
  }

}
