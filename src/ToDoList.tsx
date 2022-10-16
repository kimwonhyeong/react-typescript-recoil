
import {useForm} from "react-hook-form";

type IForm = {
  toDo: string;
};

function ToDoList(){
	const {register, handleSubmit, setValue} = useForm<IForm>();
	const onSubmit = (data : IForm)=>{
		console.log('add to do', data.toDo);
		setValue("toDo","");
	};
	return (
		<div>
			<form onSubmit={handleSubmit(onSubmit)}>
				<input {...register("toDo", {
						required: "Please write a To Do"
					})}/>
				<button>Add</button>
			</form>
		</div>
	);
}
export default ToDoList;