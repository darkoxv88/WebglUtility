import { IArrayLike } from "../interfaces/i-array-like";

export function matTranspose(m1: IArrayLike, floor: number, out: IArrayLike): void {
  for(let i = 0; i < floor; i++) {
    for(let j = 0; j < floor; j++) {
      out.set(
        (j * floor) + i, 
        m1.get((i * floor) + j)
      );
    }
  }
}
