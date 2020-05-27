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

function Info(props) {
    const { info } = props;
    const { name, mode, colorMode, lights, allOn, anyOn } = info;

    return (
        <Table>
            <tbody>
                <tr>
                    <TdLabel>Room:</TdLabel>
                    <TdData>{name}</TdData>
                </tr>
                <tr>
                    <TdLabel>Mode:</TdLabel>
                    <TdData>{mode}</TdData>
                </tr>
                <tr>
                    <TdLabel>Color mode:</TdLabel>
                    <TdData>
                        {colorMode === "hs"
                            ? "Hue/Saturation"
                            : colorMode === "ct"
                            ? "Color Temperature"
                            : colorMode === "xy"
                            ? "XY"
                            : ""}
                    </TdData>
                </tr>
                <tr>
                    <TdLabel>Lights:</TdLabel>
                    <TdData>{lights.length}</TdData>
                </tr>
                <tr>
                    <TdLabel>All on:</TdLabel>
                    <TdData>{allOn ? "Yes" : "No"}</TdData>
                </tr>
                <tr>
                    <TdLabel>Any on:</TdLabel>
                    <TdData>{anyOn ? "Yes" : "No"}</TdData>
                </tr>
            </tbody>
        </Table>
    );
}

export default Info;
