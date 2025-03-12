// PM2 설정 파일
module.exports = {
	apps: [
		{
			name: "nextjs-app", // 애플리케이션 이름
			script: "node_modules/next/dist/bin/next", // 실행할 스크립트
			// script: './server/index.js',
			args: "start --port 4010", // 실행할 스크립트 인수
			// cwd: "/home/ubuntu/nextjs-app",
			instances: "max", // 동시에 실행할 인스턴스 수 (이 경우, 서버의 코어 개수만큼)
			exec_mode: "cluster",
			autorestart: true, // 프로세스가 비정상적으로 종료될 때 자동으로 다시 시작
			watch: false, // 파일 변경 감지
			// watch: ["server", "client"],
			watch_delay: 2000,
			// ignore_watch: ["node_modules"],
			max_memory_restart: "1G", // 메모리 임계값을 설정하여 재시작
			wait_ready: true, // Node.js 앱으로부터 앱이 실행되었다는 신호를 직접 받겠다는 의미
			listen_timeout: 50000, // 앱 실행 신호까지 기다릴 최대 시간. ms 단위.
			kill_timeout: 5000, // 새로운 프로세스 실행이 완료된 후 예전 프로세스를 교체하기까지 기다릴 시간
			time: true, // pm2 log 에서 콘솔들의 입력 시간이 언제인지 확인 가능
			// node 옵션
			node_args: "--max-old-space-size=2048", // 메모리 사용량 제한 증가
			// 실행 환경 변수 설정
			env_file: ".env",
		},
	],
};
