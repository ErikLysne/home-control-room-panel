import React from "react";
import styled from "styled-components";

const Table = styled.table`
    width: 100%;
    height: 100%;
    color: rgb(255, 255, 255);
`;

function LightsInfo(props) {
    const { info } = props;

    return (
        <Table>
            <tbody>
                <tr>
                    <td>Room:</td>
                    <td>{info.name}</td>
                </tr>
                <tr>
                    <td>Mode:</td>
                    <td>{info.mode}</td>
                </tr>
                <tr>
                    <td>Lights:</td>
                    <td>{info.lights.length}</td>
                </tr>
                <tr>
                    <td>All on:</td>
                    <td>{info.allOn ? "Yes" : "No"}</td>
                </tr>
            </tbody>
        </Table>
    );
}

export default LightsInfo;
