import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import NetworkInfo from "../network-info/NetworkInfo";
import NetworkConnectivityIndicator from "../network-connectivity-indicator/NetworkConnectivityIndicator";
import { networkInfoRequested } from "../../actions";

const Wrapper = styled.div`
    width: 100%;
    height: 100%;
    color: rgb(255, 255, 255);
`;

function NetworkPanel() {
    const networkInfo = useSelector((state) => state.networkInfo);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(networkInfoRequested());
    }, []);
    return (
        <Wrapper>
            <NetworkInfo networkInfo={networkInfo} />
            <NetworkConnectivityIndicator networkInfo={networkInfo} />
        </Wrapper>
    );
}

export default NetworkPanel;
