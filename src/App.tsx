import { AnimatePresence, motion, useMotionValue, useTransform, useScroll} from "framer-motion";
import styled from "styled-components";
import {useRef, useEffect, useState} from "react";


// display를 설정한다는 것. 그와 그 자식 간의 관계를 설명한 것이다.
//css 기록할 것. 배경은 vh vw를 사용한다. 300vh면 화면의 3배 만큼 길이 생김.
//map을 쓸 때 react에서는 반드시 키를 준다는 거.(key를 보고 각각의 것들이 고유하다고 생각하니) key를 바꾸면 react는 component를 re-render해준다.key가 바뀌면서 기존것은 없어졌다고 생각한다.    를 ㄱ
// flex-direction
//relative 없을 때 absolute => https://creamilk88.tistory.com/197 position에 대한 좋은 정의가 있다.
//styled-components 수단이 아닌 다른 방법으로 style을 넣는법. <Box style={{background:red,scale:1}}/> 자바스크립트도 넣고 싶으면 style={{}}
const Wrapper = styled(motion.div)`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: space-around;
  align-items:  center;
  flex-direction: column;
`;

const Box = styled(motion.div)`
	width:300px;
	height:200px;
	background: white;
	display:flex;
	align-items: center;
	justify-content: center;
	font-size:30px;
`;

const Circle = styled(motion.div)`
	background:#00a5ff;
	height:100px;
	width:100px;
	border-radius: 50px;
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
	const [clicked, setClicked] = useState(false);
	const toggleClicked = () => setClicked((prev) => !prev);
	const x = useMotionValue(0);
	const gradient = useTransform(
		x,
		[-800,800],
		["linear-gradient(135deg,rgb(0, 210, 238), rgb(0, 83, 238))",
		 "linear-gradient(135deg,rgb(0, 238, 155), rgb(238, 178, 0))"]
	);
	return (
		<Wrapper style={{background: gradient}}>
			<Box>{!clicked ? <Circle layoutId="circle" style={{borderRadius: 50}}/> : null}</Box>
			<Box>{clicked ? <Circle layoutId="circle" style={{borderRadius: 0}}/> : null}</Box>
			<button onClick={toggleClicked}>Click!</button>
		</Wrapper>
	);
}
//AnimatePresence는 항상 눈에 보여야 하기 때문에 {show ? :} 안에 있으면 안 된다.

export default App;