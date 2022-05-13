// this class contains all the information about board situation
class BitBoardData {
  constructor() {
    this.board = [
      [" ", "n", " ", " ", "k", " ", "n", " "],
      ["p", "p", "p", "p", "p", "p", "p", "p"],
      [" ", " ", " ", " ", " ", " ", " ", " "],
      [" ", " ", " ", " ", " ", " ", " ", " "],
      [" ", " ", " ", " ", " ", " ", " ", " "],
      [" ", " ", " ", " ", " ", " ", " ", " "],
      ["P", "P", "P", "P", "P", "P", "P", "P"],
      [" ", "N", " ", " ", "K", " ", "N", " "],
    ];
    this.boardBinary =
      "0000000000000000000000000000000000000000000000000000000000000000";
    this.pieces = {
      r: BigInt(0),
      n: BigInt(0),
      b: BigInt(0),
      q: BigInt(0),
      k: BigInt(0),
      p: BigInt(0),
      R: BigInt(0),
      N: BigInt(0),
      B: BigInt(0),
      Q: BigInt(0),
      K: BigInt(0),
      P: BigInt(0),
    };
    this.loadBoardPieces();
    this.column_a = BigInt(
      "0b1000000010000000100000001000000010000000100000001000000010000000"
    );
    this.column_b = BigInt(
      "0b0100000001000000010000000100000001000000010000000100000001000000"
    );
    this.column_g = BigInt(
      "0b0000001000000010000000100000001000000010000000100000001000000010"
    );
    this.column_h = BigInt(
      "0b0000000100000001000000010000000100000001000000010000000100000001"
    );
    this.occupy = BigInt(
      "0b1111111111111111111111111111111111111111111111111111111111111111"
    );
    this.only_ones =
      "1111111111111111111111111111111111111111111111111111111111111111";
    this.inverted_column_h = this.occupy ^ this.column_h;
    this.inverted_column_g = this.occupy ^ this.column_g;
    this.inverted_column_b = this.occupy ^ this.column_b;
    this.inverted_column_a = this.occupy ^ this.column_a;
    this.row_5 = BigInt(
      "0b0000000000000000000000001111111100000000000000000000000000000000"
    );
    this.row_4 = BigInt(
      "0b0000000000000000000000000000000011111111000000000000000000000000"
    );
    this.last_move = {
      piece1: "P",
      position1: BigInt("0b10000000000"),
      piece2: "P",
      position2: BigInt("0b100000000000000000000000000"),
    };
  }

  loadBoardPieces = () => {
    for (let i = 0; i < 64; i++) {
      if (this.pieces[board[Math.floor(i / 8)][i % 8]] !== undefined) {
        let binary = "1" + this.boardBinary.substring(i + 1);
        this.pieces[board[Math.floor(i / 8)][i % 8]] += BigInt(parseInt(binary, 2));
      }
    }
  };

  generate_binary_board() {
    let sum = Object.values(this.pieces).reduce((t, v) => {
      return BigInt(t) + BigInt(v);
    }, BigInt(0));
    let sum_binary = sum.toString(2);
    return sum_binary;
  }

  generate_array() {
    let binaries = {};
    Object.entries(this.pieces).forEach(([k, v]) => {
      let binary = v.toString(2);
      binaries[k] = this.boardBinary.substring(0, 64 - binary.length) + binary;
    });
    let array = [
      [" ", " ", " ", " ", " ", " ", " ", " "],
      [" ", " ", " ", " ", " ", " ", " ", " "],
      [" ", " ", " ", " ", " ", " ", " ", " "],
      [" ", " ", " ", " ", " ", " ", " ", " "],
      [" ", " ", " ", " ", " ", " ", " ", " "],
      [" ", " ", " ", " ", " ", " ", " ", " "],
      [" ", " ", " ", " ", " ", " ", " ", " "],
      [" ", " ", " ", " ", " ", " ", " ", " "],
    ];
    for (let i = 0; i < 64; i++) {
      Object.entries(binaries).forEach(([k, v]) => {
        if (v[i] !== "0") array[Math.floor(i / 8)][i % 8] = k;
      });
    }
    return array;
  }

  testing_white_pawn_moves(){
    const blacks_except_k = this.pieces["p"]|this.pieces["n"]|this.pieces["b"]|this.pieces["r"]|this.pieces["q"];
    const all_pieces = this.pieces["p"]|this.pieces["n"]|this.pieces["b"]|this.pieces["r"]|this.pieces["q"]|this.pieces["k"]|this.pieces["P"]|this.pieces["N"]|this.pieces["B"]|this.pieces["R"]|this.pieces["Q"]|this.pieces["K"];
    const inverted_all_pieces= all_pieces^this.occupy;
    let solution = 0n;
    solution|=(pieces["P"]<<7n)&this.inverted_column_a&blacks_except_k; //this only calculate right side attacks
    solution|=(pieces["P"]<<9n)&this.inverted_column_h&blacks_except_k; //this only calculate left side attacks
    solution|=(pieces["P"]<<8n)&inverted_all_pieces; //advance one cell ahead
    solution|=(pieces["P"]<<16n)&inverted_all_pieces&(inverted_all_pieces<<8n)&this.row_4; //advance two cells ahead from the second row
    if(this.last_move["piece1"]==="p" && (this.last_move["position2"]<<16n)===this.last_move["position1"]){ // if last move was a black pawn that advanced two cells
      solution|=(this.pieces["P"]<<9n)&this.inverted_column_h&(this.last_move["position2"]<<8n) // left capture in en passant
      solution|=(this.pieces["P"]<<7n)&this.inverted_column_a&(this.last_move["position2"]<<8n) // right capture in en passant
    }
    return solution;
  }
  
  testing_black_pawn_moves(){
    const whites_except_k = this.pieces["P"]|this.pieces["N"]|this.pieces["B"]|this.pieces["R"]|this.pieces["Q"];
    const all_pieces = this.pieces["p"]|this.pieces["n"]|this.pieces["b"]|this.pieces["r"]|this.pieces["q"]|this.pieces["k"]|this.pieces["P"]|this.pieces["N"]|this.pieces["B"]|this.pieces["R"]|this.pieces["Q"]|this.pieces["K"];
    const inverted_all_pieces= all_pieces^this.occupy;
    let solution = 0n;
    solution|=(this.pieces["p"]>>7n)&this.inverted_column_h&whites_except_k; //this only calculate right side attacks
    solution|=(this.pieces["p"]>>9n)&this.inverted_column_a&whites_except_k; //this only calculate left side attacks
    solution|=(this.pieces["p"]>>8n)&inverted_all_pieces; //advance one cell ahead
    solution|=(this.pieces["p"]>>16n)&inverted_all_pieces&(this.inverted_all_pieces>>8n)&this.row_5; //advance two cells ahead from the second row
    if(this.last_move["piece1"]==="P" && (this.last_move["position2"]>>16n)===this.last_move["position1"]){ // if last move was a black pawn that advanced two cells
      solution|=(this.pieces["p"]>>9n)&this.inverted_column_a&(this.last_move["position2"]>>8n) // left capture in en passant
      solution|=(this.pieces["p"]>>7n)&this.inverted_column_h&(this.last_move["position2"]>>8n) // right capture in en passant
    }
    return solution;
  }
}

export default BitBoardData;
