import {useLocation,Route,useParams,Switch, Link, useRouteMatch} from "react-router-dom";
import styled from "styled-components";
import {useState, useEffect} from 'react';
import Chart from "./Chart";
import Price from "./Price";
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
const Overview = styled.div`
	border-radius: 10px;
	display:flex;
	justify-content: space-between;
	align-items:center;
	background-color: rgba(0,0,0,0.5);
	padding: 10px 20px;
`;
const OverviewItem = styled.div`
	color: white;
	display:flex;
	flex-direction: column;
	align-items: center;
	span:first-child {
		font-size: 10px;
		font-weight: 400;
		text-transform: uppercase;
		margin-bottom: 5px;
	}
`;
const Description = styled.p`
	margin: 20px 0px;
`;
const Tabs = styled.div`
	display:grid;
	grid-template-columns: repeat(2,1fr);
	margin:25px 0px;
	gap:10px;
	
`;
const Tab = styled.span<{isActive: boolean}>`
	text-align: center;
	text-transform: uppercase;
	font-size:12px;
	font-weight: 400;
	padding: 7px 0px;
	background: rgba(0,0,0,0.5);
	border-radius: 10px;
	a{
		display: block;
	}
	color: ${props => props.isActive ? props.theme.accentColor : props.theme.textColor};
`;
interface RouteState{
	name: string;
}
interface Params {
	coinId: string;
}

interface InfoData{
    id:string;
	name:string;
	symbol:string;
	rank:number;
	is_new:boolean;
	is_active:boolean;
	type:string;
	description:string;
	message:string;
	open_source:boolean;
	started_at:string;
	development_status:string;
	hardware_wallet:boolean;
	proof_type:string;
	org_structure:string;
	hash_algorithm:string;
	first_data_at:string;
	last_data_at:string;
}

interface PriceData{// temp1 temp2로 바꾸고, Object.keys(temp1).join(); Object.values(temp1).join(); Object.values.(temp1).map(v=>typeof v).join();
	id:string;
	name:string;
	symbol:string;
	rank:number;
	circulating_supply:number;
	total_supply:number;
	max_supply:number;
	beta_value:number;
	first_data_at:string;
	last_updated:string;
	quotes:{
		USD: {
			price:number;
			volume_24h:number;
			volume_24h_change_24h:number;
			market_cap:number;
			market_cap_change_24h:number;
			percent_change_15m:number;
			percent_change_30m:number;
			percent_change_1h:number;
			percent_change_6h:number;
			percent_change_12h:number;
			percent_change_24h:number;
			percent_change_7d:number;
			percent_change_30d:number;
			percent_change_1y:number;
			ath_price:number;
			ath_date:string;
			percent_from_price_ath:number;
		}
	};
}
function Coin(){
	const [loading, setLoading] = useState(true);
	const { coinId } = useParams<Params>(); //구조 분해 할당 문법
	const {state} = useLocation<RouteState>();
	const [info, setInfo] = useState<InfoData>();
	const [priceInfo, setPriceInfo] = useState<PriceData>();
	const priceMatch = useRouteMatch("/:coinId/price");
	const chartMatch = useRouteMatch("/:coinId/chart");
	useEffect(()=>{
		(async()=>{
			const infoData = await (await fetch(`https://api.coinpaprika.com/v1/coins/${coinId}`)).json();
			const priceData = await (await fetch(`https://api.coinpaprika.com/v1/tickers/${coinId}`)).json();
			setInfo(infoData);
			setPriceInfo(priceData);
			setLoading(false);
		})();
		
	},[coinId]);
	//위 문장이 제너럴의 활용이다. 입력값과 출력값의 타입을 any라 설정했다해도 입력값과 출력값이 같은지 검사할 수 있다.
	//항상 존재하지 않을 수도 있기 때문에 ?사용
	//title 부분에 왼쪽에서 두 개가 메인 홈페이지 거쳐서 들어온 경우 / 나머지 오른쪽이 링크 직접쳐서 들어온 경우
	return (
		<Container>
			<Header>
				<Title>{ state?.name ? state.name : loading ? "Loading..." : info?.name}</Title>
			</Header>
			{loading ? <Loader>Loading...</Loader>: (
				<>
					<Overview>
						<OverviewItem>
							<span>Rank:</span>
							<span>{info?.rank}</span>
						</OverviewItem>
						<OverviewItem>
							<span>Symbol:</span>
							<span>{info?.symbol}</span>
						</OverviewItem>
						<OverviewItem>
							<span>Open Source:</span>
							<span>{info?.open_source}</span>
						</OverviewItem>
					</Overview>
					<Description>{info?.description}</Description>
					<Overview>
						<OverviewItem>
							<span>Total Suply:</span>
							<span>{priceInfo?.total_supply}</span>
						</OverviewItem>
						<OverviewItem>
							<span>Max Supply:</span>
							<span>{priceInfo?.max_supply}</span>
						</OverviewItem>
					</Overview>
					<Tabs>
						<Tab isActive={chartMatch !== null}><Link to={`/${coinId}/chart`}>Chart</Link></Tab>
						<Tab isActive={priceMatch !== null}><Link to={`/${coinId}/price`}>Price</Link></Tab>
					</Tabs>
					<Switch>
						<Route path={`/:coinId/price`}>
							<Price/>
						</Route>
						<Route path={`/:coinId/chart`}>
							<Chart/>
						</Route>
					</Switch>
				</>
			)}
		</Container>
		);
}
export default Coin;