import React, {Component} from 'react';
import '../App.css';
import Square from './Square.js';

class Board extends Component {
  constructor(props) {
    super(props)
    this.state = {
      board: [],
      turns: 30,
      totalBattleships: 5,
      totalSubmarines: 6,
      totalDestroyers: 4,
      totalPaddleboats: 1,
      totalShips: 16,
      BattleshipSunk: '',
      DestroyerSunk: '',
      PaddleboatSunk: '',
      SubmarineSunk: '',
    }
  }

  componentWillMount() {
    this.setupBoard()
    this.placeShips()
  }

  // Sets initial board up in state
  setupBoard() {
    let board = []

    for (var i = 0; i < 10; i++) {
      this.state.board.push([])
      for (var j = 0; j < 10; j++) {
        this.state.board[i].push([])
      }
    }

    console.log(board);

    this.setState({board: board})
  }

  // Places different kinds of ships on the board
  placeShips() {
    for (var i = 0; i < 1; i++) {
      this.placeBattleShip()
    }
    for (i = 0; i < 2; i++) {
      this.placeSubmarine();
    }
    for (i = 0; i < 2; i++) {
      this.placeDestroyer();
    }
    for (i = 0; i < 1; i++) {
      this.placePaddleboat();
    }
  }

  placeBattleShip() {
    const {board} = this.state

    let placementY = Math.floor(Math.random() * 5)
    let placementX = Math.floor(Math.random() * 10)

    console.log(placementY);
    console.log(placementX);

    if (board[placementY][placementX].length === 0 && board[placementY + 1][placementX].length === 0 && board[placementY + 2][placementX].length === 0 && board[placementY + 3][placementX].length === 0 && board[placementY + 4][placementX].length === 0) {
      var newBoard = board
      for (var i = 0; i < 5; i++) {
        newBoard[placementY + i][placementX] = 15
      }

      this.setState({board: newBoard})
    } else {
      this.placeBattleShip()
    }
  }

  placeSubmarine() {
    const {board} = this.state

    let placementY = Math.floor(Math.random() * 10)
    let placementX = Math.floor(Math.random() * 7)

    if (board[placementY][placementX].length === 0 && board[placementY][placementX + 1].length === 0 && board[placementY][placementX + 2].length === 0) {
      var newBoard = board
      for (var i = 0; i < 3; i++) {
        newBoard[placementY][placementX + i] = 13
      }
      this.setState({board: newBoard})
    } else {
      this.placeSubmarine()
    }
  }

  placeDestroyer() {
    const {board} = this.state

    let placementY = Math.floor(Math.random() * 10)
    let placementX = Math.floor(Math.random() * 8)

    if (board[placementY][placementX].length === 0 && board[placementY][placementX + 1].length === 0) {
      var newBoard = board
      for (var i = 0; i < 2; i++) {
        newBoard[placementY][placementX + i] = 12
      }
      this.setState({board: newBoard})
    } else {
      this.placeDestroyer()
    }
  }

  placePaddleboat() {
    let placementY = Math.floor(Math.random() * 10)
    let placementX = Math.floor(Math.random() * 10)

    if (this.state.board[placementY][placementX].length === 0) {
      var newBoard = this.state.board
      newBoard[placementY][placementX] = 11
      this.setState({board: newBoard})
    } else {
      this.placePaddleboat()
    }
  }

  // Renders individual row with labeled td depending on board state
  renderRow(row_number) {
    var row = [];
    for (var i = 0; i < 10; i++) {
      var className = ""
      //Adds a className based on what kind of square it is (ship,blank,hit etc.)
      switch (this.state.board[row_number][i]) {
        case 0:
          className = "miss";
          break;
        case 11:
          className = "ship";
          break;
        case 12:
          className = "ship";
          break;
        case 13:
          className = "ship";
          break;
        case 15:
          className = "ship";
          break;
        case 2:
          className = "missedShip";
          break;
        case 3:
          className = "hit";
          break;
        default:
          className = "blank"
      }
      let squareId = i + "_" + row_number
      row.push(<Square className={className} id={squareId} onClick={this.clickHandler.bind(this, row_number, i)}/>)
    }
    return row
  }

