import React from 'react';

import Logic from './logic';

import {
	Label, Input, InputWrap, Cancel, ErrorText, Border,
	Attachments, Attachment, AttachmentDelete, Uploader, Plane,
	Icon
} from './styles';

const InputMessage = ({
	attachmentDelete,
	onUploadStart, uploadOnChange, onUploadProgress,
	onChange, state, t, onKeyDown, onSubmit
})=>{
	let {attachments, text, uploading, progress} = state
	return (
		<div>
			{attachments && attachments.length ? (
				<Attachments>
					{attachments.map((attachment, i)=>
						<Attachment img={attachment.type==="image" ? attachment.src : ""} key={i}>
							<AttachmentDelete className="delete" onClick={()=>{
								attachmentDelete(attachment)
							}}><i className="fas fa-times"/></AttachmentDelete>
							{attachment.type === "file" ? (
								<Icon className="fas fa-upload"/>
							) : attachment.type === "video" ? (
								<Icon className="fas fa-video"/>
							) : null}
						</Attachment>
					)}
					{uploading && (
						<Attachment>
							{progress}
						</Attachment>
					)}
				</Attachments>
			) : null}
			{uploading && attachments && attachments.length===0 && (
				<Attachments>
					<Attachment>
						{progress}
					</Attachment>
				</Attachments>
			)}
			<InputWrap>
				<Uploader
				  withInfo={true}
				  onUploadStart={onUploadStart}
				  onChange={uploadOnChange}
				  onUploadProgress={onUploadProgress}
				  multiple={true}
				  className="chats__upload"
				  name={"img"}
				>
					<i className="fas fa-paperclip"/>
				</Uploader>
                <Input
                    onKeyDown={onKeyDown}
					value={text}
					onChange={onChange}
					rows={1}
					maxRows={7}
					placeholder={t("chats:chat_input")}/>
				<Plane onClick={onSubmit} className="fas fa-paper-plane"/>
			</InputWrap>
		</div>
	)
}

export default Logic(InputMessage)
