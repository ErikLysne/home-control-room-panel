import React from "react";
import styled from "styled-components";

const Container = styled.div`
    width: 100%;
    height: 50px;
`;

const Label = styled.label`
    width: 140px;
    margin-right: 20px;
    display: inline-block;
    text-align: right;
    color: rgb(255, 255, 255);
`;

const Select = styled.select`
    width: 200px;
    height: 50px;
    background-color: rgb(38, 39, 44);
    color: rgb(255, 255, 255);
`;

function RoomSelector(props) {
    const { target, rooms } = props;

    const handleChangeEvent = (event) => {
        props.onChange(event.target.value);
    };

    return (
        <Container>
            <Label>Target room: </Label>
            <Select onChange={handleChangeEvent} value={target}>
                {rooms.map((room) => (
                    <option key={room.id}>{room.name}</option>
                ))}
            </Select>
        </Container>
    );
}

export default RoomSelector;
