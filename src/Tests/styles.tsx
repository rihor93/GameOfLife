import styled from "styled-components"
import{ PageText as NavText} from "./PageText"

export const TextStyled = styled(NavText)`
    color:${(props)=>props.color ? props.color :"#ffffff" };
    font-size: ${(props)=>props.fontSize ? props.fontSize  : ".9em"
};    
`