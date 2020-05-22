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

function LightsInfo(props) {
    const { info } = props;

    return (
        <Table>
            <tbody>
                <tr>
                    <TdLabel>Room:</TdLabel>
                    <TdData>{info.name}</TdData>
                </tr>
                <tr>
                    <TdLabel>Mode:</TdLabel>
                    <TdData>{info.mode}</TdData>
                </tr>
                <tr>
                    <TdLabel>Color mode:</TdLabel>
                    <TdData>
                        {info.colorMode === "hs"
                            ? "Hue/Saturation"
                            : info.colorMode === "ct"
                            ? "Color Temperature"
                            : info.colorMode === "xy"
                            ? "XY"
                            : ""}
                    </TdData>
                </tr>
                <tr>
                    <TdLabel>Lights:</TdLabel>
                    <TdData>{info.lights.length}</TdData>
                </tr>
                <tr>
                    <TdLabel>All on:</TdLabel>
                    <TdData>{info.allOn ? "Yes" : "No"}</TdData>
                </tr>
                <tr>
                    <TdLabel>Any on:</TdLabel>
                    <TdData>{info.anyOn ? "Yes" : "No"}</TdData>
                </tr>
            </tbody>
        </Table>
    );
}

export default LightsInfo;
