import styled from "styled-components";


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
}

function Circle({bgColor, borderColor}:CircleProps){
	return <Container bgColor={bgColor} borderColor={borderColor ?? bgColor}/>;
}

export default Circle;

interface PlayerShape {
	name:string;
	age:number;
}
const sayHello = (playerObj:PlayerShape) => console.log(`Hello ${playerObj.name} you are ${playerObj.age} years old.`);
sayHello({name:"nico", age:12});