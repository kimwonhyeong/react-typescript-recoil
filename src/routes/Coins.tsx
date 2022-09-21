import styled from "styled-components";
import {Link} from "react-router-dom";
import {useQuery} from "react-query";
import {fetchCoins} from "../api";
import {Helmet} from "react-helmet";
import {isDarkAtom} from "../atom";
import {useSetRecoilState} from "recoil";
//styled-components
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
const CoinsList = styled.ul``;
const Coin = styled.li`
	display:flex;
	background-color: ${props=>props.theme.coinBgColor};
	color: ${props => props.theme.textColor};
	padding: 10px;
	height:70px;
	margin-bottom: 10px;
	border-radius: 15px;
	font-size:25px;
	a{	
		display:flex;
		align-items: center;
		transition: color 0.2s ease-in;
		padding:20px;
	}
	&:hover{
		a{
			color: ${(props)=>props.theme.accentColor};
		}
	}
`;
const Title = styled.h1`
	font-size: 48px;
	color:${props => props.theme.accentColor};
`;
const Loader = styled.span`
	text-align: center;
	display: block;
`;
const Img = styled.img`
	width:35px;
	height:35px;
	margin-right:10px;
`;
//인터페이스
interface ICoin{
	id: string;
	name: string;
	symbol: string;
	rank: number;
	is_new: boolean;
	is_active: boolean;
	type: string;
}
//메인 함수
function Coins(){
	const setDarkAtom = useSetRecoilState(isDarkAtom);
	const toggleDarkAtom = ()=>{setDarkAtom((a)=>!a)};
	const {isLoading, data} = useQuery<ICoin[]>("allCoins", fetchCoins);
	/*
	const [coins, setCoins] = useState<CoinInterface[]>([]);
	const [loading, setLoading] = useState(true);
	useEffect(()=>{
		console.log(3);
		(async ()=>{
			console.log(4);
			const response = await fetch("https://api.coinpaprika.com/v1/coins");
			console.log(5);
			const json = await response.json();
			setCoins(json.slice(0,100));
			setLoading(false);
		})();
		console.log(loading);
	},[])
	console.log(coins);
	console.log(loading);*/
	return (
		<Container>
			<Helmet>
				<title>코인</title>
			</Helmet>
			<Header>
				<Title>코인</Title>
				<button onClick={toggleDarkAtom}>Toggle Mode</button>
			</Header>
			{isLoading ? <Loader>Loading...</Loader> :<CoinsList>
				{data?.slice(0,100).map((coin)=>(
					<Coin key={coin.id}>
						<Link
							to={{
								 pathname:`/${coin.id}`,
								 state:{name: coin.name},
							 }}>
							<Img src={`https://coinicons-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`}/>
							{coin.name} →
							
						</Link>
					</Coin>)
					)
				}
			</CoinsList>}
		</Container>
	);
}
export default Coins;