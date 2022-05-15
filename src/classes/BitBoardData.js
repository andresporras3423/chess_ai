// this class contains all the information about board situation
class BitBoardData {
  constructor() {
    this.board = [
      [" ", "n", " ", " ", "k", " ", "n", " "],
      [" ", "p", " ", "p", " ", "p", "p", "p"],
      [" ", " ", " ", " ", " ", " ", " ", " "],
      [" ", " ", " ", " ", " ", " ", " ", " "],
      ["p", "P", "p", " ", " ", " ", " ", " "],
      [" ", " ", " ", " ", "p", " ", " ", " "],
      ["P", " ", "P", "P", "P", "P", "P", "P"],
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
      position1: BigInt(
        "0b100000000000000"
      ),
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
    const blacks_except_k =
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
      (this.pieces["P"] << 7n) & this.inverted_column_a & blacks_except_k; //this only calculate right side attacks
    while (right_capture > 0n) {
      let last_index = right_capture.toString(2).split("").length - 1;
      list += `${Math.floor(last_index / 8 - 1)}${
        (last_index % 8) + 1
      }${Math.floor(last_index / 8)}${last_index % 8}`;
      right_capture = right_capture ^ (1n << BigInt(last_index));
    }
    let left_capture =
      (this.pieces["P"] << 9n) & this.inverted_column_h & blacks_except_k; //this only calculate left side attacks
    while (left_capture > 0n) {
      let last_index = left_capture.toString(2).split("").length - 1;
      list += `${Math.floor(last_index / 8 - 1)}${
        (last_index % 8) - 1
      }${Math.floor(last_index / 8)}${last_index % 8}`;
      left_capture = left_capture ^ (1n << BigInt(last_index));
    }
    let one_cell_ahead = (this.pieces["P"] << 8n) & inverted_all_pieces; //advance one cell ahead
    while (one_cell_ahead > 0n) {
      let last_index = one_cell_ahead.toString(2).split("").length - 1;
      list += `${Math.floor(last_index / 8 - 1)}${last_index % 8}${Math.floor(
        last_index / 8
      )}${last_index % 8}`;
      one_cell_ahead = one_cell_ahead ^ (1n << BigInt(last_index));
    }
    let two_cells_ahead =
      (this.pieces["P"] << 16n) &
      inverted_all_pieces &
      (inverted_all_pieces << 8n) &
      this.row_4; //advance two cells ahead from the second row
    while (two_cells_ahead > 0n) {
      let last_index = two_cells_ahead.toString(2).split("").length - 1;
      let occ = BigInt(`0b${"1".repeat(last_index + 1)}`);
      list += `${Math.floor(last_index / 8 + 2)}${last_index % 8}${Math.floor(
        last_index / 8
      )}${last_index % 8}`;
      two_cells_ahead = two_cells_ahead ^ (1n << BigInt(last_index));
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
        list += `${Math.floor(last_index / 8 - 1)}${
          (last_index % 8) - 1
        }${Math.floor(last_index / 8)}${last_index % 8}`;
      }
      let right_en_passant =
        (this.pieces["P"] << 7n) &
        this.inverted_column_a &
        (this.last_move["position2"] << 8n); // right capture in en passant
      if (right_en_passant > 0n) {
        let last_index = right_en_passant.toString(2).split("").length - 1;
        list += `${Math.floor(last_index / 8 - 1)}${
          (last_index % 8) + 1
        }${Math.floor(last_index / 8)}${last_index % 8}`;
      }
    }
    console.log(list);
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
      list += `${Math.floor(last_index / 8 + 1)}${
        (last_index % 8) - 1
      }${Math.floor(last_index / 8)}${last_index % 8}`;
      right_capture = right_capture ^ (1n << BigInt(last_index));
    }
    let left_capture =
      (this.pieces["p"] >> 9n) & this.inverted_column_a & whites_except_k; //this only calculate left side attacks
    while (left_capture > 0n) {
      let last_index = left_capture.toString(2).split("").length - 1;
      list += `${Math.floor(last_index / 8 + 1)}${
        (last_index % 8) + 1
      }${Math.floor(last_index / 8)}${last_index % 8}`;
      left_capture = left_capture ^ (1n << BigInt(last_index));
    }
    let one_cell_ahead = (this.pieces["p"] >> 8n) & inverted_all_pieces; //advance one cell ahead
    while (one_cell_ahead > 0n) {
      let last_index = one_cell_ahead.toString(2).split("").length - 1;
      list += `${Math.floor(last_index / 8 + 1)}${last_index % 8}${Math.floor(
        last_index / 8
      )}${last_index % 8}`;
      one_cell_ahead = one_cell_ahead ^ (1n << BigInt(last_index));
    }
    let two_cells_ahead =
      (this.pieces["p"] >> 16n) &
      inverted_all_pieces &
      (inverted_all_pieces >> 8n) &
      this.row_5; //advance two cells ahead from the second row
    while (two_cells_ahead > 0n) {
      let last_index = two_cells_ahead.toString(2).split("").length - 1;
      list += `${Math.floor(last_index / 8 + 2)}${last_index % 8}${Math.floor(
        last_index / 8
      )}${last_index % 8}`;
      two_cells_ahead = two_cells_ahead ^ (1n << BigInt(last_index));
    }
    if (
      this.last_move["piece1"] === "P" &&
      this.last_move["position2"] >> 16n === this.last_move["position1"]
    ) {
      // if last move was a black pawn that advanced two cells
      let left_en_passant=
        (this.pieces["p"] >> 9n) &
        this.inverted_column_a &
        (this.last_move["position2"] >> 8n); // left capture in en passant
        if (left_en_passant > 0n) {
          let last_index = left_en_passant.toString(2).split("").length - 1;
          list += `${Math.floor(last_index / 8 + 1)}${
            (last_index % 8) + 1
          }${Math.floor(last_index / 8)}${last_index % 8}`;
        }
      let right_en_passant =
        (this.pieces["p"] >> 7n) &
        this.inverted_column_h &
        (this.last_move["position2"] >> 8n); // right capture in en passant
        if (right_en_passant > 0n) {
          let last_index = right_en_passant.toString(2).split("").length - 1;
          list += `${Math.floor(last_index / 8 + 1)}${
            (last_index % 8) - 1
          }${Math.floor(last_index / 8)}${last_index % 8}`;
        }
    }
    console.log(list);
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
    return (moves_left | moves_right | moves_center) & inverted_white_expect_k;
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
    return (moves_left | moves_right | moves_center) & inverted_black_expect_k;
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
    let moves_left_one_step =
      ((this.pieces["N"] << 17n) | (this.pieces["N"] >> 15n)) &
      this.inverted_column_h;
    let moves_right_one_step =
      ((this.pieces["N"] << 15n) | (this.pieces["N"] >> 17n)) &
      this.inverted_column_a;
    let moves_left_two_steps =
      ((this.pieces["N"] << 10n) | (this.pieces["N"] >> 6n)) &
      this.inverted_column_h &
      this.inverted_column_g;
    let moves_right_two_steps =
      ((this.pieces["N"] << 6n) | (this.pieces["N"] >> 10n)) &
      this.inverted_column_a &
      this.inverted_column_b;
    return (
      (moves_left_one_step |
        moves_right_one_step |
        moves_left_two_steps |
        moves_right_two_steps) &
      inverted_white
    );
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
    let moves_left_one_step =
      ((this.pieces["n"] << 17n) | (this.pieces["n"] >> 15n)) &
      this.inverted_column_h;
    let moves_right_one_step =
      ((this.pieces["n"] << 15n) | (this.pieces["n"] >> 17n)) &
      this.inverted_column_a;
    let moves_left_two_steps =
      ((this.pieces["n"] << 10n) | (this.pieces["n"] >> 6n)) &
      this.inverted_column_h &
      this.inverted_column_g;
    let moves_right_two_steps =
      ((this.pieces["n"] << 6n) | (this.pieces["n"] >> 10n)) &
      this.inverted_column_a &
      this.inverted_column_b;
    return (
      (moves_left_one_step |
        moves_right_one_step |
        moves_left_two_steps |
        moves_right_two_steps) &
      inverted_black
    );
  }

  cells_attacked_by_black() {
    return (
      this.test_black_knight_moves() |
      this.test_black_king_moves() |
      this.testing_black_pawn_moves()
    );
  }

  cells_attacked_by_white() {
    return (
      this.test_white_knight_moves() |
      this.test_white_king_moves() |
      this.testing_white_pawn_moves()
    );
  }
}

export default BitBoardData;
