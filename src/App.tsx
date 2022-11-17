import { motion } from "framer-motion";
import styled from "styled-components";

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
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 20px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-content: space-around;
`;

const A = styled(motion.div)`
	box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
	width: 70px;
	height: 70px;
	background-color: white;
	border-radius: 100%;
`;
 const myVars = {
	 start: {opacity: 0, scale: 0.5},
 	 end: {opacity: 1,
		   scale:1,
		   transition:{
			   type: "spring",
			   bounce:0.5,
			   when: "beforeChildren",
			   staggerChildren: 0.2,
		   }}
 };
const miniVars = {
	start: {opacity: 0, y: 10},
	end: {opacity: 1,
		  y:0,
		  transition:{
			  when: "afterChildren"
		 }}
};
function App(){
	return (
		<Wrapper>
			<Box variants={myVars} initial="start" animate="end">
				<A variants={miniVars}></A>
				<A variants={miniVars}></A>
				<A variants={miniVars}></A>
				<A variants={miniVars}></A>
			</Box>
		</Wrapper>
	);
}
export default App;