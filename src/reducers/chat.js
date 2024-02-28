export default (state = {}, action) => {
	// console.log("chat reducer ",action);
	switch (action.type) {
		case 'SET_CHAT_INFO':
			return {...state, info: action.info};
		case 'SET_CHAT':
			return action.data;
		case 'SET_MESSAGES':
			console.log("Messages count", action.messages_count)
			return {...state,
				prevPagesLoaded: 1,
				messagesPrevCount: action.messages_count,
				messages : [...state.messages.filter(({pending}) => pending), ...action.messages ]
			};
		case 'ADD_PENDING_MESSAGE':
			return { ...state, messages: [{ ...action.message }, ...state.messages]};
		case 'ADD_MESSAGES':
			return {...state, messages : [...action.messages, ...state.messages] };
		case 'ADD_PREV_MESSAGES':
			return {
				...state,
				prevPagesLoaded: state.prevPagesLoaded + 1,
				messages : [...state.messages, ...action.messages]
			};
		case 'ADD_NEW_MESSAGES':
			const old_messages = state.messages.map(({_id}) => _id);
			const new_messages = action.messages.filter(({_id}) => !old_messages.includes(_id));
			console.log("NEW MESSAGES", new_messages.map(({_id}) => _id));
			return {...state, messages : [ ...new_messages, ...state.messages,] };
		case 'ADD_MESSAGE':
            if(action.pending)
                return {...state, messages: [action.message, ...state.messages.filter(({pending}) => pending !== action.pending)]};
			else
				return {...state, messages: [...state.messages, action.message]};
		default:
			// console.log("default chat reducet");
			return state
	}
}
