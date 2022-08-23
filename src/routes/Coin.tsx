import {useParams} from "react-router"


function Coin(){
	const { coinId } = useParams<{coinId:string}>(); //구조 분해 할당 문법
	return <h1>Coin</h1>;
}
export default Coin;