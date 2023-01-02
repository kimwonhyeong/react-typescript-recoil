import styled from "styled-components";

const Hi = styled.div`
	width:50px;
	height:50px;
`;

function Tv() {
	return (
		<>
			<h1 style={{margin:"200px"}}>tv쇼</h1>
			<Hi></Hi>
		</>
	);
}

export default Tv;