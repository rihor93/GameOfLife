import React, { useState } from "react";
import BoardComponent from "../gameOfLife2/BoardComponent";
import LoginCompotent from "./LoginCompotent";
import "../gameOfLife/components/CellComponent.css"
import styled from "styled-components";
import { baseTheme } from "../styles/theme";



const ControlComponent: React.FC = () => {

    const [isLogin, setIsLogin] = useState(false);
    const [userName, setUserName] = useState('' as string);

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

    return (

        <div data-testid="ControlComponentClasses">
            <StyledHeader>{isLogin && <StyledHeaderContent>Привет, {userName}!<button onClick={() => { setIsLogin(false); }}>Выйти</button></StyledHeaderContent>}</StyledHeader>
            {!isLogin
                ? <LoginCompotent onClick={toggleStart} />
                : <BoardComponent></BoardComponent>}

        </div>

    );
}



export default ControlComponent;