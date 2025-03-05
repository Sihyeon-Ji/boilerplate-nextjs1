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
import {
	decrement,
	increment,
	reset,
} from "@/lib/features/counter/counterSlice";

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
	const { data, isError, isLoading, isSuccess } =
		useGetQuotesQuery(numberOfQuotes);

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
			<p>
				이 페이지는 Redux 상태가 페이지 이동 사이에서도 유지되는지 확인하기 위한
				페이지입니다.
			</p>
			{/* 여기서 카운터 컴포넌트를 사용하여 상태 유지 확인 */}
		</>
	);
}
```

## 📁 라우팅 구조 설명 예시

### 🌐 일반 페이지 (routes)

/ → 홈페이지
/about → 소개 페이지
/products → 상품 목록
/products/[id] → 상품 상세

### 🔐 인증 페이지 (auth)

/login → 로그인
/register → 회원가입
/forgot-password → 비밀번호 찾기
/reset-password → 비밀번호 재설정

### ⚙️ 관리자 페이지 (admin)

/admin → 관리자 대시보드
/admin/users → 사용자 관리
/admin/settings → 환경설정
/admin/products → 상품 관리

### 📂 디렉토리 구조 예시

> **Note**: 괄호로 묶인 디렉토리명 `(routes)`, `(auth)`, `(admin)`은 코드 구성을 위한 것으로, 실제 URL에는 포함되지 않습니다. 각 페이지는 `page.tsx` 파일로 구현되며, 동적 라우팅은 `[paramName]` 형식을 사용합니다.

```text
src/app/
├── (routes)/  # 일반 페이지
│   ├── page.tsx  # 홈페이지
│   └── products/
│       ├── page.tsx # 상품 목록
│       └── [id]/
│           └── page.tsx # 상품 상세
├── (auth)/ # 인증 관련
│   ├── login/
│   │   └── page.tsx
│   └── register/
│       └── page.tsx
└── (admin)/ # 관리자 페이지
    ├── page.tsx
    └── users/
        └── page.tsx
```

실제 접근 가능한 URL은:

```text
/                  -> 홈페이지
/products          -> 상품 목록 페이지
/products/123      -> ID가 123인 상품 상세 페이지
/login             -> 로그인 페이지
/register          -> 회원가입 페이지
/admin             -> 관리자 메인 페이지
/admin/users       -> 관리자 사용자 관리 페이지
```

## Next.js 라우트 핸들러 (Route Handlers)

### 라우트 핸들러란?

라우트 핸들러는 Next.js에서 API 엔드포인트를 만들 수 있는 기능입니다. 웹 표준인 Request 및 Response API를 사용하여 특정 라우트에 대한 사용자 정의 요청 핸들러를 생성할 수 있습니다.

> 💡 라우트 핸들러는 App Router 내에서만 작동합니다. 이는 Pages Router의 API Routes를 대체하는 기능입니다..

### 기본 사용법

라우트 핸들러는 app 디렉토리 내에서 **route.js|ts** 파일에 정의됩니다. 하지만 page.js|ts 파일과 동일한 경로에는 사용할 수 없습니다.

```typescript
// app/api/route.ts
export async function GET() {
	return Response.json({ message: "안녕하세요!" });
}
```

라우트 핸들러는 다음과 같은 HTTP 메서드를 지원합니다:

- GET
- POST
- PUT
- PATCH
- DELETE
- HEAD
- OPTIONS

```typescript
// app/api/route.ts
export async function GET() {
	return new Response("GET 요청 처리");
}

export async function POST() {
	return new Response("POST 요청 처리");
}
```

또한, NextRequest와 NextResponse를 통해 확장된 기능을 사용할 수도 있습니다.

```typescript
// app/api/route.ts
import { NextResponse } from "next/server";

export async function GET() {
	return NextResponse.json({ message: "안녕하세요!" });
}
```

### 🔄 캐싱 및 재검증

기본적으로 Response 객체를 반환하는 라우트 핸들러는 캐시됩니다. 이를 제어하는 방법은 아래와 같이 여러 가지가 있습니다.

#### 캐시 활성화하기

```typescript
// app/items/route.ts
export const dynamic = "force-static";

