import {atom, selector} from "recoil";

export const minuteState = atom({
	key:"minutes",
	default:0,
});

export const hourSelector = selector<number>({
	key:"hours",
	get: ({ get }) => {
		const minutes = get(minuteState);
		return minutes / 60;
	},
	set: ({set}, newValue) => { //newValue는 selector의 값
		const minutes = Number(newValue) * 60;
		set(minuteState, minutes);
	},
});

//결국 set은 atom의 값을 수정한다.
//selector는 두 개의 atom을 지지고 볶고도 가능하다
