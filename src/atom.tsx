import {atom, selector} from "recoil";

export enum Categories {
	"TO_DO",
	"DOING",
	"DONE",
}

export interface IToDo {
	text: string,
	id: number,
	category: Categories,
}

export const toDoState = atom<IToDo[]>({
	key: "toDo",
	default: [],
});

export const categoryState = atom<Categories>({
	key: "category",
	default: Categories.TO_DO,
});

export const toDoSelector = selector({
 	key: "toDoSelector",
 	get: ({get})=>{ //{}는 객체다. 그리고 그 안에 get function이 들어있다.
 		const toDos = get(toDoState);
		const category = get(categoryState);
 		return toDos.filter((toDo: IToDo)=>toDo.category === category);
 	},
 });