import { motion } from "framer-motion";
import styled from "styled-components";
import {useRef} from "react";

const Wrapper = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Box = styled(motion.div)`
  width: 200px;
  height: 200px;
  border-radius: 20px;
  background-color: white;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: space-around;
`;
const BiggerBox = styled.div`
	width:600px;
	height:600px;
	background-color: rgba(255, 255, 255, 0.2);
	border-radius: 40px;
	display: flex;
	align-items: center;
	justify-content: center;
	overflow: hidden;
`;

 const boxVariants = {
	 click: {scale:1,borderRadius:"100px"},
 	 hover: {scale:1.5, rotateZ:90},
	 drag: {backgroundColor:"rgb(52, 152, 219)"},
 };
function App(){
	const biggerBoxRef = useRef<HTMLDivElement>(null);
	return (
		<Wrapper>
			<BiggerBox ref={biggerBoxRef}>
				<Box drag
					 dragConstraints={biggerBoxRef}
					 variants={boxVariants}
					 whileDrag="drag"
					 whileHover="hover"
					 whileTap="click"
					 dragSnapToOrigin
					 dragElastic={0.5} //인력의 정도. 근데 이거는 문서에서 도저히 못 찾겠던데.
					 ></Box>
			</BiggerBox>
		</Wrapper>
	);
}
export default App;