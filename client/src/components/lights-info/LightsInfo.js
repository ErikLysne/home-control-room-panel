import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

const Table = styled.table`
    width: 100%;
    height: 100%;
    color: rgb(255, 255, 255);
`;

function LightsInfo() {
    const lightsInfo = useSelector((state) => state.lightsInfo);

    return (
        <Table>
            <tbody>
                <tr>
                    <td>Room:</td>
                    <td>{lightsInfo.room}</td>
                </tr>
                <tr>
                    <td>Mode:</td>
                    <td>{lightsInfo.mode}</td>
                </tr>
                <tr>
                    <td>All on:</td>
                    <td>{lightsInfo.allOn ? "True" : "False"}</td>
                </tr>
                <tr>
                    <td>Any on:</td>
                    <td>{lightsInfo.anyOn ? "True" : "False"}</td>
                </tr>
            </tbody>
        </Table>
    );
}

export default LightsInfo;
