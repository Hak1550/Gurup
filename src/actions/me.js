import req, { request } from "../requester";
import * as validator from "../utils/validator";

const withErrorDispatch = dispatch => (cb = err => err) => err => {
  console.log("withErrorDispatch err", err);
  dispatch({
    type: "ERROR",
    code: err.code
  });
  cb(err);
};

const validateResponse = (res, dispatch) => {
  if(res.status === "error"){
    if(!res.code){
      dispatch({
        type: "ERROR",
      });
      throw "UNKNOWN_ERROR"
    } else {
      dispatch({
        type: "ERROR",
        code: res.code
      });
      throw res.code
    }
  } else {
    return
  }
}
//TODO: Подумать над обработкой ошибки авторизации, чтобы не делать resolve в catch
export const getNotifications = jwt_token => dispatch =>
  new Promise(resolve => {
    if (jwt_token) {
      req.defaults.headers.common["Authorization"] = jwt_token;
    }
    dispatch({
      type: "SET_STATUS",
      notifications: "is_loading"
    });
    request(req.get("/notifications"))
      .then(data => {
        dispatch({
          type: "SET_NOTIFICATIONS",
          notifications: data.notifications || []
        });
        resolve(data);
      })
      .catch(err => {
        console.log(err);
        resolve();
      })
      .finally(() => {
        dispatch({
          type: "SET_STATUS",
          notification: "is_ready"
        });
      });
  });

export const editMe = ({ user }) => dispatch =>
    new Promise(resolve => {
      if (user.email && !validator.email(user.email)) {
          dispatch({ type: "ERROR", code: "EMAIL_IS_NOT_VALID" });
      } else {
          request(req.post("/users/me", { user }).catch(err => console.error(err)))
            .then(async data => {
              let currentData = data
              dispatch({ type: "SET_ME", me: currentData.me });
              dispatch({ type: "SUCCESS", code: "saved" });
              return currentData;
            })
            .catch(withErrorDispatch(dispatch)())
            .then(data => resolve(data));
      }
});

export const changeMe = ({ user }) => dispatch =>
  new Promise(resolve => {
    request(req.post("/users/me", { user }).catch(err => console.error(err)))
      .then(async data => {
        dispatch({ type: "SET_ME", me: data.me });
        return data;
      })
      .catch(withErrorDispatch(dispatch)())
      .then(data => resolve(data));
  });

export const changePassword = ({ current_password, new_password }) => async (dispatch) => {
  const {data : response} = await req.post("/users/change-password", { current_password, new_password })
  validateResponse(response, dispatch)
  return response
};

export const changeEmail = ({ email }) => dispatch =>
  new Promise(resolve => {
    if (validator.email(email)) {
      request(
        req
          .post("/users/me", { user: { email } })
          .catch(err => console.error(err))
      )
        .then(data => {
          dispatch({ type: "SET_ME", me: data.me });
          dispatch({ type: "ALERT", text: "Email successfully changed" });
          return data;
        })
        .catch(withErrorDispatch(dispatch)())
        .then(data => resolve(data));
    } else {
      dispatch({ type: "ERROR", code: "EMAIL_IS_NOT_VALID" });
    }
  });

export const resetPassword = ({ email }) => dispatch =>
    new Promise(resolve => {
        request(
          req
            .post("/users/recover", { email })
            .catch(err => console.error(err))
        )
          .then(data => {
            dispatch({ type: "SUCCESS", code: "recover_email_sended" });
            return data;
          })
          .catch(withErrorDispatch(dispatch)())
          .then(data => resolve(data));
});
