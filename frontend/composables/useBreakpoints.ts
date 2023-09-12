import { useBreakpoints } from '@vueuse/core'

export default function useAdaptiveBreakpoints () {
	const breakpoints = useBreakpoints({
		mobile: 375,
		tablet: 768,
		desktop: 1440,
	})
	const mobile = breakpoints.smaller('tablet')
	const tablet = breakpoints.between('tablet', 'desktop')
	const desktop = breakpoints.greater('desktop')

	return {mobile, tablet, desktop}
}