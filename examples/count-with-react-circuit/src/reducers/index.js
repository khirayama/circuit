export default function reducer(state, action) {
  switch (action.type) {
    case '__COUNT':
      state.total += action.count;
      break;
    default:
      break;
  }
  return state;
}
