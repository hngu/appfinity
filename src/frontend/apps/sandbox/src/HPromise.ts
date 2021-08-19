// HPromise means Huy's Promise
// My own implementation of promises

/**
 * const promise = new Promise((resolve, reject) => {
 *
 * }).then(resolveCb, rejectCb).then();
 */

export type HandlerFunction = (val: unknown) => unknown;
type SuccessFailureTuple = [HandlerFunction, HandlerFunction?];
type PromiseHandler = (resolve: HandlerFunction, reject: HandlerFunction) => void;

class HPromise {
  callbacks: SuccessFailureTuple[];
  catchHandler: HandlerFunction;

  constructor(callback: PromiseHandler) {
    this.callbacks = [];
    this.catchHandler = () => {
      /* does nothing */
    };

    const resolve: HandlerFunction = (success: unknown) => {
      const callback = this.callbacks.shift();
      if (callback && callback[0]) {
        try {
          const result = callback[0](success);
          if (result instanceof HPromise) {
            result.then(resolve, reject);
          } else {
            resolve(result);
          }
        } catch (e) {
          this.callbacks = [];
          this.catchHandler(e);
        }
      }
    };
    const reject: HandlerFunction = (failure: unknown) => {
      const callback = this.callbacks.shift();
      if (callback && callback[1]) {
        try {
          const result = callback[1](failure);
          if (result instanceof HPromise) {
            result.then(resolve, reject);
          } else {
            resolve(result);
          }
        } catch (e) {
          this.callbacks = [];
          this.catchHandler(e);
        }
      }
    };
    callback(resolve, reject);
    return this;
  }

  then(handleSuccess: HandlerFunction, handleFailure?: HandlerFunction): HPromise {
    this.callbacks.push([handleSuccess, handleFailure]);
    return this;
  }

  catch(handleError: HandlerFunction): HPromise {
    this.catchHandler = handleError;
    return this;
  }
}

export default HPromise;
