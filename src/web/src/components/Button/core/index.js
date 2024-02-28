import React from "react"
import Logic from "../logic"
import { GeneralButton } from "../styles"


const Button = ({ children, onClick, size="medium", theme="", className="", ...rest}) => (
	<GeneralButton tag={rest.href ? 'a' : !rest.to ? 'button' : undefined} className={[className,theme,size].join(" ")} onClick={() => {if(onClick) onClick()}} {...rest}>{children}</GeneralButton>
);

export default Logic(Button)
