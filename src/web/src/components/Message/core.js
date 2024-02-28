import React, {Component, Fragment} from "react";
import Avatar from "components/Avatar";
import moment from 'moment';
import Logic from './logic'

import { Wrap,
Message,
Name,
Text,
Attachments,
Attachment,
Time,
Icon } from "./styles"

 const DefMessage = ({message, reverse, attachmentOnClick})=>{
    return (
        <Wrap className={reverse ? "reverse" : ""}>
            <Avatar img={message.user.avatar} name={message.user.name}/>
            <Message className={reverse ? "reverse" : ""}>
                <Name>{message.user.name}</Name>
                <Text>{message.text}</Text>
                {message.attachments ? (
                    <Attachments>
                        {message.attachments.map((attachment, i)=>
                            attachment.type === "video" ? (
                                <Attachment key={i}>
                                    <video width="100%" height="100%" controls>
                                      <source src={attachment.src} type="video/mp4"/>
                                    </video>
                                </Attachment>
                            ) : attachment.type === "image" ? (
                                <Attachment key={i} onClick={()=>{
                                    attachmentOnClick(attachment)
                                }} img={attachment.src || attachment}/>
                            ) : (
                                <a href={attachment.src}>
                                    <Attachment key={i}>
                                        <Icon className="fas fa-upload"/>
                                        {attachment.name}
                                    </Attachment>
                                </a>
                            )
                        )}
                    </Attachments>
                ) : null}


                <Time>
                    {moment(message.createdAt).format('HH:mm DD MMM YY')}
                </Time>
            </Message>
        </Wrap>
    )
};

export default Logic(DefMessage)
