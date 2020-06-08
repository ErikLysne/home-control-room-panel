import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import Particles from "react-particles-js";
import HomePanel from "./HomePanel";
import RoomPanel from "./RoomPanel";
import SettingsPanel from "./SettingsPanel";
import LogoBar from "./LogoBar";

const Container = styled.div`
    width: 100%;
    height: 100%;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const ParticleContainer = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    align-items: center;
    overflow: hidden;
`;

const ParticleCoreContainer = styled(ParticleContainer)`
    width: 275px;
    height: 275px;
    border-radius: 100%;
`;

const ParticleExpandedContainer = styled(ParticleContainer)`
    width: 100%;
    height: 100%;
`;

function MainPanel() {
    const sidebar = useSelector((state) => state.sidebar);
    const { activeItem } = sidebar;

    const isActive = (item) => activeItem === item;

    return (
        <Container>
            {isActive("home") ? (
                <ParticleCoreContainer>
                    <Particles
                        style={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            width: "100%",
                            height: "100%"
                        }}
                        params={{
                            particles: {
                                number: {
                                    value: 75
                                },
                                size: {
                                    value: 3
                                },
                                move: {
                                    speed: 2,
                                    outMode: "out"
                                },
                                color: {
                                    value: "#08C8FF"
                                },
                                opacity: {
                                    value: 0.5,
                                    anim: {
                                        enabled: true,
                                        speed: 5,
                                        opacityMin: 0
                                    }
                                },
                                lineLinked: {
                                    color: "#08C8FF",
                                    opacity: 0.1
                                }
                            },
                            polygon: {
                                move: {
                                    radius: 50
                                }
                            }
                        }}
                    />
                </ParticleCoreContainer>
            ) : (
                <ParticleExpandedContainer>
                    <Particles
                        style={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            width: "100%",
                            height: "100%"
                        }}
                        params={{
                            particles: {
                                number: {
                                    value: 100,
                                    density: {
                                        enabled: true
                                    }
                                },
                                size: {
                                    value: 3
                                },
                                move: {
                                    speed: 2,
                                    outMode: "bounce"
                                },
                                color: {
                                    value: "#08C8FF"
                                },
                                opacity: {
                                    value: 0.5
                                },
                                lineLinked: {
                                    color: "#08C8FF",
                                    opacity: 0.1
                                }
                            },
                            polygon: {
                                move: {
                                    radius: 100
                                }
                            }
                        }}
                    />
                </ParticleExpandedContainer>
            )}
            {isActive("home") && <HomePanel />}
            {isActive("rooms") && <RoomPanel />}
            {isActive("settings") && <SettingsPanel />}
            <LogoBar />
        </Container>
    );
}

export default MainPanel;
