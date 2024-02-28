export default (state = [], action) => {
	// console.log("ATCIO=> ",action);
	switch (action.type) {
		case 'SET_CHATS':
			return action.chats;
		case 'SET_CHATS_READ':
			// console.log("STATE IS ",state);
			return state.map((c)=>{
				if( c._id == action.chatId){
					c.unread = 0;
				}
				return c;
			});
		default:
			return state
	}
}