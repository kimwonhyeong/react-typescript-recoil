import styled from "styled-components";
import {useState} from "react";

interface ContainerProps {
	bgColor: string;
	borderColor: string;
}

const Container = styled.div<ContainerProps>`
	width: 200px;
	height: 200px;
	border-radius:100px;
	border:1px solid ${props => props.borderColor};
	background-color: ${props => props.bgColor};
`;

interface CircleProps {
	bgColor: string;
	borderColor?: string;
	text?: string;
}

function Circle({bgColor, borderColor, text = "default text"}:CircleProps){
	const [counter,setCounter]=useState<number|string>(0);//왠만해서는 잘 안 씀. 한 번 타입이 지정된 state는 계속 유지하기 때문이다.
	setCounter(2);
	setCounter("h");
	return <Container bgColor={bgColor} borderColor={borderColor ?? bgColor}>{text}</Container>;
}

export default Circle;
