import { Input } from "./input";
import { withNumberInput } from "./withNumberInput";
import { withInputArrows } from "./withInputArrows";


export const InputNumberWithArrows = withInputArrows(withNumberInput(Input));