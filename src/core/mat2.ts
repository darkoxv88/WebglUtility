import { FloatArray, FloatArrayType } from "../helpers/float-array";
import { IArrayLike } from "../interfaces/i-array-like";
import { matTranspose } from "../helpers/mat-transpose";
import { matMul } from "../helpers/mat-mul";
import { Vec2 } from "./vec2";

const baseSize: number = 4;
const baseSizeReducedByOne = baseSize - 1;

export class Mat2 implements IArrayLike {

  private mat: FloatArrayType;

  constructor(objToCopy?: FloatArrayType | Mat2) {
    this.mat = new FloatArray(baseSize);

    for (let i = 0; i < baseSize; i++) {
      this.mat[i] = 0;
    }

    if (!objToCopy) {
      return this;
    }

    if (objToCopy instanceof Mat2) {
      this.mat[0] = objToCopy.get(0);
      this.mat[1] = objToCopy.get(1);
      this.mat[2] = objToCopy.get(2);
      this.mat[3] = objToCopy.get(3);
      return this;
    }

    if ((objToCopy instanceof FloatArray) || Array.isArray(objToCopy)) {
      this.mat[0] = objToCopy[0];
      this.mat[1] = objToCopy[1];
      this.mat[2] = objToCopy[2];
      this.mat[3] = objToCopy[3];
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

  public transpose(): Mat2 {
    return Mat2.transpose(this);
  }

  public static getConstructionObject(): Float32ArrayConstructor | ArrayConstructor {
    return FloatArray;
  }

  public static copy(m: Mat2): Mat2 {
    try
    {
      return new Mat2(m);
    }
    catch (err)
    {
      return null;
    }
  }

  public static empty(): Mat2 {
    return new Mat2();
  }

  public static createIdentityMatrix(): Mat2 {
    const out = this.empty();

    out.set(0, 1);
    out.set(1, 0);
    out.set(2, 0);
    out.set(3, 1);

    return out;
  }

  public static transpose(m: Mat2): Mat2 {
    const out = this.empty();

    matTranspose(m, 2, out);
    
    return out;
  }

  public static determinant(m: Mat2): number {
    return (m.get(0) * m.get(3)) - (m.get(2) * m.get(1));
  }

  public static invert(m: Mat2): Mat2 {
    const out = this.empty();
    const det = 1.0 / this.determinant(m);

    out.set(0, m.get(3) * det);
    out.set(1, -(m.get(1)) * det);
    out.set(2, -(m.get(2)) * det);
    out.set(3, m.get(0) * det);

    return out;
  }

  public static mul(m1: Mat2, m2: Mat2): Mat2 {
    const out = this.empty();

    matMul(m1, m2, 2, out);

    return out;
  }

  public static scale(m: Mat2, v: Vec2): Mat2 {
    const out = this.empty();

    out.set(0, m.get(0) * v.x);
    out.set(1, m.get(1) * v.x);
    out.set(2, m.get(2) * v.y);
    out.set(3, m.get(3) * v.y);

    return out;
  }

  public static adjugate(m: Mat2): Mat2 {
    const out = this.empty();

    out.set(0, m.get(3));
    out.set(1, 0 - m.get(1));
    out.set(2, 0 - m.get(2));
    out.set(3, m.get(0));

    return out;
  }

}
