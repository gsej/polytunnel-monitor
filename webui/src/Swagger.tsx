import SwaggerUI from "swagger-ui-react";
import "swagger-ui-react/swagger-ui.css";
import style from "styled-components";
import styles from "./Swagger.module.css";

const StyledDiv = style.div`

    .scheme-container {
        background-color: var(--light-color );
        box-shadow: none;
    }

    .servers {
        display: inline-block;
    }

    div {
        background-color: var(--light-color ) !important;
    }

    .servers-title {
        font-size: 24px;
        padding-left: 10px;
        padding-right: 20px;
    }

    .opblock-section-header {

        background-color: var(--light-color );
    }

    .opblock.opblock-get {
        background-color: var(--light-color );
        border: none;
    }

    .opblock.opblock-get .opblock-summary {
        border: none;
    }

    .opblock.opblock-post {
        background-color: var(--light-color );
        border: none;
    }

    .copy-to-clipboard, .download-contents {
        color: black;
    }

    .copy-to-clipboard button {
        background-color: black;
    }

`

export const Swagger = () => {
    return (
        <StyledDiv className={styles["styled-div"]}>
            <SwaggerUI url="swagger.json" />
        </StyledDiv>
    )
};

