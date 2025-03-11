import { Skeleton } from "@/components/ui/skeleton";

// loading.tsx의 주요 역할
// 1. 즉각적인 로딩 상태 표시
//    페이지나 컴포넌트가 로드되는 동안 사용자에게 즉시 로딩 UI를 보여줍니다.
//    사용자는 빈 화면 대신 로딩 인디케이터를 볼 수 있어 더 나은 사용자 경험을 제공합니다.
// 2. 자동 Suspense 통합
//    Next.js는 loading.tsx 파일을 자동으로 React Suspense와 통합합니다.
//    동일한 폴더에 있는 page.tsx를 자동으로 Suspense 바운더리로 감싸게 됩니다.
// 3. 서버 스트리밍 지원
//    서버에서 페이지를 렌더링하면서 일부분씩 점진적으로 클라이언트에 전송할 수 있게 해줍니다.
//    이를 통해 전체 페이지가 준비될 때까지 기다리지 않고도 일부 UI를 먼저 볼 수 있습니다.

// 작동 방식
// 1. 사용자가 해당 경로로 이동하면 즉시 loading.tsx에 정의된 UI가 표시됩니다.
// 2. 백그라운드에서 페이지 컴포넌트 로딩 및 데이터 가져오기 작업이 계속 진행됩니다.
// 3. 로딩이 완료되면 loading.tsx의 내용이 실제 페이지 내용으로 자동 교체됩니다.

export default function Loading() {
	return (
		<div className="container mx-auto space-y-8 py-10">
			<div className="space-y-4">
				<Skeleton className="h-8 w-[250px]" />
				<Skeleton className="h-4 w-full max-w-[600px]" />
			</div>

			<div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
				{Array(9)
					.fill(null)
					.map((_, index) => (
						<div key={index} className="space-y-3">
							<Skeleton className="h-[200px] w-full rounded-lg" />
							<Skeleton className="h-5 w-[80%]" />
							<Skeleton className="h-4 w-[60%]" />
						</div>
					))}
			</div>
		</div>
	);
}
