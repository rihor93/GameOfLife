import React from "react"
import { Button } from 'antd';

export interface BtnProps {
    onClick: () => void,
    children: string,
}

const BtnComponent: React.FC<BtnProps> = ({ children, onClick }) => {
    return (

        <Button onClick={onClick}>{children}</Button>

    );
}



export default BtnComponent;