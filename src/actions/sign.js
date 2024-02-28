import req, { getInfluencerRequester, request, updateBaseUrl } from "../requester"
import { getNotifications } from "./me"
import error from "../utils/error";
import influencer from "../reducers/influencer";

const withErrorDispatch = dispatch => (cb = err => err) => err => {
	console.log("withErrorDispatch", err)
	dispatch({
		type: "ERROR",
		code: err.code,
		descr: err.descr,
	})
	cb(err)
}

const handleError = (dispatch, err) => {
	dispatch({
		type: "ERROR",
		code: err.code,
		descr: err.descr,
	})
}

export const signInWithApple = (credential) => async (dispatch) => {
	const data  = await request(req.post("/users/oauth/apple", { credential }));
	console.log("APPLE RESPONSE", data);
	req.defaults.headers.common["Authorization"] = data.jwt_token
	dispatch({ type: "SET_ME", me: data.user })
	return data
}

export const signInWithCode = (params) => async (dispatch, getState) => {
	console.log("START CODE SENDING", params);
	const {influencer} = getState();
	const requestParams = { ...params, ...(params.customApp ? {influencer: influencer._id} : {})};
	console.log("PARAMS", requestParams);
	try {
		const data = await request(req.post("/users/code-auth", requestParams));
		if(!data.multi_credentials){
			req.defaults.headers.common["Authorization"] = data.jwt_token;
			dispatch({ type: "SET_ME", me: data.user })
			dispatch({ type: "SET_INFLUENCER", influencer: data.influencer });
			updateBaseUrl({subdomain: data.influencer.name});
		}
		return data
	} catch (e) {
		console.log("ERROR DURING CODE", e);
		handleError(dispatch, e);
		throw e;
	}
}

export const selectInfluencer = ({user, influencer, jwt_token}) => async (dispatch) => {
	req.defaults.headers.common["Authorization"] = jwt_token;
	dispatch({ type: "SET_ME", me: user })
	dispatch({ type: "SET_INFLUENCER", influencer });
}

export const signUp = ({ user, nocookie = true }) => dispatch =>
	new Promise((resolve, reject) => {
		request(req.post("/users", { ...user, nocookie }))
			.then(data => {
				req.defaults.headers.common["Authorization"] = data.jwt_token;
				dispatch({ type: "SET_ME", me: data.user })
				return data
			})
			.catch(withErrorDispatch(dispatch)(reject))
			.then(data => resolve(data))
	})

export const oauth = ({ platform, credentials }) => dispatch => new Promise((resolve, reject) => {
	console.log("oauth ", platform, "  ", credentials);
	request(req.post("/users/oauth/" + platform, {
		credentials,
		nocookie: true
	}))
		.then(data => {
			console.log("OAUTH data ", data);

			console.log("STAUS ", data.status);
			console.log("USER ", data.user);
			if (data && data.user && data.status == "ok") {
				console.log("JWT_TOKEN ", data.jwt_token);
				req.defaults.headers.common["Authorization"] = data.jwt_token
				dispatch({ type: "SET_ME", me: data.user })
				console.log("ME set");
				return data
			}

		})
		.catch(withErrorDispatch(dispatch)(reject))
		.then(data => resolve(data))
})

export const signIn = ({ user, nocookie = true }) => dispatch =>
	new Promise((resolve, reject) => {
		request(req.post("/users/login", { ...user, nocookie }))
			.then(data => {
				req.defaults.headers.common["Authorization"] = data.jwt_token
				dispatch({ type: "SET_ME", me: data.me })
				return data
			})
			.catch(withErrorDispatch(dispatch)(reject))
			.then(data => resolve(data))
	})

//TODO: Подумать над обработкой ошибки авторизации, чтобы не делать resolve в catch
export const getMe = jwt_token => dispatch =>
	new Promise((resolve, reject) => {
		if(jwt_token) {
			req.defaults.headers.common["Authorization"] = jwt_token
		}
		console.log("HEADERS", req.defaults.headers.common["Authorization"])
		dispatch({
			type: "SET_STATUS",
			me: "is_loading",
		})
		request(req.get("/users/me"))
			.then(data => {
				dispatch({
					type: "SET_ME",
					me: data.me || {},
				})
				resolve(data)
			})
			.catch(err => {
				console.log("ERROR in get me", err)
				reject(err)
			})
			.finally(() => {
				dispatch({
					type: "SET_STATUS",
					me: "is_ready",
				})
			})
	})

