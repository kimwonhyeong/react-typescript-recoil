import styled from "styled-components";
import React from 'react';
import Circle from './Circle';

function App(){
	return (
		<div>
			<Circle bgColor="tomato"/>
			<Circle bgColor="teal" borderColor="red" text="im here"/>
		</div>);
}
export default App;
