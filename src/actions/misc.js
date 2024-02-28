import req, {request} from '../requester'

export const sendFile = (files, onUploadProgress, onUploadEnd, withInfo) => async (dispatch) => {
	console.log("sendFile ",files);
	console.log("onUploadProgress ",onUploadProgress);
	let data = new FormData();
	files.forEach(file => {

		let filetype = null;
		if(file.name){
			filetype = file.name.split('.')[1];
		}
		
		file.name = ""+Math.ceil(Math.random()*99999999)+(filetype?"."+filetype:'');
		data.append('file', file, file.name);
	});
	// let url = 'https://transcode.gurucan.xyz/api/upload';
	let url = 'https://transcoder.gurucan.com/api/upload';

	url = url + "/?length=" + files.length
	if (withInfo) {
		url = url + "&withInfo=true"
	}
	console.log("sendFile data ",data);
	return req.post(url, data, {
		headers: {
			'content-type': 'multipart/form-data'
		},
		onUploadProgress: (progress) => {

			if(onUploadProgress) onUploadProgress(progress)
		}

	}).then( ({ data }) => {


		if(onUploadEnd) onUploadEnd();
		if (data && data.files) {
			return data
		}
	})
	  .catch(err => {
		  console.log(err);
	  })
};

export const upload = ({files, onUploadProgress, index, url='/misc/upload', withInfo, protectedVideo=false}) => dispatch => new Promise(resolve => {
	const data = new FormData();

	files.forEach(file => {
		data.append('file', file, file.fileName);
	})
    let headers = {
        'content-type': 'multipart/form-data',
    }
	if(withInfo){
		url = url+"/?withInfo=true"
	}
	if(protectedVideo){
		if(url.indexOf("?")==-1){
			url += "?protected=true";
		}else{
			url += "&protected=true";
		}
	}

	req.post(url, data, {
		headers,
		onUploadProgress: (progressEvent) => {
			if (onUploadProgress) {
                onUploadProgress(Math.floor(progressEvent.loaded / progressEvent.total * 100)+"%")
            }
		},
	})
	  .then(data => data)
	  .catch(error => {
		  console.error("ERROR ", error);
	  })
	  .then(data => resolve(data))
});


export const getStripeConfig = () => dispatch => new Promise((resolve,reject) => {
	request(req.get(`/misc/config/stripe`))
		.then(data => {
			return data
		})
		.then(data => resolve(data))
});

export const getFeaturedInfluencer = () => dispatch => new Promise((resolve, reject) => {
	request(req.get('/misc/influencers'))
		.then(data => {
			return data
		})
		.then(data => resolve(data))
		.catch((e) => console.error(e))
})

export const searchInfluencers = (query) => dispatch => new Promise((resolve, reject) => {
	request(req.get('/misc/influencers/search', {params: {query: query}}))
		.then(data => {
			return data
		})
		.then(data => resolve(data))
		.catch((e) => console.error(e))
})
