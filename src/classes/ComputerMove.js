import CellData from "./CellData.js";
import Cell from "./positions/Cell.js";
import Positions from "./positions/Positions.js";
import Game from "./positions/Game.js";
// this class contains all the information about board situation
class ComputerMove {
  constructor(nGame, ndepth, computerWithWhite) {
    this.game = nGame;
    this.depth = ndepth;
    this.computerColor = computerWithWhite ? "white" : "black";
  }

  doMove = ()=>{
    let selected_move = this.best_position();
  }

  best_position = ()=>{
    const color = this.game.board.color;
    let best_moves = [];
    let best_score = -200;
    this.game.board.movements.forEach((move)=>{
      const nGame = this.clone_game(this.game);
      if(color==="white") {
        nGame.positions.update_board_details_after_white_move(move);
        nGame.add_recent_board("white");
      }
      else {
        nGame.positions.update_board_details_after_black_move(move);
        nGame.add_recent_board("black");
      }
      const new_score =this.minimax(nGame, this.depth-1, false);
      if(best_score===new_score){
        best_moves.push(move);
      }
      else if(best_score<new_score){
        best_score=new_score;
        best_moves = [move];
      }
    });
    return best_moves[Math.floor(Math.random()*best_moves.length)];
  }

  minimax = (game, depth, isComputerMove)=>{
    const status = game.board.game_status;
    if(status.slice(0,4)==="draw") return 0;
    if(status==="game started" && depth===0){
      return this.boardScore(game);
    }
    if((status==="black wins" && this.computerColor==="white") || (status==="white wins" && this.computerColor==="black")) return -100-depth;
    if((status==="black wins" && this.computerColor==="black") || (status==="white wins" && this.computerColor==="white")) return 100+depth;
    let best_score= isComputerMove ? -200 : 200;
    const color = game.board.color==="white" ? "black" : "white";
    game.board.movements.forEach((move)=>{
      const nGame = this.clone_game(game);
      if(color==="white") {
        nGame.positions.update_board_details_after_white_move(move);
        nGame.add_recent_board("white");
      }
      else {
        nGame.positions.update_board_details_after_black_move(move);
        nGame.add_recent_board("black");
      }
      const new_score =this.minimax(nGame, depth-1, !isComputerMove);
      if(isComputerMove && new_score>best_score) best_score = new_score;
      else if(!isComputerMove && new_score<best_score) best_score = new_score;
    });
    return best_score;
  }

  boardScore = (game)=>{
    const white_score = Object.keys(game.positions.white_pieces).reduce((t,piece)=>{
      if(piece.slice(0,2)==="wq") return t+9;
      if(piece.slice(0,2)==="wr") return t+5;
      if(piece.slice(0,2)==="wb") return t+3;
      if(piece.slice(0,2)==="wn") return t+3;
      if(piece.slice(0,2)==="wp") return t+1;
      else return t;
    },0);
    const black_score = Object.keys(game.positions.black_pieces).reduce((t,piece)=>{
      if(piece.slice(0,2)==="bq") return t+9;
      if(piece.slice(0,2)==="br") return t+5;
      if(piece.slice(0,2)==="bb") return t+3;
      if(piece.slice(0,2)==="bn") return t+3;
      if(piece.slice(0,2)==="bp") return t+1;
      else return t;
    },0);
    if(this.computerColor==="white") return white_score-black_score;
    else return black_score-white_score;
  }

  clone_game = (game)=>{
    let nGame = new Game();
    nGame.positions = new Positions();
      nGame.positions.white_pieces = {};
      nGame.positions.black_pieces = {};
      Object.entries(game.positions.white_pieces).forEach(([key, cell])=>{
        nGame.positions.white_pieces[key] = new Cell(cell.y, cell.x);
      });
      Object.entries(game.positions.black_pieces).forEach(([key, cell])=>{
        nGame.positions.black_pieces[key] = new Cell(cell.y, cell.x);
      });
      nGame.positions.set_board();
      return nGame;
  }
}

export default ComputerMove;
