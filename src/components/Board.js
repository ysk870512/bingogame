import React, { Component } from 'react';
import Cell from './Cell';
import { connect } from 'react-redux';

class Board extends Component {
    render() {
        const { player, pl1, pl2, status, turn } = this.props;
        //console.log("board", this.props);
        return (
            <div className="board-table">
                <h2>
                    {`사용자 ${player}`} {player === turn && '님의 순서입니다.'}
                </h2>
                <table className="player-table">
                    <Cell
                        player={player}
                        number={player === 1 ? pl1 : pl2}
                        status={status}
                    />
                </table>
            </div>
        );
    }
}

export default connect(state => ({
    pl1: state.play.player1,
    pl2: state.play.player2,
    status: state.play.status,
    turn: state.play.turn,
}))(Board);
