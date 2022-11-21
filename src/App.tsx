import { AnimatePresence, motion, useMotionValue, useTransform, useScroll} from "framer-motion";
import styled from "styled-components";
import {useRef, useEffect, useState} from "react";

//css 기록할 것. 배경은 vh vw를 사용한다.
//map을 쓸 때 react에서는 반드시 키를 준다는 거.
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
	start: {
		opacity:0,
		scale:0,
		x: 600,
	},
	end: {
		opacity:1,
		scale:1,
		x:0,
		transition:{
			duration: 1,
		}
	},
	exit: {
		x: -600,
		opacity:0,
		scale:0,
		transition:{
			duration: 1,
		}
	}
}
function App(){
	const [magic, setMasic] = useState(1);
	const number = ()=>{
		magic === 10 ? setMasic(1) : setMasic(1+magic);
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
			<AnimatePresence>
				{[1,2,3,4,5,6,7,8,9,10].map((i)=> i===magic ? <Box key={i} variants={myVars}
					initial="start"
					animate="end"
					exit="exit">{i}</Box> : null)}
			</AnimatePresence>
			<button onClick={number}>Click!</button>
		</Wrapper>
	);
}
//AnimatePresence는 항상 눈에 보여야 하기 때문에 {show ? :} 안에 있으면 안 된다.

export default App;