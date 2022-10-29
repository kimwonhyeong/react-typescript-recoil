
import {useForm} from "react-hook-form";
import {toDoState, categoryState} from "../atom";
import {useSetRecoilState, useRecoilValue} from "recoil";

type IForm = {
  toDo: string;
};

function CreateToDo(){
	const setToDos = useSetRecoilState(toDoState);
	const category = useRecoilValue(categoryState);
	const {register, handleSubmit, setValue} = useForm<IForm>();
	const onSubmit = (data: IForm)=>{
		setToDos((beforeToDos) => [
			{text: data.toDo, id: Date.now(), category: category},
			...beforeToDos,
		]);
		setValue("toDo","");
	};
	return(
		<form onSubmit={handleSubmit(onSubmit)}>
			<input {...register("toDo", {
			required: "Please write a To Do"})}
			placeholder="Write a to do"/>
			<button>Add</button>
		</form>
	);
};

export default CreateToDo;