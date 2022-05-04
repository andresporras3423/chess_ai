function generate_boards(){
  let board=[
    ["r","n","b","q","k","b","n","r"],
    ["p","p","p","p","p","p","p","p"],
    [" "," "," "," "," "," "," "," "],
    [" "," "," "," "," "," "," "," "],
    [" "," "," "," "," "," "," "," "],
    [" "," "," "," "," "," "," "," "],
    ["P","P","P","P","P","P","P","P"],
    ["R","N","B","Q","K","B","N","R"]]
    let boardBinary = "0000000000000000000000000000000000000000000000000000000000000000"
    let pieces={
      "r":0,
      "n":0,
      "b":0,
      "q":0,
      "k":0,
      "p":0,
      "R":0,
      "N":0,
      "B":0,
      "Q":0,
      "K":0,
      "P":0}
    for(let i=0; i<64; i++){
      if(pieces[board[Math.floor(i/8)][i%8]]!==undefined){
        let binary = boardBinary.substring(0,i)+"1"+boardBinary.substring(i+1);
        pieces[board[Math.floor(i/8)][i%8]] += parseInt(binary,2);
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

let pie = generate_boards();
console.log(generate_array(pie));