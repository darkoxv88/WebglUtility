import { FloatArray, FloatArrayType } from "../helpers/float-array";
import { IArrayLike } from "../interfaces/i-array-like";
import { matTranspose } from "../helpers/mat-transpose";
import { matMul } from "../helpers/mat-mul";
import { Vec3 } from "./vec3";

const baseSize: number = 9;
const baseSizeReducedByOne = baseSize - 1;

export class Mat3 implements IArrayLike {

  private mat: FloatArrayType;

  constructor(objToCopy?: FloatArrayType | Mat3) {
    this.mat = new FloatArray(baseSize);

    for (let i = 0; i < baseSize; i++) {
      this.mat[i] = 0;
    }

    if (!objToCopy) {
      return this;
    }

    if (objToCopy instanceof Mat3) {
      this.mat[0] = objToCopy.get(0);
      this.mat[1] = objToCopy.get(1);
      this.mat[2] = objToCopy.get(2);
      this.mat[3] = objToCopy.get(3);
      this.mat[4] = objToCopy.get(4);
      this.mat[5] = objToCopy.get(5);
      this.mat[6] = objToCopy.get(6);
      this.mat[7] = objToCopy.get(7);
      this.mat[8] = objToCopy.get(8);
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
      return this;
    }

    return this;
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

  public transpose(): Mat3 {
    return Mat3.transpose(this);
  }

  public static getConstructionObject(): Float32ArrayConstructor | ArrayConstructor {
    return FloatArray;
  }

  public static copy(m: Mat3): Mat3 {
    try
    {
      return new Mat3(m);
    }
    catch (err)
    {
      return null;
    }
  }

  public static empty(): Mat3 {
    return new Mat3();
  }

  public static createIdentityMatrix(): Mat3 {
    const out: Mat3 = this.empty();

    out.set(0, 1);
    out.set(1, 0);
    out.set(2, 0);
    out.set(3, 0);
    out.set(4, 1);
    out.set(5, 0);
    out.set(6, 0);
    out.set(7, 0);
    out.set(8, 1);

    return out;
  }

  public static transpose(m: Mat3): Mat3 {
    const out = this.empty();

    matTranspose(m, 3, out);
    
    return out;
  }

  public static determinant(m: Mat3): number {
    return (
      m.get(0) * (m.get(8) * m.get(4) - m.get(5) * m.get(7)) + 
      m.get(1) * (m.get(5) * m.get(6) - m.get(8) * m.get(3)) + 
      m.get(2) * (m.get(7) * m.get(3) - m.get(4) * m.get(6))
    );
  }

  public static invert(m: Mat3): Mat3 {
    const out = this.empty();
    const det = 1.0 / this.determinant(m);

    out.set(0, (m.get(8) * m.get(4) - m.get(5) * m.get(7)) * det);
    out.set(1, (-(m.get(8)) * m.get(1) + m.get(2) * m.get(7)) * det);
    out.set(2, (m.get(5) * m.get(1) - m.get(2) * m.get(4)) * det);
    out.set(3, (-(m.get(8)) * m.get(3) + m.get(5) * m.get(6)) * det);
    out.set(4, (m.get(8) * m.get(0) - m.get(2) * m.get(6)) * det);
    out.set(5, (-(m.get(5)) * m.get(0) + m.get(2) * m.get(3)) * det);
    out.set(6, (m.get(7) * m.get(3) - m.get(4) * m.get(6)) * det);
    out.set(7, (-(m.get(7)) * m.get(0) + m.get(1) * m.get(6)) * det);
    out.set(8, (m.get(4) * m.get(0) - m.get(1) * m.get(3)) * det);

    return out;
  }

  public static mul(m1: Mat3, m2: Mat3): Mat3 {
    const out = this.empty();

    matMul(m1, m2, 3, out);

    return out;
  }

  public static scale(m: Mat3, v: Vec3): Mat3 {
    const out = this.empty();

    out.set(0, m.get(0) * v.x);
    out.set(1, m.get(1) * v.x);
    out.set(2, m.get(2) * v.x);
    out.set(3, m.get(3) * v.y);
    out.set(4, m.get(4) * v.y);
    out.set(5, m.get(5) * v.y);
    out.set(6, m.get(6) * v.z);
    out.set(7, m.get(7) * v.z);
    out.set(8, m.get(8) * v.z);

    return out;
  }

}
