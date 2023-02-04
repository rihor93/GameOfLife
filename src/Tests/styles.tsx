import styled from "styled-components"
import CellComponent, { CellStatus } from "../gameOfLife2/CellComponent"
import{ PageText as NavText} from "./PageText"

export const TextStyled = styled(CellComponent)`
    

color:${(props)=>props.status == CellStatus.Alive ? '#CD5C5C' :"#ADFF2F" };*/
};    
`

//color:${(props)=>props.color ? props.color :"#ffffff" };
//${/*color:${(props)=>props.status == CellStatus.Alive ? '#CD5C5C' :"#ADFF2F" };*/}