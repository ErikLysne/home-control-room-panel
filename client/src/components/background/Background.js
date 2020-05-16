import React from "react";
import Particles from "react-particles-js";
import styled from "styled-components";

const Container = styled.div`
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    //background-color: rgb(20, 25, 30);
    background: linear-gradient(rgb(51, 51, 61), rgb(31, 31, 43));
`;

function Background() {
    return (
        <Container>
            <Particles
                width={480}
                height={800}
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
