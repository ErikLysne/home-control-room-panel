import React from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import Window from "./Window";
import ToggleButton from "../ToggleButton";
import { windowsActions } from "../../ducks/windows";

const Container = styled.div`
    width: 90%;
    height: 70%;
    margin: auto;
    display: flex;
    justify-content: center;
    align-items: center;
`;

function FunctionsWindow() {
    const lights = useSelector((state) => state.lights);
    const dispatch = useDispatch();

    return (
        <Window
            title={"Functions"}
            onClose={() =>
                dispatch(windowsActions.lightsFunctionsWindowClosed())
            }
        >
            <Container>
                <ToggleButton
                    onClick={() => {}}
                    toggled={true}
                    size="medium"
                    label={{
                        default: "Welcome Home"
                    }}
                    icon={{
                        default: "/images/icons/Enter.png"
                    }}
                />
                <ToggleButton
                    onClick={() => {}}
                    size="medium"
                    label={{
                        default: "Good Bye"
                    }}
                    icon={{
                        default: "/images/icons/Exit.png"
                    }}
                />
            </Container>
        </Window>
    );
}

export default FunctionsWindow;
