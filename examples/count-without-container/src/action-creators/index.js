export function countUp(dispatch) {
  return () => {
    dispatch({
      type: '__COUNT',
      count: 1,
    });
  };
}

export function countDown(dispatch) {
  return () => {
    dispatch({
      type: '__COUNT',
      count: -1,
    });
  };
}

