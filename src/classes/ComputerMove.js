import CellData from "./CellData.js";
import Cell from "./positions/Cell.js";
import Positions from "./positions/Positions.js";
import Game from "./positions/Game.js";
// this class contains all the information about board situation
class ComputerMove {
  constructor(nGame, ndepth) {
    this.game = nGame;
    this.depth = ndepth;
  }

  doMove = ()=>{
    let selected_move = this.best_position();
  }

  best_position = ()=>{
    const color = this.game.board.color;
    let best_moves = [];
    this.game.board.movements_available.forEach((move)=>{
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
      // if(best_score===new_score){
      //   best_moves.push(move);
      // }
      // else if((play_poorly && best_score>new_score) || (!play_poorly && best_score<new_score)){
      //   best_score=new_score;
      //   best_moves = [move];
      // }
    });
    return best_moves[Math.floor(Math.random()*best_moves.length)];
  }

  // maxPlayer is always computer player
  minimax = (game, depth, maxPlayer)=>{
    const status = game.board.game_status;
    if(winner && maxPlayer) return -100-depth;
    if(winner && !maxPlayer) return 100+depth;
    if(depth===0) return 0;
    // const available_moves = this.available_moves(position);
    // let best_score= play_poorly ? 200 : (maxPlayer ? -200 : 200);
    // available_moves.forEach((move)=>{
    //   const new_pos = this.positionAfterMove(position, move, maxPlayer ? this.computerSymbol : this.humanSymbol);
    //   const new_score =this.minimax(new_pos, depth-1, !maxPlayer);
    //   if(play_poorly){
    //     if(best_score>new_score) best_score=new_score;
    //   }
    //   else{
    //     if(maxPlayer && best_score<new_score) best_score=new_score;
    //     else if(!maxPlayer && best_score>new_score) best_score=new_score;
    //   }
    // });
    return best_score;
  }

  clone_game = (game)=>{
    let nGame = new Game();
      nGame.positions.white_pieces = {};
      nGame.positions.black_pieces = {};
      Object.entries(game.positions.white_pieces).forEach((key, cell)=>{
        nGame.positions.white_pieces[key] = new Cell(cell.y, cell.x);
      });
      Object.entries(game.positions.black_pieces).forEach((key, cell)=>{
        nGame.positions.black_pieces[key] = new Cell(cell.y, cell.x);
      });
      nGame.positions.set_board();
      return nGame;
  }

  any_winner = (position)=>{

  }
}

export default ComputerMove;
