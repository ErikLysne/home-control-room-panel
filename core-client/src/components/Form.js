import React from "react";
import styled, { keyframes } from "styled-components";
import Button from "./Button";

const Header = styled.div`
    width: 80%;
    height: 2rem;
    margin: 10px auto;
    font-size: 1.25rem;
    line-height: 2rem;
    text-align: center;
    border-style: solid;
    border-width: 1px;
    border-color: rgba(211, 226, 252, 0.5);
    background-color: rgba(38, 39, 44, 0.5);
`;

const Grid = styled.div`
    height: ${(props) => props.rows * 2}rem;
    padding: 0 1% 0 10%;
    display: grid;
    grid-template-columns: 40% 50% 10%;
    & > * {
        height: 1rem;
        margin: 5px 0;
    }
`;

const Input = styled.input`
    background-color: rgba(38, 39, 44, 0.5);
    color: rgb(255, 255, 255);

    &:disabled {
        background-color: rgba(75, 75, 75, 1);
    }
`;

const StatusIcon = styled.div`
    width: 100%;
    height: 100%;
    background-image: url(${(props) =>
        props.pending
            ? "/images/LoadingSpinner.gif"
            : props.status !== null && typeof props.status !== "undefined"
            ? props.status === true
                ? "/images/icons/Success.png"
                : "/images/icons/Fail.png"
            : ""});
    background-repeat: no-repeat;
    background-position: center;
`;

const InfoBox = styled.div`
    width: 60%;
    margin: 10px auto;
    text-align: center;
    color: rgb(0, 0, 0);
    background-color: rgba(250, 250, 250, 0.75);
    animation: ${() => openingAnimation()};
    animation-duration: 1s;
    & > * {
        padding: 10px 5px;
    }
`;

const openingAnimation = () => keyframes`
        0% {
            opacity: 0
        }

        100% {
            opacity: 1
        }
`;

function Form(props) {
    const { title, fields, infoBox } = props;

    let infoBoxProps = {};

    if (typeof infoBox !== "undefined") {
        ({
            label: infoBoxProps.label,
            shouldRender: infoBoxProps.shouldRender,
            onAccept: infoBoxProps.onAccept
        } = infoBox);
    } else {
        infoBoxProps.shouldRender = false;
    }

    return (
        <form onSubmit={() => {}}>
            <Header>{title}</Header>
            {infoBoxProps.shouldRender && (
                <InfoBox>
                    <p>{infoBoxProps.label}</p>
                    <Button
                        onClick={(event) => {
                            event.preventDefault();
                            infoBoxProps.onAccept();
                        }}
                        label="Accept"
                    />
                </InfoBox>
            )}
            <Grid>
                {fields.map((field) => (
                    <>
                        <p>{field.label}</p>
                        <Input
                            onInput={(event) =>
                                field.onInput(event.target.value)
                            }
                            onChange={() => {}}
                            type={field.type}
                            value={field.value}
                        />
                        <StatusIcon
                            pending={field.pending}
                            status={field.status}
                        />
                    </>
                ))}
            </Grid>
        </form>
    );
}

export default Form;
