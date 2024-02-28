import req, { request } from "../requester";

// const withErrorDispatch = dispatch => (cb = err => err) => err => {
//
// 	dispatch({
// 		type: 'ERROR',
// 		code: err.code,
// 	});
// 	cb(err);
// }

const permissionHandler = (response, dispatch) => {
	dispatch({ type: "PLANS_MODAL_OPEN" });
};

export const getArticles = params => dispatch =>
	new Promise(resolve => {
		let type = null;
		let tags = [];
		let page = 0;
		let limit = 0;
		let replace = false;
		if (params && params.type) {
			type = params.type;
		}
		if (params && params.tags) {
			tags = params.tags;
		}
		if (params && params.page) {
			page = params.page;
		}
		if(params && params.limit) {
			limit = params.limit;

		}
		if(params && params.replace) {
			replace = params.replace;

		}

		if (!page || replace) {
			dispatch({
				type: "SET_STATUS",
				articles: "is_loading",
			});
		}

		request(
			req.get("/articles", {
				params: {
					type,
					tags,
					page,
					limit
				},
			})
		)
			.catch(response => permissionHandler(response, dispatch))
			.then(data => {
				if (page && !replace) {
						dispatch({
							type: "ADD_ARTICLES",
							articles: data.articles || [],
						});
				} else {
					dispatch({
						type: "SET_ARTICLES",
						articles: data.articles || [],
					});
				}
				if (data.articleTags) {
					dispatch({
						type: "SET_TAGS",
						tags: data.articleTags
					})
				}
				resolve(data);
			})
			.finally(() => {
				if (!page) {
					dispatch({
						type: "SET_STATUS",
						articles: "is_ready",
					});
				}
			});
	});

export const getArticle = id => dispatch =>
	new Promise(resolve => {
		dispatch({
			type: "SET_STATUS",
			article: "is_loading",
		});
		request(req.get(`/articles/${id}`))
			.catch(err => console.error("REQUEST getCourse ERROR", err))
			.then(data => {
				dispatch({
					type: "SET_ARTICLE",
					article: data.article || [],
				});
				resolve(data);
			})
			.catch(err => console.error("CATCH getCourse ERROR ", err))
			.finally(() => {
				dispatch({
					type: "SET_STATUS",
					article: "is_ready",
				});
			});
	});
