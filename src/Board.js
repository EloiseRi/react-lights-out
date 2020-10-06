import React, {Component} from "react";
import Cell from "./Cell";
import './Board.css';

class Board extends Component {
  static defaultProps = {
    nrows: 5,
    ncols: 5,
    chanceLightOn: 0.3
  }

  constructor(props) {
    super(props);
    this.state = {
      isWon: false,
      board: this.createBoard(props)
    }
    this.displayHTMLBoard = this.displayHTMLBoard.bind(this)
    this.flipCellsAround = this.flipCellsAround.bind(this)
  }


  createBoard(props) {
    let board = [];
    for(let i = 0; i < props.nrows; i++) {
      let row = [];
      for(let j = 0; j < props.ncols; j++) {
        row.push(Math.random() < props.chanceLightOn)
      }
      board.push(row)
    }
    return board
  }

  /** handle changing a cell: update board & determine if winner */

  flipCellsAround(coord) {
    let {ncols, nrows} = this.props;
    let board = this.state.board;
    let isWon = this.state.isWon;
    let [y, x] = coord.split("-").map(Number);



    function flipCell(y, x) {
      if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
        board[y][x] = !board[y][x];
      }
    }

    flipCell(y, x)
    flipCell(y, x - 1)
    flipCell(y, x + 1)
    flipCell(y - 1, x)
    flipCell(y + 1, x)

    isWon = board.every(row => row.every(cell => !cell))

    this.setState({isWon: isWon, board : board});
  }

  displayHTMLBoard() {
    if(this.state.isWon) {
      return <h1>You won !</h1>
    }
    let htmlBoard = []
    for(let i = 0; i < this.props.nrows; i++) {
      let row = []
      for(let j = 0; j < this.props.ncols; j++) {
        let coord = `${j}-${i}`
        row.push(<Cell 
                    key={coord} 
                    isLit={this.state.board[j][i]}
                    flipCellsAround={() => this.flipCellsAround(coord)}
                    />)
      }
      htmlBoard.push(<tr key={i}>{row}</tr>)
    }
    return htmlBoard
  }

  /** Render game board or winning message. */

  render() {
    let tabBoard = this.displayHTMLBoard();
    return (
      <div className='Ligth-Out-container'>
        <x-sign>
          Lights Out !
          <br /><small>Yes &mdash; turn them off</small>
        </x-sign>
        <table className='Board'>
          <tbody>
            {tabBoard}
          </tbody>
        </table>
      </div>
    )
  }
}


export default Board;