  renderRows() {
    var rows = [];
    for (var i = 0; i < 10; i++) {
      rows.push(<tr>{this.renderRow(i)}</tr>)
    }
    return rows
  }

  clickHandler(x, y) {
    const {
      board,
      turns,
      totalShips,
      totalBattleships,
      totalSubmarines,
      totalDestroyers,
      totalPaddleboats,
    } = this.state
    var newBoard = board;
    var turnsLeft = turns;
    var shipsLeft = totalShips;
    var shipNumber = newBoard[x][y];
    var battleshipsLeft = totalBattleships;
    var submarinesLeft = totalSubmarines;
    var destroyersLeft = totalDestroyers;
    var paddleboatsLeft = totalPaddleboats;

    if (this.state.turns === 0 || shipsLeft === 0) { // state: game is over
      alert("Game Over!")
    } else if (newBoard[x][y] === 15 || newBoard[x][y] === 13 || newBoard[x][y] === 12 || newBoard[x][y] === 11) { // user hits batttleship
      newBoard[x][y] = 3
      shipsLeft--
      // If user hits a ship, determines ship type, subtracts ship type count if it is not 0,
      // otherwise changes sunk state to a message displayed to user.
      if (shipNumber === 15) {
        battleshipsLeft === 1
          ? this.setState({BattleshipSunk: 'Battleship RIP'})
          : battleshipsLeft--
      } else if (shipNumber === 13) {
        submarinesLeft === 1
          ? this.setState({SubmarineSunk: 'Submarine RIP X2'})
          : submarinesLeft--
      } else if (shipNumber === 12) {
        destroyersLeft === 1
          ? this.setState({DestroyerSunk: 'Destroyer RIP X2'})
          : destroyersLeft--
      } else if (shipNumber === 11) {
        paddleboatsLeft === 1
          ? this.setState({PaddleboatSunk: 'Paddleboat RIP'})
          : paddleboatsLeft--
      }
      // if total shipcount in state is 0 then display a alert that says you win.
      if (shipsLeft === 0) {
        alert("You sunk all the battleships!")
      }
    } else if (newBoard[x][y] === 0 || newBoard[x][y] === 3) { // user already chose spot
    } else { // user misses
      turnsLeft--
      newBoard[x][y] = 0
      if (turnsLeft === 0) {
        alert("Game Over! YOU LOSE!")
        /**
                Show remaining ship location after loss
                */
        for (var i = 0; i < newBoard.length; i++) {
          for (var j = 0; j < newBoard[i].length; j++) {
            if (newBoard[i][j] === 11 || newBoard[i][j] === 12 || newBoard[i][j] === 13 || newBoard[i][j] === 15) {
              newBoard[i][j] = 2;
            }
          }
        }
      }
    }
    this.setState({
      board: newBoard,
      turns: turnsLeft,
      totalShips: shipsLeft,
      totalBattleships: battleshipsLeft,
      totalSubmarines: submarinesLeft,
      totalDestroyers: destroyersLeft,
      totalPaddleboats: paddleboatsLeft,
    })
  }

  render() {
    return (<div id="gameBoard">

      <table>
        <tbody>
          {this.renderRows()}
        </tbody>
      </table>

      <div id="info">
        <div id="torpedoes">
          <h2>
            {this.state.turns}/30 torpedoes left
          </h2>
          <h2>
            {this.state.totalShips}/16 hits left
          </h2>
          <div id="sunk">
            <h2>Ships sunk:</h2>
            <h4>{this.state.BattleshipSunk}</h4>
            <h4>{this.state.SubmarineSunk}</h4>
            <h4>{this.state.DestroyerSunk}</h4>
            <h4>{this.state.PaddleboatSunk}</h4>
          </div>
        </div>
      </div>
    </div>)
  }
}

export default Board;
