import type { Action, ThunkAction } from "@reduxjs/toolkit";
import { combineSlices, configureStore } from "@reduxjs/toolkit";
import { counterSlice } from "../features/counter/counterSlice";
import { quotesApiSlice } from "../features/quotes/quotesApiSlice";
import { createLogger } from "redux-logger";
import {
	persistReducer,
	persistStore,
	FLUSH,
	REHYDRATE,
	PAUSE,
	PERSIST,
	PURGE,
	REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

// redux-logger: 액션 및 상태 변경사항을 콘솔에 기록
const logger = createLogger({
	collapsed: true, // 액션 내용을 접어서 보여줍니다
	duration: true, // 액션 처리 시간을 표시합니다
});
// redux-persist: 리덕스 상태를 로컬 스토리지에 저장
// 페이지를 새로고침해도 상태가 유지됩니다
const persistConfig = {
	key: "root", // 저장소의 루트 키
	storage, // 기본적으로 localStorage를 사용합니다
	blacklist: ["quotesApi"], // 제외할 리듀서 (API 캐시는 보통 제외)
};

// `combineSlices`는 각 슬라이스의 `reducerPath`를 사용하여 자동으로 리듀서들을 결합합니다.
// 따라서 더 이상 `combineReducers`를 호출할 필요가 없습니다.
// 모든 슬라이스 리듀서가 하나의 루트 리듀서로 통합됩니다.
const rootReducer = combineSlices(counterSlice, quotesApiSlice);
// 루트 리듀서로부터 `RootState` 타입을 추론합니다.
// 이 타입은 전체 Redux 상태의 구조를 나타냅니다.
export type RootState = ReturnType<typeof rootReducer>;

// 루트 리듀서를 persist로 감싸서 상태를 영속화합니다
const persistedReducer = persistReducer(persistConfig, rootReducer);

// `makeStore` 함수는 스토어 설정을 캡슐화하여 고유한 스토어 인스턴스를 생성합니다.
// 이는 서버 사이드 렌더링(SSR) 시나리오에서 특히 중요합니다.
// SSR에서는 요청 간 상태 오염을 방지하기 위해 각 요청마다 별도의 스토어 인스턴스가 필요합니다.
export const makeStore = () => {
	const store = configureStore({
		reducer: persistedReducer,
		// API 미들웨어를 추가하면 캐싱, 무효화, 폴링 등
		// `rtk-query`의 유용한 기능들이 활성화됩니다.
		middleware: (getDefaultMiddleware) => {
			return getDefaultMiddleware({
				// persistStore의 직렬화 불가능한 액션을 무시하도록 설정
				serializableCheck: {
					ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
				},
			})
				.concat(quotesApiSlice.middleware)
				.concat(logger); // redux-logger 추가
		},
	});

	// persistStore를 생성하여 상태를 영속화합니다
	const persistor = persistStore(store);
	// persistor를 store 객체에 추가하여 앱에서 사용할 수 있게 합니다
	return { ...store, persistor };
};

// `makeStore` 함수의 반환 타입을 추론합니다.
// 이 타입은 스토어 인스턴스의 구조를 나타냅니다.
export type AppStore = ReturnType<typeof makeStore>;
// 스토어 자체로부터 `AppDispatch` 타입을 추론합니다.
// 이 타입은 액션을 dispatch할 때 사용됩니다.
export type AppDispatch = AppStore["dispatch"];
// 비동기 작업을 위한 Thunk 타입을 정의합니다.
// 이 타입은 비동기 작업을 수행하는 액션 생성자를 만들 때 사용됩니다.
export type AppThunk<ThunkReturnType = void> = ThunkAction<
	ThunkReturnType,
	RootState,
	unknown,
	Action
>;
