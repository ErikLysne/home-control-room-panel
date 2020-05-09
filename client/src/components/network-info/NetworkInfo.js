import React from "react";
import styled from "styled-components";

const Table = styled.table`
    width: 55%;
    height: 30%;
    margin: 20% 0;
    color: rgb(255, 255, 255);
    float: left;
`;

function NetworkInfo(props) {
    const networkInfo = props.networkInfo;
    return (
        <Table>
            <tbody>
                <tr>
                    <td>Server status:</td>
                    <td>{networkInfo.serverStatus}</td>
                </tr>
                <tr>
                    <td>Server IP address:</td>
                    <td>{networkInfo.serverIpAddress}</td>
                </tr>
                <tr>
                    <td>Server port:</td>
                    <td>{networkInfo.serverPort}</td>
                </tr>
                <tr>
                    <td>Latency:</td>
                    <td>
                        {networkInfo.latency !== "" &&
                            networkInfo.latency + " ms"}
                    </td>
                </tr>
            </tbody>
        </Table>
    );
}

export default NetworkInfo;
