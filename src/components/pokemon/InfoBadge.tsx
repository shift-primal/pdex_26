import type { Icon } from "@phosphor-icons/react"

export const InfoBadge = ({ title, value, Icon }: { title: string; value: React.ReactNode; Icon: Icon }) => {
	return (
		<div className="flex items-center justify-between py-px">
			<div className="flex items-center gap-x-1.5 text-muted-foreground">
				<Icon className="size-4 lg:size-6" />
				<span className="text-sm lg:text-lg">{title}</span>
			</div>
			<span className="text-sm lg:text-lg">{value}</span>
		</div>
	)
}

export const Muted = ({ children }: { children: React.ReactNode }) => (
	<span className="text-muted-foreground italic">{children}</span>
)
