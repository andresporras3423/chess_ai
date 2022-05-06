function generate_boards(){
  let board=[
    ["r","n","b","q","k","b","n","r"],
    ["p","p","p","p","p","p","p","p"],
    [" "," "," "," "," "," "," "," "],
    [" "," "," "," "," "," "," "," "],
    [" "," "," "," "," "," "," "," "],
    ["p"," "," "," "," ","p"," ","p"],
    ["P","P","P","P","P","P","P","P"],
    ["R","N","B","Q","K","B","N","R"]]
    let boardBinary = "0000000000000000000000000000000000000000000000000000000000000000"
    let pieces={
      "r":BigInt(0),
      "n":BigInt(0),
      "b":BigInt(0),
      "q":BigInt(0),
      "k":BigInt(0),
      "p":BigInt(0),
      "R":BigInt(0),
      "N":BigInt(0),
      "B":BigInt(0),
      "Q":BigInt(0),
      "K":BigInt(0),
      "P":BigInt(0)}
    for(let i=0; i<64; i++){
      if(pieces[board[Math.floor(i/8)][i%8]]!==undefined){
        let binary = "1"+boardBinary.substring(i+1);
        pieces[board[Math.floor(i/8)][i%8]] += BigInt(parseInt(binary,2));
      }
    }
    return pieces;
}

function generate_binary_board(pieces){
  let sum = Object.values(pieces).reduce((t,v)=>{
    return BigInt(t)+BigInt(v);
  },BigInt(0));
  let sum_binary = sum.toString(2);
  return sum_binary;
}

function generate_array(pieces){
  let boardBinary = "0000000000000000000000000000000000000000000000000000000000000000"
  let binaries={};
  Object.entries(pieces).forEach(([k,v])=>{
    let binary = v.toString(2);
    binaries[k] = boardBinary.substring(0,64-binary.length)+binary;
  });
  let array = [
    [" "," "," "," "," "," "," "," "],
    [" "," "," "," "," "," "," "," "],
    [" "," "," "," "," "," "," "," "],
    [" "," "," "," "," "," "," "," "],
    [" "," "," "," "," "," "," "," "],
    [" "," "," "," "," "," "," "," "],
    [" "," "," "," "," "," "," "," "],
    [" "," "," "," "," "," "," "," "]]
    for(let i=0; i<64; i++){
      Object.entries(binaries).forEach(([k,v])=>{
        if(v[i]!=="0") array[Math.floor(i/8)][i%8]=k;
      });
    }
    return array;
}

function shift(num, positions){
  return num << positions
}

const column_a = BigInt("0b10000000100000001000000010000000100000001000000010000000")
const column_h = BigInt("0b00000001000000010000000100000001000000010000000100000001")
const occupy = BigInt("0b11111111111111111111111111111111111111111111111111111111")
const inverted_column_h = occupy^column_h;
const inverted_column_a = occupy^column_a;

function testing_white_moves(){
  let pieces = generate_boards();
  const blacks_except_k = pieces["p"]|pieces["n"]|pieces["b"]|pieces["r"]|pieces["q"];
  console.log((shift(pieces["P"],7n)&inverted_column_a&blacks_except_k).toString(2)); //this only calculate right side attacks
  console.log((shift(pieces["P"],9n)&inverted_column_h&blacks_except_k).toString(2)); //this only calculate right side attacks
}
testing_white_moves();
// console.log(shift(column_a, 1));
// let pie = generate_boards();
// console.log(generate_array(pie));