import React, {Component, Fragment} from "react";
import Logic from "./logic";
import { Report, Wrap, Title, Button, Icon, Border, AprovedIcon } from "./styles"
import InputMessage from 'components/InputMessage'
import Message from 'components/Message'

import { getLessonProgress } from 'utils/gurucan-helpers';

export default Logic(({ sendReport, course, exercise, t, purchasedCourses})=>{
    let exerciseCompleted = getLessonProgress(course._id, exercise._id, purchasedCourses)
    let completed = exercise.report && exercise.report.completed || exerciseCompleted
    return (
        <Report>
            {exercise.report && exercise.report.chat && exercise.report.chat.messages && (
                exercise.report.chat.messages.slice().reverse().map((message,i)=>
                    <Message message={message}/>
                )
            )}
            <Wrap>
                <Title>{
                    !completed ? (
                        t("send_report")
                    ) : (
                        <Fragment>
                            {t("report_aproved")}
                            <AprovedIcon className="fas fa-check"/>
                        </Fragment>
                    )
                }</Title>
                {course.chat && (
                    <Button theme="white" to={"/chats/"+course.chat}>{t("discuss_in_chat")}<Icon className="fas fa-comment-dots"/></Button>
                )}
            </Wrap>
            {!completed && (
                <Border>
                    <InputMessage
                        onSubmit={sendReport}
                        />
                </Border>
            )}
        </Report>
    )
});
