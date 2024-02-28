import React from 'react'
import { connect } from 'react-redux';

export default (WrappedComponent) => {
	class Logic extends React.Component {
		
		//Для компонента Tags
		onClick = (e) => {
			//TODO: сделать нормально через реф
			if (e.target.innerHTML === '...') {
				console.log('www')
				e.preventDefault()
			}
		}


		render() {
			return <WrappedComponent onClick={this.onClick} {...this.props}/>
		}
	}
	return connect(null)(Logic)
}
