import React from "react";
import Particles from "react-particles-js";
import styled from "styled-components";

const Container = styled.div`
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    background: linear-gradient(rgb(31, 31, 43), rgb(12, 30, 40));
`;

function Background() {
    return (
        <Container>
            <Particles
                width={"100vw"}
                height={"100vh"}
                params={{
                    particles: {
                        number: {
                            value: 30
                        },
                        size: {
                            value: 3
                        }
                    }
                }}
            />
        </Container>
    );
}

export default Background;
