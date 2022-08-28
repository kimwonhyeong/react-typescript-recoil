import {useLocation,useParams} from "react-router";
import styled from "styled-components";
import {useState} from 'react';
const Container = styled.div`
	padding: 0px 20px;
	max-width: 480px;
	margin: 0 auto;
`;
const Header = styled.header`
	height: 10vh;
	display: flex;
	justify-content: center;
	align-items: center;
`;
const Title = styled.h1`
	font-size: 48px;
	color:${props => props.theme.accentColor};
`;
const Loader = styled.span`
	text-align: center;
	display: block;
`;
interface Params {
	coinId: string;
}
interface RouteState{
	name: string;
}
function Coin(){
	const [loading, setLoading] = useState(true);
	const { coinId } = useParams<Params>(); //구조 분해 할당 문법
	const {state} = useLocation<RouteState>();
	//위 문장이 제너럴의 활용이다. 입력값과 출력값의 타입을 any라 설정했다해도 입력값과 출력값이 같은지 검사할 수 있다.
	return (
		<Container>
			<Header>
				<Title>{ state?.name || "Loading"}</Title>
			</Header>
			{loading ? <Loader>Loading...</Loader>:null}
		</Container>
		);
}
export default Coin;