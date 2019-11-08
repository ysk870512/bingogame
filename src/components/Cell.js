import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as playGame from '../modules/play';

class Cell extends Component {
    render() {
        const { number, playGame, turn, status, player } = this.props;
        //console.log('cell',this.props);
        const numberCell = number.map((value, index) => {
            return (
                <tr key={index}>
                    {value.map((val, idx) => {
                        return (
                            <td
                                key={idx}
                                className={val.select ? 'select' : ''}
                                onClick={() => {
                                    if (status === false) {
                                        alert('게임을 시작해주세요');
                                        return;
                                    }
                                    if (turn !== player) {
                                        alert('순서가 틀렸습니다.');
                                        return;
                                    }
                                    if (val.select === true) {
                                        alert('이미 선택하였습니다.');
                                        return;
                                    }
                                    if (turn === player) {
                                        playGame.cellClick(val.number);
                                    }
                                }}
                            >
                                {val.number === 0 ? '' : val.number}
                            </td>
                        );
                    })}
                </tr>
            );
        });
        return <tbody>{numberCell}</tbody>;
    }
}

export default connect(
    state => ({
        turn: state.play.turn,
    }),
    dispatch => ({
        playGame: bindActionCreators(playGame, dispatch),
    }),
)(Cell);
