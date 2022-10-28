
import {useForm} from "react-hook-form";
import {toDoState} from "../atom";
import {useSetRecoilState} from "recoil";

type IForm = {
  toDo: string;
};

function CreateToDo(){
	const setToDos = useSetRecoilState(toDoState);
	const {register, handleSubmit, setValue} = useForm<IForm>();
	const onSubmit = (data: IForm)=>{
		setToDos((beforeToDos) => [
			{text: data.toDo, id: Date.now(), category: "TO_DO"},
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