export async function GET() {
	const res = await fetch("https://data.mongodb-api.com/...", {
		headers: {
			"Content-Type": "application/json",
			"API-Key": process.env.DATA_API_KEY,
		},
	});
	const data = await res.json();

	return Response.json({ data });
}
```

#### 재검증 시간 설정하기

```typescript
// app/api/route.ts
export const revalidate = 60; // 60초마다 재검증

export async function GET() {
	const data = await fetch("https://api.vercel.app/blog");
	const posts = await data.json();

	return Response.json(posts);
}
```

### 🍪 쿠키 처리하기

쿠키를 읽거나 설정하려면 next/headers에서 제공하는 cookies 함수를 사용할 수 있습니다.

```typescript
// app/api/route.ts
import { cookies } from "next/headers";

export async function GET(request: Request) {
	const cookieStore = await cookies();
	const token = cookieStore.get("token");

	return new Response("안녕하세요!", {
		status: 200,
		headers: { "Set-Cookie": `token=${token.value}` },
	});
}
```

또는 NextRequest API를 사용할 수도 있습니다.

```typescript
// app/api/route.ts
import { type NextRequest } from "next/server";

export async function GET(request: NextRequest) {
	const token = request.cookies.get("token");
	// 쿠키 활용하기
}
```

### 📋 헤더 처리하기

헤더를 읽기 위해 next/headers에서 제공하는 headers 함수를 사용할 수 있습니다.

```typescript
// app/api/route.ts
import { headers } from "next/headers";

export async function GET(request: Request) {
	const headersList = await headers();
	const referer = headersList.get("referer");

	return new Response("안녕하세요!", {
		status: 200,
		headers: { referer: referer },
	});
}
```

NextRequest를 사용한 방법:

```typescript
// app/api/route.ts
import { type NextRequest } from "next/server";

export async function GET(request: NextRequest) {
	const requestHeaders = new Headers(request.headers);
	// 헤더 활용하기
}
```

### 🔄 리다이렉트

next/navigation의 redirect 함수를 사용하여 다른 URL로 리다이렉트할 수 있어습니다.

```typescript
// app/api/route.ts
import { redirect } from "next/navigation";

export async function GET(request: Request) {
	redirect("https://nextjs.org/");
}
```

### 🔄 동적 라우트 세그먼트

동적 데이터를 기반으로 요청 핸들러를 생성하기 위해 동적 세그먼트를 사용할 수 있습니다.

```typescript
// app/items/[slug]/route.ts
export async function GET(
	request: Request,
	{ params }: { params: Promise<{ slug: string }> },
) {
	const { slug } = await params; // 'a', 'b', 또는 'c' 등
	return Response.json({ slug });
}
```

| 라우트                    | 예시 URL | params                 |
| ------------------------- | -------- | ---------------------- |
| app/items/[slug]/route.js | /items/a | Promise<{ slug: 'a' }> |
| app/items/[slug]/route.js | /items/b | Promise<{ slug: 'b' }> |
| app/items/[slug]/route.js | /items/c | Promise<{ slug: 'c' }> |

### 🔍 URL 쿼리 파라미터

NextRequest 인스턴스를 사용하면 쿼리 파라미터를 쉽게 처리할 수 있습니다.

```typescript
// app/api/search/route.ts
import { type NextRequest } from "next/server";

export function GET(request: NextRequest) {
	const searchParams = request.nextUrl.searchParams;
	const query = searchParams.get("query");
	// query는 /api/search?query=hello에서 "hello"

	return Response.json({ query });
}
```

### 🌊 스트리밍

```typescript
// app/api/chat/route.ts
import { openai } from "@ai-sdk/openai";
import { StreamingTextResponse, streamText } from "ai";

