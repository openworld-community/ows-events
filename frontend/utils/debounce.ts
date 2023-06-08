let timeout: ReturnType<typeof setTimeout> | undefined;

export const debounce = (cb: () => void, delay = 500) => {
	timeout && clearTimeout(timeout);

	timeout = setTimeout(async () => {
		cb();
	}, delay);
};
