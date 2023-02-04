import React, { useState } from "react";
import BoardComponent from "../gameOfLife2/BoardComponent";
import LoginCompotent from "./LoginCompotent";
import "../gameOfLife/components/CellComponent.css"
import styled from "styled-components";
import { baseTheme } from "../styles/theme";



const ControlComponent: React.FC = () => {

    const [isLogin, setIsLogin] = useState(false);
    const [userName, setUserName] = useState('' as string);

    const [width, setWidth] = useState(50);
    const [heigth, setHeigth] = useState(50);

    function toggleStart(name: string) {
        console.log('start', name);
        setUserName(name);
        setIsLogin(true);
    }

    const StyledHeader = styled.header`
  background-color: ${baseTheme.colors.headerBackgroudColor};
  height: ${baseTheme.sizes.header.height}px;
  z-index: ${baseTheme.order.header};
  color: ${baseTheme.colors.headerBackgroudTextColor};
  text-align: center;
`

    const StyledHeaderContent = styled.div`
    float: right;
    `

    function testfunc() {
        console.log('test')
        
    }   

    return (

        <div data-testid="ControlComponentClasses">
            <button onClick={() => { setWidth((v) => v - 1); setHeigth((v) => v-1); }}>test{width.toString()}</button>
            <StyledHeader>{isLogin && <StyledHeaderContent>Привет, {userName}!<button onClick={() => { setIsLogin(false); }}>Выйти</button></StyledHeaderContent>}</StyledHeader>
            {!isLogin
                ? <LoginCompotent onClick={toggleStart} />
                : <BoardComponent width={width} heigth={heigth}/>}

        </div>

    );
}



export default ControlComponent;