export async function POST(req: Request) {
	const { messages } = await req.json();
	const result = await streamText({
		model: openai("gpt-4-turbo"),
		messages,
	});

	return new StreamingTextResponse(result.toAIStream());
}
```

또는 웹 API를 직접 사용할 수도 있습니다.

```typescript
// app/api/route.ts
// 비동기 이터레이터를 스트림으로 변환
function iteratorToStream(iterator: any) {
	return new ReadableStream({
		async pull(controller) {
			const { value, done } = await iterator.next();

			if (done) {
				controller.close();
			} else {
				controller.enqueue(value);
			}
		},
	});
}

function sleep(time: number) {
	return new Promise((resolve) => {
		setTimeout(resolve, time);
	});
}

const encoder = new TextEncoder();

async function* makeIterator() {
	yield encoder.encode("<p>첫번째</p>");
	await sleep(200);
	yield encoder.encode("<p>두번째</p>");
	await sleep(200);
	yield encoder.encode("<p>세번째</p>");
}

export async function GET() {
	const iterator = makeIterator();
	const stream = iteratorToStream(iterator);

	return new Response(stream);
}
```

### 📝 요청 본문 처리하기

표준 웹 API 메서드를 사용하여 요청 본문을 읽을 수 있습니다.

```typescript
// app/items/route.ts
export async function POST(request: Request) {
	const res = await request.json();
	return Response.json({ res });
}
```

#### FormData 처리하기

request.formData() 함수를 사용하여 FormData를 처리할 수 있습니다.

```typescript
// app/items/route.ts
export async function POST(request: Request) {
	const formData = await request.formData();
	const name = formData.get("name");
	const email = formData.get("email");
	return Response.json({ name, email });
}
```

> 💡 FormData의 모든 데이터는 문자열이므로, 다른 형식(예: 숫자)으로 데이터를 가져오려면 zod-form-data 같은 라이브러리를 사용하는 것이 좋습니다...

### 🌐 CORS 설정하기

특정 라우트 핸들러에 CORS 헤더를 설정할 수 있습니다.......

```typescript
// app/api/route.ts
export async function GET(request: Request) {
	return new Response("안녕하세요!", {
		status: 200,
		headers: {
			"Access-Control-Allow-Origin": "*",
			"Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
			"Access-Control-Allow-Headers": "Content-Type, Authorization",
		},
	});
}
```

> 참고: 여러 라우트 핸들러에 CORS 헤더를 추가하려면 미들웨어나 next.config.js 파일을 사용할 수 있습니다....

### 🪝 웹훅 처리하기

서드파티 서비스의 웹훅을 받기 위해 라우트 핸들러를 사용할 수 있습니다...

```typescript
// app/api/route.ts
export async function POST(request: Request) {
	try {
		const text = await request.text();
		// 웹훅 페이로드 처리하기
	} catch (error) {
		return new Response(`웹훅 오류: ${error.message}`, {
			status: 400,
		});
	}

	return new Response("성공!", {
		status: 200,
	});
}
```

Pages Router의 API Routes와 달리 추가 설정 없이 바로 사용 가능합니다.

### 📄 UI가 아닌 응답

UI가 아닌 콘텐츠를 반환하기 위해 라우트 핸들러를 사용할 수 있습니다. (sitemap.xml, robots.txt, 앱 아이콘, 오픈 그래프 이미지는 모두 기본 지원)

```typescript
// app/rss.xml/route.ts
export async function GET() {
	return new Response(
		`<?xml version="1.0" encoding="UTF-8" ?>
		<rss version="2.0">
			<channel>
				<title>Next.js 문서</title>
				<link>https://nextjs.org/docs</link>
				<description>웹을 위한 React 프레임워크</description>
			</channel>
		</rss>`,
		{
			headers: {
				"Content-Type": "text/xml",
			},
		},
	);
}
```

### ⚙️ 세그먼트 설정 옵션

라우트 핸들러는 페이지와 레이아웃과 동일한 라우트 세그먼트 설정을 사용합니다

```typescript
// app/items/route.ts
export const dynamic = "auto";
export const dynamicParams = true;
export const revalidate = false;
export const fetchCache = "auto";
export const runtime = "nodejs";
export const preferredRegion = "auto";
```

자세한 내용은 [API 참조](https://nextjs.org/docs/app/building-your-application/routing/route-handlers#api-reference)를 확인해 주세요..