export const setDeviceData = params => dispatch => new Promise((resolve)=>{
	console.log("setDeviceData ",params);
	req.post("/users/setMobileData",params);
});
export const init = params => dispatch =>
	new Promise((resolve, reject) => {
		let jwt_token = null
		let config = null
		if(params && params.jwt_token) {
			jwt_token = params.jwt_token
		}
		if(params && params.config) {
			config = params.config
		}
		Promise.all([
			dispatch(checkInfluencer({ subdomain: null, config })), // InfluencerId may be missing
			// dispatch(checkOnlineInfluencer()),
			dispatch(getMe(jwt_token)),
			dispatch(getNotifications(jwt_token)),
		]).then(data => resolve(data)).catch(e => reject(e))
	})

export const registerPushToken = token => dispatch =>
	new Promise(resolve => {
		req.post("/users/push-token", { token })
	})

export const unregisterPushToken = token => dispatch =>
	new Promise(resolve => {
		req.post("/users/push-token/unregister", { token })
	})

export const sendReport = ({ text, files, expoData, deviceData }) => dispatch =>
	new Promise((resolve, reject) => {
		request(req.post("/users/report", { text, files,  expoData, deviceData }))
			.then(data => {
				dispatch({ type: "ALERT", text: "Report sucessfuly sent" })
				return data
			})
			.catch(withErrorDispatch(dispatch)(reject))
			.then(data => resolve(data))
	})

export const checkInfluencer = ({ subdomain = null, config, env, influencerId }) => dispatch =>
	new Promise((resolve, reject) => {
		dispatch({
			type: "SET_STATUS",
			influencer: "is_loading",
		});
		let requester = req;
		console.log("Simple requester")
		if(subdomain && !influencerId){
			console.log("subdomain requester")
			requester = getInfluencerRequester({ subdomain, env })
		} else if (influencerId){
			requester = getInfluencerRequester({ env, influencerId })
			console.log("influencerId requester", requester.defaults)
		}
		request(requester.get("/"))
			.then(data => {
				console.log("data.influencer ", data.influencer);
				dispatch({ type: "SET_INFLUENCER", influencer: data.influencer })
				return data
			})
			.catch((data) => {
				// console.log("checkInfluencer error => ",data);
				if(data && data.code == "INFLUENCER_NOT_FOUND") {
					dispatch({
						type: "ERROR",
						code: "INFLUENCER_NOT_FOUND",
					})
					reject()
				} else {
					withErrorDispatch(dispatch)(reject)
				}

			})
			.then(data => {
				const ctnCourses = data.influencer.app__menuCoursesText
				const ctnArticles = data.influencer.app__menuArticlesText
				const ctnChats = data.influencer.app__menuChatsText
				const ctnMarathon = data.influencer.app__menuMarathonText
				const ctnNutrition = data.influencer.app__menuNutritionText
				const ctnOffers = data.influencer.app__menuOffersText
				if(config){
					console.log("got config, setting bottom");
					config.changeProperty([
						{
							name: "appName",
							value: data.influencer.appName,
						},
						{
							name: "tabBarTitles",
							value: {
								courses: ctnCourses ? ctnCourses : config.tabBarTitles["courses"],
								chats: ctnChats ? ctnChats : config.tabBarTitles["chats"],
								articles: ctnArticles ? ctnArticles : config.tabBarTitles["articles"],
								marathon: ctnMarathon ? ctnMarathon : config.tabBarTitles["marathon"],
								nutrition: ctnNutrition ? ctnNutrition : config.tabBarTitles["nutrition"],
								offers: ctnOffers ? ctnOffers : config.tabBarTitles["offers"],
							},
						},
					])
				}
				return data
			})
			.then(data => {
				// console.log("appName", data);
				if(config){
					config.changeProperty([{ name: "appName", value: data.influencer.appName }])
					if(!subdomain){
						config.changeProperty([{ name: "appDomain", value: data.influencer.name }])
					}
				}
				resolve(data)
				return data
			})
	})

export const checkOnlineInfluencer = () => dispatch =>
	new Promise((resolve, reject) => {
		request(req.get("/checkonline"))
			.then(data => {
				dispatch({ type: "SET_ONLINE", influencerOnline: data.influencer })
				return data
			})
			.catch(err => {
				withErrorDispatch(dispatch)(reject)
				console.log("checkOnlineInfluencer error", err)
			})
			.then(data => resolve(data))
	})


export const logout = () => dispatch => {
	new Promise((resolve, reject) => {
		request(req.get("/users/logout"))
			.then(data => {
				dispatch({ type: "CLEAR_ME" })
				return data
			})
			.catch(err => {
				console.log("Logout error", err)
			})
			.then(data => resolve(data))
	})
}
