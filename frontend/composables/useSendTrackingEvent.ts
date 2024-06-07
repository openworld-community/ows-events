export const useSendTrackingEvent = <T extends Record<string, string>>() => {
	const sendAnalyticEvent = (eventName: string, parameters: T) => {
		useTrackEvent(eventName, parameters);
		console.log('send_Analytics');
	};
	return { sendAnalyticEvent };
};
