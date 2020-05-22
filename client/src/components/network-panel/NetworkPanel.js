import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Grid from "../grid/Grid";
import GridCell from "../grid-cell/GridCell";
import NetworkInfo from "../network-info/NetworkInfo";
import NetworkConnectivityIndicator from "../network-connectivity-indicator/NetworkConnectivityIndicator";
import { networkOperations } from "../../ducks/network";

function NetworkPanel() {
    const network = useSelector((state) => state.network);
    const config = useSelector((state) => state.config);
    const dispatch = useDispatch();

    useEffect(() => {
        if (!network.pending) {
            dispatch(networkOperations.getNetworkDetailsRequested());
        }
    }, [dispatch]);

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
