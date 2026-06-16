import { useMediaQuery } from "@uidotdev/usehooks"

export const useMobile = () => {
	return useMediaQuery("only screen and (max-width : 768px)")
}
