// this class contains all the information about board situation
class BitBoardData {
  constructor() {
    this.board = [
      [" ", "n", " ", " ", "k", " ", "n", " "],
      [" ", "p", " ", "P", " ", "p", "p", "p"],
      [" ", " ", " ", " ", " ", " ", " ", " "],
      [" ", " ", " ", " ", " ", " ", " ", " "],
      ["p", "P", "p", " ", " ", " ", " ", " "],
      [" ", " ", " ", " ", " ", " ", " ", " "],
      ["P", " ", "P", " ", "P", "P", "P", "P"],
      [" ", "N", " ", " ", "K", " ", "N", " "],
    ];
    this.boardBinary =
      "0000000000000000000000000000000000000000000000000000000000000000";
    this.moves = [];
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
      position1: BigInt("0b100000000000000"),
      piece2: "P",
      position2: BigInt("0b1000000000000000000000000000000"),
    };
  }

  loadBoardPieces = () => {
    for (let i = 0; i < 64; i++) {
      if (this.pieces[this.board[Math.floor(i / 8)][i % 8]] !== undefined) {
        let binary = "1" + this.boardBinary.substring(i + 1);
        this.pieces[this.board[Math.floor(i / 8)][i % 8]] += BigInt(
          parseInt(binary, 2)
        );
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

  testing_white_pawn_moves() {
    const blacks =
      this.pieces["p"] |
      this.pieces["n"] |
      this.pieces["b"] |
      this.pieces["r"] |
      this.pieces["q"];
    const all_pieces =
      this.pieces["p"] |
      this.pieces["n"] |
      this.pieces["b"] |
      this.pieces["r"] |
      this.pieces["q"] |
      this.pieces["k"] |
      this.pieces["P"] |
      this.pieces["N"] |
      this.pieces["B"] |
      this.pieces["R"] |
      this.pieces["Q"] |
      this.pieces["K"];
    const inverted_all_pieces = all_pieces ^ this.occupy;
    let list = "";
    let right_capture =
      (this.pieces["P"] << 7n) & this.inverted_column_a & blacks; //this only calculate right side attacks
    while (right_capture > 0n) {
      let last_index = right_capture.toString(2).split("").length - 1;
      let last_pawn = 1n << BigInt(last_index);
      this.pieces["P"] = this.pieces["P"] + last_pawn - (last_pawn>>7n);
      let is_check = this.white_king_check();
      this.pieces["P"] = this.pieces["P"] - last_pawn + (last_pawn>>7n);
      if(!is_check){
        list += `${Math.floor(last_index / 8 - 1)}${
          (last_index % 8) + 1
        }${Math.floor(last_index / 8)}${last_index % 8}`;
      }
      right_capture = right_capture ^ last_pawn;
    }
    let left_capture =
      (this.pieces["P"] << 9n) & this.inverted_column_h & blacks; //this only calculate left side attacks
    while (left_capture > 0n) {
      let last_index = left_capture.toString(2).split("").length - 1;
      let last_pawn = 1n << BigInt(last_index);
      this.pieces["P"] = this.pieces["P"] + last_pawn - (last_pawn>>9n);
      let is_check = this.white_king_check();
      this.pieces["P"] = this.pieces["P"] - last_pawn + (last_pawn>>9n);
      if(!is_check){
        list += `${Math.floor(last_index / 8 - 1)}${
          (last_index % 8) - 1
        }${Math.floor(last_index / 8)}${last_index % 8}`;
      }
      left_capture = left_capture ^ last_pawn;
    }
    let one_cell_ahead = (this.pieces["P"] << 8n) & inverted_all_pieces; //advance one cell ahead
    while (one_cell_ahead > 0n) {
      let last_index = one_cell_ahead.toString(2).split("").length - 1;
      let last_pawn = 1n << BigInt(last_index);
      this.pieces["P"] = this.pieces["P"] + last_pawn - (last_pawn>>8n);
      let is_check = this.white_king_check();
      this.pieces["P"] = this.pieces["P"] - last_pawn + (last_pawn>>8n);
      if(!is_check){
        list += `${Math.floor(last_index / 8 - 1)}${last_index % 8}${Math.floor(
          last_index / 8
        )}${last_index % 8}`;
      }
      one_cell_ahead = one_cell_ahead ^ last_pawn;
    }
    let two_cells_ahead =
      (this.pieces["P"] << 16n) &
      inverted_all_pieces &
      (inverted_all_pieces << 8n) &
      this.row_4; //advance two cells ahead from the second row
    while (two_cells_ahead > 0n) {
      let last_index = two_cells_ahead.toString(2).split("").length - 1;
      let last_pawn = 1n << BigInt(last_index);
      this.pieces["P"] = this.pieces["P"] + last_pawn - (last_pawn>>16n);
      let is_check = this.white_king_check();
      this.pieces["P"] = this.pieces["P"] - last_pawn + (last_pawn>>16n);
      if(!is_check){
        list += `${Math.floor(last_index / 8 + 2)}${last_index % 8}${Math.floor(
          last_index / 8
        )}${last_index % 8}`;
      }
      two_cells_ahead = two_cells_ahead ^ last_pawn;
    }
    // if last move was a black pawn that advanced two cells
    if (
      this.last_move["piece1"] === "p" &&
      this.last_move["position2"] << 16n === this.last_move["position1"]
    ) {
      let left_en_passant =
        (this.pieces["P"] << 9n) &
        this.inverted_column_h &
        (this.last_move["position2"] << 8n); // left capture in en passant
      if (left_en_passant > 0n) {
        let last_index = left_en_passant.toString(2).split("").length - 1;
        let last_pawn = 1n << BigInt(last_index);
        this.pieces["P"] = this.pieces["P"] + last_pawn - (last_pawn>>9n);
        let is_check = this.white_king_check();
        this.pieces["P"] = this.pieces["P"] - last_pawn + (last_pawn>>9n);
        if(!is_check){
          list += `${Math.floor(last_index / 8 - 1)}${
            (last_index % 8) - 1
          }${Math.floor(last_index / 8)}${last_index % 8}`;
        }
      }
      let right_en_passant =
        (this.pieces["P"] << 7n) &
        this.inverted_column_a &
        (this.last_move["position2"] << 8n); // right capture in en passant
      if (right_en_passant > 0n) {
        let last_index = right_en_passant.toString(2).split("").length - 1;
        let last_pawn = 1n << BigInt(last_index);
        this.pieces["P"] = this.pieces["P"] + last_pawn - (last_pawn>>7n);
        let is_check = this.white_king_check();
        this.pieces["P"] = this.pieces["P"] - last_pawn + (last_pawn>>7n);
        if(!is_check){
          list += `${Math.floor(last_index / 8 - 1)}${
            (last_index % 8) + 1
          }${Math.floor(last_index / 8)}${last_index % 8}`;
        }
      }
    }
    return list;
  }

  testing_black_pawn_moves() {
    let list = "";
    const whites_except_k =
      this.pieces["P"] |
      this.pieces["N"] |
      this.pieces["B"] |
      this.pieces["R"] |
      this.pieces["Q"];
    const all_pieces =
      this.pieces["p"] |
      this.pieces["n"] |
      this.pieces["b"] |
      this.pieces["r"] |
      this.pieces["q"] |
      this.pieces["k"] |
      this.pieces["P"] |
      this.pieces["N"] |
      this.pieces["B"] |
      this.pieces["R"] |
      this.pieces["Q"] |
      this.pieces["K"];
    const inverted_all_pieces = all_pieces ^ this.occupy;
    let right_capture =
      (this.pieces["p"] >> 7n) & this.inverted_column_h & whites_except_k; //this only calculate right side attacks
    while (right_capture > 0n) {
      let last_index = right_capture.toString(2).split("").length - 1;
      let last_pawn = 1n << BigInt(last_index);
      this.pieces["p"] = this.pieces["p"] + last_pawn - (last_pawn<<7n);
      let is_check = this.black_king_check();
      this.pieces["p"] = this.pieces["p"] - last_pawn + (last_pawn<<7n);
      if(!is_check){
        list += `${Math.floor(last_index / 8 + 1)}${
          (last_index % 8) - 1
        }${Math.floor(last_index / 8)}${last_index % 8}`;
      }
      right_capture = right_capture ^ last_pawn;
    }
    let left_capture =
      (this.pieces["p"] >> 9n) & this.inverted_column_a & whites_except_k; //this only calculate left side attacks
    while (left_capture > 0n) {
      let last_index = left_capture.toString(2).split("").length - 1;
      let last_pawn = 1n << BigInt(last_index);
      this.pieces["p"] = this.pieces["p"] + last_pawn - (last_pawn<<9n);
      let is_check = this.black_king_check();
      this.pieces["p"] = this.pieces["p"] - last_pawn + (last_pawn<<9n);
      if(!is_check){
        list += `${Math.floor(last_index / 8 + 1)}${
          (last_index % 8) + 1
        }${Math.floor(last_index / 8)}${last_index % 8}`;
      }
      left_capture = left_capture ^ last_pawn;
    }
    let one_cell_ahead = (this.pieces["p"] >> 8n) & inverted_all_pieces; //advance one cell ahead
    while (one_cell_ahead > 0n) {
      let last_index = one_cell_ahead.toString(2).split("").length - 1;
      let last_pawn = 1n << BigInt(last_index);
      this.pieces["p"] = this.pieces["p"] + last_pawn - (last_pawn<<8n);
      let is_check = this.black_king_check();
      this.pieces["p"] = this.pieces["p"] - last_pawn + (last_pawn<<8n);
      if(!is_check){
      list += `${Math.floor(last_index / 8 + 1)}${last_index % 8}${Math.floor(
        last_index / 8
      )}${last_index % 8}`;
      }
      one_cell_ahead = one_cell_ahead ^ last_pawn;
    }
    let two_cells_ahead =
      (this.pieces["p"] >> 16n) &
      inverted_all_pieces &
      (inverted_all_pieces >> 8n) &
      this.row_5; //advance two cells ahead from the second row
    while (two_cells_ahead > 0n) {
      let last_index = two_cells_ahead.toString(2).split("").length - 1;
      let last_pawn = 1n << BigInt(last_index);
      this.pieces["p"] = this.pieces["p"] + last_pawn - (last_pawn<<16n);
      let is_check = this.black_king_check();
      this.pieces["p"] = this.pieces["p"] - last_pawn + (last_pawn<<16n);
      if(!is_check){
        list += `${Math.floor(last_index / 8 + 2)}${last_index % 8}${Math.floor(
          last_index / 8
        )}${last_index % 8}`;
      }
      two_cells_ahead = two_cells_ahead ^ last_pawn;
    }
    if (
      this.last_move["piece1"] === "P" &&
      this.last_move["position2"] >> 16n === this.last_move["position1"]
    ) {
      // if last move was a black pawn that advanced two cells
      let left_en_passant =
        (this.pieces["p"] >> 9n) &
        this.inverted_column_a &
        (this.last_move["position2"] >> 8n); // left capture in en passant
      if (left_en_passant > 0n) {
        let last_index = left_en_passant.toString(2).split("").length - 1;
        let last_pawn = 1n << BigInt(last_index);
        this.pieces["p"] = this.pieces["p"] + last_pawn - (last_pawn<<9n);
        let is_check = this.black_king_check();
        this.pieces["p"] = this.pieces["p"] - last_pawn + (last_pawn<<9n);
        if(!is_check){
          list += `${Math.floor(last_index / 8 + 1)}${
            (last_index % 8) + 1
          }${Math.floor(last_index / 8)}${last_index % 8}`;
        }
      }
      let right_en_passant =
        (this.pieces["p"] >> 7n) &
        this.inverted_column_h &
        (this.last_move["position2"] >> 8n); // right capture in en passant
      if (right_en_passant > 0n) {
        let last_index = right_en_passant.toString(2).split("").length - 1;
        let last_pawn = 1n << BigInt(last_index);
        this.pieces["p"] = this.pieces["p"] + last_pawn - (last_pawn<<7n);
        let is_check = this.black_king_check();
        this.pieces["p"] = this.pieces["p"] - last_pawn + (last_pawn<<7n);
        if(!is_check){
          list += `${Math.floor(last_index / 8 + 1)}${
            (last_index % 8) - 1
          }${Math.floor(last_index / 8)}${last_index % 8}`;
        }
      }
    }
    return list;
  }

  test_white_king_moves() {
    const white_except_k =
      this.pieces["P"] |
      this.pieces["N"] |
      this.pieces["B"] |
      this.pieces["R"] |
      this.pieces["Q"];
    const inverted_white_expect_k = white_except_k ^ this.occupy;
    let moves_left =
      ((this.pieces["K"] << 1n) |
        (this.pieces["K"] << 9n) |
        (this.pieces["K"] >> 7n)) &
      this.inverted_column_h;
    let moves_right =
      ((this.pieces["K"] >> 1n) |
        (this.pieces["K"] << 7n) |
        (this.pieces["K"] >> 9n)) &
      this.inverted_column_a;
    let moves_center = (this.pieces["K"] << 8n) | (this.pieces["K"] >> 8n);
    let king_moves =
      (moves_left | moves_right | moves_center) & inverted_white_expect_k;
    let list = "";
    let king_origin = this.pieces["K"];
    let king_index = this.pieces["K"].toString(2).split("").length - 1;
    let king_row = Math.floor(king_index / 8);
    let king_column = king_index % 8;
    while (king_moves > 0n) {
      let last_index = king_moves.toString(2).split("").length - 1;
      let last_pawn = 1n << BigInt(last_index);
      this.pieces["K"] = last_pawn;
      let is_check = this.white_king_check();
      this.pieces["K"] = king_origin;
      if(!is_check){
        list += `${king_row}${king_column}${Math.floor(last_index / 8)}${
          last_index % 8
        }`;
      }
      king_moves = king_moves ^ last_pawn;
    }
    return list;
  }

  test_black_king_moves() {
    const black_except_k =
      this.pieces["p"] |
      this.pieces["n"] |
      this.pieces["b"] |
      this.pieces["r"] |
      this.pieces["q"];
    const inverted_black_expect_k = black_except_k ^ this.occupy;
    let moves_left =
      ((this.pieces["k"] << 1n) |
        (this.pieces["k"] << 9n) |
        (this.pieces["k"] >> 7n)) &
      this.inverted_column_h;
    let moves_right =
      ((this.pieces["k"] >> 1n) |
        (this.pieces["k"] << 7n) |
        (this.pieces["k"] >> 9n)) &
      this.inverted_column_a;
    let moves_center = (this.pieces["k"] << 8n) | (this.pieces["k"] >> 8n);
    let king_moves =
      (moves_left | moves_right | moves_center) & inverted_black_expect_k;
    let list = "";
    let king_origin = this.pieces["k"];
    let king_index = this.pieces["k"].toString(2).split("").length - 1;
    let king_row = Math.floor(king_index / 8);
    let king_column = king_index % 8;
    while (king_moves > 0n) {
      let last_index = king_moves.toString(2).split("").length - 1;
      let last_pawn = 1n << BigInt(last_index);
      this.pieces["k"] = last_pawn;
      let is_check = this.black_king_check();
      this.pieces["k"] = king_origin;
      if(!is_check){
        list += `${king_row}${king_column}${Math.floor(last_index / 8)}${
          last_index % 8
        }`;
      }
      king_moves = king_moves ^ last_pawn;
    }
    return list;
  }

  test_white_knight_moves() {
    const white =
      this.pieces["P"] |
      this.pieces["N"] |
      this.pieces["K"] |
      this.pieces["B"] |
      this.pieces["R"] |
      this.pieces["Q"];
    const inverted_white = white ^ this.occupy;
    let knights = this.pieces["N"];
    let list = "";
    while (knights > 0n) {
      let last_index = knights.toString(2).split("").length - 1;
      let last_knight = 1n << BigInt(last_index);
      let moves_left_one_step =
        ((last_knight << 17n) | (last_knight >> 15n)) & this.inverted_column_h;
      let moves_right_one_step =
        ((last_knight << 15n) | (last_knight >> 17n)) & this.inverted_column_a;
      let moves_left_two_steps =
        ((last_knight << 10n) | (last_knight >> 6n)) &
        this.inverted_column_h &
        this.inverted_column_g;
      let moves_right_two_steps =
        ((last_knight << 6n) | (last_knight >> 10n)) &
        this.inverted_column_a &
        this.inverted_column_b;
      let knight_moves =
        (moves_left_one_step |
          moves_right_one_step |
          moves_left_two_steps |
          moves_right_two_steps) &
        inverted_white;
      let knight_row = Math.floor(last_index / 8);
      let knight_column = last_index % 8;
      while (knight_moves > 0n) {
        let knight_index = knight_moves.toString(2).split("").length - 1;
        list += `${knight_row}${knight_column}${Math.floor(knight_index / 8)}${
          knight_index % 8
        }`;
        knight_moves = knight_moves ^ (1n << BigInt(knight_index));
      }
      knights = knights ^ last_knight;
    }
    return list;
  }

  test_black_knight_moves() {
    const black =
      this.pieces["p"] |
      this.pieces["n"] |
      this.pieces["k"] |
      this.pieces["b"] |
      this.pieces["r"] |
      this.pieces["q"];
    const inverted_black = black ^ this.occupy;
    let knights = this.pieces["n"];
    let list = "";
    while (knights > 0n) {
      let last_index = knights.toString(2).split("").length - 1;
      let last_knight = 1n << BigInt(last_index);
      let moves_left_one_step =
        ((last_knight << 17n) | (last_knight >> 15n)) & this.inverted_column_h;
      let moves_right_one_step =
        ((last_knight << 15n) | (last_knight >> 17n)) & this.inverted_column_a;
      let moves_left_two_steps =
        ((last_knight << 10n) | (last_knight >> 6n)) &
        this.inverted_column_h &
        this.inverted_column_g;
      let moves_right_two_steps =
        ((last_knight << 6n) | (last_knight >> 10n)) &
        this.inverted_column_a &
        this.inverted_column_b;
      let knight_moves =
        (moves_left_one_step |
          moves_right_one_step |
          moves_left_two_steps |
          moves_right_two_steps) &
        inverted_black;
      let knight_row = Math.floor(last_index / 8);
      let knight_column = last_index % 8;
      while (knight_moves > 0n) {
        let knight_index = knight_moves.toString(2).split("").length - 1;
        list += `${knight_row}${knight_column}${Math.floor(knight_index / 8)}${
          knight_index % 8
        }`;
        knight_moves = knight_moves ^ (1n << BigInt(knight_index));
      }
      knights = knights ^ last_knight;
    }
    return list;
  }

  white_king_check(){
    const inverted_white = (this.pieces["P"]&this.pieces["N"]&this.pieces["B"]&this.pieces["R"]&this.pieces["Q"]&this.pieces["K"])^this.occupy;
    if((((this.pieces["p"]&inverted_white)>>7n)&this.pieces["K"]&this.inverted_column_h)>0n) return true;
    if((((this.pieces["p"]&inverted_white)>>9n)&this.pieces["K"]&this.inverted_column_a)>0n) return true;
    if((((this.pieces["n"]&inverted_white)<<17n)&this.pieces["K"]&this.inverted_column_h)>0n) return true;
    if((((this.pieces["n"]&inverted_white)>>15n)&this.pieces["K"]&this.inverted_column_h)>0n) return true;
    if((((this.pieces["n"]&inverted_white)>>17n)&this.pieces["K"]&this.inverted_column_a)>0n) return true;
    if((((this.pieces["n"]&inverted_white)<<15n)&this.pieces["K"]&this.inverted_column_a)>0n) return true;
    if((((this.pieces["n"]&inverted_white)<<10n)&this.pieces["K"]&this.inverted_column_g&this.inverted_column_h)>0n) return true;
    if((((this.pieces["n"]&inverted_white)>>6n)&this.pieces["K"]&this.inverted_column_g&this.inverted_column_h)>0n) return true;
    if((((this.pieces["n"]&inverted_white)>>10n)&this.pieces["K"]&this.inverted_column_a&this.inverted_column_b)>0n) return true;
    if((((this.pieces["n"]&inverted_white)<<6n)&this.pieces["K"]&this.inverted_column_a&this.inverted_column_b)>0n) return true;
    return false;
  }

  black_king_check(){
    const inverted_black = (this.pieces["p"]&this.pieces["n"]&this.pieces["b"]&this.pieces["r"]&this.pieces["q"]&this.pieces["k"])^this.occupy;
    if((((this.pieces["P"]&inverted_black)<<7n)&this.pieces["k"]&this.inverted_column_a)>0n) return true;
    if((((this.pieces["P"]&inverted_black)<<9n)&this.pieces["k"]&this.inverted_column_h)>0n) return true;
    if((((this.pieces["N"]&inverted_black)<<17n)&this.pieces["k"]&this.inverted_column_h)>0n) return true;
    if((((this.pieces["N"]&inverted_black)>>15n)&this.pieces["k"]&this.inverted_column_h)>0n) return true;
    if((((this.pieces["N"]&inverted_black)>>17n)&this.pieces["k"]&this.inverted_column_a)>0n) return true;
    if((((this.pieces["N"]&inverted_black)<<15n)&this.pieces["k"]&this.inverted_column_a)>0n) return true;
    if((((this.pieces["N"]&inverted_black)<<10n)&this.pieces["k"]&this.inverted_column_g&this.inverted_column_h)>0n) return true;
    if((((this.pieces["N"]&inverted_black)>>6n)&this.pieces["k"]&this.inverted_column_g&this.inverted_column_h)>0n) return true;
    if((((this.pieces["N"]&inverted_black)>>10n)&this.pieces["k"]&this.inverted_column_a&this.inverted_column_b)>0n) return true;
    if((((this.pieces["N"]&inverted_black)<<6n)&this.pieces["k"]&this.inverted_column_a&this.inverted_column_b)>0n) return true;
    return false;
  }

  black_moves() {
    return (
      this.test_black_knight_moves() + this.test_black_king_moves() + this.testing_black_pawn_moves()
    );
  }

  white_moves() {
    return (
      this.test_white_knight_moves() + this.test_white_king_moves() + this.testing_white_pawn_moves()
    );
  }
}

export default BitBoardData;
