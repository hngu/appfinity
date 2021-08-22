type HandlerFunction = () => unknown;

export const throttle = (func: HandlerFunction, wait: number): HandlerFunction => {
  /**
   * Throttle returns a new function that is invoked at most
   * once per wait milliseconds.
   */
  let timeoutId: ReturnType<typeof setTimeout> | null = null;

  return () => {
    if (timeoutId) {
      return;
    }
    func();
    setTimeout(() => {
      timeoutId = null;
    }, wait);
  };
};

export const debounce = (func: HandlerFunction, wait: number, immediate = false): HandlerFunction => {
  /**
   * Debounce will return a new function, that as long as it is invoked,
   * it will not trigger the handler function. It will call the handler function
   * after it stops being invoked for wait milliseconds.
   *
   * If immediate is set to true, then trigger the function at the leading edge
   * instead of the trailing edge.
   */
  let timeoutId: ReturnType<typeof setTimeout> | null = null;
  return () => {
    const callNow = immediate && !timeoutId;

    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(() => {
      if (!immediate) {
        func();
      }
    }, wait);
    if (callNow) {
      func();
    }
  };
};
