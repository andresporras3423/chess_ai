function generate_boards(){
  let board=[
    ["r","n","b"," ","k","b","n","r"],
    ["p","p"," ","p","p","p","p","p"],
    [" "," "," "," "," "," "," ","N"],
    [" ","P","p"," "," "," "," "," "],
    [" "," "," "," ","p","P"," "," "],
    [" "," "," "," "," "," "," "," "],
    ["P","P","P","P","P"," ","P","P"],
    ["R","N","B","Q","K","B"," ","R"]]
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

const column_a = BigInt("0b1000000010000000100000001000000010000000100000001000000010000000")
const column_b = BigInt("0b0100000001000000010000000100000001000000010000000100000001000000")
const column_g = BigInt("0b0000001000000010000000100000001000000010000000100000001000000010")
const column_h = BigInt("0b0000000100000001000000010000000100000001000000010000000100000001")
const occupy = BigInt("0b1111111111111111111111111111111111111111111111111111111111111111")
const only_ones = "1111111111111111111111111111111111111111111111111111111111111111";
const inverted_column_h = occupy^column_h;
const inverted_column_g = occupy^column_g;
const inverted_column_b = occupy^column_b;
const inverted_column_a = occupy^column_a;
const row_5 =  BigInt("0b0000000000000000000000001111111100000000000000000000000000000000")
const row_4 =  BigInt("0b0000000000000000000000000000000011111111000000000000000000000000")
let last_move={
  "piece1": "P",
  "position1": BigInt("0b10000000000"),
  "piece2": "P",
  "position2": BigInt("0b100000000000000000000000000"),
}

function testing_white_pawn_moves(){
  let pieces = generate_boards();
  const blacks_except_k = pieces["p"]|pieces["n"]|pieces["b"]|pieces["r"]|pieces["q"];
  const all_pieces = pieces["p"]|pieces["n"]|pieces["b"]|pieces["r"]|pieces["q"]||pieces["k"]|pieces["P"]|pieces["N"]|pieces["B"]|pieces["R"]|pieces["Q"]||pieces["K"];
  const inverted_all_pieces= all_pieces^occupy;
  console.log(((pieces["P"]<<7n)&inverted_column_a&blacks_except_k).toString(2)); //this only calculate right side attacks
  console.log(((pieces["P"]<<9n)&inverted_column_h&blacks_except_k).toString(2)); //this only calculate left side attacks
  console.log(((pieces["P"]<<8n)&inverted_all_pieces).toString(2)); //advance one cell ahead
  console.log(((pieces["P"]<<16n)&inverted_all_pieces&(inverted_all_pieces<<8n)&row_4).toString(2)); //advance two cells ahead from the second row
  if(last_move["piece1"]==="p" && (last_move["position2"]<<16n)===last_move["position1"]){ // if last move was a black pawn that advanced two cells
    console.log(((pieces["P"]<<9n)&inverted_column_h&(last_move["position2"]<<8n)).toString(2)) // left capture in en passant
    console.log(((pieces["P"]<<7n)&inverted_column_a&(last_move["position2"]<<8n)).toString(2)) // right capture in en passant
  }
}

function testing_black_pawn_moves(){
  let pieces = generate_boards();
  const whites_except_k = pieces["P"]|pieces["N"]|pieces["B"]|pieces["R"]|pieces["Q"];
  const all_pieces = pieces["p"]|pieces["n"]|pieces["b"]|pieces["r"]|pieces["q"]||pieces["k"]|pieces["P"]|pieces["N"]|pieces["B"]|pieces["R"]|pieces["Q"]||pieces["K"];
  const inverted_all_pieces= all_pieces^occupy;
  console.log(((pieces["p"]>>7n)&inverted_column_h&whites_except_k).toString(2)); //this only calculate right side attacks
  console.log(((pieces["p"]>>9n)&inverted_column_a&whites_except_k).toString(2)); //this only calculate left side attacks
  console.log(((pieces["p"]>>8n)&inverted_all_pieces).toString(2)); //advance one cell ahead
  console.log(((pieces["p"]>>16n)&inverted_all_pieces&(inverted_all_pieces>>8n)&row_5).toString(2)); //advance two cells ahead from the second row
  if(last_move["piece1"]==="P" && (last_move["position2"]>>16n)===last_move["position1"]){ // if last move was a black pawn that advanced two cells
    console.log(((pieces["p"]>>9n)&inverted_column_a&(last_move["position2"]>>8n)).toString(2)) // left capture in en passant
    console.log(((pieces["p"]>>7n)&inverted_column_h&(last_move["position2"]>>8n)).toString(2)) // right capture in en passant
  }
}

function testing_white_rock_moves(){
  let pieces = generate_boards();
  let occ = "11001010";
  let slid = "00001000";
  const all_row = BigInt("0b11111111"); // just number 1
  const row_unit = BigInt("0b00000001"); // just number 1
  let occupied = BigInt(`0b${occ}`); // this represents all the pieces present in a row
  let slider = BigInt(`0b${slid}`); // this represent rock piece in the row
  let remove_slider = occupied-slider;
  let right_direction= 0n;
  if(slider>remove_slider){ //it happens when there no pieces left side the rock
    right_direction = all_row-((slider<<1n)-row_unit);
  }else{
    right_direction= occupied^(occupied-slider-slider);
  }
  // from here calculate possible moves to right direction
  let rev_occupied = BigInt(`0b${occ.split("").reverse().join("")}`)
  let rev_slider = BigInt(`0b${slid.split("").reverse().join("")}`)
  let rev_remove_slider = rev_occupied-rev_slider;
  let left_direction= 0n;
  if(rev_slider>rev_remove_slider){ //it happens when there no pieces left side the rock
    let sol = (all_row-(all_row-((rev_slider<<1n)-row_unit)));
    left_direction=BigInt(`0b${sol.toString(2).split("").reverse().map(x=> x==="0" ? "1" : "0").join("")}`)
  }else{
    let sol = (all_row-(rev_occupied^(rev_occupied-rev_slider-rev_slider)));
    left_direction=BigInt(`0b${sol.toString(2).split("").reverse().map(x=> x==="0" ? "1" : "0").join("")}`)
  }
  console.log((right_direction+left_direction).toString(2))
  //console.log(((BigInt("0b10100001") >> 2n)|(BigInt("0b10100001") << 6n)).toString(2));
}

function test_white_king_moves(){
  let pieces = generate_boards();
  const white_except_k = pieces["P"]|pieces["N"]|pieces["B"]|pieces["R"]|pieces["Q"];
  const inverted_white_expect_k = white_except_k^occupy;
  let moves_left = ((pieces["K"]<<1n)|(pieces["K"]<<9n)|(pieces["K"]>>7n))&inverted_column_h
  let moves_right = ((pieces["K"]>>1n)|(pieces["K"]<<7n)|(pieces["K"]>>9n))&inverted_column_a
  let moves_center = (pieces["K"]<<8n)|(pieces["K"]>>8n)
  console.log(((moves_left|moves_right|moves_center)&inverted_white_expect_k).toString(2))
}

function test_black_king_moves(){
  let pieces = generate_boards();
  const black_except_k = pieces["p"]|pieces["n"]|pieces["b"]|pieces["r"]|pieces["q"];
  const inverted_black_expect_k = black_except_k^occupy;
  let moves_left = ((pieces["k"]<<1n)|(pieces["k"]<<9n)|(pieces["k"]>>7n))&inverted_column_h
  let moves_right = ((pieces["k"]>>1n)|(pieces["k"]<<7n)|(pieces["k"]>>9n))&inverted_column_a
  let moves_center = (pieces["k"]<<8n)|(pieces["k"]>>8n)
  console.log(((moves_left|moves_right|moves_center)&inverted_black_expect_k).toString(2))
}

function test_white_knight_moves(){
  let pieces = generate_boards();
  const white = pieces["P"]|pieces["N"]|pieces["K"]|pieces["B"]|pieces["R"]|pieces["Q"];
  const inverted_white= white^occupy;
  let moves_left_one_step = ((pieces["N"]<<17n)|(pieces["N"]>>15n))&inverted_column_h
  let moves_right_one_step = ((pieces["N"]<<15n)|(pieces["N"]>>17n))&inverted_column_a
  let moves_left_two_steps = ((pieces["N"]<<10n)|(pieces["N"]>>6n))&inverted_column_h&inverted_column_g
  let moves_right_two_steps = ((pieces["N"]<<6n)|(pieces["N"]>>10n))&inverted_column_a&inverted_column_b
  console.log(((moves_left_one_step|moves_right_one_step|moves_left_two_steps|moves_right_two_steps)&inverted_white).toString(2))
}

function test_black_knight_moves(){
  let pieces = generate_boards();
  const black = pieces["p"]|pieces["n"]|pieces["k"]|pieces["b"]|pieces["r"]|pieces["q"];
  const inverted_black = black^occupy;
  let moves_left_one_step = ((pieces["n"]<<17n)|(pieces["n"]>>15n))&inverted_column_h
  let moves_right_one_step = ((pieces["n"]<<15n)|(pieces["n"]>>17n))&inverted_column_a
  let moves_left_two_steps = ((pieces["n"]<<10n)|(pieces["n"]>>6n))&inverted_column_h&inverted_column_g
  let moves_right_two_steps = ((pieces["n"]<<6n)|(pieces["n"]>>10n))&inverted_column_a&inverted_column_b
  console.log(((moves_left_one_step|moves_right_one_step|moves_left_two_steps|moves_right_two_steps)&inverted_black).toString(2))
}

testing_black_pawn_moves();

// testing_white_moves();
// console.log(shift(column_a, 1));
// let pie = generate_boards();
// console.log(generate_array(pie));