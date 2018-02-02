import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import Board from './Board';
import "./App.css"
import { Button } from 'react-bootstrap';

class App extends Component {
    constructor(props){
        super(props)
    }

    handleClick() {
        window.location.reload()
    }

    render(){
    return (
        <Router>
            <div>
                <Route exact path ="/" render={ props => (
                    <div>
                        <h1> Battleship </h1>

                        <Board />
                        <Button id="resetButton" onClick={this.handleClick}>New game</Button>
                    </div>
                )} />
            </div>
        </Router>
    );
    }
}

export default App;
