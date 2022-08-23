import {useParams} from "react-router"

interface RouteParams{
	coinId: string;
}
function Coins(){
	const { coinId } = useParams<>(); //구조 분해 할당 문법
	
	return <h1>Coin: {coinId}</h1>;
}
export default Coins;