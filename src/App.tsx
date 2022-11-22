import { AnimatePresence, motion, useMotionValue, useTransform, useScroll} from "framer-motion";
import styled from "styled-components";
import {useRef, useEffect, useState} from "react";

//css 기록할 것. 배경은 vh vw를 사용한다.
//map을 쓸 때 react에서는 반드시 키를 준다는 거.(key를 보고 각각의 것들이 고유하다고 생각하니) key를 바꾸면 react는 component를 re-render해준다.key가 바뀌면서 기존것은 없어졌다고 생각한다.    를 ㄱ
// flex-direction
//relative 없을 때 absolute => https://creamilk88.tistory.com/197 position에 대한 좋은 정의가 있다.
const Wrapper = styled(motion.div)`
  height: 300vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Box = styled(motion.div)`
	width:300px;
	height:200px;
	background: white;
	display:flex;
	align-items: center;
	justify-content: center;
	position: absolute;
	top:700px;
	font-size:30px;
`;

const myVars ={
	entry: (isback:boolean)=>({
		opacity:0,
		scale:0,
		x: isback ? -600 : 600,
	}),
	center: {
		opacity:1,
		scale:1,
		x:0,
		transition:{
			duration: 1,
		}
	},
	exit: (isback:boolean)=>({
		x: isback ? 600 : -600,
		opacity:0,
		scale:0,
		transition:{
			duration: 1,
		}
	})
}
function App(){
	const [magic, setMagic] = useState(1);
	const [back, setBack] = useState(false);
	const number = ()=>{
		magic === 10 ? setMagic(1) : setMagic(1+magic);
	};
	const unnumber = ()=>{
		setBack(true);
		magic === 1 ? setMagic(10) : setMagic(magic-1);
	};
	const x = useMotionValue(0);
	const gradient = useTransform(
		x,
		[-800,800],
		["linear-gradient(135deg,rgb(0, 210, 238), rgb(0, 83, 238))",
		 "linear-gradient(135deg,rgb(0, 238, 155), rgb(238, 178, 0))"]
	);


	return (
		<Wrapper style={{background: gradient}}>
			<AnimatePresence custom={back}>
				<Box key={magic} variants={myVars}
					custom={back}
					initial="entry"
					animate="center"
					exit="exit">{magic}</Box>
			</AnimatePresence>
			<button onClick={number}>Click!</button>
			<button onClick={unnumber}>Click!</button>
		</Wrapper>
	);
}
//AnimatePresence는 항상 눈에 보여야 하기 때문에 {show ? :} 안에 있으면 안 된다.

export default App;