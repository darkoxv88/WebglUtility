import { IArrayLike } from "../interfaces/i-array-like";

export function matMul(m1: IArrayLike, m2: IArrayLike, floor: number, out: IArrayLike): void {
  for(let i = 0; i < floor; i++) {
    for(let j = 0; j < floor; j++) {
      const outCol: number = (i * floor) + j;
      let numToSet: number = 0;

      for(let x = 0; x < floor; x++) {
        numToSet = numToSet + ( m1.get((i * floor) + x) * m2.get((x * floor) + j) );
      }
      
      out.set(outCol, numToSet);
    }
  }
}
