export default (state = [], action) => {
  switch (action.type) {
    case 'SET_TAGS':
      return [...action.tags];
    default:
      return state
  }
}
