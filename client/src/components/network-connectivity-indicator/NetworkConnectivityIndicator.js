import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
    width: 40%;
    height: 80%;
    margin: 10% 0;
    float: right;
`;

const Icon = styled.div`
    width: 100%;
    height: 75px;
    background-image: url(${(props) => props.icon});
    background-repeat: no-repeat;
    background-position: center;
`;

const NetworkStatusIcon = styled.div`
    width: 100%;
    height: 100%;
    background-image: url(${(props) =>
        props.loading === true
            ? "/images/LoadingSpinner.gif"
            : props.serverStatus === "Online"
            ? "/images/icons/Success.png"
            : "/images/icons/Fail.png"});
    background-repeat: no-repeat;
    background-position: center;
`;

function NetworkConnectivityIndicator(props) {
    const networkInfo = props.networkInfo;

    /*
        networkInfo.loading converted to integer before passing as prop due to issue with styled components
        https://github.com/styled-components/styled-components/issues/1198
    */

    return (
        <Wrapper>
            <Icon icon={"/images/icons/Device.png"} />
            <Icon icon={"/images/icons/ConnectivityIndicator.png"}>
                <NetworkStatusIcon
                    loading={networkInfo.loading ? 1 : 0}
                    serverStatus={networkInfo.serverStatus}
                />
            </Icon>
            <Icon icon={"/images/icons/Server.png"} />
            <Icon icon={"/images/icons/ConnectivityIndicator.png"}>
                <NetworkStatusIcon
                    loading={networkInfo.loading ? 1 : 0}
                    serverStatus={networkInfo.serverStatus}
                />
            </Icon>
            <Icon icon={"/images/icons/HueBridge.png"} />
        </Wrapper>
    );
}

export default NetworkConnectivityIndicator;
