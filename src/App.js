import React from 'react';
import './App.css';
import Board from './components/Board';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as playGame from './modules/play';

class App extends React.Component {
    render() {
        const { initial, playGame } = this.props;
        const { status } = initial;
        //console.log("initial", initial);
        return (
            <div className="App">
                <div>
                    {!status ? (
                        <button
                            onClick={() => {
                                playGame.gameStart();
                            }}
                        >
                            게임 시작
                        </button>
                    ) : (
                        <button
                            onClick={() => {
                                playGame.gameReset();
                            }}
                        >
                            게임 재시작
                        </button>
                    )}
                </div>
                <div className="wrap-board">
                    <Board player={1} />
                    <Board player={2} />
                </div>
            </div>
        );
    }
}

export default connect(
    state => ({
        initial: state.play,
    }),
    dispatch => ({
        playGame: bindActionCreators(playGame, dispatch),
    }),
)(App);
