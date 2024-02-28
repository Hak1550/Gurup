export default (state = null, action) => {
  switch (action.type) {
    case "SET_INFLUENCER":
      return { ...action.influencer };
    case "CLEAR_INFLUENCER":
      return { };
    default:
      return state;
  }
};
