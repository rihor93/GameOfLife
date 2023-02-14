import React, { useEffect, useState } from "react";
import LoginCompotent from "./LoginComponent";
import { StyledBoardComponent, StyledHeader, StyledHeaderContent } from "./style";

type BoardTypes = 'small' | 'normal' | 'big'

const ControlComponent: React.FC = () => {
    const [boardType, setBoardType] = useState<BoardTypes>('big');
    const [isLogin, setIsLogin] = useState(false);
    const [userName, setUserName] = useState('' as string);

    const [width, setWidth] = useState(50);
    const [heigth, setHeigth] = useState(50);

    function toggleStart(name: string) {
        console.log('start', name);
        setUserName(name);
        setIsLogin(true);
    }

    useEffect(() => {

        switch (boardType) {
            case 'small':
                setWidth(10);
                setHeigth(10);
                return
            case 'normal':
                setWidth(25);
                setHeigth(25);
                return
            case 'big':
                setWidth(50);
                setHeigth(50);
                return
            default:
                return
        }
    }, [boardType]);






    return (

        <div data-testid="ControlComponent">
            <StyledHeader>{isLogin && <StyledHeaderContent data-testid="HeadComponent">Привет, {userName}!<button onClick={() => { setIsLogin(false); }}>Выйти</button></StyledHeaderContent>}</StyledHeader>
            {!isLogin
                ? <LoginCompotent onClick={toggleStart} />
                : <div>
                    <div>
                        <button onClick={() => setBoardType('small')}>10x10</button>
                        <button onClick={() => setBoardType('normal')}>25x25</button>
                        <button onClick={() => setBoardType('big')}>50x50</button>
                    </div>
                    {/*<BoardComponent width={width} heigth={heigth} />*/}
                    <StyledBoardComponent width={width} heigth={heigth} />
                </div>}

        </div>

    );
}



export default ControlComponent;