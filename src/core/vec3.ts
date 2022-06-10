import { FloatArray, FloatArrayType } from "../helpers/float-array";
import { Vec2 } from "./vec2";

const baseSize: number = 3;
const baseSizeReducedByOne = baseSize - 1;

export class Vec3 {

  private vec: FloatArrayType;

  public get x(): number {
    return this.vec[0];
  }

  public get y(): number {
    return this.vec[1];
  }

  public get z(): number {
    return this.vec[2];
  }

  constructor(objToCopy?: FloatArrayType | Vec3) {
    this.vec = new FloatArray(baseSize);

    for (let i = 0; i < this.vec.length; i++) {
      this.vec[i] = 0;
    }

    if (!objToCopy) {
      return this;
    }

    if (objToCopy instanceof Vec3) {
      this.vec[0] = objToCopy.x;
      this.vec[1] = objToCopy.y;
      this.vec[2] = objToCopy.z;
      return this;
    }

    if ((objToCopy instanceof FloatArray) || Array.isArray(objToCopy)) {
      this.vec[0] = objToCopy[0];
      this.vec[1] = objToCopy[1];
      this.vec[2] = objToCopy[2];
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

  public toVec2(): Vec2 {
    return Vec2.create(this.x, this.y);
  }

  public xy(): Vec2 {
    return Vec2.create(this.x, this.y);
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

  public add(v: Vec3): Vec3 {
    return Vec3.add(this, v);
  }

  public sub(v: Vec3): Vec3 {
    return Vec3.sub(this, v);
  }

  public normalize(): Vec3 {
    return Vec3.normalize(this);
  }

  public static getConstructionObject(): Float32ArrayConstructor | ArrayConstructor {
    return FloatArray;
  }

  public static copy(m: Vec3): Vec3 {
    try
    {
      return new Vec3(m);
    }
    catch (err)
    {
      return null;
    }
  }

  public static empty(): Vec3 {
    return new Vec3();
  }

  public static create(v0: number, v1: number, v2: number): Vec3 {
    const out: Vec3 = this.empty();

    out.set(0, v0);
    out.set(1, v1);
    out.set(2, v2);

    return out;
  }

  public static add(v1: Vec3, v2: Vec3): Vec3 {
    return this.create(
      v1.x + v2.x, v1.y + v2.y, v1.z + v2.z
    );
  }

  public static sub(v1: Vec3, v2: Vec3): Vec3 {
    return this.create(
      v1.x - v2.x, v1.y - v2.y, v1.z - v2.z
    );
  }

  public static mul(v1: Vec3, v2: Vec3): Vec3 {
    return this.create(
      v1.x * v2.x, v1.y * v2.y, v1.z * v2.z
    );
  }

  public static div(v1: Vec3, v2: Vec3): Vec3 {
    return this.create(
      v1.x / v2.x, v1.y / v2.y, v1.z / v2.z
    );
  }

  public static min(v1: Vec3, v2: Vec3): Vec3 {
    return this.create(
      Math.min(v1.x, v2.x), Math.min(v1.y, v2.y), Math.min(v1.z, v2.z)
    );
  }

  public static max(v1: Vec3, v2: Vec3): Vec3 {
    return this.create(
      Math.max(v1.x, v2.x), Math.max(v1.y, v2.y), Math.max(v1.z, v2.z)
    );
  }

  public static scale(v1: Vec3, scale: number): Vec3 {
    return this.create(
      v1.x * scale, v1.y * scale, v1.z * scale
    );
  }

  public static distance(v1: Vec3, v2: Vec3): number {
    const x = v2.x - v1.x;
    const y = v2.y - v1.y;
    const z = v2.z - v1.z;

    return (x*x) + (y*y) + (z*z);
  }

  public static distanceSqrt(v1: Vec3, v2: Vec3): number {
    return Math.sqrt(this.distance(v1, v2));
  }

  public static negate(v1: Vec3): Vec3 {
    return this.create(
      0 - v1.x, 0 - v1.y, 0 - v1.z
    );
  }

  public static dotProduct(v1: Vec3, v2: Vec3): number {
    return (v1.x*v2.x) + (v1.y*v2.y) + (v1.z*v2.z);
  }

  public static vecLenght(v1: Vec3): number {
    return Math.sqrt(this.dotProduct(v1, v1));
  }

  public static inverse(v1: Vec3): Vec3 {
    return this.create(
      1.0 / v1.x, 1.0 / v1.y, 1.0 / v1.z
    );
  }

  public static normalize(v1: Vec3): Vec3 {
    const len = this.vecLenght(v1);

    if (len === 0) {
      return this.create(0, 0, 0);
    }

    return this.create(v1.x / len, v1.y / len, v1.z / len);
  }

  public static crossProduct(v1: Vec3, v2: Vec3): Vec3 {
    return this.create(
      v1.y*v2.z - v1.z*v2.y, 
      v1.z*v2.x - v1.x*v2.z, 
      v1.x*v2.y - v1.y*v2.x
    );
  }

}
