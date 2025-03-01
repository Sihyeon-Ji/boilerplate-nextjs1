import { Input } from "@/components/ui/input";

export function InputDemo() {
	return (
		<div className="flex flex-col flex-wrap gap-4 md:flex-row">
			<form>
				<Input type="email" placeholder="Email" autoComplete="email" />
				<Input
					type="text"
					placeholder="Error"
					aria-invalid="true"
					autoComplete="off"
				/>
				<Input
					type="password"
					name="password"
					placeholder="Password"
					autoComplete="current-password"
				/>
				<Input type="number" placeholder="Number" autoComplete="off" />
				<Input type="file" placeholder="File" autoComplete="off" />
				<Input type="tel" placeholder="Tel" autoComplete="off" />
				<Input type="text" placeholder="Text" autoComplete="off" />
				<Input type="url" placeholder="URL" autoComplete="off" />
				<Input type="search" placeholder="Search" autoComplete="off" />
				<Input type="date" placeholder="Date" autoComplete="off" />
				<Input
					type="datetime-local"
					placeholder="Datetime Local"
					autoComplete="off"
				/>
				<Input type="month" placeholder="Month" autoComplete="off" />
				<Input type="time" placeholder="Time" autoComplete="off" />
				<Input type="week" placeholder="Week" autoComplete="off" />
				<Input disabled placeholder="Disabled" autoComplete="off" />
			</form>
		</div>
	);
}
