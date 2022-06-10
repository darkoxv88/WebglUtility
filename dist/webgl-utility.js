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

/******/ (() => { // webpackBootstrap
/******/ 	"use strict";

;// CONCATENATED MODULE: ./src/refs/root.ts
var root = typeof window !== 'undefined' ? window : typeof globalThis !== 'undefined' ? globalThis : typeof self !== 'undefined' ? self : ({});
function getRoot() {
    return root;
}

;// CONCATENATED MODULE: ./src/environment.ts
var production = true;
function isProduction() {
    return production;
}

;// CONCATENATED MODULE: ./src/utility/byte.ts
function byte_byte(value) {
    try {
        value = parseInt(value);
        if (value > 255) {
            return 255;
        }
        if (value < 0) {
            return 0;
        }
        return value;
    }
    catch (error) {
        console.error(error);
        return 0;
    }
}

;// CONCATENATED MODULE: ./src/helpers/float-array.ts
const FloatArray = (typeof Float32Array !== 'undefined') ? Float32Array : Array;

;// CONCATENATED MODULE: ./src/core/vec2.ts

const baseSize = 2;
const baseSizeReducedByOne = baseSize - 1;
class Vec2 {
    constructor(objToCopy) {
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
    get x() {
        return this.vec[0];
    }
    get y() {
        return this.vec[1];
    }
    size() {
        return this.vec.length;
    }
    iterate(proc) {
        try {
            for (let key = 0; key < this.vec.length; key++) {
                proc(key, this.vec[key]);
            }
        }
        catch (err) {
            console.log(err);
        }
    }
    toString() {
        return this.vec.toString();
    }
    toArray() {
        return this.vec.slice();
    }
    get(pos) {
        try {
            return this.vec[pos];
        }
        catch (err) {
            return 0;
        }
    }
    set(pos, value) {
        if (typeof (pos) !== 'number' || typeof (value) !== 'number') {
            return;
        }
        if (pos > baseSizeReducedByOne) {
            return;
        }
        this.vec[pos] = value;
    }
    add(v) {
        return Vec2.add(this, v);
    }
    sub(v) {
        return Vec2.sub(this, v);
    }
    normalize() {
        return Vec2.normalize(this);
    }
    static getConstructionObject() {
        return FloatArray;
    }
    static copy(m) {
        try {
            return new Vec2(m);
        }
        catch (err) {
            return null;
        }
    }
    static empty() {
        return new Vec2();
    }
    static create(v0, v1) {
        const out = this.empty();
        out.set(0, v0);
        out.set(1, v1);
        return out;
    }
    static add(v1, v2) {
        return this.create(v1.x + v2.x, v1.y + v2.y);
    }
    static sub(v1, v2) {
        return this.create(v1.x - v2.x, v1.y - v2.y);
    }
    static mul(v1, v2) {
        return this.create(v1.x * v2.x, v1.y * v2.y);
    }
    static div(v1, v2) {
        return this.create(v1.x / v2.x, v1.y / v2.y);
    }
    static min(v1, v2) {
        return this.create(Math.min(v1.x, v2.x), Math.min(v1.y, v2.y));
    }
    static max(v1, v2) {
        return this.create(Math.max(v1.x, v2.x), Math.max(v1.y, v2.y));
    }
    static scale(v1, scale) {
        return this.create(v1.x * scale, v1.y * scale);
    }
    static distance(v1, v2) {
        const x = v2.x - v1.x;
        const y = v2.y - v1.y;
        return (x * x) + (y * y);
    }
    static distanceSqrt(v1, v2) {
        return Math.sqrt(this.distance(v1, v2));
    }
    static negate(v1) {
        return this.create(0 - v1.x, 0 - v1.y);
    }
    static dotProduct(v1, v2) {
        return (v1.x * v2.x) + (v1.y * v2.y);
    }
    static vecLenght(v1) {
        return Math.sqrt(this.dotProduct(v1, v1));
    }
    static inverse(v1) {
        return this.create(1.0 / v1.x, 1.0 / v1.y);
    }
    static normalize(v1) {
        const len = this.vecLenght(v1);
        if (len === 0) {
            return this.create(0, 0);
        }
        return this.create(v1.x / len, v1.y / len);
    }
}

;// CONCATENATED MODULE: ./src/core/vec3.ts


const vec3_baseSize = 3;
const vec3_baseSizeReducedByOne = vec3_baseSize - 1;
class Vec3 {
    constructor(objToCopy) {
        this.vec = new FloatArray(vec3_baseSize);
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
    get x() {
        return this.vec[0];
    }
    get y() {
        return this.vec[1];
    }
    get z() {
        return this.vec[2];
    }
    size() {
        return this.vec.length;
    }
    iterate(proc) {
        try {
            for (let key = 0; key < this.vec.length; key++) {
                proc(key, this.vec[key]);
            }
        }
        catch (err) {
            console.log(err);
        }
    }
    toString() {
        return this.vec.toString();
    }
    toArray() {
        return this.vec.slice();
    }
    toVec2() {
        return Vec2.create(this.x, this.y);
    }
    xy() {
        return Vec2.create(this.x, this.y);
    }
    get(pos) {
        try {
            return this.vec[pos];
        }
        catch (err) {
            return 0;
        }
    }
    set(pos, value) {
        if (typeof (pos) !== 'number' || typeof (value) !== 'number') {
            return;
        }
        if (pos > vec3_baseSizeReducedByOne) {
            return;
        }
        this.vec[pos] = value;
    }
    add(v) {
        return Vec3.add(this, v);
    }
    sub(v) {
        return Vec3.sub(this, v);
    }
    normalize() {
        return Vec3.normalize(this);
    }
    static getConstructionObject() {
        return FloatArray;
    }
    static copy(m) {
        try {
            return new Vec3(m);
        }
        catch (err) {
            return null;
        }
    }
    static empty() {
        return new Vec3();
    }
    static create(v0, v1, v2) {
        const out = this.empty();
        out.set(0, v0);
        out.set(1, v1);
        out.set(2, v2);
        return out;
    }
    static add(v1, v2) {
        return this.create(v1.x + v2.x, v1.y + v2.y, v1.z + v2.z);
    }
    static sub(v1, v2) {
        return this.create(v1.x - v2.x, v1.y - v2.y, v1.z - v2.z);
    }
    static mul(v1, v2) {
        return this.create(v1.x * v2.x, v1.y * v2.y, v1.z * v2.z);
    }
    static div(v1, v2) {
        return this.create(v1.x / v2.x, v1.y / v2.y, v1.z / v2.z);
    }
    static min(v1, v2) {
        return this.create(Math.min(v1.x, v2.x), Math.min(v1.y, v2.y), Math.min(v1.z, v2.z));
    }
    static max(v1, v2) {
        return this.create(Math.max(v1.x, v2.x), Math.max(v1.y, v2.y), Math.max(v1.z, v2.z));
    }
    static scale(v1, scale) {
        return this.create(v1.x * scale, v1.y * scale, v1.z * scale);
    }
    static distance(v1, v2) {
        const x = v2.x - v1.x;
        const y = v2.y - v1.y;
        const z = v2.z - v1.z;
        return (x * x) + (y * y) + (z * z);
    }
    static distanceSqrt(v1, v2) {
        return Math.sqrt(this.distance(v1, v2));
    }
    static negate(v1) {
        return this.create(0 - v1.x, 0 - v1.y, 0 - v1.z);
    }
    static dotProduct(v1, v2) {
        return (v1.x * v2.x) + (v1.y * v2.y) + (v1.z * v2.z);
    }
    static vecLenght(v1) {
        return Math.sqrt(this.dotProduct(v1, v1));
    }
    static inverse(v1) {
        return this.create(1.0 / v1.x, 1.0 / v1.y, 1.0 / v1.z);
    }
    static normalize(v1) {
        const len = this.vecLenght(v1);
        if (len === 0) {
            return this.create(0, 0, 0);
        }
        return this.create(v1.x / len, v1.y / len, v1.z / len);
    }
    static crossProduct(v1, v2) {
        return this.create(v1.y * v2.z - v1.z * v2.y, v1.z * v2.x - v1.x * v2.z, v1.x * v2.y - v1.y * v2.x);
    }
}

;// CONCATENATED MODULE: ./src/core/vec4.ts



const vec4_baseSize = 4;
const vec4_baseSizeReducedByOne = vec4_baseSize - 1;
class Vec4 {
    constructor(objToCopy) {
        this.vec = new FloatArray(vec4_baseSize);
        for (let i = 0; i < this.vec.length; i++) {
            this.vec[i] = 0;
        }
        if (!objToCopy) {
            return this;
        }
        if (objToCopy instanceof Vec4) {
            this.vec[0] = objToCopy.x;
            this.vec[1] = objToCopy.y;
            this.vec[2] = objToCopy.z;
            this.vec[3] = objToCopy.w;
            return this;
        }
        if ((objToCopy instanceof FloatArray) || Array.isArray(objToCopy)) {
            this.vec[0] = objToCopy[0];
            this.vec[1] = objToCopy[1];
            this.vec[2] = objToCopy[2];
            this.vec[3] = objToCopy[3];
            return this;
        }
        return this;
    }
    get x() {
        return this.vec[0];
    }
    get y() {
        return this.vec[1];
    }
    get z() {
        return this.vec[2];
    }
    get w() {
        return this.vec[3];
    }
    size() {
        return this.vec.length;
    }
    iterate(proc) {
        try {
            for (let key = 0; key < this.vec.length; key++) {
                proc(key, this.vec[key]);
            }
        }
        catch (err) {
            console.log(err);
        }
    }
    toString() {
        return this.vec.toString();
    }
    toArray() {
        return this.vec.slice();
    }
    toVec2() {
        return Vec2.create(this.x, this.y);
    }
    xy() {
        return Vec2.create(this.x, this.y);
    }
    toVec3() {
        return Vec3.create(this.x, this.y, this.z);
    }
    xyz() {
        return Vec3.create(this.x, this.y, this.z);
    }
    get(pos) {
        try {
            return this.vec[pos];
        }
        catch (err) {
            return 0;
        }
    }
    set(pos, value) {
        if (typeof (pos) !== 'number' || typeof (value) !== 'number') {
            return;
        }
        if (pos > vec4_baseSizeReducedByOne) {
            return;
        }
        this.vec[pos] = value;
    }
    add(v) {
        return Vec4.add(this, v);
    }
    sub(v) {
        return Vec4.sub(this, v);
    }
    normalize() {
        return Vec4.normalize(this);
    }
    static getConstructionObject() {
        return FloatArray;
    }
    static copy(m) {
        try {
            return new Vec4(m);
        }
        catch (err) {
            return null;
        }
    }
    static empty() {
        return new Vec4();
    }
    static create(v0, v1, v2, v3) {
        const out = this.empty();
        out.set(0, v0);
        out.set(1, v1);
        out.set(2, v2);
        out.set(3, v3);
        return out;
    }
    static add(v1, v2) {
        return this.create(v1.x + v2.x, v1.y + v2.y, v1.z + v2.z, v1.w + v2.w);
    }
    static sub(v1, v2) {
        return this.create(v1.x - v2.x, v1.y - v2.y, v1.z - v2.z, v1.w - v2.w);
    }
    static mul(v1, v2) {
        return this.create(v1.x * v2.x, v1.y * v2.y, v1.z * v2.z, v1.w * v2.w);
    }
    static div(v1, v2) {
        return this.create(v1.x / v2.x, v1.y / v2.y, v1.z / v2.z, v1.w / v2.w);
    }
    static min(v1, v2) {
        return this.create(Math.min(v1.x, v2.x), Math.min(v1.y, v2.y), Math.min(v1.z, v2.z), Math.min(v1.w, v2.w));
    }
    static max(v1, v2) {
        return this.create(Math.max(v1.x, v2.x), Math.max(v1.y, v2.y), Math.max(v1.z, v2.z), Math.max(v1.w, v2.w));
    }
    static scale(v1, scale) {
        return this.create(v1.x * scale, v1.y * scale, v1.z * scale, v1.w * scale);
    }
    static distance(v1, v2) {
        const x = v2.x - v1.x;
        const y = v2.y - v1.y;
        const z = v2.z - v1.z;
        const w = v2.w - v1.w;
        return (x * x) + (y * y) + (z * z) + (w * w);
    }
    static distanceSqrt(v1, v2) {
        return Math.sqrt(this.distance(v1, v2));
    }
    static negate(v1) {
        return this.create(0 - v1.x, 0 - v1.y, 0 - v1.z, 0 - v1.w);
    }
    static dotProduct(v1, v2) {
        return (v1.x * v2.x) + (v1.y * v2.y) + (v1.z * v2.z) + (v1.w * v2.w);
    }
    static vecLenght(v1) {
        return Math.sqrt(this.dotProduct(v1, v1));
    }
    static inverse(v1) {
        return this.create(1.0 / v1.x, 1.0 / v1.y, 1.0 / v1.z, 1.0 / v1.w);
    }
    static normalize(v1) {
        const len = this.vecLenght(v1);
        if (len === 0) {
            return this.create(0, 0, 0, 0);
        }
        return this.create(v1.x / len, v1.y / len, v1.z / len, v1.w / len);
    }
}

;// CONCATENATED MODULE: ./src/helpers/mat-transpose.ts
function matTranspose(m1, floor, out) {
    for (let i = 0; i < floor; i++) {
        for (let j = 0; j < floor; j++) {
            out.set((j * floor) + i, m1.get((i * floor) + j));
        }
    }
}

;// CONCATENATED MODULE: ./src/helpers/mat-mul.ts
function matMul(m1, m2, floor, out) {
    for (let i = 0; i < floor; i++) {
        for (let j = 0; j < floor; j++) {
            const outCol = (i * floor) + j;
            let numToSet = 0;
            for (let x = 0; x < floor; x++) {
                numToSet = numToSet + (m1.get((i * floor) + x) * m2.get((x * floor) + j));
            }
            out.set(outCol, numToSet);
        }
    }
}

;// CONCATENATED MODULE: ./src/core/mat2.ts



const mat2_baseSize = 4;
const mat2_baseSizeReducedByOne = mat2_baseSize - 1;
class Mat2 {
    constructor(objToCopy) {
        this.mat = new FloatArray(mat2_baseSize);
        for (let i = 0; i < mat2_baseSize; i++) {
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
    size() {
        return this.mat.length;
    }
    iterate(proc) {
        try {
            for (let key = 0; key < this.mat.length; key++) {
                proc(key, this.mat[key]);
            }
        }
        catch (err) {
            console.log(err);
        }
    }
    toString() {
        return this.mat.toString();
    }
    toArray() {
        return this.mat.slice();
    }
    get(pos) {
        try {
            return this.mat[pos];
        }
        catch (err) {
            return 0;
        }
    }
    set(pos, value) {
        if (typeof (pos) !== 'number' || typeof (value) !== 'number') {
            return;
        }
        if (pos > mat2_baseSizeReducedByOne) {
            return;
        }
        this.mat[pos] = value;
    }
    transpose() {
        return Mat2.transpose(this);
    }
    static getConstructionObject() {
        return FloatArray;
    }
    static copy(m) {
        try {
            return new Mat2(m);
        }
        catch (err) {
            return null;
        }
    }
    static empty() {
        return new Mat2();
    }
    static createIdentityMatrix() {
        const out = this.empty();
        out.set(0, 1);
        out.set(1, 0);
        out.set(2, 0);
        out.set(3, 1);
        return out;
    }
    static transpose(m) {
        const out = this.empty();
        matTranspose(m, 2, out);
        return out;
    }
    static determinant(m) {
        return (m.get(0) * m.get(3)) - (m.get(2) * m.get(1));
    }
    static invert(m) {
        const out = this.empty();
        const det = 1.0 / this.determinant(m);
        out.set(0, m.get(3) * det);
        out.set(1, -(m.get(1)) * det);
        out.set(2, -(m.get(2)) * det);
        out.set(3, m.get(0) * det);
        return out;
    }
    static mul(m1, m2) {
        const out = this.empty();
        matMul(m1, m2, 2, out);
        return out;
    }
    static scale(m, v) {
        const out = this.empty();
        out.set(0, m.get(0) * v.x);
        out.set(1, m.get(1) * v.x);
        out.set(2, m.get(2) * v.y);
        out.set(3, m.get(3) * v.y);
        return out;
    }
    static adjugate(m) {
        const out = this.empty();
        out.set(0, m.get(3));
        out.set(1, 0 - m.get(1));
        out.set(2, 0 - m.get(2));
        out.set(3, m.get(0));
        return out;
    }
}

;// CONCATENATED MODULE: ./src/core/mat3.ts



const mat3_baseSize = 9;
const mat3_baseSizeReducedByOne = mat3_baseSize - 1;
class Mat3 {
    constructor(objToCopy) {
        this.mat = new FloatArray(mat3_baseSize);
        for (let i = 0; i < mat3_baseSize; i++) {
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
    size() {
        return this.mat.length;
    }
    iterate(proc) {
        try {
            for (let key = 0; key < this.mat.length; key++) {
                proc(key, this.mat[key]);
            }
        }
        catch (err) {
            console.log(err);
        }
    }
    toString() {
        return this.mat.toString();
    }
    toArray() {
        return this.mat.slice();
    }
    get(pos) {
        try {
            return this.mat[pos];
        }
        catch (err) {
            return 0;
        }
    }
    set(pos, value) {
        if (typeof (pos) !== 'number' || typeof (value) !== 'number') {
            return;
        }
        if (pos > mat3_baseSizeReducedByOne) {
            return;
        }
        this.mat[pos] = value;
    }
    transpose() {
        return Mat3.transpose(this);
    }
    static getConstructionObject() {
        return FloatArray;
    }
    static copy(m) {
        try {
            return new Mat3(m);
        }
        catch (err) {
            return null;
        }
    }
    static empty() {
        return new Mat3();
    }
    static createIdentityMatrix() {
        const out = this.empty();
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
    static transpose(m) {
        const out = this.empty();
        matTranspose(m, 3, out);
        return out;
    }
    static determinant(m) {
        return (m.get(0) * (m.get(8) * m.get(4) - m.get(5) * m.get(7)) +
            m.get(1) * (m.get(5) * m.get(6) - m.get(8) * m.get(3)) +
            m.get(2) * (m.get(7) * m.get(3) - m.get(4) * m.get(6)));
    }
    static invert(m) {
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
    static mul(m1, m2) {
        const out = this.empty();
        matMul(m1, m2, 3, out);
        return out;
    }
    static scale(m, v) {
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

;// CONCATENATED MODULE: ./src/core/mat4.ts





const mat4_baseSize = 16;
const mat4_baseSizeReducedByOne = mat4_baseSize - 1;
class Mat4 {
    constructor(objToCopy) {
        this.mat = new FloatArray(mat4_baseSize);
        for (let i = 0; i < mat4_baseSize; i++) {
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
    size() {
        return this.mat.length;
    }
    iterate(proc) {
        try {
            for (let key = 0; key < this.mat.length; key++) {
                proc(key, this.mat[key]);
            }
        }
        catch (err) {
            console.log(err);
        }
    }
    toString() {
        return this.mat.toString();
    }
    toArray() {
        return this.mat.slice();
    }
    get(pos) {
        try {
            return this.mat[pos];
        }
        catch (err) {
            return 0;
        }
    }
    set(pos, value) {
        if (typeof (pos) !== 'number' || typeof (value) !== 'number') {
            return;
        }
        if (pos > mat4_baseSizeReducedByOne) {
            return;
        }
        this.mat[pos] = value;
    }
    transpose() {
        return Mat4.transpose(this);
    }
    transformVector(v) {
        const out = Vec4.empty();
        out.set(0, 0.0);
        out.set(1, 0.0);
        out.set(2, 0.0);
        out.set(3, 0.0);
        for (var i = 0; i < 4; ++i) {
            for (var j = 0; j < 4; ++j) {
                out.set(i, out.get(i) + (v.get(j) * this.get(j * 4 + i)));
            }
        }
        return out;
    }
    transformPoint(v) {
        const d = v.x * this.get(3) + v.y * this.get(7) + v.z * this.get(11) + this.get(15);
        return Vec3.create((v.x * this.get(0) + v.y * this.get(4) + v.z * this.get(8) + this.get(12)) / d, (v.x * this.get(1) + v.y * this.get(5) + v.z * this.get(9) + this.get(13)) / d, (v.x * this.get(2) + v.y * this.get(6) + v.z * this.get(10) + this.get(14)) / d);
    }
    transformNormal(v) {
        const mi = Mat4.inverse(this);
        return Vec3.create(v.x * mi.get(0) + v.y * mi.get(1) + v.z * mi.get(2), v.x * mi.get(4) + v.y * mi.get(5) + v.z * mi.get(6), v.x * mi.get(8) + v.y * mi.get(9) + v.z * mi.get(10));
    }
    static getConstructionObject() {
        return FloatArray;
    }
    static copy(m) {
        try {
            return new Mat4(m);
        }
        catch (err) {
            return null;
        }
    }
    static empty() {
        return new Mat4();
    }
    static createIdentityMatrix() {
        const out = this.empty();
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
    static createPerspective(fieldOfViewInRadians, aspect, near, far) {
        const f = Math.tan(Math.PI * 0.5 - 0.5 * fieldOfViewInRadians);
        const rangeInv = 1.0 / (near - far);
        const out = this.empty();
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
    static createOrthographic(left, right, bottom, top, near, far) {
        const out = this.empty();
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
    static createFrustum(left, right, bottom, top, near, far) {
        const x = right - left;
        const y = top - bottom;
        const z = far - near;
        const out = this.empty();
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
    static createTranslation(x, y, z) {
        const out = this.empty();
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
    static createRotationX(angleInRadians) {
        const out = this.empty();
        const a = Math.cos(angleInRadians);
        const b = Math.sin(angleInRadians);
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
    static createRotationZ(angleInRadians) {
        const out = this.empty();
        const a = Math.cos(angleInRadians);
        const b = Math.sin(angleInRadians);
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
    static createRotationY(angleInRadians) {
        const out = this.empty();
        const a = Math.cos(angleInRadians);
        const b = Math.sin(angleInRadians);
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
    static createAxisRotation(axis, angleInRadians) {
        const out = this.empty();
        const n = Math.sqrt(axis.x * axis.x + axis.y * axis.y + axis.z * axis.z);
        const x = axis.x / n;
        const y = axis.y / n;
        const z = axis.z / n;
        const xx = x * x;
        const yy = y * y;
        const zz = z * z;
        const c = Math.cos(angleInRadians);
        const s = Math.sin(angleInRadians);
        const oneMinusCosine = 1 - c;
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
    static createScalingMat(v3) {
        const out = this.empty();
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
    static transpose(m) {
        const out = this.empty();
        matTranspose(m, 3, out);
        return out;
    }
    static mul(m1, m2) {
        const out = this.empty();
        matMul(m1, m2, 4, out);
        return out;
    }
    static scale(m, v) {
        const out = this.empty();
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
    static lookAt(cameraPosition, target, up) {
        const zAxis = Vec3.normalize(Vec3.sub(cameraPosition, target));
        const xAxis = Vec3.normalize(Vec3.crossProduct(up, zAxis));
        const yAxis = Vec3.normalize(Vec3.crossProduct(zAxis, xAxis));
        const out = this.empty();
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
    static translate(m, x, y, z) {
        return this.mul(m, this.createTranslation(x, y, z));
    }
    static rotateX(m, angleInRadians) {
        return this.mul(m, this.createRotationX(angleInRadians));
    }
    static rotateY(m, angleInRadians) {
        return this.mul(m, this.createRotationY(angleInRadians));
    }
    static rotateZ(m, angleInRadians) {
        return this.mul(m, this.createRotationZ(angleInRadians));
    }
    static rotateAxis(m, axis, angleInRadians) {
        return this.mul(m, this.createAxisRotation(axis, angleInRadians));
    }
    static scaleWithScalingMat(m, v) {
        if (v instanceof Vec3) {
            return this.mul(m, this.createScalingMat(v));
        }
        return this.mul(m, v);
    }
    static determinate(m) {
        const tmp_0 = m.get(10) * m.get(15);
        const tmp_1 = m.get(14) * m.get(11);
        const tmp_2 = m.get(6) * m.get(15);
        const tmp_3 = m.get(14) * m.get(7);
        const tmp_4 = m.get(6) * m.get(11);
        const tmp_5 = m.get(10) * m.get(7);
        const tmp_6 = m.get(2) * m.get(15);
        const tmp_7 = m.get(14) * m.get(3);
        const tmp_8 = m.get(2) * m.get(11);
        const tmp_9 = m.get(10) * m.get(3);
        const tmp_10 = m.get(2) * m.get(7);
        const tmp_11 = m.get(6) * m.get(3);
        const t0 = (tmp_0 * m.get(5) + tmp_3 * m.get(9) + tmp_4 * m.get(13)) - (tmp_1 * m.get(5) + tmp_2 * m.get(9) + tmp_5 * m.get(13));
        const t1 = (tmp_1 * m.get(1) + tmp_6 * m.get(9) + tmp_9 * m.get(13)) - (tmp_0 * m.get(1) + tmp_7 * m.get(9) + tmp_8 * m.get(13));
        const t2 = (tmp_2 * m.get(1) + tmp_7 * m.get(5) + tmp_10 * m.get(13)) - (tmp_3 * m.get(1) + tmp_6 * m.get(5) + tmp_11 * m.get(13));
        const t3 = (tmp_5 * m.get(1) + tmp_8 * m.get(5) + tmp_11 * m.get(9)) - (tmp_4 * m.get(1) + tmp_9 * m.get(5) + tmp_10 * m.get(9));
        return 1.0 / (m.get(0) * t0 + m.get(4) * t1 + m.get(8) * t2 + m.get(12) * t3);
    }
    static inverse(m) {
        const out = this.empty();
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
        const tmp_0 = m22 * m33;
        const tmp_1 = m32 * m23;
        const tmp_2 = m12 * m33;
        const tmp_3 = m32 * m13;
        const tmp_4 = m12 * m23;
        const tmp_5 = m22 * m13;
        const tmp_6 = m02 * m33;
        const tmp_7 = m32 * m03;
        const tmp_8 = m02 * m23;
        const tmp_9 = m22 * m03;
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

;// CONCATENATED MODULE: ./src/core/quaternion.ts





const epsilon = 1e-16;
const dotThreshold = 0.9995;
const quaternion_baseSize = 4;
const quaternion_baseSizeReducedByOne = quaternion_baseSize - 1;
function logHypot(a, b) {
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
class Quaternion {
    constructor(objToCopy) {
        this.vec = new FloatArray(quaternion_baseSize);
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
    get w() {
        return this.vec[0];
    }
    get x() {
        return this.vec[1];
    }
    get y() {
        return this.vec[2];
    }
    get z() {
        return this.vec[3];
    }
    size() {
        return this.vec.length;
    }
    iterate(proc) {
        try {
            for (let key = 0; key < this.vec.length; key++) {
                proc(key, this.vec[key]);
            }
        }
        catch (err) {
            console.log(err);
        }
    }
    toString() {
        return this.vec.toString();
    }
    toArray() {
        return this.vec.slice();
    }
    toVec4() {
        return Vec4.create(this.w, this.x, this.y, this.z);
    }
    toMat3() {
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
    toMat4() {
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
    getReal() {
        return this.w;
    }
    getImaginary() {
        return Vec3.create(this.x, this.y, this.z);
    }
    get(pos) {
        try {
            return this.vec[pos];
        }
        catch (err) {
            return 0;
        }
    }
    set(pos, value) {
        if (typeof (pos) !== 'number' || typeof (value) !== 'number') {
            return;
        }
        if (pos > quaternion_baseSizeReducedByOne) {
            return;
        }
        this.vec[pos] = value;
    }
    isFinite() {
        return isFinite(this.w) && isFinite(this.x) && isFinite(this.y) && isFinite(this.z);
    }
    isNaN() {
        return isNaN(this.w) || isNaN(this.x) || isNaN(this.y) || isNaN(this.z);
    }
    rotateVec3(v) {
        const tx = 2 * (this.y * v.z - this.z * v.y);
        const ty = 2 * (this.z * v.x - this.x * v.z);
        const tz = 2 * (this.x * v.y - this.y * v.x);
        return Vec3.create(v.x + this.w * tx + this.y * tz - this.z * ty, v.y + this.w * ty + this.z * tx - this.x * tz, v.z + this.w * tz + this.x * ty - this.y * tx);
    }
    static getConstructionObject() {
        return FloatArray;
    }
    static copy(q) {
        try {
            return new Quaternion(q);
        }
        catch (err) {
            return null;
        }
    }
    static empty() {
        return new Quaternion();
    }
    static create(v0, v1, v2, v3) {
        const out = this.empty();
        out.set(0, v0);
        out.set(1, v1);
        out.set(2, v2);
        out.set(3, v3);
        return out;
    }
    static createZero() {
        const out = this.empty();
        out.set(0, 0);
        return out;
    }
    static createFromAxisAngle(axis, angleInRadians) {
        const halfAngle = angleInRadians * 0.5;
        const sinNorm = Math.sin(halfAngle) / Math.sqrt(axis.x * axis.x + axis.y * axis.y + axis.z * axis.z);
        return this.create(Math.cos(halfAngle), axis.x * sinNorm, axis.y * sinNorm, axis.z * sinNorm);
    }
    static createFromBetweenVectors(v1, v2) {
        const dot = v1.x * v2.x + v1.y * v2.y + v1.z * v2.z;
        const w1 = v1.y * v2.z - v1.z * v2.y;
        const w2 = v1.z * v2.x - v1.x * v2.z;
        const w3 = v1.x * v2.y - v1.y * v2.x;
        const q1 = this.create(dot + Math.sqrt(dot * dot + w1 * w1 + w2 * w2 + w3 * w3), w1, w2, w3);
        return this.normalize(q1);
    }
    static createRandom() {
        const x = Math.random();
        const y = Math.random();
        const z = Math.random();
        const a = Math.sqrt(1 - x);
        const b = Math.sqrt(x);
        return this.create(b * Math.cos(2 * Math.PI * z), a * Math.sin(2 * Math.PI * y), a * Math.cos(2 * Math.PI * y), b * Math.sin(2 * Math.PI * z));
    }
    static createFromRotationMatrix(m) {
        const trace = m.get(0) + m.get(5) + m.get(10);
        if (trace > 0) {
            const s = 0.5 / Math.sqrt(trace + 1);
            return this.create(0.25 / s, (m.get(6) - m.get(9)) * s, (m.get(8) - m.get(2)) * s, (m.get(1) - m.get(4)) * s);
        }
        if (m.get(0) > m.get(5) && m.get(0) > m.get(10)) {
            const s = 2 * Math.sqrt(1 + m.get(0) - m.get(5) - m.get(10));
            return this.create((m.get(6) - m.get(9)) / s, 0.25 * s, (m.get(4) + m.get(1)) / s, (m.get(8) + m.get(2)) / s);
        }
        if (m.get(5) > m.get(10)) {
            const s = 2 * Math.sqrt(1 + m.get(5) - m.get(0) - m.get(10));
            return this.create((m.get(8) - m.get(2)) / s, (m.get(4) + m.get(1)) / s, 0.25 * s, (m.get(9) + m.get(6)) / s);
        }
        const s = 2 * Math.sqrt(1 + m.get(10) - m.get(0) - m.get(5));
        return this.create((m.get(1) - m.get(4)) / s, (m.get(8) + m.get(2)) / s, (m.get(9) + m.get(6)) / s, 0.25 * s);
    }
    static createFromEuler(phi, theta, psi, order) {
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
            return this.create(cX * cY * cZ - sX * sY * sZ, cX * cZ * sY - cY * sX * sZ, cX * cY * sZ + cZ * sX * sY, cY * cZ * sX + cX * sY * sZ);
        }
        if (order === 'XYZ' || order === 'RPY') {
            return this.create(cX * cY * cZ - sX * sY * sZ, cY * cZ * sX + cX * sY * sZ, cX * cZ * sY - cY * sX * sZ, cX * cY * sZ + cZ * sX * sY);
        }
        if (order === 'YXZ') {
            return this.create(cX * cY * cZ + sX * sY * sZ, cX * cZ * sY + cY * sX * sZ, cY * cZ * sX - cX * sY * sZ, cX * cY * sZ - cZ * sX * sY);
        }
        if (order === 'ZYX' || order === 'YPR') {
            return this.create(cX * cY * cZ + sX * sY * sZ, cX * cY * sZ - cZ * sX * sY, cX * cZ * sY + cY * sX * sZ, cY * cZ * sX - cX * sY * sZ);
        }
        if (order === 'YZX') {
            return this.create(cX * cY * cZ - sX * sY * sZ, cX * cY * sZ + cZ * sX * sY, cY * cZ * sX + cX * sY * sZ, cX * cZ * sY - cY * sX * sZ);
        }
        if (order === 'XZY') {
            return this.create(cX * cY * cZ + sX * sY * sZ, cY * cZ * sX - cX * sY * sZ, cX * cY * sZ - cZ * sX * sY, cX * cZ * sY + cY * sX * sZ);
        }
        return this.create(cX * cY * cZ - sX * sY * sZ, cX * cZ * sY - cY * sX * sZ, cX * cY * sZ + cZ * sX * sY, cY * cZ * sX + cX * sY * sZ);
    }
    static add(q1, q2) {
        return this.create(q1.w + q2.w, q1.x + q2.x, q1.y + q2.y, q1.z + q2.z);
    }
    static sub(q1, q2) {
        return this.create(q1.w - q2.w, q1.x - q2.x, q1.y - q2.y, q1.z - q2.z);
    }
    static normSquared(q1) {
        return (q1.w * q1.w) + (q1.x * q1.x) + (q1.y * q1.y) + (q1.z * q1.z);
    }
    static norm(q1) {
        return Math.sqrt(this.normSquared(q1));
    }
    static normalize(q1) {
        let norm = this.norm(q1);
        if (norm < epsilon) {
            return this.createZero();
        }
        norm = 1 / norm;
        return this.create(q1.w * norm, q1.x * norm, q1.y * norm, q1.z * norm);
    }
    static negate(q1) {
        return this.create(0 - q1.w, 0 - q1.x, 0 - q1.y, 0 - q1.z);
    }
    static mul(q1, q2) {
        return this.create((q1.w * q2.w) - (q1.x * q2.x) - (q1.y * q2.y) - (q1.z * q2.z), (q1.w * q2.x) + (q1.x * q2.w) + (q1.y * q2.z) - (q1.z * q2.y), (q1.w * q2.y) + (q1.y * q2.w) + (q1.z * q2.x) - (q1.x * q2.z), (q1.w * q2.z) + (q1.z * q2.w) + (q1.x * q2.y) - (q1.y * q2.x));
    }
    static scale(q1, s) {
        return this.create(s * q1.w, s * q1.x, s * q1.y, s * q1.z);
    }
    static inverse(q1) {
        let normSq = this.normSquared(q1);
        if (normSq === 0) {
            return this.createZero();
        }
        normSq = 1 / normSq;
        return this.create(q1.w * normSq, (0 - q1.x) * normSq, (0 - q1.y) * normSq, (0 - q1.z) * normSq);
    }
    static div(q1, q2) {
        let normSq = this.normSquared(q2);
        if (normSq === 0) {
            return this.createZero();
        }
        normSq = 1 / normSq;
        return this.create(((q1.w * q2.w) + (q1.x * q2.x) + (q1.y * q2.y) + (q1.z * q2.z)) * normSq, ((q1.x * q2.w) - (q1.w * q2.x) - (q1.y * q2.z) + (q1.z * q2.y)) * normSq, ((q1.y * q2.w) - (q1.w * q2.y) - (q1.z * q2.x) + (q1.x * q2.z)) * normSq, ((q1.z * q2.w) - (q1.w * q2.z) - (q1.x * q2.y) + (q1.y * q2.x)) * normSq);
    }
    static conjugate(q1) {
        return this.create(q1.w, 0 - q1.x, 0 - q1.y, 0 - q1.z);
    }
    static exp(q1) {
        const vNorm = Math.sqrt((q1.x * q1.x) + (q1.y * q1.y) + (q1.z * q1.z));
        const wExp = Math.exp(q1.w);
        const scale = wExp / vNorm * Math.sin(vNorm);
        if (vNorm === 0) {
            return this.create(wExp, 0, 0, 0);
        }
        return this.create(wExp * Math.cos(vNorm), q1.x * scale, q1.y * scale, q1.z * scale);
    }
    static log(q1) {
        if (q1.y === 0 && q1.z === 0) {
            return this.create(logHypot(q1.w, q1.x), Math.atan2(q1.x, q1.w), 0, 0);
        }
        const qNorm = this.normSquared(q1);
        const vNorm = Math.sqrt((q1.x * q1.x) + (q1.y * q1.y) + (q1.z * q1.z));
        const scale = Math.atan2(vNorm, q1.w) / vNorm;
        return this.create(Math.log(qNorm) * 0.5, q1.x * scale, q1.y * scale, q1.z * scale);
    }
    static pow(q1, q2) {
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
            const a = Math.exp((q2.w * loh) - (q2.x * arg));
            const b = (q2.x * loh) + (q2.w * arg);
            return this.create(a * Math.cos(b), a * Math.sin(b), 0, 0);
        }
        return this.exp(this.mul(this.log(q1), q2));
    }
    static slerp(q1, q2, pct) {
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
            const q = this.create(w1 + pct * (w2 - w1), x1 + pct * (x2 - x1), y1 + pct * (y2 - y1), z1 + pct * (z2 - z1));
            return this.normalize(q);
        }
        const Theta0 = Math.acos(cosTheta0);
        const sinTheta0 = Math.sin(Theta0);
        const Theta = Theta0 * pct;
        const sinTheta = Math.sin(Theta);
        const cosTheta = Math.cos(Theta);
        const s0 = cosTheta - cosTheta0 * sinTheta / sinTheta0;
        const s1 = sinTheta / sinTheta0;
        return this.create(s0 * w1 + s1 * w2, s0 * x1 + s1 * x2, s0 * y1 + s1 * y2, s0 * z1 + s1 * z2);
    }
}

;// CONCATENATED MODULE: ./src/core/frame.ts
function noop() { }
class Callback {
    constructor(fn) {
        this.register(fn);
    }
    register(fn) {
        if (typeof (fn) !== 'function') {
            fn = noop;
        }
        this.fn = fn;
    }
    performCall(...any) {
        var _a;
        try {
            return (_a = this.fn) === null || _a === void 0 ? void 0 : _a.apply(null, arguments);
        }
        catch (err) {
            console.error(err);
        }
    }
}
let isKilled = true;
let isStopped = false;
let isPaused = false;
let startingTime = 0;
let lastTime = 0;
let totalElapsedTime = 0;
let elapsedSinceLastLoop = 0;
const onStartCb = new Callback(noop);
const onUpdateCb = new Callback(noop);
function render(currentTime) {
    if (isKilled) {
        return;
    }
    if (isStopped) {
        requestAnimationFrame(render);
        return;
    }
    totalElapsedTime = currentTime - startingTime;
    elapsedSinceLastLoop = currentTime - lastTime;
    lastTime = currentTime;
    onUpdateCb.performCall(currentTime, (isPaused ? 0 : elapsedSinceLastLoop), totalElapsedTime);
    requestAnimationFrame(render);
}
function onStart(cb) {
    onStartCb.register(cb);
}
function onUpdate(cb) {
    onUpdateCb.register(cb);
}
function startFrames() {
    requestAnimationFrame((currentTime) => {
        if (isKilled == false) {
            return;
        }
        isKilled = false;
        isStopped = false;
        isPaused = false;
        startingTime = currentTime;
        lastTime = currentTime;
        totalElapsedTime = 0;
        elapsedSinceLastLoop = 0;
        onStartCb.performCall(0, 0);
        requestAnimationFrame(render);
    });
}
function pauseFrames() {
    isPaused = true;
}
function unpauseFrames() {
    isPaused = false;
}
function stopFrames() {
    isStopped = true;
}
function resumeFrames() {
    isStopped = false;
}
function killFrames() {
    isKilled = true;
}

;// CONCATENATED MODULE: ./src/core/webgl-utility.ts









// https://webgl2fundamentals.org/webgl/resources/m4.js
const defaulTemperatures = {
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
};
const forceGL1 = false;
const gl1 = !!WebGLRenderingContext;
const gl2 = !!WebGL2RenderingContext;
class UniformData {
}
class WebglUtility {
    constructor(allowWebGL2Only, webGLoptions) {
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
    static radToDeg(rad) {
        return rad * 180 / Math.PI;
    }
    static degToRad(deg) {
        return deg * Math.PI / 180;
    }
    static colorTemperatureToRgb(value) {
        let r = 255, g = 1255, b = 255;
        if (typeof (value) !== 'number' || !value) {
            return Vec3.create(255, 255, 255);
        }
        if (value < 0)
            value = 0;
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
        }
        else {
            r = parseFloat((329.698727446 * Math.pow(value - 60, -0.1332047592)).toFixed(0));
            g = parseFloat((288.1221695283 * Math.pow(value - 60, -0.0755148492)).toFixed(0));
        }
        if (value >= 66) {
            b = 255;
        }
        else if (value <= 19) {
            b = 0;
        }
        else {
            b = parseFloat((138.5177312231 * Math.log(value - 10) - 305.0447927307).toFixed(0));
        }
        return Vec3.create(byte_byte(r), byte_byte(g), byte_byte(b));
    }
    static compose(translation, quaternion, scale) {
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
        const out = Mat4.empty();
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
    static verifyWebGl1() {
        return gl1;
    }
    static verifyWebGl2() {
        return (gl2 && !forceGL1);
    }
    static createCanvas() {
        let canvas = document.createElement('canvas');
        canvas.innerHTML = 'This browser does not support HTML5';
        return canvas;
    }
    static createWebgl1(canvas, options) {
        if (WebglUtility.verifyWebGl1() == false) {
            return null;
        }
        if (!canvas) {
            canvas = WebglUtility.createCanvas();
        }
        let gl = canvas.getContext('webgl', options);
        if (!gl) {
            throw new Error('Could not get context, there was an unknown error.');
        }
        return gl;
    }
    static createWebgl2(canvas, options) {
        if (WebglUtility.verifyWebGl2() == false) {
            return null;
        }
        if (!canvas) {
            canvas = WebglUtility.createCanvas();
        }
        let gl = canvas.getContext('webgl2', options);
        if (!gl) {
            throw new Error('Could not get context, there was an unknown error.');
        }
        return gl;
    }
    static createProgram(gl, vertexShader, fragmentShader) {
        let program = gl.createProgram();
        gl.attachShader(program, vertexShader);
        gl.attachShader(program, fragmentShader);
        gl.linkProgram(program);
        if (!(gl.getProgramParameter(program, gl.LINK_STATUS))) {
            throw ('Program failed to link: ' + gl.getProgramInfoLog(program));
        }
        return program;
    }
    static webglResize(gl, width, height) {
        gl.canvas.width = width;
        gl.canvas.height = height;
        gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
        gl.clearColor(1, 1, 1, 1);
        gl.clearDepth(1.0);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    }
    static compileShader(gl, shaderType, shaderSource) {
        let shader = gl.createShader(shaderType);
        gl.shaderSource(shader, shaderSource);
        gl.compileShader(shader);
        if (!(gl.getShaderParameter(shader, gl.COMPILE_STATUS))) {
            gl.deleteShader(shader);
            throw 'Could not compile shader: ' + gl.getShaderInfoLog(shader);
        }
        return shader;
    }
    static setRectangle(gl, x, y, width, height) {
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
    get canvas() {
        return this._canvas;
    }
    get gl() {
        return this._gl;
    }
    get program() {
        return this._programs.get(this._programInUse);
    }
    resize(width, height) {
        WebglUtility.webglResize(this.gl, width, height);
    }
    createProgram(programName, vertexShader, fragmentShader) {
        try {
            const program = WebglUtility.createProgram(this.gl, WebglUtility.compileShader(this.gl, this.gl.VERTEX_SHADER, vertexShader), WebglUtility.compileShader(this.gl, this.gl.FRAGMENT_SHADER, fragmentShader));
            this._programInUse = programName;
            this._programs.set(this._programInUse, program);
        }
        catch (err) {
            console.error(err);
        }
    }
    enableDepthTest() {
        this.gl.enable(this.gl.DEPTH_TEST);
    }
    enableCullFace() {
        this.gl.enable(this.gl.CULL_FACE);
    }
    setUniforms(uniforms) {
        for (let uniform of uniforms) {
            try {
                const uniformLocation = this.gl.getUniformLocation(this.program, uniform.name);
                const setter = ('uniform' + uniform.type);
                (this.gl[setter]).apply(this.gl, [uniformLocation, uniform.value]);
            }
            catch (err) {
                console.error(err);
            }
        }
    }
    useProgram(programName) {
        this._programInUse = programName;
    }
}
WebglUtility.Vec2 = Vec2;
WebglUtility.Vec3 = Vec3;
WebglUtility.Vec4 = Vec4;
WebglUtility.Mat2 = Mat2;
WebglUtility.Mat3 = Mat3;
WebglUtility.Mat4 = Mat4;
WebglUtility.Quaternion = Quaternion;
WebglUtility.onStartFrame = onStart;
WebglUtility.onUpdateFrame = onUpdate;
WebglUtility.startFrames = startFrames;
WebglUtility.pauseFrames = pauseFrames;
WebglUtility.unpauseFrames = unpauseFrames;
WebglUtility.stopFrames = stopFrames;
WebglUtility.resumeFrames = resumeFrames;
WebglUtility.killFrames = killFrames;

;// CONCATENATED MODULE: ./src/api.ts

const Api = WebglUtility;

;// CONCATENATED MODULE: ./src/index.js
var libName = 'WebglUtility';

try
{
  if (getRoot()[libName] && isProduction()) {
    throw new Error('window["' + libName + '"] is already in use!');
  }

  getRoot()[libName] = Api;
}
catch(err)
{
  console.error(err);
}

/******/ })();
