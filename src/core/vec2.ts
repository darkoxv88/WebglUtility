import { FloatArray, FloatArrayType } from "../helpers/float-array";

const baseSize: number = 2;
const baseSizeReducedByOne = baseSize - 1;

export class Vec2 {

  private vec: FloatArrayType;

  public get x(): number {
    return this.vec[0];
  }

  public get y(): number {
    return this.vec[1];
  }

  constructor(objToCopy?: FloatArrayType | Vec2) {
    this.vec = new FloatArray(baseSize);

    for (let i = 0; i < this.vec.length; i++) {
      this.vec[i] = 0;
    }

    if (!objToCopy) {
      return this;
    }

    if (objToCopy instanceof Vec2) {
      this.vec[0] = objToCopy.x;
      this.vec[1] = objToCopy.y;
      return this;
    }

    if ((objToCopy instanceof FloatArray) || Array.isArray(objToCopy)) {
      this.vec[0] = objToCopy[0];
      this.vec[1] = objToCopy[1];
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

  public add(v: Vec2): Vec2 {
    return Vec2.add(this, v);
  }
  
  public sub(v: Vec2): Vec2 {
    return Vec2.sub(this, v);
  }

  public normalize(): Vec2 {
    return Vec2.normalize(this);
  }

  public static getConstructionObject(): Float32ArrayConstructor | ArrayConstructor {
    return FloatArray;
  }

  public static copy(m: Vec2): Vec2 {
    try
    {
      return new Vec2(m);
    }
    catch (err)
    {
      return null;
    }
  }

  public static empty(): Vec2 {
    return new Vec2();
  }

  public static create(v0: number, v1: number): Vec2 {
    const out: Vec2 = this.empty();

    out.set(0, v0);
    out.set(1, v1);

    return out;
  }

  public static add(v1: Vec2, v2: Vec2): Vec2 {
    return this.create(
      v1.x + v2.x, v1.y + v2.y
    );
  }

  public static sub(v1: Vec2, v2: Vec2): Vec2 {
    return this.create(
      v1.x - v2.x, v1.y - v2.y
    );
  }

  public static mul(v1: Vec2, v2: Vec2): Vec2 {
    return this.create(
      v1.x * v2.x, v1.y * v2.y
    );
  }

  public static div(v1: Vec2, v2: Vec2): Vec2 {
    return this.create(
      v1.x / v2.x, v1.y / v2.y
    );
  }

  public static min(v1: Vec2, v2: Vec2): Vec2 {
    return this.create(
      Math.min(v1.x, v2.x), Math.min(v1.y, v2.y)
    );
  }

  public static max(v1: Vec2, v2: Vec2): Vec2 {
    return this.create(
      Math.max(v1.x, v2.x), Math.max(v1.y, v2.y)
    );
  }

  public static scale(v1: Vec2, scale: number): Vec2 {
    return this.create(
      v1.x * scale, v1.y * scale
    );
  }

  public static distance(v1: Vec2, v2: Vec2): number {
    const x = v2.x - v1.x;
    const y = v2.y - v1.y;

    return (x*x) + (y*y);
  }

  public static distanceSqrt(v1: Vec2, v2: Vec2): number {
    return Math.sqrt(this.distance(v1, v2));
  }

  public static negate(v1: Vec2): Vec2 {
    return this.create(
      0 - v1.x, 0 - v1.y
    );
  }

  public static dotProduct(v1: Vec2, v2: Vec2): number {
    return (v1.x*v2.x) + (v1.y*v2.y);
  }

  public static vecLenght(v1: Vec2): number {
    return Math.sqrt(this.dotProduct(v1, v1));
  }

  public static inverse(v1: Vec2): Vec2 {
    return this.create(
      1.0 / v1.x, 1.0 / v1.y
    );
  }

  public static normalize(v1: Vec2): Vec2 {
    const len = this.vecLenght(v1);

    if (len === 0) {
      return this.create(0, 0);
    }

    return this.create(v1.x / len, v1.y / len);
  }

}
