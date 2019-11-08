import { createAction, handleActions } from 'redux-actions';

const GAMESTART = 'play/GAMESTART';
const GAMERESET = 'play/GAMERESET';
const CELLCLICK = 'play/CELLCLICK';

export const gameStart = createAction(GAMESTART);
export const gameReset = createAction(GAMERESET);
export const cellClick = createAction(CELLCLICK);

let arr = new Array(5); //다차원 배열 초기값 설정
for (let i = 0; i < 5; i++) {
    let inArr = new Array(5);
    arr[i] = inArr;
    for (let j = 0; j < 5; j++) {
        inArr[j] = { number: 0, select: false };
    }
}
//console.log(arr);
const initialState = {
    status: false,
    turn: 0,
    player1: arr,
    player2: arr,
};

const play = handleActions(
    {
        [GAMESTART]: (state, action) => {
            let pl1 = [...state.player1];
            pl1 = shuffle();
            let pl2 = [...state.player2];
            pl2 = shuffle();
            //console.log(pl1, pl2);
            return {
                ...state,
                status: !state.status,
                turn: 1,
                player1: pl1,
                player2: pl2,
            };
        },
        [CELLCLICK]: (state, action) => {
            const number = action.payload;
            let pl1 = [...state.player1];
            let pl2 = [...state.player2];
            const players = [pl1, pl2];
            //console.log('players', players);
            //console.log('number', number);
            console.log(action);
            players.map(elem => {
                //선택한 셀 true 변경
                return elem.map(value => {
                    return value.map(val => {
                        if (val.number === number) {
                            return (val.select = true);
                        }
                    });
                });
            });

            for (let player of players) {
                const key = Object.keys(players);

                //빙고 체크
                let check = player.map(val => val.map(val => val.select));
                checkBingo(check, key);
            }
            return {
                ...state,
                turn: state.turn === 1 ? 2 : 1,
                player1: pl1,
                player2: pl2,
            };
        },
        [GAMERESET]: (state, action) => {
            return initialState;
        },
    },
    initialState,
);
function shuffle() {
    let arr = [];
    let temp;
    let rnum;
    let ranArr = [];
    for (let i = 1; i <= 25; i++) {
        arr.push({ number: i, select: false }); // number 1~25 생성
    }
    for (let i = 0; i < arr.length; i++) {
        // number 랜덤
        rnum = Math.floor(Math.random() * 25);
        temp = arr[i];
        arr[i] = arr[rnum];
        arr[rnum] = temp;
    }
    for (var i = 0; i < 5; i++) {
        //다차원 배열
        ranArr.push(arr.splice(0, 5));
    }
    return ranArr;
}
function checkBingo(players, key) {
    console.log(key);
    //빙고 개수 체크
    //가로 체크
    let totalBingo = [];
    for (let i = 0; i < players.length; i++) {
        if (players[i].reduce((x, y) => x && y, true)) {
            totalBingo++;
        }
    }
    // 세로 체크
    for (let i = 0; i < players.length; i++) {
        let bingo = true;
        for (let j = 0; j < players.length; j++) {
            bingo = bingo && players[j][i];
        }
        if (bingo) totalBingo++;
    }
    //대각선 체크
    let diagnalBingoOne = true;
    let diagnalBingoTwo = true;
    for (let i = 0; i < players.length; i++) {
        diagnalBingoOne = diagnalBingoOne && players[i][players.length - i - 1];
        diagnalBingoTwo = diagnalBingoTwo && players[i][i];
    }
    if (diagnalBingoOne) totalBingo++;
    if (diagnalBingoTwo) totalBingo++;
    //게임 종료
    for (let i = 1; i < players.length; i++) {
        if (totalBingo >= 5) {
            alert(`사용자 ${key[i]}이 빙고를 완성했습니다.`);
            return false;
        }
    }
    return totalBingo;
}
export default play;
