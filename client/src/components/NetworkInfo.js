import React from "react";
import styled from "styled-components";

const Table = styled.table`
    width: 100%;
    height: 100%;
    color: rgb(200, 220, 230);
    display: flex;
    justify-content: center;
    align-items: center;
`;

const TdLabel = styled.td`
    padding: 0 5px;
    color: rgb(20, 232, 255);
`;

const TdData = styled.td`
    padding: 0 5px;
`;

function NetworkInfo(props) {
    const { network, config } = props;
    return (
        <Table>
            <tbody>
                <tr>
                    <TdLabel>Server status:</TdLabel>
                    <TdData>
                        {network.serverOnline ? "Online" : "Offline"}
                    </TdData>
                </tr>
                <tr>
                    <TdLabel>Server IP address:</TdLabel>
                    <TdData>{config.local.serverIpAddress}</TdData>
                </tr>
                <tr>
                    <TdLabel>Server port:</TdLabel>
                    <TdData>{config.local.serverPort}</TdData>
                </tr>
                <tr>
                    <TdLabel>Latency:</TdLabel>
                    <TdData>
                        {network.serverLatency !== 0 &&
                            network.serverLatency + " ms"}
                    </TdData>
                </tr>
            </tbody>
        </Table>
    );
}

export default NetworkInfo;
