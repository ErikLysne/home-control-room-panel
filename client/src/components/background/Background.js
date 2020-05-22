import React from "react";
import Particles from "react-particles-js";
import styled from "styled-components";

const Container = styled.div`
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    background: linear-gradient(rgb(3, 20, 30), rgb(0, 0, 0));
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
