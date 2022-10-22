import { IToDo, toDoState } from "../atom";
import {useSetRecoilState} from "recoil";
function ToDo({text, category, id}:IToDo){
	const setToDos = useSetRecoilState(toDoState);
	const onClick = (e: React.MouseEvent<HTMLButtonElement>)=>{
		const { currentTarget: {name} } = e;
		console.log(name);
		setToDos((prev : IToDo[])=>{ //:IToDo[] 안 해도 에러 안 나더라.
			const targetIndex = prev.findIndex((element)=>element.id === id);
			const newToDos = [...prev];
			const newToDo = { text, id, category: name as any }; //prop를 받아올 때 category만 받아왔다. 그렇기 때문에 name이 적절한 type을 가지고 있는지 확신하지 못한다.
			newToDos.splice(targetIndex, 1, newToDo);
			return newToDos;
			// return [
			// 		...oldToDos.slice(0, targetIndex),
			// 		newToDo,
			// 		...oldToDos.slice(targetIndex + 1),
			// 	  ];
			//위의 방법은 slice를 이용함
		});
	};
	// 상태관리툴을 사용할때는 기본적으로 기존 toDoState를 mutate하지 않고 상태를 변경해줘야 합니다.
	// 그냥 const newTodos = prevTodos 이렇게 하시면 prevTodos를 가리키는 주소를 newTodos에
	// 할당하기 때문에 newTodos를 변경하면 prevTodos도 같이 변경되어 mutate 되게됩니다. 
	// 그래서 완전히 새로운 object나 array를 만들어주고 거기에 요소들을 
	// 그대로 입력해주기위해 spread 방식을 사용한것입니다. 다른 방식으로는 assign 등을 
	// 사용해 할당 할 수도 있습니다.
	return(
		<li>
			<span>{text}</span>
			{category !== "DOING" ? <button name="DOING" onClick={onClick}>Doing</button> : null}
			{category !== "TO_DO" ? <button name="TO_DO" onClick={onClick}>To Do</button> : null}
			{category !== "DONE" ? <button name="DONE" onClick={onClick}>Done</button> : null}
		</li>
	);
}

export default ToDo;
