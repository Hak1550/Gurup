import req, {request} from "../requester";

const withErrorDispatch = dispatch => (cb = err => err) => err => {
  dispatch({
    type: 'ERROR',
    code: err.code,
  });
  cb(err);
}

export const getTags = () => dispatch => new Promise(resolve => {
  dispatch({
    type: 'SET_STATUS',
    tags: 'is_loading'
  })
  request(req.get('/tags'))
    .then(data => {
      dispatch({
        type: 'SET_TAGS',
        tags: data.tags || []
      });
      resolve(data)
    })
    .catch(err => console.log('CATCH getTags ERROR'))
    .finally(() => {
      dispatch({
        type: 'SET_STATUS',
        tags: 'is_ready'
      })
    })
})
