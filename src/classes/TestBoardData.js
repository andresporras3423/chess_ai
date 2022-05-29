import BitBoardData from "./BitBoardData.js";

let b = new BitBoardData();
(()=>{
  b.testing_black_king_moves();
  console.log(b.pieces_moves["k"]);
})();

function coord(num){
  let index = num.toString(2).split("").length - 1;
  return `${Math.floor(index / 8)} ${index % 8}`;
}

function mirrorHorizontal (x) {
  let k1 = BigInt("0b101010101010101010101010101010101010101010101010101010101010101");
  let k2 = BigInt("0b11001100110011001100110011001100110011001100110011001100110011");
  let k4 = BigInt("0b111100001111000011110000111100001111000011110000111100001111");
  x = ((x >> 1n) & k1) | ((x & k1) << 1n);
  x = ((x >> 2n) & k2) | ((x & k2) << 2n);
  x = ((x >> 4n) & k4) | ((x & k4) << 4n);
  return x;
}

// top row to bottom, bottom to top
function flipVertical(x) {
  let k1 = BigInt("0b11111111000000001111111100000000111111110000000011111111");
  let k2 = BigInt("0b111111111111111100000000000000001111111111111111");
  x = ((x >>  8n) & k1) | ((x & k1) <<  8n);
  x = ((x >> 16n) & k2) | ((x & k2) << 16n);
  x = ( x >> 32n)       | ( x       << 32n);
  return x;
}

function rotate180 (x) {
  return mirrorHorizontal (flipVertical (x) );
}

// console.log(rotate180(BigInt("0b1111111100000000000000000000000000000000000000000000000000000000")).toString(2))