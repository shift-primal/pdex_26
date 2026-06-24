export const TemporaryWrapper = ({ children, title }: { children: React.ReactNode; title?: string }) => {
	return (
		<div className="flex flex-col items-center justify-center border-2 border-black p-2 min-h-48 min-w-96 max-h-48 max-w-96 overflow-auto">
			<span className="border-b-2 border-red-400 my-2">{title ?? "Temporary"}</span>

			{children}
		</div>
	)
}
