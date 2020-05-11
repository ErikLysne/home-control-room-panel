import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
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
    background-color: rgb(0, 0, 0);
    color: rgb(255, 255, 255);
`;

function RoomSelector(props) {
    const handleChangeEvent = (event) => {
        props.onChange(event.target.value);
    };

    return (
        <Wrapper>
            <Label>Target room: </Label>
            <Select onChange={handleChangeEvent} value={props.target}>
                {props.rooms.map((room) => (
                    <option key={room.id}>{room.name}</option>
                ))}
            </Select>
        </Wrapper>
    );
}

export default RoomSelector;
