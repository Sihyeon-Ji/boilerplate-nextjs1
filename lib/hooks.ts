// 이 파일은 타입이 미리 지정된 Redux 훅을 재내보내는 중앙 허브 역할을 합니다.
// 앱 전체에서 타입 안전성을 보장하는 Redux 훅을 사용할 수 있게 해줍니다.
import { useDispatch, useSelector, useStore } from "react-redux";
import type { AppDispatch, AppStore, RootState } from "./store";

// 앱 전체에서 일반 useDispatch와 useSelector 대신 아래 훅들을 사용해 주세요..
// 이렇게 하면 TypeScript가 Redux 상태와 디스패치 액션의 타입을 자동으로 추론해줍니다.
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
export const useAppStore = useStore.withTypes<AppStore>();
