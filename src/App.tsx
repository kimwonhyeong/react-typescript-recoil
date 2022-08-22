import styled from "styled-components";
import React from 'react';
import {useState} from 'react';

const Container = styled.div`
		background-color: ${(props)=>props.theme.bgColor};
	`;
const H1 = styled.h1`
	color: ${(props)=>props.theme.textColor};
	`;

function App(){
	return (
		<Container>
			<H1>protected</H1>
		</Container>
	);
	/*const [value,setValue] = useState<string>("");
	const onChange = (e:React.FormEvent<HTMLInputElement>)=>{
		const {
			currentTarget: {value},
		} = e;
		setValue(value);
	}
	const onSubmit = (e:React.FormEvent<HTMLFormElement>)=>{
		e.preventDefault();
	}
	return (
		<div>
			<form onSubmit={onSubmit}>
				<input value={value} onChange={onChange} type="text" placeholder="username"/>
				<button>Log in</button>
			</form>
		</div>);
		*/
}
export default App;
