import React from "react";
import styled from "styled-components";
import HomeControlCoreLogo from "./HomeControlCoreLogo";

const Container = styled.div`
    width: 100%;
    height: 100%;
    position: relative;
    overflow: hidden;
`;

function HomePanel() {
    return (
        <Container>
            <HomeControlCoreLogo />
        </Container>
    );
}

export default HomePanel;
