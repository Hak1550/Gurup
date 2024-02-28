import React from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { changeMe } from '../../../actions/me'
import { withNamespaces } from 'react-i18next'

export default WrappedComponent => {
	class Logic extends React.Component {
		state = {
			editedProfile: false,
			progress: 0,
			name: this.props.me.name,
			email: this.props.me.email,
			avatar: this.props.me.avatar,
			phone: this.props.me.phone,
			instagram: this.props.me.instagram,
			avatarLoading:false,
			planName:
				this.props && this.props.me && this.props.me.plan && this.props.me.plan.name
					? this.props.me.plan.name
					: null,
		}

		toggleEditBtn = () => {
			this.setState({ editedProfile: !this.state.editedProfile })
		}
		toggleLoadingAvatar = ()=>{
			this.setState({
				avatarLoading:!this.state.avatarLoading
			})
		}

		saveUser = async values => {
			const editableFields = ['name', 'email', 'phone', 'instagram']
			let editedFields = {}
			// console.log("save user values",values);
			editableFields.forEach(field => {
				if (this.props.me[field] !== values[field]) {
					editedFields[field] = values[field]
				}
			})
			await this.props.dispatch(changeMe({ user: editedFields }))
			this.setState({ editedProfile: false })
		}

		onUploadAvatar = async avatar => {
			this.setState({ avatar })
			this.saveUser()
		}

		render() {
			return (
				<WrappedComponent
					state={this.state}
					toggleEditBtn={this.toggleEditBtn}
					toggleLoadingAvatar={this.toggleLoadingAvatar}
					saveUser={this.saveUser}
					onUploadAvatar={this.onUploadAvatar}
					{...this.props}
				/>
			)
		}
	}
	// return connect(({me, influencer}) => ({me, influencer}))(Logic)
	return compose(
		withNamespaces(['app_basic']),
		connect(({ me, influencer }) => ({ me, influencer }))
	)(Logic)
}
