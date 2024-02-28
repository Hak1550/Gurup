import req, { request } from '../requester';
const withErrorDispatch =
  (dispatch) =>
  (cb = (err) => err) =>
  (err) => {
    dispatch({
      type: 'ERROR',
      code: err.code,
    });
    cb(err);
  };

const permissionHandler = (response, dispatch) => {
  // console.error("PERMISSION HANDLER", response);
  dispatch({ type: 'PLANS_MODAL_OPEN' });
};

export const purchaseChat =
  ({ ...rest }) =>
  (dispatch) =>
    new Promise((resolve) => {
      dispatch({
        type: 'SET_STATUS',
        purchaseChat: 'is_loading',
      });
      request(req.post(`/chats/private/buy`, { ...rest }))
        .catch((response) => {
          if (response.code == 'NOT_ALLOWED') {
            // permissionHandler(response, dispatch)
          }
          // console.error("error in buy ", response);
        })
        .then((data) => {
          resolve(data);
        })
        .catch((err) => console.error('CATCH purchaseChat ERROR ', err))
        .finally(() => {
          dispatch({
            type: 'SET_STATUS',
            purchaseChat: 'is_ready',
          });
        });
    });

export const reportMessage = (id) => (dispatch) =>
  new Promise((resolve) => {
    request(req.post(`/messages/${id}/report`))
      .then((data) => {
        resolve(data);
      })
      .catch((err) => console.error('CATCH reportMessage ERROR', err))
      .finally(() => {});
  });

export const getChats =
  (params = {}) =>
  (dispatch) =>
    new Promise((resolve) => {
      dispatch({
        type: 'SET_STATUS',
        chats: 'is_loading',
      });
      // console.log("PARAMS", params)
      request(req.get(`/chats`, { params }))
        .then((data) => {
          // console.log("GET CHATS ",data);
          dispatch({
            type: 'SET_CHATS',
            chats: data.chats || [],
          });
          resolve(data);
        })
        .catch((err) => console.error('CATCH getChats ERROR', err))
        .finally(() => {
          dispatch({
            type: 'SET_STATUS',
            chats: 'is_ready',
          });
        });
    });

export const getChat = (id, initial, update) => (dispatch) =>
  new Promise((resolve) => {
    if (initial) {
      dispatch({
        type: 'SET_STATUS',
        chat: 'is_loading',
      });
    }
    request(req.get(`/chats/${id}`))
      .then((data) => {
        if (!update) {
          dispatch({
            type: 'SET_CHAT_INFO',
            info: data.chat || {},
          });
        }
        dispatch({
          type: 'SET_MESSAGES',
          ...data,
          //   messages: data.messages || []
        });

        dispatch({
          type: 'SET_CHATS_READ',
          chatId: data.chat._id,
        });

        resolve(data);
      })
      .catch((err) => console.error('CATCH getChat ERROR', err))
      .finally(() => {
        if (initial) {
          dispatch({
            type: 'SET_STATUS',
            chat: 'is_ready',
          });
        }
      });
  });

export const loadNewMessages =
  ({ chat, params = {} }) =>
  (dispatch) =>
    new Promise((resolve) => {
      request(req.get(`/chats/${chat}`, { params }))
        .then((data) => {
          // console.log("ADD MESSAGES", data.messages);
          dispatch({
            type: 'ADD_NEW_MESSAGES',
            messages: data.messages || [],
          });
          resolve(data);
        })
        .catch((err) => console.error('CATCH loadMessages ERROR', err));
    });

export const loadMessages =
  ({ chat, params = {} }) =>
  (dispatch) =>
    new Promise((resolve) => {
      request(req.get(`/chats/${chat}`, { params }))
        .then((data) => {
          // console.log("ADD MESSAGES", data.messages);
          dispatch({
            type: 'ADD_PREV_MESSAGES',
            messages: data.messages || [],
          });
          resolve(data);
        })
        .catch((err) => console.error('CATCH loadMessages ERROR', err));
    });

export const sendMessage = (id, data) => (dispatch, getState) =>
  new Promise((resolve) => {
    if (!data.text && (!data.attachments || !data.attachments.length)) {
      dispatch({ type: 'ERROR', code: 'EMPTY_MESSAGE' });
      resolve();
      return;
    }
    const sender = getState().me;
    const messageTimestamp = new Date().getTime();
    dispatch({
      type: 'ADD_PENDING_MESSAGE',
      message: {
        attachments: [],
        ...data,
        user: {
          _id: sender._id,
          name: sender.name,
          avatar: sender.avatar,
        },
        pending: messageTimestamp,
      },
    });
    request(req.post(`/chats/${id}`, data))
      .then((data) => {
        dispatch({
          type: 'ADD_MESSAGE',
          message: data.message,
          pending: messageTimestamp,
        });
        return data;
      })
      .catch(withErrorDispatch(dispatch)())
      .then((data) => resolve(data));
  });

export const startPrivateChat = () => (dispatch) =>
  new Promise((resolve) => {
    dispatch({
      type: 'SET_STATUS',
      chats: 'is_loading',
    });
    request(req.post(`/chats/private`))
      .then(async (data) => {
        await dispatch(getChats());
        resolve(data.chat);
      })
      .catch((err) => console.error('CATCH getChats ERROR', err))
      .finally(() => {
        dispatch({
          type: 'SET_STATUS',
          chats: 'is_ready',
        });
      });
  });

export const buyPrivateChat = (params) => (dispatch) =>
  new Promise((resolve) => {
    dispatch({
      type: 'SET_STATUS',
      chats: 'is_loading',
    });
    request(req.post(`/chats/private/buy`, params))
      .then(async (data) => {
        if (params.gateway === 'tks' || params.gateway === 'stripe') {
          resolve(data);
        } else {
          resolve(data.chat);
        }
      })
      .catch((err) => console.error('CATCH getChats ERROR', err))
      .finally(() => {
        dispatch({
          type: 'SET_STATUS',
          chats: 'is_ready',
        });
      });
  });

export const createSupportChat = () => async (dispatch) => {
  try {
    const data = await request(req.post(`/chats/support`));
    dispatch({ type: 'SET_ME', me: data.user });
    return { chat: data.chat };
  } catch (e) {
    console.error('createSupportChat ERROR', e);
    dispatch({
      type: 'ALERT',
      text: 'e',
    });
  }
};
