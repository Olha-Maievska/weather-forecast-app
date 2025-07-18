export const debounce = (func: (...args: any[]) => void, delay: number) => {
  let timer: ReturnType<typeof setTimeout> | null = null;

  const debounced = (...args: any[]) => {
	if (timer) clearTimeout(timer);
	timer = setTimeout(() => {
	  func(...args);
	  timer = null;
	}, delay);
  };

  debounced.cancel = () => {
	if (timer) {
	  clearTimeout(timer);
	  timer = null;
	}
  };

  return debounced;
};