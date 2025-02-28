import { asyncThunkCreator, buildCreateSlice } from "@reduxjs/toolkit";

// `buildCreateSlice`를 사용하여 비동기 thunk가 포함된 슬라이스를 생성하는 함수입니다.
// 이를 통해 Redux 상태 관리에서 비동기 작업을 더 쉽게 처리할 수 있습니다.
export const createAppSlice = buildCreateSlice({
  creators: { asyncThunk: asyncThunkCreator },
});