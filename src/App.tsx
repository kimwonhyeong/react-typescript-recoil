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
  border-radius: 20px;
  background-color: white;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-content: space-around;
`;
 const boxVariants = {
	 click: {scale:1,borderRadius:"100px"},
 	 hover: {scale:1.5, rotateZ:90},
 };
function App(){
	return (
		<Wrapper>
			<Box variants={boxVariants} whileHover="hover" whileTap="click"></Box>
		</Wrapper>
	);
}
export default App;