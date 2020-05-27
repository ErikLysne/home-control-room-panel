import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Grid from "./Grid";
import GridCell from "./GridCell";
import NetworkInfo from "./NetworkInfo";
import NetworkConnectivityIndicator from "./NetworkConnectivityIndicator";
import { networkOperations } from "../ducks/network";

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
            <GridCell rowStart={1} rowEnd={2} columnStart={1} columnEnd={2}>
                <NetworkInfo network={network} config={config} />
            </GridCell>
            <GridCell
                rowStart={2}
                rowEnd={3}
                columnStart={1}
                columnEnd={2}
            ></GridCell>
            <GridCell rowStart={1} rowEnd={3} columnStart={2} columnEnd={3}>
                <NetworkConnectivityIndicator network={network} />
            </GridCell>
        </Grid>
    );
}

export default NetworkPanel;
