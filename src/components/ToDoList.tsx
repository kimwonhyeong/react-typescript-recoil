import {useRecoilValue} from "recoil";
import CreateToDo from "./CreateToDo";
import {toDoState} from "../atom";
import ToDo from "./ToDo";

function ToDoList(){
	const toDos = useRecoilValue(toDoState);
	console.log(toDos);
	return (
		<div>
			<h1>To Dos</h1>
			<hr/>
			<CreateToDo />
			<ul>
				{toDos.map((toDo)=>(<ToDo key={toDo.id} {...toDo} />))}
			</ul>
		</div>
	);
}
export default ToDoList;
