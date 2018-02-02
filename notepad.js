board: [
    [[],[],[],[],[],[],[],[],[],[]],
    [[],[],[],[],[],[],[],[],[],[]],
    [[],[],[],[],[],[],[],[],[],[]],
    [[],[],[],[],[],[],[],[],[],[]],
    [[],[],[],[],[],[],[],[],[],[]],
    [[],[],[],[],[],[],[],[],[],[]],
    [[],[],[],[],[],[],[],[],[],[]],
    [[],[],[],[],[],[],[],[],[],[]],
    [[],[],[],[],[],[],[],[],[],[]],
    [[],[],[],[],[],[],[],[],[],[]]
],


placeShip(){
    var placementX = Math.floor(Math.random() * 10)
    var placementY = Math.floor(Math.random() * 10)
    if (this.state.board[placementX][placementY].length === 0) {
        this.state.board[placementX][placementY] = this.state.ship
    } else {
        this.placeShip();
    }
}

// attempting to write a function to place a ship based on input length
placeShipHorizontal(shipLength){
    const { board } = this.state

    let placementY = Math.floor(Math.random() * (11-shipLength))
    let placementX = Math.floor(Math.random() * 10)

    for (var i = 0; i < shipLength; i++) {
        if(board[placementY][placementX].length === 0 &&
            board[placementY+i][placementX].length === 0)
            var newBoard = board
            for (var i = 0; i < shipLength; i++) {
                newBoard[placementY+i][placementX] = this.state.ship
            }
            this.setState({
                board: newBoard
            })
        } else {
            this.placeShipHorizontal()
        }
    }
}

// function to reset all of the board variables to reset the game
resetGame(){
    var emptyBoard = this.state.board
    var clearedTurns = this.state.turns
    var clearedHits = this.state.totalShips
    emptyBoard = []
    for (var i = 0; i < 10; i++) {
        emptyBoard.push([])
        for (var j = 0; j < 10; j++) {
            emptyBoard[i].push([])
        }
    }
    clearedTurns = 25
    clearedHits = 16
    this.setState({
        board: emptyBoard,
        turns: clearedTurns,
        totalShips: clearedHits
    })
    this.placeShips()
}

//
renderLoss(){
    var rowloss = this.state.board.filter(el =>
    el == 4)
    for (var i = 0; i < 10; i++) {
        var className = ""
        switch (rowLoss == 4) {
            case 4:
                className="missedShip"
                break;
            default:
                className="blank"
        }
        function(x, y) {
            if (rowLoss.length > 0) {
                renderLoss()
            } else {

            }
        }
    }
    return row
}

for (var i = 0; i < 10; i++) {
    this.state.board.filter(el => {
        el[x][y] == 4
    })
    for (var j = 0; j < 10; j++) {
        this.state.board.filter(el => {
            el[x][y] == 4
            this.renderLoss(el[x][y])
        })

}
}


// code for creating each ship separately
placeBattleShip(){
    const { board, turns } = this.state

    let placementY = Math.floor(Math.random() * 5)
    let placementX = Math.floor(Math.random() * 10)

    if(board[placementY][placementX].length === 0 &&
        board[placementY+1][placementX].length === 0 &&
        board[placementY+2][placementX].length === 0 &&
        board[placementY+3][placementX].length === 0 &&
        board[placementY+4][placementX].length === 0){
            var newBoard = board
            for (var i = 0; i < 5; i++) {
                newBoard[placementY+i][placementX] = this.state.ship
            }

            this.setState({
                board: newBoard
            })
    } else {
        this.placeBattleShip()
    }
}

placeSubmarine(){
    const { board } = this.state

    let placementY = Math.floor(Math.random() * 10)
    let placementX = Math.floor(Math.random() * 7)


    if(board[placementY][placementX].length === 0 &&
        board[placementY][placementX+1].length === 0 &&
        board[placementY][placementX+2].length === 0){
            var newBoard = board
            for (var i = 0; i < 3; i++) {
                newBoard[placementY][placementX+i] = this.state.ship
            }
            this.setState({
                board: newBoard
            })
    } else {
        this.placeSubmarine()
    }
}

placeDestroyer(){
    const { board } = this.state

    let placementY = Math.floor(Math.random() * 10)
    let placementX = Math.floor(Math.random() * 8)

    if(board[placementY][placementX].length === 0 &&
        board[placementY][placementX+1].length === 0){
            var newBoard = board
            for (var i = 0; i < 2; i++) {
                newBoard[placementY][placementX+i] = this.state.ship
            }
            this.setState({
                board: newBoard
            })
    } else {
        this.placeDestroyer()
    }
}

placeShip(){
    let placementY = Math.floor(Math.random() * 10)
    let placementX = Math.floor(Math.random() * 10)

    if (this.state.board[placementY][placementX].length === 0) {
        var newBoard = this.state.board
        newBoard[placementY][placementX] = this.state.ship
        this.setState({
            board: newBoard
        })
    } else {
        this.placeShip()
    }
}

// code to place ships vertically or horizantally based on ship length

placeShipVertical(shipLength){
    const { board } = this.state
    var newBoard = board

    let placementY = Math.floor(Math.random() * (11-shipLength))
    let placementX = Math.floor(Math.random() * 10)

    var checker = []
    for (var i = 0; i < shipLength; i++) {
        checker.push("board[y+"+i+"][x].length === 0")
    }
    checker = checker.join(" && ")

    if (checker) {
        for (var i = 0; i < shipLength; i++) {
            newBoard[placementY+i][placementX] = this.state.ship
        }
        this.setState({
            board: newBoard
        })
    } else {
        this.placeShipVertical(shipLength)
    }
}

placeShipHorizontal(shipLength){
    const { board } = this.state
    var newBoard = board

    let placementY = Math.floor(Math.random() * (10))
    let placementX = Math.floor(Math.random() * (11-shipLength))

    var checker = []
    for (var i = 0; i < shipLength; i++) {
        checker.push("board[y][x+"+i+"].length === 0")
    }
    checker = checker.join(" && ")

    if (checker) {
        for (var i = 0; i < shipLength; i++) {
            newBoard[placementY][placementX+i] = this.state.ship
        }
        this.setState({
            board: newBoard
        })
    } else {
        this.placeShipHorizontal(shipLength)
    }
}




board[placementY][placementX].length === 0 &&
    board[placementY+1][placementX].length === 0 &&
    board[placementY+2][placementX].length === 0 &&
    board[placementY+3][placementX].length === 0 &&
    board[placementY+4][placementX].length === 0
