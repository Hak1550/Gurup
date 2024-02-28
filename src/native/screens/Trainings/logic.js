import React, {Component} from 'react'
import {connect} from "react-redux"
import {getExercise} from "../../../actions/courses";
import {downloadTraining, checkLoaded, removeTraining} from '../../utils/downloads.js';
import {Actions} from "react-native-router-flux"
import { compose } from "redux"
import { withNamespaces } from "react-i18next"
import AsyncStorage from "@react-native-async-storage/async-storage"

export default (WrappedComponent) => {
    class Logic extends Component {
        state = {
            loaded: false,
            downloadStatus: 'not loaded',
            downloadProgress: 0,
            trainingInfoModal: false,
            workoutInfo: {}
        }

        async componentDidMount() {
            const { navigation, dispatch } = this.props;
            dispatch(getExercise(navigation.state.params._id)).then(async ({exercise}) => {
                this.setState({ loaded: true }) 
                let loaded = await checkLoaded(navigation.state.params._id, "training", exercise.__v);
                if (loaded) {
                    this.setState({
                        downloadStatus: 'loaded'
                    })
                }
            });
            
        }
        removeTraining = async ()=>{
            const { navigation, dispatch } = this.props;
            // console.log("removeTraining!!! ",removeTraining)
            removeTraining(navigation.state.params._id, "training");
            dispatch({
                type:"START_ANIMATION",
                name:"trash",
                duration:1000
            })

            this.setState({
                downloadProgress: 0,
                downloadStatus:'not loaded'
            })
        }

        componentWillUnmount() {
            this.cancelUpload()
        }

        cancelUpload = () => {
            let { currentUploading = [] } = this.state
            if (currentUploading.length) {
                // console.log("CANCEL UPLOAD!!!");

                currentUploading.forEach(upload => {
                    upload.pauseAsync()
                })
            }
        }

        downloadVideo = async () => {
            // console.log("download button pressed =this.downloadStatus",this.state.downloadStatus);
            const {exercise, navigation} = this.props
            const course_id = navigation.state.params.course_id;
            const chapter = navigation.state.params.chapter;
            if(this.state.downloadStatus=="loading"){
                //Kostyl. Need to stop all downloads
                await this.removeTraining()
                this.cancelUpload()
                await AsyncStorage.setItem("training-"+training._id,"-1" );

            }else if(this.state.downloadStatus=="loaded"){
                Actions.replace('training',{ _id: exercise._id, course_id, chapter });
            }else{
                this.setState({
                    downloadProgress: 0,
                    downloadStatus: 'loading'
                });
                await downloadTraining(exercise, (progress) => {
                    // console.log("progress -----> ",progress);
                    if (this.state.downloadStatus==="loading") {
                        this.setState({
                            downloadProgress: progress * 100,
                        })
                    }
                },(downloads)=>{
                    // console.log("DONWLOADS ",downloads,"<<<<<<<<<");
                    this.setState({
                        currentUploading: downloads
                    })
                })


                // Kostyl. Need to stop all downloads before
                if(this.state.downloadStatus==="not loaded"){
                    this.setState({
                        downloadProgress: 100,
                        downloadStatus: 'loaded'
                    });
                }else{
                    this.setState({
                        downloadProgress: 100,
                        downloadStatus: 'loaded'
                    });
                    // console.error("course_id ",course_id,"    ",course._id);

                    // Actions.replace('training',{ _id: exercise._id, course_id })
                }
            }
        }

        openTrainingInfo = (workout) => {
            this.setState({trainingInfoModal: true, workoutInfo: workout})
        }
        closeTrainingInfoModal = () => {
            this.setState({trainingInfoModal: false, workout: {}})
        }

        render() {
            return <WrappedComponent
                downloadVideo={this.downloadVideo}
                openTrainingInfo={this.openTrainingInfo}
                closeTrainingInfoModal={this.closeTrainingInfoModal}
                removeTraining={this.removeTraining}
                state={this.state}
                {...this.props}
            />
        }
    }


    //withNamespaces(["chats"], { wait: true }),
    //compose
    return  compose(
        withNamespaces(["app_courses"], { wait: true }),
        connect(({ course, exercise }) => ({ course, exercise }))
    )(Logic)
}