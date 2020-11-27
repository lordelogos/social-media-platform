export const initialState = {
	user: null,
	posts: [],
};

const reducer = (state, action) => {
	switch (action.type) {
		case "SET_USER":
			return {
				...state,
				user: action.user,
			};
		case "SET_POSTS":
			return {
				...state,
				posts: action.posts
			}
		default:
			return state;
	}
};

export default reducer;
