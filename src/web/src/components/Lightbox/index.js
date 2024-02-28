import React, {Component, Fragment} from "react";
import {connect} from 'react-redux';
import {compose} from 'redux';
import Lightbox from "react-image-lightbox";
import 'react-image-lightbox/style.css';

import './main.scss';

class LB extends Component {

	state = {
		photoIndex: 0,
	}

	componentWillReceiveProps({lightbox}) {
		 const { images, image } = lightbox
		 if (images) {
			 this.setState({
				 photoIndex: images.findIndex(img=>img===image)
			 })
		 }
	}

	render() {
	   const { photoIndex } = this.state;
	   const { lightbox, dispatch} = this.props;
	   const { images, image } = lightbox;
	   return (
	       <div>
	           {images ? (
	               <Lightbox
	                   mainSrc={images[photoIndex]}
	                   nextSrc={images[(photoIndex + 1) % images.length]}
	                   prevSrc={images[(photoIndex + images.length - 1) % images.length]}
	                   onCloseRequest={() => {
						   dispatch({
							   type: "LIGHTBOX",
							   data: {},
						   })
					   }}
	                   onMovePrevRequest={() =>
	                     this.setState({
	                       photoIndex: (photoIndex + images.length - 1) % images.length
	                     })}
	                   onMoveNextRequest={() =>
	                     this.setState({
	                       photoIndex: (photoIndex + 1) % images.length
	                     })}
	                 />
	           ) : null}
	       </div>
	   )
	}
}

export default connect(({lightbox})=>({lightbox}))(LB)
