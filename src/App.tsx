import { AnimatePresence, motion, useMotionValue, useTransform, useScroll} from "framer-motion";
import styled from "styled-components";
import {useRef, useEffect, useState} from "react";

//투명도의 두 가지 방법 background:rgba vs opacity
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

const Grid = styled.div`
	width:50vw;
	display: grid;
	gap:10px;
	grid-template-columns: repeat(3,1fr);
	div:first-child,
	div:last-child{
		grid-column: span 2;
	}
`;

const Box = styled(motion.div)`
	height:200px;
	background: white;
	border-radius: 40px;
	display:flex;
	align-items: center;
	justify-content: center;
	font-size:30px;
`;
const Overlay = styled(motion.div)`
	width:100%;
	height:100%;
	background:rgba(0,0,0,0.5);
	position: absolute;
	display:flex;
	align-items: center;
	justify-content: center;
`;

const MainBox = styled(motion.div)`
	width:40vw;
	height:30vh;
	background: blue;
	border-radius:30px;
`;

function App(){
	const [id, setId] = useState<null | string>(null);
	const x = useMotionValue(0);
	const gradient = useTransform(
		x,
		[-800,800],
		["linear-gradient(135deg,rgb(0, 210, 238), rgb(0, 83, 238))",
		 "linear-gradient(135deg,rgb(0, 238, 155), rgb(238, 178, 0))"]
	);
	const clicked = ()=>{
		setId(null);
	};
	
	return (
		<Wrapper style={{background: gradient}}>
			<Grid>
				{[1,2,3,4].map((item) => (<Box key={item} onClick={()=>setId(item+"")} layoutId={item+""}/>))};
			</Grid>
			<AnimatePresence>{id ? 
				<Overlay
					onClick={clicked}
					initial={{backgroundColor: "rgba(0,0,0,0)"}}
					animate={{backgroundColor: "rgba(0,0,0,0.5)"}}
					exit={{backgroundColor: "rgba(0,0,0,0)"}}>
					<MainBox layoutId={id}></MainBox>
				</Overlay>
				: null}
			</AnimatePresence>
		</Wrapper>
	);
}
//같은 컴포넌트가 중복된다면 map을 썼을 때 layoutId 같은 게 적용시키기가 훨씬 수월하네.
//AnimatePresence는 항상 눈에 보여야 하기 때문에 {show ? :} 안에 있으면 안 된다.

export default App;