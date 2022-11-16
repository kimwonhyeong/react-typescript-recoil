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
  background-color: white;
  border-radius: 15px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

function App(){
	return (
		<Wrapper>
			<Box
				transition={{type:'spring', repeat: Infinity, mass:4, delay:0.5}}
				initial={{scale:2}}
				animate={{ scale:1, rotateZ: 360 }}/>
		</Wrapper>
	);
	
}
export default App;