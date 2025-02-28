# ✨ Next.js 프로젝트

이 프로젝트는 [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app)으로 생성된 [Next.js](https://nextjs.org) 애플리케이션입니다.

## 🚀 개발 시작하기
다음 명령어로 개발 서버를 실행해 봅시다...
```bash
# 👇 pnpm 패키지 매니저를 사용해 주세요잉.
pnpm dev
# npm run dev
# yarn dev
# bun dev
```
`app/page.tsx` 파일을 수정하여 페이지 편집을 시작할 수 있습니다.

## 💎 주요 기능
이 프로젝트는 [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts)를 사용하여 [Geist](https://vercel.com/font) 폰트를 자동으로 최적화하고 로드합니다. Geist는 Vercel의 새로운 폰트 패밀리입니다.

## 📚 더 알아보기
Next.js에 대해 더 알아보려면 다음 리소스를 참고하세요:
- [Next.js 문서](https://nextjs.org/docs) - Next.js의 기능과 API에 대해 알아보세요.
- [Next.js 배우기](https://nextjs.org/learn) - 인터랙티브 Next.js 튜토리얼을 경험해보세요.
- [Next.js GitHub 저장소](https://github.com/vercel/next.js)에서 더 많은 정보를 확인할 수 있습니다. 

## 🛠️ 기술 스택
- Next.js
- TypeScript
- Tailwind CSS
- shadcn/ui
- pnpm
- redux

## redux 관련 설정 설명
이 구조는 Redux Toolkit과 RTK Query의 공식 권장 사항을 따르는 "feature-first" 접근 방식으로, 관련 코드를 기능별로 그룹화하여 유지보수성을 높입니다.
```text
lib/
  ├── store.ts                  # Redux 스토어 설정
  ├── features/                 # 기능별 Redux 로직
  │   ├── counter/              # 카운터 기능 관련 Redux 파일
  │   │   ├── counterApi.ts     # 카운터 관련 비동기 액션
  │   │   └── counterSlice.ts   # 카운터 Slice
  │   ├── quotes/               # 인용구 기능 관련 Redux 파일
  │   │   └── quotesApiSlice.ts # RTK Query API Slice
  │   └── [feature-name]/       # 기타 기능 ( counter 참고하여 필요할 때마다 추가하세요잉 )
  │       ├── [feature]Api.ts   # API 관련 로직
  │       └── [feature]Slice.ts # 각 기능의 Slice
  └── hooks.ts                  # useDispatch, useSelector 타입 훅
```
### 주요 컴포넌트 및 기능 설명
#### StoreProvider
Redux 스토어를 전체 애플리케이션에 제공하는 컴포넌트입니다. 다음과 같은 역할을 합니다:
- Next.js 앱 전체에 Redux 상태를 제공합니다
- 앱 초기 렌더링 시 스토어 인스턴스를 생성합니다
- RTK Query의 자동 리페치(refetch) 기능을 설정합니다
```tsx
// app/providers/StoreProvider.tsx
"use client";

export const StoreProvider = ({ children }: Props) => {
  // 스토어 생성 및 설정
  return <Provider store={storeRef.current}>{children}</Provider>;
};
```

#### Counter 
기본적인 Redux 상태 관리를 보여주는 예시
- counterSlice를 통한 상태 정의 및 액션 생성
- 증가, 감소 및 리셋 기능 구현
- 페이지 이동 간 상태 유지 확인

```tsx
// components/counter/Counter.tsx에서 사용 예시
"use client";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { decrement, increment, reset } from "@/lib/features/counter/counterSlice";

export const Counter = () => {
  const count = useAppSelector((state) => state.counter.value);
  const dispatch = useAppDispatch();
  
  // 상태 업데이트 로직
};
```

#### Quotes 기능
RTK Query를 활용한 비동기 데이터 요청 예제입니다:
- quotesApiSlice를 통해 API 엔드포인트 정의
- 자동 로딩, 오류 상태 처리
- 데이터 캐싱 및 자동 refetch 기능

```tsx
// components/quotes/Quotes.tsx에서 사용 예시
"use client";
import { useGetQuotesQuery } from "@/lib/features/quotes/quotesApiSlice";

export const Quotes = () => {
  // 쿼리 훅을 사용하면 자동으로 데이터를 가져오고 쿼리 값을 반환합니다
  const { data, isError, isLoading, isSuccess } = useGetQuotesQuery(numberOfQuotes);
  
  // 데이터 표시 로직
};
```

#### Verify 페이지
Redux 상태가 페이지 네비게이션 사이에서 유지되는지 확인하는 페이지입니다:
- 카운터 상태가 다른 페이지로 이동 후에도 유지되는지 확인
- Next.js의 App Router에서 Redux가 올바르게 작동하는지 검증

```tsx
// app/verify/page.tsx
export default function VerifyPage() {
  return (
    <>
      <h1>확인 페이지</h1>
      <p>이 페이지는 Redux 상태가 페이지 이동 사이에서도 유지되는지 확인하기 위한 페이지입니다.</p>
      {/* 여기서 카운터 컴포넌트를 사용하여 상태 유지 확인 */}
    </>
  );
}