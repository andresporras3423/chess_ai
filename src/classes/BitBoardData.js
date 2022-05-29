// this class contains all the information about board situation
class BitBoardData {
  constructor() {
    this.board = [
      ["R", "n", " ", " ", "k", " ", "n", " "],
      ["p", "p", " ", "p", " ", "b", "p", "p"],
      ["q", " ", " ", "r", " ", " ", " ", " "],
      ["q", " ", "P", " ", " ", " ", " ", "B"],
      ["p", "P", " ", " ", " ", " ", " ", " "],
      [" ", " ", " ", "R", " ", " ", "Q", " "],
      ["P", " ", "P", "B", " ", "P", "P", "P"],
      [" ", "N", "K", " ", " ", " ", "N", "R"],
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
      P: BigInt(0)
    };
    this.pieces_moves = {
      r: "",
      n: "",
      b: "",
      q: "",
      k: "",
      p: "",
      R: "",
      N: "",
      B: "",
      Q: "",
      K: "",
      P: "",
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
    this.rows = [
    BigInt("0b0000000000000000000000000000000000000000000000000000000011111111"),
    BigInt("0b0000000000000000000000000000000000000000000000001111111100000000"),
    BigInt("0b0000000000000000000000000000000000000000111111110000000000000000"),
    BigInt("0b0000000000000000000000000000000011111111000000000000000000000000"),
    BigInt("0b0000000000000000000000001111111100000000000000000000000000000000"),
    BigInt("0b0000000000000000111111110000000000000000000000000000000000000000"),
    BigInt("0b0000000011111111000000000000000000000000000000000000000000000000"),
    BigInt("0b1111111100000000000000000000000000000000000000000000000000000000")
    ]
    this.columns = [
      BigInt("0b0000000100000001000000010000000100000001000000010000000100000001"),
      BigInt("0b0000001000000010000000100000001000000010000000100000001000000010"),
      BigInt("0b0000010000000100000001000000010000000100000001000000010000000100"),
      BigInt("0b0000100000001000000010000000100000001000000010000000100000001000"),
      BigInt("0b0001000000010000000100000001000000010000000100000001000000010000"),
      BigInt("0b0010000000100000001000000010000000100000001000000010000000100000"),
      BigInt("0b0100000001000000010000000100000001000000010000000100000001000000"),
      BigInt("0b1000000010000000100000001000000010000000100000001000000010000000")
    ]

    this.falling_diagonals = [
      BigInt("0b0000000000000000000000000000000000000000000000000000000010000000"),
      BigInt("0b0000000000000000000000000000000000000000000000001000000001000000"),
      BigInt("0b0000000000000000000000000000000000000000100000000100000000100000"),
      BigInt("0b0000000000000000000000000000000010000000010000000010000000010000"),
      BigInt("0b0000000000000000000000001000000001000000001000000001000000001000"),
      BigInt("0b0000000000000000100000000100000000100000000100000000100000000100"),
      BigInt("0b0000000010000000010000000010000000010000000010000000010000000010"),
      BigInt("0b1000000001000000001000000001000000001000000001000000001000000001"),
      BigInt("0b0100000000100000000100000000100000000100000000100000000100000000"),
      BigInt("0b0010000000010000000010000000010000000010000000010000000000000000"),
      BigInt("0b0001000000001000000001000000001000000001000000000000000000000000"),
      BigInt("0b0000100000000100000000100000000100000000000000000000000000000000"),
      BigInt("0b0000010000000010000000010000000000000000000000000000000000000000"),
      BigInt("0b0000001000000001000000000000000000000000000000000000000000000000"),
      BigInt("0b0000000100000000000000000000000000000000000000000000000000000000"),
      ]

      this.rising_diagonals = [
        BigInt("0b0000000000000000000000000000000000000000000000000000000000000001"),
        BigInt("0b0000000000000000000000000000000000000000000000000000000100000010"),
        BigInt("0b0000000000000000000000000000000000000000000000010000001000000100"),
        BigInt("0b0000000000000000000000000000000000000001000000100000010000001000"),
        BigInt("0b0000000000000000000000000000000100000010000001000000100000010000"),
        BigInt("0b0000000000000000000000010000001000000100000010000001000000100000"),
        BigInt("0b0000000000000001000000100000010000001000000100000010000001000000"),
        BigInt("0b0000000100000010000001000000100000010000001000000100000010000000"),
        BigInt("0b0000001000000100000010000001000000100000010000001000000000000000"),
        BigInt("0b0000010000001000000100000010000001000000100000000000000000000000"),
        BigInt("0b0000100000010000001000000100000010000000000000000000000000000000"),
        BigInt("0b0001000000100000010000001000000000000000000000000000000000000000"),
        BigInt("0b0010000001000000100000000000000000000000000000000000000000000000"),
        BigInt("0b0100000010000000000000000000000000000000000000000000000000000000"),
        BigInt("0b1000000000000000000000000000000000000000000000000000000000000000")
      ]
    this.row_5 = BigInt(
      "0b0000000000000000000000001111111100000000000000000000000000000000"
    );
    this.reverse_rows = this.rows.map(r=> r^this.occupy);
    this.reverse_columns = this.columns.map(c=> c^this.occupy);
    this.row_4 = BigInt(
      "0b0000000000000000000000000000000011111111000000000000000000000000"
    );
    this.last_move = {
      piece1: "P",
      position1: BigInt("0b1000000000000"),
      piece2: "P",
      position2: BigInt("0b10000000000000000000000000000"),
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
    let right_capture =
      (this.pieces["P"] << 7n) & this.inverted_column_a & blacks; //this only calculate right side attacks
    while (right_capture > 0n) {
      let last_index = right_capture.toString(2).split("").length - 1;
      let last_pawn = 1n << BigInt(last_index);
      this.pieces["P"] = this.pieces["P"] + last_pawn - (last_pawn>>7n);
      let is_check = this.white_king_check();
      this.pieces["P"] = this.pieces["P"] - last_pawn + (last_pawn>>7n);
      if(!is_check){
        this.check_white_promotion(Math.floor(last_index / 8 - 1), (last_index % 8) + 1, Math.floor(last_index / 8), last_index % 8);
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
        this.check_white_promotion(Math.floor(last_index / 8 - 1), (last_index % 8) - 1, Math.floor(last_index / 8), last_index % 8) 
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
        this.check_white_promotion(Math.floor(last_index / 8 - 1), last_index % 8, Math.floor(last_index / 8),last_index % 8)
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
        this.check_white_promotion(Math.floor(last_index / 8 + 2), last_index % 8, Math.floor(last_index / 8), last_index % 8)
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
        this.pieces["p"] = this.pieces["p"] - this.last_move["position2"];
        this.pieces["P"] = this.pieces["P"] + last_pawn - (last_pawn>>9n);
        let is_check = this.white_king_check();
        this.pieces["p"] = this.pieces["p"] + this.last_move["position2"];
        this.pieces["P"] = this.pieces["P"] - last_pawn + (last_pawn>>9n);
        if(!is_check){
          this.pieces_moves["P"] += `${Math.floor(last_index / 8 - 1)}${
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
        this.pieces["p"] = this.pieces["p"] - this.last_move["position2"];
        this.pieces["P"] = this.pieces["P"] + last_pawn - (last_pawn>>7n);
        let is_check = this.white_king_check();
        this.pieces["p"] = this.pieces["p"] + this.last_move["position2"];
        this.pieces["P"] = this.pieces["P"] - last_pawn + (last_pawn>>7n);
        if(!is_check){
          this.pieces_moves["P"] += `${Math.floor(last_index / 8 - 1)}${
            (last_index % 8) + 1
          }${Math.floor(last_index / 8)}${last_index % 8}`;
        }
      }
    }
  }

  testing_black_pawn_moves() {
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
        this.check_black_promotion(Math.floor(last_index / 8 + 1), (last_index % 8) - 1, Math.floor(last_index / 8), last_index % 8)
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
        this.check_black_promotion(Math.floor(last_index / 8 + 1), (last_index % 8) + 1, Math.floor(last_index / 8), last_index % 8)
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
        this.check_black_promotion(Math.floor(last_index / 8 + 1), last_index % 8, Math.floor(last_index / 8), last_index % 8)
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
        this.check_black_promotion(Math.floor(last_index / 8 + 2), last_index % 8, Math.floor(last_index / 8), last_index % 8)
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
        this.pieces["P"] = this.pieces["P"] - this.last_move["position2"];
        this.pieces["p"] = this.pieces["p"] + last_pawn - (last_pawn<<9n);
        let is_check = this.black_king_check();
        this.pieces["P"] = this.pieces["P"] + this.last_move["position2"];
        this.pieces["p"] = this.pieces["p"] - last_pawn + (last_pawn<<9n);
        if(!is_check){
          this.pieces_moves["p"] += `${Math.floor(last_index / 8 + 1)}${
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
        this.pieces["P"] = this.pieces["P"] - this.last_move["position2"];
        this.pieces["p"] = this.pieces["p"] + last_pawn - (last_pawn<<7n);
        let is_check = this.black_king_check();
        this.pieces["P"] = this.pieces["P"] + this.last_move["position2"];
        this.pieces["p"] = this.pieces["p"] - last_pawn + (last_pawn<<7n);
        if(!is_check){
          this.pieces_moves["p"] += `${Math.floor(last_index / 8 + 1)}${
            (last_index % 8) - 1
          }${Math.floor(last_index / 8)}${last_index % 8}`;
        }
      }
    }
  }

  testing_king_moves(k, inverted_same_but_k, king_check) {
    let moves_left =
      ((this.pieces[k] << 1n) |
        (this.pieces[k] << 9n) |
        (this.pieces[k] >> 7n)) &
      this.inverted_column_h;
    let moves_right =
      ((this.pieces[k] >> 1n) |
        (this.pieces[k] << 7n) |
        (this.pieces[k] >> 9n)) &
      this.inverted_column_a;
    let moves_center = (this.pieces[k] << 8n) | (this.pieces[k] >> 8n);
    let king_moves =
      (moves_left | moves_right | moves_center) & inverted_same_but_k;
    let king_origin = this.pieces[k];
    let king_index = this.pieces[k].toString(2).split("").length - 1;
    let king_row = Math.floor(king_index / 8);
    let king_column = king_index % 8;
    while (king_moves > 0n) {
      let last_index = king_moves.toString(2).split("").length - 1;
      let last_move = 1n << BigInt(last_index);
      this.pieces[k] = last_move;
      let is_check = king_check();
      this.pieces[k] = king_origin;
      if(!is_check){
        this.pieces_moves[k] += `${king_row}${king_column}${Math.floor(last_index / 8)}${
          last_index % 8
        }`;
      }
      king_moves = king_moves ^ last_move;
    }
  }

  testing_white_king_moves=()=>{
    const inverted_white_except_k =
      (this.pieces["P"] |
      this.pieces["N"] |
      this.pieces["B"] |
      this.pieces["R"] |
      this.pieces["Q"])^ this.occupy;
    this.testing_king_moves("K", inverted_white_except_k, this.white_king_check);
  }

  testing_black_king_moves=()=>{
    const inverted_black_except_k =
      (this.pieces["p"] |
      this.pieces["n"] |
      this.pieces["b"] |
      this.pieces["r"] |
      this.pieces["q"])^ this.occupy;
    this.testing_king_moves("k", inverted_black_except_k, this.black_king_check);
  }

  testing_knight_moves(n, inverted_color, king_check) {
    let knights = this.pieces[n];
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
          inverted_color;
      let knight_row = Math.floor(last_index / 8);
      let knight_column = last_index % 8;
      while (knight_moves > 0n) {
        let knight_index = knight_moves.toString(2).split("").length - 1;
        let last_move = 1n << BigInt(knight_index);
        this.pieces[n] = this.pieces[n]+last_move-last_knight;
        let is_check = king_check();
        this.pieces[n] = this.pieces[n]-last_move+last_knight;
        if(!is_check){
          this.pieces_moves[n] += `${knight_row}${knight_column}${Math.floor(knight_index / 8)}${
            knight_index % 8
          }`;
        }
        knight_moves = knight_moves ^ last_move;
      }
      knights = knights ^ last_knight;
    }
  }

  testing_white_knight_moves=()=>{
    const white =
      this.pieces["P"] |
      this.pieces["N"] |
      this.pieces["K"] |
      this.pieces["B"] |
      this.pieces["R"] |
      this.pieces["Q"];
    const inverted_white = white ^ this.occupy;
    this.testing_knight_moves("N", inverted_white, this.white_king_check)
  }

  testing_black_knight_moves=()=>{
    const black =
      this.pieces["p"] |
      this.pieces["n"] |
      this.pieces["k"] |
      this.pieces["b"] |
      this.pieces["r"] |
      this.pieces["q"];
    const inverted_black = black ^ this.occupy;
    this.testing_knight_moves("n", inverted_black, this.black_king_check)
  }

  testing_rock_moves(r, same_color_pieces, king_on_check){
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
    let rocks = this.pieces[r];
    while(rocks>0){
      let first = rocks&((rocks-1n)^this.occupy); // get first rock from avaiable rocks
      let first_index = first.toString(2).length-1;
      let temp_pieces_right = (all_pieces&this.rows[Math.floor(first_index / 8)]) - first;
      let right_direction= 0n;
      if(first>temp_pieces_right){ //it happens when there no pieces left side the rock
        right_direction = this.occupy-((first<<1n)-1n);
      }else{
        right_direction= temp_pieces_right^(temp_pieces_right-first-first);
      }
      right_direction= right_direction&this.rows[Math.floor(first_index / 8)];
      let temp_pieces_top = (all_pieces&this.columns[first_index % 8]) - first;
      let top_direction= 0n;
      if(first>temp_pieces_top){ //it happens when there no pieces left side the rock
        top_direction = this.occupy-((first<<1n)-1n);
      }else{
        top_direction= temp_pieces_top^(temp_pieces_top-first-first);
      }
      top_direction= top_direction&this.columns[first_index % 8];
      let reverse_first = this.rotate180(first);
      let temp_pieces_left = this.rotate180(temp_pieces_right);
      let left_direction = 0n;
      if(reverse_first>temp_pieces_left){ //it happens when there no pieces left side the rock
        left_direction = this.occupy-((reverse_first<<1n)-1n);
      }else{
        left_direction= temp_pieces_left^(temp_pieces_left-reverse_first-reverse_first);
      }
      left_direction = left_direction&this.rows[Math.floor((63-first_index) / 8)];
      let temp_pieces_bottom = this.rotate180(temp_pieces_top);
      let bottom_direction = 0n;
      if(reverse_first>temp_pieces_bottom){ //it happens when there no pieces left side the rock
        bottom_direction = this.occupy-((reverse_first<<1n)-1n);
      }else{
        bottom_direction= temp_pieces_bottom^(temp_pieces_bottom-reverse_first-reverse_first);
      }
      bottom_direction = bottom_direction&this.columns[(63-first_index) % 8];
      let rock_moves = right_direction|top_direction|this.rotate180(left_direction|bottom_direction);
      rock_moves = rock_moves & (same_color_pieces^this.occupy);
      while(rock_moves>0n){
        let first_move = rock_moves&((rock_moves-1n)^this.occupy); 
        let first_move_index = first_move.toString(2).length-1;
        this.pieces[r]=this.pieces[r] + first_move - first;
        if(!king_on_check()) this.pieces_moves[r]+=`${Math.floor(first_index/8)}${first_index%8}${Math.floor(first_move_index/8)}${first_move_index%8}`
        this.pieces[r]=this.pieces[r] - first_move + first;
        rock_moves = rock_moves - first_move;
      }
      rocks = rocks - first; // remove first rock from avaiable rocks
    }
  }

  testing_black_rock_moves(){
    this.testing_rock_moves("r", this.all_black_pieces(), this.black_king_check)
  }

  testing_white_rock_moves(){
    this.testing_rock_moves("R", this.all_white_pieces(), this.white_king_check)
  }

  all_black_pieces(){
    return this.pieces["p"] |
      this.pieces["n"] |
      this.pieces["b"] |
      this.pieces["r"] |
      this.pieces["q"] |
      this.pieces["k"];
  }

  all_white_pieces(){
    return this.pieces["P"] |
      this.pieces["N"] |
      this.pieces["B"] |
      this.pieces["R"] |
      this.pieces["Q"] |
      this.pieces["K"];
  }

  testing_bishop_moves(b, same_color_pieces, king_check){
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

    let bishops = this.pieces[b];
    while(bishops>0){
      let first = bishops&((bishops-1n)^this.occupy); // get first bishop from all bishops
      let first_index = first.toString(2).length-1;
      let rising_diagonal = this.rising_diagonals[Math.floor(first_index / 8)+(first_index % 8)];
      let pieces_rising_top = (all_pieces&rising_diagonal) - first;
      let rising_top_moves= 0n;
      if(first>pieces_rising_top){
        rising_top_moves = this.occupy-((first<<1n)-1n);
      }else{
        rising_top_moves= pieces_rising_top^(pieces_rising_top-first-first);
      }
      rising_top_moves= rising_top_moves&rising_diagonal;
      let falling_diagonal = this.falling_diagonals[Math.floor(first_index / 8)-(first_index % 8)+7];
      let pieces_falling_top = (all_pieces&falling_diagonal) - first;
      let falling_top_moves= 0n;
      if(first>pieces_falling_top){ //it happens when there no pieces left side the rock
        falling_top_moves = this.occupy-((first<<1n)-1n);
      }else{
        falling_top_moves= pieces_falling_top^(pieces_falling_top-first-first);
      }
      falling_top_moves= falling_top_moves&falling_diagonal;
      let reverse_rising_diagonal = this.rotate180(rising_diagonal);
      let reverse_first = this.rotate180(first);
      let pieces_rising_bottom = this.rotate180(pieces_rising_top);
      let rising_bottom_moves = 0n;
      if(reverse_first>pieces_rising_bottom){ //it happens when there no pieces left side the rock
        rising_bottom_moves = this.occupy-((reverse_first<<1n)-1n);
      }else{
        rising_bottom_moves= pieces_rising_bottom^(pieces_rising_bottom-reverse_first-reverse_first);
      }
      rising_bottom_moves = rising_bottom_moves&reverse_rising_diagonal;
      let reverse_falling_diagonal = this.rotate180(falling_diagonal);
      let pieces_falling_bottom = this.rotate180(pieces_falling_top);
      let falling_bottom_moves = 0n;
      if(reverse_first>pieces_falling_bottom){ //it happens when there no pieces left side the rock
        falling_bottom_moves = this.occupy-((reverse_first<<1n)-1n);
      }else{
        falling_bottom_moves= pieces_falling_bottom^(pieces_falling_bottom-reverse_first-reverse_first);
      }
      falling_bottom_moves = falling_bottom_moves&reverse_falling_diagonal;
      let bishop_moves = rising_top_moves|falling_top_moves|this.rotate180(rising_bottom_moves|falling_bottom_moves);
      bishop_moves = bishop_moves & (same_color_pieces^this.occupy);
      while(bishop_moves>0n){
        let first_move = bishop_moves&((bishop_moves-1n)^this.occupy); 
        let first_move_index = first_move.toString(2).length-1;
        this.pieces[b]=this.pieces[b] + first_move - first;
        if(!king_check()) this.pieces_moves[b]+=`${Math.floor(first_index/8)}${first_index%8}${Math.floor(first_move_index/8)}${first_move_index%8}`
        this.pieces[b]=this.pieces[b] - first_move + first;
        bishop_moves = bishop_moves - first_move;
      }
      bishops = bishops - first; // remove first bishop from list of bishops
    }
  }

  testing_black_bishop_moves = ()=>{
    this.testing_bishop_moves("b", this.all_black_pieces(), this.black_king_check)
  }

  testing_white_bishop_moves = ()=>{
    this.testing_bishop_moves("B", this.all_white_pieces(), this.white_king_check)
  }

  testing_white_queen_moves = ()=>{
    const all_white = this.all_white_pieces();
    this.testing_bishop_moves("Q", all_white, this.white_king_check)
    this.testing_rock_moves("Q", all_white, this.white_king_check)
  }

  testing_black_queen_moves = ()=>{
    const all_black = this.all_black_pieces();
    this.testing_bishop_moves("q", all_black, this.black_king_check)
    this.testing_rock_moves("q", all_black, this.black_king_check)
  }

  white_king_check = ()=>{
    const inverted_white = (this.pieces["P"]|this.pieces["N"]|this.pieces["B"]|this.pieces["R"]|this.pieces["Q"]|this.pieces["K"])^this.occupy;
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
    // now calculate sliding pieces
    let king_index = this.pieces["K"].toString(2).length-1;
    let king_row = Math.floor(king_index/8)
    let king_column = king_index%8
    let king_reverse = this.rotate180(this.pieces["K"]);
    // check rock attacks to the king
    // pieces that might be between rocks and the king
    const block_rock_attacks = this.pieces["P"]|this.pieces["N"]|this.pieces["B"]|this.pieces["R"]|this.pieces["Q"]|this.pieces["p"]|this.pieces["n"]|this.pieces["b"]|this.pieces["q"]|this.pieces["k"]
    let rocks_row = this.pieces["r"]&this.rows[king_row];
    if(this.pieces["K"]<rocks_row){
      let right_direction= rocks_row^(rocks_row-this.pieces["K"]-this.pieces["K"]);
      if((right_direction&block_rock_attacks)===0n) return true;
    }
    let rocks_column = this.pieces["r"]&this.columns[king_column];
    if(this.pieces["K"]<rocks_column){
      let top_direction= ((rocks_column^(rocks_column-this.pieces["K"]-this.pieces["K"]))&this.columns[king_column]);
      if((top_direction&block_rock_attacks)===0n) return true;
    }
    let rocks_row_reverse = this.rotate180(rocks_row);
    if(king_reverse<rocks_row_reverse){
      let left_direction= rocks_row_reverse^(rocks_row_reverse-king_reverse-king_reverse);
      left_direction = this.rotate180(left_direction);
      if((left_direction&block_rock_attacks)===0n) return true;
    }
    let rocks_column_reverse = this.rotate180(rocks_column);
    if(king_reverse<rocks_column_reverse){
      let bottom_direction= (rocks_column_reverse^(rocks_column_reverse-king_reverse-king_reverse))&this.columns[(63-king_index)%8];
      bottom_direction = this.rotate180(bottom_direction);
      if((bottom_direction&block_rock_attacks)===0n) return true;
    }
    // check bishop attacks to the king
    // pieces that might be between bishop and the king
    const block_bishop_attacks = this.pieces["P"]|this.pieces["N"]|this.pieces["B"]|this.pieces["R"]|this.pieces["Q"]|this.pieces["p"]|this.pieces["n"]|this.pieces["r"]|this.pieces["q"]|this.pieces["k"]
    let king_rising_diagonal = this.rising_diagonals[king_row+king_column];
    let bishops_rising = this.pieces["b"]&king_rising_diagonal;
    if(this.pieces["K"]<bishops_rising){
      let rising_top= (bishops_rising^(bishops_rising-this.pieces["K"]-this.pieces["K"]))&king_rising_diagonal;
      if((rising_top&block_bishop_attacks)===0n) return true;
    }
    let king_falling_diagonal = this.falling_diagonals[king_row-king_column+7];
    let bishops_falling = this.pieces["b"]&king_falling_diagonal;
    if(this.pieces["K"]<bishops_falling){
      let falling_top= (bishops_falling^(bishops_falling-this.pieces["K"]-this.pieces["K"]))&king_falling_diagonal;
      if((falling_top&block_bishop_attacks)===0n) return true;
    }
    let bishops_rising_reverse = this.rotate180(bishops_rising);
    if(king_reverse<bishops_rising_reverse){
      let rising_bottom= (bishops_rising_reverse^(bishops_rising_reverse-king_reverse-king_reverse))&this.rotate180(king_rising_diagonal);
      rising_bottom = this.rotate180(rising_bottom);
      if((rising_bottom&block_bishop_attacks)===0n) return true;
    }
    let bishops_falling_reverse = this.rotate180(bishops_falling);
    if(king_reverse<bishops_falling_reverse){
      let falling_bottom= (bishops_falling_reverse^(bishops_falling_reverse-king_reverse-king_reverse))&this.rotate180(king_falling_diagonal);
      falling_bottom = this.rotate180(falling_bottom);
      if((falling_bottom&block_bishop_attacks)===0n) return true;
    }
    return false;
  }

  black_king_check = ()=>{
    const inverted_black = (this.pieces["p"]|this.pieces["n"]|this.pieces["b"]|this.pieces["r"]|this.pieces["q"]|this.pieces["k"])^this.occupy;
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
    // now calculate sliding pieces
    let king_index = this.pieces["k"].toString(2).length-1;
    let king_row = Math.floor(king_index/8)
    let king_column = king_index%8
    let king_reverse = this.rotate180(this.pieces["k"]);
    // check rock attacks to the king
    // pieces that might be between rocks and the king
    const block_rock_attacks = this.pieces["P"]|this.pieces["N"]|this.pieces["B"]|this.pieces["K"]|this.pieces["Q"]|this.pieces["p"]|this.pieces["n"]|this.pieces["b"]|this.pieces["q"]|this.pieces["r"]
    let rocks_row = this.pieces["R"]&this.rows[king_row];
    if(this.pieces["k"]<rocks_row){
      let right_direction= rocks_row^(rocks_row-this.pieces["k"]-this.pieces["k"]);
      if((right_direction&block_rock_attacks)===0n) return true;
    }
    let rocks_column = this.pieces["R"]&this.columns[king_column];
    if(this.pieces["k"]<rocks_column){
      let top_direction= ((rocks_column^(rocks_column-this.pieces["k"]-this.pieces["k"]))&this.columns[king_column]);
      if((top_direction&block_rock_attacks)===0n) return true;
    }
    let rocks_row_reverse = this.rotate180(rocks_row);
    if(king_reverse<rocks_row_reverse){
      let left_direction= rocks_row_reverse^(rocks_row_reverse-king_reverse-king_reverse);
      left_direction = this.rotate180(left_direction);
      if((left_direction&block_rock_attacks)===0n) return true;
    }
    let rocks_column_reverse = this.rotate180(rocks_column);
    if(king_reverse<rocks_column_reverse){
      let bottom_direction= (rocks_column_reverse^(rocks_column_reverse-king_reverse-king_reverse))&this.columns[(63-king_index)%8];
      bottom_direction = this.rotate180(bottom_direction);
      if((bottom_direction&block_rock_attacks)===0n) return true;
    }
    // check bishop attacks to the king
    // pieces that might be between bishop and the king
    const block_bishop_attacks = this.pieces["P"]|this.pieces["N"]|this.pieces["K"]|this.pieces["R"]|this.pieces["Q"]|this.pieces["p"]|this.pieces["n"]|this.pieces["r"]|this.pieces["q"]|this.pieces["b"]
    let king_rising_diagonal = this.rising_diagonals[king_row+king_column];
    let bishops_rising = this.pieces["B"]&king_rising_diagonal;
    if(this.pieces["k"]<bishops_rising){
      let rising_top= (bishops_rising^(bishops_rising-this.pieces["k"]-this.pieces["k"]))&king_rising_diagonal;
      if((rising_top&block_bishop_attacks)===0n) return true;
    }
    let king_falling_diagonal = this.falling_diagonals[king_row-king_column+7];
    let bishops_falling = this.pieces["B"]&king_falling_diagonal;
    if(this.pieces["k"]<bishops_falling){
      let falling_top= (bishops_falling^(bishops_falling-this.pieces["k"]-this.pieces["k"]))&king_falling_diagonal;
      if((falling_top&block_bishop_attacks)===0n) return true;
    }
    let bishops_rising_reverse = this.rotate180(bishops_rising);
    if(king_reverse<bishops_rising_reverse){
      let rising_bottom= (bishops_rising_reverse^(bishops_rising_reverse-king_reverse-king_reverse))&this.rotate180(king_rising_diagonal);
      rising_bottom = this.rotate180(rising_bottom);
      if((rising_bottom&block_bishop_attacks)===0n) return true;
    }
    let bishops_falling_reverse = this.rotate180(bishops_falling);
    if(king_reverse<bishops_falling_reverse){
      let falling_bottom= (bishops_falling_reverse^(bishops_falling_reverse-king_reverse-king_reverse))&this.rotate180(king_falling_diagonal);
      falling_bottom = this.rotate180(falling_bottom);
      if((falling_bottom&block_bishop_attacks)===0n) return true;
    }
    return false;
  }

  clear_moves(){
    this.pieces_moves = {
      r: "",
      n: "",
      b: "",
      q: "",
      k: "",
      p: "",
      R: "",
      N: "",
      B: "",
      Q: "",
      K: "",
      P: "",
    };
  }

  check_white_promotion(coordy1, coordx1, coordy2, coordx2){
    if(coordy2==7){
      this.pieces_moves["N"]+=`${coordy1}${coordx1}${coordy2}${coordx2}`
      this.pieces_moves["B"]+=`${coordy1}${coordx1}${coordy2}${coordx2}`
      this.pieces_moves["R"]+=`${coordy1}${coordx1}${coordy2}${coordx2}`
      this.pieces_moves["Q"]+=`${coordy1}${coordx1}${coordy2}${coordx2}`
    }
    else{
      this.pieces_moves["P"]+=`${coordy1}${coordx1}${coordy2}${coordx2}`
    }
  }

  check_black_promotion(coordy1, coordx1, coordy2, coordx2){
    if(coordy2==0){
      this.pieces_moves["n"]+=`${coordy1}${coordx1}${coordy2}${coordx2}`
      this.pieces_moves["b"]+=`${coordy1}${coordx1}${coordy2}${coordx2}`
      this.pieces_moves["r"]+=`${coordy1}${coordx1}${coordy2}${coordx2}`
      this.pieces_moves["q"]+=`${coordy1}${coordx1}${coordy2}${coordx2}`
    }
    else{
      this.pieces_moves["p"]+=`${coordy1}${coordx1}${coordy2}${coordx2}`
    }
  }

  mirrorHorizontal (x) {
    let k1 = BigInt("0b101010101010101010101010101010101010101010101010101010101010101");
    let k2 = BigInt("0b11001100110011001100110011001100110011001100110011001100110011");
    let k4 = BigInt("0b111100001111000011110000111100001111000011110000111100001111");
    x = ((x >> 1n) & k1) | ((x & k1) << 1n);
    x = ((x >> 2n) & k2) | ((x & k2) << 2n);
    x = ((x >> 4n) & k4) | ((x & k4) << 4n);
    return x;
  }
  
  // top row to bottom, bottom to top
  flipVertical(x) {
    let k1 = BigInt("0b11111111000000001111111100000000111111110000000011111111");
    let k2 = BigInt("0b111111111111111100000000000000001111111111111111");
    x = ((x >>  8n) & k1) | ((x & k1) <<  8n);
    x = ((x >> 16n) & k2) | ((x & k2) << 16n);
    x = ( x >> 32n)       | ( x       << 32n);
    return x;
  }

  rotate180 (x) {
    return this.mirrorHorizontal(this.flipVertical(x) );
  }

  black_moves() {
      this.clear_moves();
      this.test_black_knight_moves();
      this.testing_black_king_moves();
      this.testing_black_pawn_moves();
      return this.pieces_moves;
  }

  white_moves() {
      this.test_white_knight_moves();
      this.testing_white_king_moves();
      this.testing_white_pawn_moves();
      return this.pieces_moves;
  }
}

export default BitBoardData;
