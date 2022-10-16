/*import React from "react";
import { useForm } from "react-hook-form";

interface IForm {
  email: string;
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  password1: string;
  extraError?: string;
}

function ToDoList() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<IForm>({
    defaultValues: {
      email: "@naver.com",
    },
  });
  const onValid = (data: IForm) => {
    if (data.password !== data.password1) {
      setError(
        "password1",
        { message: "Password are not the same" },
        { shouldFocus: true }
      );
    }
    // setError("extraError", { message: "Server offline." });
  };
  console.log(errors);
  return (
    <div>
      <form
        style={{ display: "flex", flexDirection: "column" }}
        onSubmit={handleSubmit(onValid)}
      >
        <input
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[A-Za-z0-9._%+-]+@naver.com$/,
              message: "Only naver.com emails allowed",
            },
          })}
          placeholder="Email"
        />
        <span>{errors?.email?.message}</span>
        <input
          {...register("firstName", {
            required: "write here",
            validate: (value)=>true})}
          placeholder="First Name"
        />
        <span>{errors?.firstName?.message}</span>
        <input
          {...register("lastName", { required: "write here" })}
          placeholder="Last Name"
        />
        <span>{errors?.lastName?.message}</span>
        <input
          {...register("username", { required: "write here", minLength: 10 })}
          placeholder="Username"
        />
        <span>{errors?.username?.message}</span>
        <input
          {...register("password", { required: "write here", minLength: 5 })}
          placeholder="Password"
        />
        <span>{errors?.password?.message}</span>
        <input
          {...register("password1", {
            required: "Password is required",
            minLength: {
              value: 5,
              message: "Your password is too short.",
            },
          })}
          placeholder="Password1"
        />
        <span>{errors?.password1?.message}</span>
        <button>Add</button>
        <span>{errors?.extraError?.message}</span>
      </form>
    </div>
  );
}
export default ToDoList;*/

import React from "react";
import {useForm} from "react-hook-form";

interface formInputs {
		email: string;
		password: string;
		passwordCheck: string;
		name: string;
		extraError?: string;
	}
function ToDoList(){
	/*
	const [toDo, setToDo] = useState("");
	const [error, setError] = useState("");
	const onSubmit = (event:React.FormEvent<HTMLFormElement>)=>{
		event.preventDefault();
		
	}
	const onChange = (event:React.FormEvent<HTMLInputElement>)=>{
		const {currentTarget: {value:a}} = event;
		setToDo(a);
		toDo.length > 10 ? setError("참 잘했어요") : setError("이건 아니지 새끼야");
	}*/
	const {register,
		   handleSubmit,
		   formState: {errors}, 
		   setError
		  } = useForm<formInputs>({
			defaultValues:{
				email: "@naver.com"
			}
		  });
	const onValid = (data : formInputs) =>{
		if(data.password !== data.passwordCheck){
			setError(
				"passwordCheck",
				{message: "Password are not the same"},
				{shouldFocus: true}
			);
		}
		//setError("extraError", {message:"Server Offline"})
	};
	console.log(errors);
	return (
		<div>
			<form onSubmit={handleSubmit(onValid)}>
				<input 
					{...register("email",{
						required: "email is required!", 
						pattern: {
							value:/^[A-Za-z0-9._%+-]+@naver.com$/,
							message: "Only @naver.com emails allowed!",
						}
					})} placeholder="email"/>
				<input 
					{...register("password",{required: "write here"})} placeholder="password"
				/>
				<input 
					{...register("name",{
						required: "write here",
						validate: { noKim: value => value.includes("kim") ? true : "Please use kim"}})} placeholder="age"
				/>
				<input {...register("passwordCheck",{required: true})} placeholder="password"/>
				<button>Add</button><br/>
				<span>{errors?.email?.message}</span>
				<span>{errors?.passwordCheck?.message}</span>
				<span>{errors?.extraError?.message}</span>
				<span>{errors?.extraError?.message}</span>
				<span>{errors?.name?.message}</span>
			</form>
		</div>
	);
}
export default ToDoList;