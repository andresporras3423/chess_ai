import BitBoardData from "./BitBoardData.js";

let b = new BitBoardData();
console.log(b.white_moves());

function coord(num){
  let index = num.toString(2).split("").length - 1;
  return `${Math.floor(index / 8)} ${index % 8}`;
}
