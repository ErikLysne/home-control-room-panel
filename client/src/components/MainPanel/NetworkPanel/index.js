import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Grid from "../Grid";
import GridCell from "../GridCell";
import Info from "./Info";
import ConnectivityIndicator from "./ConnectivityIndicator";
import { networkOperations } from "../../../ducks/network";

function NetworkPanel() {
    const network = useSelector((state) => state.network);
    const config = useSelector((state) => state.config);
    const menu = useSelector((state) => state.menu);
    const dispatch = useDispatch();

    useEffect(() => {
        if (!network.pending && menu.activePanelIndexCurrent === 1) {
            dispatch(networkOperations.getNetworkDetailsRequested());
        }
    }, [dispatch, menu.activePanelIndexCurrent]);

    return (
        <Grid>
            <GridCell row={{ start: 1, end: 2 }} column={{ start: 1, end: 2 }}>
                <Info network={network} config={config} />
            </GridCell>
            <GridCell
                row={{ start: 2, end: 3 }}
                column={{ start: 1, end: 2 }}
            ></GridCell>
            <GridCell row={{ start: 1, end: 3 }} column={{ start: 2, end: 3 }}>
                <ConnectivityIndicator network={network} />
            </GridCell>
        </Grid>
    );
}

export default NetworkPanel;
