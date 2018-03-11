export const INCREASE_COUNTER = 'INCREASE_COUNTER';
export const DECREASE_COUNTER = 'DECREASE_COUNTER';

// -------------------------------------------------- Action Creators --------------------------------------------------
export const decreaseCounterAction = () => ({
  type: DECREASE_COUNTER
});

export const increaseCounterAction = () => ({
  type: INCREASE_COUNTER
});

// ------------------------------------------------------ Actions ------------------------------------------------------
export function increaseCounter() {
  return dispatch => {
    dispatch(increaseCounterAction());
  };
}

export function decreaseCounter() {
  return dispatch => {
    dispatch(decreaseCounterAction());
  };
}
