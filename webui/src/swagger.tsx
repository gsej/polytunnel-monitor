import SwaggerUI from "swagger-ui-react"
import "swagger-ui-react/swagger-ui.css"
import style from "styled-components"

const StyledDiv = style.div`

    .scheme-container {
        background-color: var(--light-color );
        box-shadow: none;
    }


    .servers {
        display: inline-block;
    }

    .servers-title {
        font-size: 24px;
    }

    .opblock.opblock-get {
        background-color: var(--light-color );
    }




`

export const Swagger = () => {
    return (
        <StyledDiv>
            <SwaggerUI url="swagger.json" />
        </StyledDiv>
    )
};

