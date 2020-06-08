import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Panel from "../Panel";
import Form from "../Form";
import CountdownWindow from "./CountdownWindow";
import {
    configActions,
    configOperations,
    configUtils
} from "../../ducks/config";

function SettingsPanel() {
    const server = useSelector((state) => state.config.server);
    const philipsHue = useSelector((state) => state.config.philipsHue);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(configOperations.getConfigRequested());
    }, []);

    const ipScanInfoBoxProps = {
        label: "Scan network for Philips Hue Bridges?",
        shouldRender: philipsHue.bridge.ipAddress === "",
        onAccept: () => {
            dispatch(configOperations.philipsHueBridgeIpAddressRequested());
        }
    };

    const createUserInfoBoxProps = {
        label: "Create new Philips Hue user for Home Control?",
        shouldRender:
            philipsHue.bridge.username === "" &&
            !philipsHue.userCreation.ongoing,
        onAccept: () => {
            dispatch(configOperations.philipsHueCreateUserRequested());

            const timer = setInterval(() => {
                console.log(philipsHue.userCreation.ongoing);
                dispatch(configOperations.getConfigRequested());

                if (philipsHue.userCreation.ongoing === false) {
                    dispatch(configActions.philipsHueCreateUserFinished());
                }
                if (!philipsHue.userCreation.frontendCares) {
                    clearInterval(timer);
                }
            }, 500);
        }
    };

    return (
        <>
            <Panel title="Settings">
                <Form
                    title="Server"
                    fields={[
                        {
                            label: "IP address",
                            type: "text",
                            onInput: (input) => {
                                dispatch(
                                    configActions.serverIpAddressUpdated(input)
                                );
                                dispatch(configOperations.getConfigRequested());
                            },
                            value: server.ipAddress,
                            status: server.ipAddressValid,
                            pending:
                                server.pending &&
                                server.previousOperation ===
                                    configUtils.serverOperations.get
                        },
                        {
                            label: "Port",
                            type: "text",
                            onInput: (input) => {
                                dispatch(
                                    configActions.serverPortUpdated(input)
                                );
                                dispatch(configOperations.getConfigRequested());
                            },
                            value: server.port,
                            status: server.portValid,
                            pending:
                                server.pending &&
                                server.previousOperation ===
                                    configUtils.serverOperations.get
                        }
                    ]}
                />
                <Form
                    title="Lights - Philips Hue"
                    infoBox={
                        philipsHue.bridge.ipAddress === ""
                            ? { ...ipScanInfoBoxProps }
                            : { ...createUserInfoBoxProps }
                    }
                    fields={[
                        {
                            label: "Bridge IP address",
                            type: "text",
                            onInput: (input) => {
                                dispatch(
                                    configActions.philipsHueBridgeIpAddressUpdated(
                                        input
                                    )
                                );
                                dispatch(
                                    configOperations.putConfigRequested(
                                        "hue.bridge.ipAddress",
                                        input
                                    )
                                );
                            },
                            value: philipsHue.bridge.ipAddress,
                            status:
                                philipsHue.bridge.ipAddress !== ""
                                    ? true
                                    : null,
                            pending: philipsHue.bridge.scanningForDevices
                        },
                        {
                            label: "Username",
                            type: "text",
                            type: "text",
                            onInput: (input) => {
                                dispatch(
                                    configActions.philipsHueUsernameUpdated(
                                        input
                                    )
                                );
                            },
                            value: philipsHue.bridge.username,
                            status:
                                philipsHue.bridge.username !== "" ? true : null,
                            pending: philipsHue.userCreation.frontendCares
                        },
                        {
                            label: "Entertainment API key",
                            type: "text",
                            onInput: (input) => {
                                dispatch(
                                    configActions.philipsHueClientkeyUpdated(
                                        input
                                    )
                                );
                            },
                            value: philipsHue.bridge.clientkey,
                            status:
                                philipsHue.bridge.clientkey !== ""
                                    ? true
                                    : null,
                            pending: philipsHue.userCreation.frontendCares
                        }
                    ]}
                />
            </Panel>
            {philipsHue.userCreation.ongoing &&
                philipsHue.userCreation.frontendCares && (
                    <CountdownWindow
                        shouldRender={
                            philipsHue.userCreation.timeRemaining !== 1
                        }
                        onClose={() => {
                            dispatch(
                                configActions.philipsHueCreateUserFinished()
                            );
                        }}
                        timeRemaining={philipsHue.userCreation.timeRemaining}
                    />
                )}
            )
        </>
    );
}

export default SettingsPanel;
