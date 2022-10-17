import {useForm} from "react-hook-form";
import {atom, useRecoilState} from "recoil";
import styled from "styled-components";

const Li = styled.li`
	color: white;
`;

type IForm = {
  toDo: string;
};

const toDoState = atom<IToDo[]>({
	key: "toDo",	
	default: [],
});

interface IToDo {
	text: string,
	id: number,
	category: "TO_DO" | "DOING" | "DONE";
}

function ToDoList(){
	const [toDos, setToDos] = useRecoilState(toDoState);
	const {register, handleSubmit, setValue} = useForm<IForm>();
	const onSubmit = (data: IForm)=>{
		setToDos((beforeToDos) => [
			{text: data.toDo, id: Date.now(), category: "TO_DO"},
			...beforeToDos,
		]);
		setValue("toDo","");
		console.log(toDos);
	};
	return (
		<div>
			<h1>To Dos</h1>
			<hr/>
			<form onSubmit={handleSubmit(onSubmit)}>
				<input {...register("toDo", {
						required: "Please write a To Do"
					})} placeholder="Write a to do"/>
				<button>Add</button>
			</form>
			<ul>
				{toDos.map((toDo)=>(<Li key={toDo.id}>{toDo.text}</Li>))}
			</ul>
		</div>
	);
}
export default ToDoList;