import React, { useState } from "react";


interface LoginCompotentProps {
    onClick: (name: string) => void,
}

const LoginCompotent: React.FC<LoginCompotentProps> = (props) => {

    const [name, setName] = useState('');

    return (

        <div className="cardBorder contentWrapper">
            <div>Введите имя:
                <input value={name} onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setName(e.target.value) }}></input>
            </div>
            <div>
                <button onClick={() => props.onClick(name)}>Старт!</button>
            </div>
        </div>

    );
}



export default LoginCompotent;