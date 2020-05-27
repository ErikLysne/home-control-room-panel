import React, { useState, useEffect } from "react";
import styled from "styled-components";

const Container = styled.div`
    width: 100vw;
    height: 20px;
    position: absolute;
    top: 0;
    left: 0;
    text-align: center;
    background-image: url("/images/InfoBar.png");
`;

const InfoBarItem = styled.div`
    width: 33%;
    margin: 0 auto;
    text-align: center;
    display: inline-block;
    color: rgb(255, 255, 255);
`;

const formatTime = (date) => {
    return date.toLocaleTimeString();
};

const formatDate = (date) => {
    const months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec"
    ];

    return date.getDate() + ". " + months[date.getMonth()];
};

const formatDay = (date) => {
    const days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
    ];

    return days[date.getDay()];
};

function InfoBar() {
    const [date, setDate] = useState(new Date());

    useEffect(() => {
        const interval = setInterval(() => setDate(new Date()), 1000);

        return function cleanup() {
            clearInterval(interval);
        };
    });

    return (
        <Container>
            <InfoBarItem>{formatDate(date)}</InfoBarItem>
            <InfoBarItem>{formatTime(date)}</InfoBarItem>
            <InfoBarItem>{formatDay(date)}</InfoBarItem>
        </Container>
    );
}

export default InfoBar;
