import React, {Fragment} from 'react'
import {ScrollView, Text, View, TouchableOpacity} from 'react-native'
import styles from '../styles'
import MainLayout from "../../../components/MainLayout";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Button, {RoundedButton} from '../../../components/Button'
import Preloader from "../../../components/Preloader"
import TrainingItem from "../../../components/TrainingItem";
import Logic from '../logic'
import TrainingInfoModal from "../../../components/TrainingInfoModal/core";
import ItemSummary from "../../../components/ItemSummary";
import moment from "moment";

const Trainings = ({ state, exercise, downloadVideo, openTrainingInfo, closeTrainingInfoModal, removeTraining, t }) => {
    return (
        <MainLayout screenTitle={exercise.title}>
            {!state.loaded && <Preloader/>}
            {state.loaded && (
                <Fragment>
                    <ScrollView contentContainerStyle={styles['marathon-trainings__container']}>
                        <View style={styles['marthon-trainings__header']}>
                            <Text style={styles['marthon-trainings__header-title']}>{exercise.title}</Text>
                            <View style={styles['marthon-trainings__header-info']}>
                                <ItemSummary 
                                    autoAlign = {false}
                                    textStyle={styles['marthon-trainings__header-summary']}
                                    summary={[
                                        // {
                                        //     text: moment.duration(exercise.duration, "minutes").format("m _"),
                                        //     icon: "clock-o"
                                        // },
                                        {
                                            text: `${exercise.blocks.length} ${t("app_basic:lessons")}`,
                                            icon: "file-text-o"
                                        },
                                    ]}
                                    />
                            </View>
                            <Text style={styles['marthon-trainings__header-desc']}>{exercise.description}</Text>
                            {(state.downloadStatus && state.downloadStatus=="loaded" )?(
                                <TouchableOpacity onPress={removeTraining}>
                                    <Text style={styles['marthon-trainings__delete']}>
                                        <FontAwesome name={"trash"} style={styles['marthon-trainings__icon_red']}/>
                                        {" "}{t("app_courses:remove_training")}
                                    </Text>
                                </TouchableOpacity>
                            ):null}
                        </View>
                        {(exercise.blocks && exercise.blocks.length) ? exercise.blocks.map((workout) => (
                            <TrainingItem workout={workout} key={workout._id} onPress={openTrainingInfo}/>
                        )) : null}
                    </ScrollView>
                    {(exercise.blocks && exercise.blocks.length)?(
                        <View style={styles['marathon-trainings__buttons-wrapepr']}>
                            <DownloadButton
                                t={t}
                                status={state.downloadStatus}
                                progress={state.downloadProgress}
                                onPress={downloadVideo}
                                removeTraining={removeTraining}
                            />
                        </View>
                    ):(
                        <View style={styles['marathon-trainings__buttons-wrapepr']}>
                            <Text style={{ textAlign:"center"}}>{t("no_workouts_uploaded")}</Text>
                        </View>
                    )}
                    <TrainingInfoModal isOpen={state.trainingInfoModal} closeModal={closeTrainingInfoModal} workout={state.workoutInfo}/>
                </Fragment>
            )}
        </MainLayout>
    )
}

const DownloadButton = ({ status, progress, onPress, removeTraining, t }) => {
    // console.log("downloadbutton ", status, progress);
    switch (status) {
        case 'not loaded':
            return <Button onPress={onPress} title={t("app_courses:training_download")} theme='accent'/>
        case 'loading':
            return <RoundedButton onPress={onPress} infiniteLoader icon='pause' theme='accent'/>
        case 'loaded':
            return <RoundedButton onPress={onPress} icon='play' theme='accent'/>
        default:
            return null;
    }
}

export default Logic(Trainings)