import { createAppSlice } from "@/lib/config/createAppSlice";
import type { AppThunk } from "@/lib/config/store";
import type { PayloadAction } from "@reduxjs/toolkit";
import { fetchCount } from "./counterAPI";
// import { REHYDRATE } from "redux-persist";

export interface CounterSliceState {
	value: number;
	status: "idle" | "loading" | "failed";
}

const initialState: CounterSliceState = {
	value: 0,
	status: "idle",
};

// NOTE - 비동기 thunk를 사용하지 않는 경우 독립형 createSlice를 사용할 수 있습니다.
// 이 예제에서는 비동기 기능을 포함한 확장된 createAppSlice를 사용합니다.
export const counterSlice = createAppSlice({
	name: "counter",
	initialState, // createSlice는 initialState 인자로부터 상태 타입을 추론합니다 => 별도로 타입을 선언하지 않아도 됩니다
	reducers: (create) => ({
		// reducers 필드를 통해 리듀서를 정의하고 관련 액션을 자동으로 생성합니다
		increment: create.reducer((state) => {
			// Redux Toolkit은 리듀서 내에서 "변경" 로직을 작성할 수 있게 해줍니다.
			// 실제로는 상태를 직접 변경하지 않고 Immer 라이브러리를 사용하여
			// "초안 상태(draft state)"의 변경사항을 감지하고, 이를 기반으로
			// 완전히 새로운 불변성 상태를 생성합니다
			state.value += 1;
		}),
		decrement: create.reducer((state) => {
			state.value -= 1;
		}),
		// PayloadAction 타입을 사용하여 action.payload의 내용을 선언합니다
		// 이를 통해 타입 안전성을 확보할 수 있습니다
		incrementByAmount: create.reducer(
			(state, action: PayloadAction<number>) => {
				state.value += action.payload;
			},
		),
		// 아래 함수는 thunk라고 불리며 비동기 로직을 수행할 수 있게 해줍니다.
		// 일반 액션처럼 dispatch할 수 있습니다 => dispatch(incrementAsync(10))
		// 첫 번째 인자로 dispatch 함수와 함께 thunk를 호출합니다.
		// 그 후 비동기 코드를 실행하고 다른 액션을 dispatch할 수 있습니다.
		// thunk는 일반적으로 비동기 요청을 수행하는 데 사용됩니다.
		incrementAsync: create.asyncThunk(
			async (amount: number) => {
				const response = await fetchCount(amount);
				// 여기서 반환하는 값은 fulfilled 액션의 payload가 됩니다
				return response.data;
			},
			{
				// 비동기 요청이 시작되었을 때 상태를 변경합니다
				pending: (state) => {
					state.status = "loading";
				},
				// 비동기 요청이 성공적으로 완료되었을 때 상태를 변경합니다
				fulfilled: (state, action) => {
					state.status = "idle";
					state.value += action.payload;
				},
				// 비동기 요청이 실패했을 때 상태를 변경합니다
				rejected: (state) => {
					state.status = "failed";
				},
			},
		),
	}),
	// REHYDRATE 액션을 처리하기 위한 extraReducers 추가
	// extraReducers: (builder) => {
	// 	builder.addCase(REHYDRATE, (state) => {
	// 		// REHYDRATE 후에 status를 idle로 유지
	// 		state.status = "idle";
	// 	});
	// },
	// 여기에서 선택자(selectors)를 정의할 수 있습니다.
	// 이 선택자들은 첫 번째 인자로 슬라이스 상태를 받습니다.
	// 컴포넌트에서 상태를 쉽게 접근할 수 있게 해줍니다.
	selectors: {
		selectCount: (counter) => counter.value,
		selectStatus: (counter) => counter.status,
	},
});

// 각 case 리듀서 함수에 대한 액션 생성자가 자동으로 생성됩니다.
// 이 액션들을 dispatch하여 상태를 변경할 수 있습니다.
export const { decrement, increment, incrementByAmount, incrementAsync } =
	counterSlice.actions;

// slice.selectors가 반환하는 선택자는 첫 번째 인자로 루트 상태를 받습니다.
// useSelector 훅과 함께 사용하여 컴포넌트에서 상태를 가져올 수 있습니다.
export const { selectCount, selectStatus } = counterSlice.selectors;

// 수동으로 thunk를 작성할 수도 있으며, 동기 및 비동기 로직을 모두 포함할 수 있습니다.
// 다음은 현재 상태에 따라 조건부로 액션을 dispatch하는 예시입니다.
export const incrementIfOdd =
	(amount: number): AppThunk =>
	(dispatch, getState) => {
		const currentValue = selectCount(getState());

		if (currentValue % 2 === 1 || currentValue % 2 === -1) {
			dispatch(incrementByAmount(amount));
		}
	};
