import React from "react";
import styled, { keyframes } from "styled-components";

const Button = styled.button`
    margin: auto 5px;
    border-style: none;
    color: rgb(200, 220, 230);
    animation: ${(props) => (props.toggled ? buttonToggledKeyframes : "")};
    animation-duration: 0.5s;
    animation-direction: alternate;
    animation-iteration-count: infinite;
    animation-timing-function: ease-in-out;
`;

const buttonToggledKeyframes = keyframes`
    0% {
        box-shadow: 0 0 2px 2px rgba(211, 226, 252, 0.25);
    }
    100% {
        box-shadow: 0 0 4px 4px rgba(211, 226, 252, 0.25);
    }
`;

const LargeButton = styled(Button)`
    width: 192px;
    height: 101px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: url("/images/LargeButton.png");
`;

const MediumButton = styled(Button)`
    width: 101px;
    height: 101px;
    background: url("/images/MediumButton.png");
`;

const SmallButton = styled(Button)`
    width: 101px;
    height: 52px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: url("/images/SmallButton.png");
`;

const opacity = (toggled) => (toggled ? 1 : 0.5);

const Label = styled.div`
    opacity: ${(props) =>
        props.disabledWhenUntoggled ? opacity(props.toggled) : 1};
`;

const LargeLabel = styled(Label)`
    width: 50%;
    height: 100%;
    float: left;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.5rem;
`;

const MediumLabel = styled(Label)``;

const SmallLabel = styled(Label)`
    width: 50%;
    height: 100%;
    float: right;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Icon = styled.div`
    padding: 20px 0 5px;
    margin: auto;
    background-image: ${(props) =>
        `url(${
            props.togglable
                ? props.toggled
                    ? props.icon.enabled
                    : props.icon.disabled
                : props.icon.default
        })`};
    background-repeat: no-repeat;
    background-position: center;
    opacity: ${(props) =>
        props.disabledWhenUntoggled ? opacity(props.toggled) : 1};
`;

const LargeIcon = styled(Icon)`
    width: 50px;
    height: 50px;
    float: right;
`;

const MediumIcon = styled(Icon)`
    width: 50px;
    height: 50px;
`;

const SmallIcon = styled(Icon)`
    width: 28px;
    height: 28px;
    float: left;
`;

function ToggleButton(props) {
    const {
        toggled,
        label,
        icon,
        size,
        onClick,
        togglable,
        disabledWhenUntoggled
    } = props;

    const handleClickEvent = () => {
        onClick(!toggled);
    };

    const buttonProps = {
        toggled: toggled,
        onClick: handleClickEvent
    };

    const iconProps = {
        disabledWhenUntoggled: disabledWhenUntoggled,
        togglable: togglable,
        toggled: toggled,
        icon: icon
    };

    const labelProps = {
        disabledWhenUntoggled: disabledWhenUntoggled,
        toggled: toggled
    };

    let ButtonComponent, IconComponent, LabelComponent;
    switch (size) {
        case "large":
            ButtonComponent = LargeButton;
            IconComponent = LargeIcon;
            LabelComponent = LargeLabel;
            break;
        case "medium":
            ButtonComponent = MediumButton;
            IconComponent = MediumIcon;
            LabelComponent = MediumLabel;
            break;
        case "small":
            ButtonComponent = SmallButton;
            IconComponent = SmallIcon;
            LabelComponent = SmallLabel;
            break;
        default:
            ButtonComponent = MediumButton;
            IconComponent = MediumIcon;
            LabelComponent = MediumLabel;
            break;
    }

    return (
        <>
            <ButtonComponent {...buttonProps}>
                <IconComponent {...iconProps} />
                <LabelComponent {...labelProps}>
                    {togglable
                        ? toggled
                            ? label.enabled
                            : label.disabled
                        : label.default}
                </LabelComponent>
            </ButtonComponent>
        </>
    );
}

export default ToggleButton;
