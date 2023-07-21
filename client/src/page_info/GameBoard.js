// 3) 게임 진행 화면 : 게임 진행 화면을 담당하는 컴포넌트
// 3가지 게임 화면 각각을 렌더링 하는 기능
import React from 'react';

// Game1, 2, 3 컴포넌트 import
import Game1 from '../Games/Game1';
import Game2 from '../Games/Game2';
import Game3 from '../Games/Game3';


function GameBoard(props) {
    // TODO: Implement game specific logic
    return (
        <div className="Game_Board">
            {/* Game1, 2, 3가 단계별로 실행되게 변경한다! */}
            <Game1 />
            <Game2 />
            <Game3 />
        </div>
    );
}

export default GameBoard;