import {useRecoilState, useRecoilValue} from "recoil";
import {minuteState, hourSelector} from "./atom";
function App(){
	const [minute, setMinute] = useRecoilState(minuteState);
	const [hours, setHours] = useRecoilState(hourSelector);
	
	const onMChange = (e:React.FormEvent<HTMLInputElement>)=>{
		setMinute(+e.currentTarget.value);
	};
	const onHChange = (e:React.FormEvent<HTMLInputElement>)=>{
		setHours(+e.currentTarget.value);
	};
	
	return (
		<div>
			<input value={minute} onChange={onMChange} type="number" placeholder="Minutes"/>
			<input value={hours} onChange={onHChange} type="number" placeholder="Hours"/>
		</div>
	);
	
}
export default App;
