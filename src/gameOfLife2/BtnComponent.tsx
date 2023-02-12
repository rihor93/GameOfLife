import React from "react"

export interface BtnProps {
    onClick: () => void,
    children: string,
}

const BtnComponent: React.FC<BtnProps> = ({ children, onClick }) => {
    return (

        <button onClick={onClick}>{children}</button>

    );
}



export default BtnComponent;