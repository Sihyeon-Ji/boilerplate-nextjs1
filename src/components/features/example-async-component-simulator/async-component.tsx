import { delay } from "@/lib/utils/utils";
import { PropsWithChildren } from "react";

interface AsyncComponentProps extends PropsWithChildren {
	/** 컴포넌트 로딩을 위한 지연 시간 (밀리초) */
	delayMs?: number;
	/** 컴포넌트를 식별하기 위한 이름 */
	name?: string;
}

/**
비동기 로딩 시뮬레이션:
실제 데이터 페칭이나 무거운 컴포넌트 로딩과 같은, 실제 애플리케이션에서 발생할 수 있는 지연 상황을 인위적으로 시뮬레이션합니다.
React Suspense 테스트 환경 제공:
Suspense와 fallback UI가 어떻게 작동하는지 개발 과정에서 쉽게 테스트하고 관찰할 수 있게 해줍니다.
점진적 로딩 패턴 시각화:
스트리밍과 점진적 로딩이 사용자 경험에 어떤 영향을 미치는지 시각적으로 확인할 수 있게 합니다.
 AsyncComponent는 개발 단계에서 비동기 로딩 패턴을 테스트하고 최적화하기 위한 도구로, 운영 환경에서는 기능적으로 투명한 래퍼 역할만 합니다.
 */
export async function AsyncComponent({
	children,
	delayMs = 0,
	name = "unnamed component",
}: AsyncComponentProps) {
	// 개발 환경에서 로딩 지연을 시뮬레이션합니다 (최소 300ms ~ 최대 지정된 시간)

	if (process.env.NODE_ENV === "development" && delayMs > 0) {
		console.log(`🔄 '${name}'이(가) 로딩 중... (${delayMs}ms)`);
		await delay(delayMs);
		console.log(`✅ '${name}'이(가) 로드됨`);
	}

	return <>{children}</>;
}
