//NOTE - user example을 위한 임시 파일
//LINK - ../(routes)/example/users/page.tsx

// 메모리에 사용자 데이터 저장을 위한 간단한 저장소
export interface User {
	id: number;
	name: string;
	email: string;
	phone?: string;
}

// 초기 사용자 데이터
let users: User[] = [
	{ id: 1, name: "홍길동", email: "hong@example.com", phone: "010-1234-5678" },
	{ id: 2, name: "김철수", email: "kim@example.com", phone: "010-2345-6789" },
	{ id: 3, name: "이영희", email: "lee@example.com", phone: "010-3456-7890" },
];

// 사용자 ID 카운터
let nextId = 4;

export function getUsers() {
	return [...users];
}

export function getUserById(id: number) {
	return users.find((user) => user.id === id);
}

export function createUser(userData: Omit<User, "id">) {
	const newUser = { id: nextId++, ...userData };
	users.push(newUser);
	return newUser;
}

export function deleteUser(id: number) {
	const index = users.findIndex((user) => user.id === id);
	if (index !== -1) {
		const deletedUser = users[index];
		users = users.filter((user) => user.id !== id);
		return deletedUser;
	}
	return null;
}
