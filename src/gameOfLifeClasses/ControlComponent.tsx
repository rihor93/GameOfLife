import React, { useState } from "react";
import BoardComponent from "./BoardComponent";
import { BoardComponentClasses } from "./BoardComponentClasses";
import LoginCompotent from "./LoginCompotent";




const ControlComponent: React.FC = () => {

    const [isLogin, setIsLogin] = useState(false);
    const [userName, setUserName] = useState('' as string);

    function toggleStart (name: string) {
        console.log('start', name); 
        setUserName(name);
        setIsLogin(true);
    }

    return (

        <div data-testid="ControlComponentClasses">
                {isLogin && <div>Привет123, {userName}!<button onClick={()=> {setIsLogin(false);}}>Выйти</button></div>}
                {!isLogin 
                    ? <LoginCompotent onClick={toggleStart} />
                    : <BoardComponent></BoardComponent>}

            </div>

    );
}



export default ControlComponent;