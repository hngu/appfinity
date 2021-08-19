import React, { FC } from 'react';
import HPromise, { HandlerFunction } from '../HPromise';

const PromisePage: FC = () => {
  const handleClick = () => {
    new HPromise((resolve: HandlerFunction) => {
      setTimeout(() => {
        resolve('Huy');
      }, 1000);
    })
      .then((success: unknown) => {
        console.log('success', success);
        return new HPromise((_: HandlerFunction, reject: HandlerFunction) => {
          setTimeout(() => {
            reject('Huy 2');
          }, 1000);
        });
      })
      .then(
        (success: unknown) => {
          console.log('success', success);
          return true;
        },
        (failure: unknown) => {
          console.log('failure', failure);
          return true;
        },
      )
      .then((success: unknown) => {
        console.log(success);
        throw new Error('oh no');
      })
      .catch((err) => {
        console.log('error', err);
      });
  };

  return (
    <>
      <h2>Custom Promise Implementation</h2>
      <button type="button" onClick={handleClick}>
        Click to start
      </button>
    </>
  );
};

export default PromisePage;
