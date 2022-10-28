import {useRecoilValue, useRecoilState} from "recoil";
import CreateToDo from "./CreateToDo";
import {toDoSelector, categoryState} from "../atom";
import ToDo from "./ToDo";

function ToDoList(){
	const [doing,toDo,done]=useRecoilValue(toDoSelector);
	const [category, setCategory] = useRecoilState<string>(categoryState);
	const onInput = (e: React.FormEvent<HTMLSelectElement>)=>{
		setCategory(e.currentTarget.value);
	};
	console.log(category);
	return (
		<div>
			<h1>To Dos</h1>
			<hr/>
			<select value={category} onInput={onInput}>
				<option value="TO_DO">To Do</option>
				<option value="DOING">Doing</option>
				<option value="DONE">Done</option>
			</select>
			<CreateToDo />
			<ul>
				{category === "TO_DO" && toDo.map((aToDo)=><ToDo key={aToDo.id} {...aToDo}/>)}
				{category === "DOING" && doing.map((aDoing)=><ToDo key={aDoing.id} {...aDoing}/>)}
				{category === "DONE" && done.map((aDone)=><ToDo key={aDone.id} {...aDone}/>)}
			</ul>
		</div>
	);
}
export default ToDoList;

// import {useRecoilValue} from "recoil";
// import CreateToDo from "./CreateToDo";
// import {toDoState, toDoSelector} from "../atom";
// import ToDo from "./ToDo";

// function ToDoList(){
// 	const [doing, toDo, done] = useRecoilValue(toDoSelector);
// 	return (
// 		<div>
// 			<h1>To Dos</h1>
// 			<hr/>
// 			<CreateToDo />
// 			<ul>
// 				{doing.map((toDo)=>(<ToDo key={toDo.id} {...toDo} />))}
// 			</ul>
// 			<hr/>
// 			<ul>
// 				{toDo.map((toDo)=>(<ToDo key={toDo.id} {...toDo} />))}
// 			</ul>
// 			<hr/>
// 			<ul>
// 				{done.map((toDo)=>(<ToDo key={toDo.id} {...toDo} />))}
// 			</ul>
// 		</div>
// 	);
// }
// export default ToDoList;