import React, {Fragment} from "react";
import {View, Text, TouchableOpacity, ScrollView, ImageBackground} from "react-native";
import Image from "../../../components/CacheImage";
import {LinearGradient} from "expo-linear-gradient";
import {gradients} from "../../../styles/variables";
import MainLayout from "../../../components/MainLayout";
import NStatusBar from "../../../components/Statusbar"
import Button from "../../../components/Button"
import QuizFinish from "../../QuizFinish";
import styles from "../styles";
import Preloader from "../../../components/Preloader"
import {Actions} from "react-native-router-flux"
import Logic from '../logic'
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { formatSecondsAsTimer} from "../../../utils";


const Quiz = ({ state, _clickAnswer, exercise, courseId, quiz, showFinish, resetTest, chapter}) => {
        // console.log("Quiz index render:", state.loaded);
        let progress = 0;
        const {index = 0} = quiz;
        let title = "Test";
        if (state.loaded && exercise && exercise.blocks && exercise.blocks.length) {
            progress = index / exercise.blocks.length
            title = exercise.title
        }


        return (
            <MainLayout screenTitle={title} withProgress progress={progress}>
                {(!state.loaded) ? <Preloader /> : (
                    <ScrollView
                        contentContainerStyle={{
                            flexGrow: 1,
                            // justifyContent: "space-between",
                        }}
                        alwaysBounceVertical={false}
                        style={styles["test"]}
                    >
                        <View style={styles["test__meta"]}>
                            <View style={styles["test__meta-item"]}>
                                <Text style={styles['test__meta-text']}>
                                    {`${index === exercise.blocks.length ? exercise.blocks.length: index + 1}/${exercise.blocks.length}`}
                                </Text>
                            </View>
                            {exercise.duration ? (
                                <View style={styles["test__meta-item"]}>
                                    <Text style={styles['test__meta-text']}>
                                        {formatSecondsAsTimer(exercise.duration * 60)}
                                    </Text>
                                </View>
                            ) : null}
                        </View>
                        {state.showFinish ? (
                            <QuizFinish 
                                onReset={resetTest} 
                                courseId={courseId}
                                chapter={chapter}
                            />
                        ) : (
                        <>
                            { (!state.loaded) ? <Preloader /> : null}
                            {(state.loaded &&
                                exercise.blocks &&
                                exercise.blocks[index] &&
                                exercise.blocks[index].meta_data &&
                                exercise.blocks[index].meta_data.answers &&
                                exercise.blocks[index].meta_data.answers.length
                            ) ? (
                                    <Fragment>
                                        <View style={styles['test__question']}>
                                            {exercise.blocks[index].meta_data.question ? (
                                                <Text style={styles['test__question-text']}>
                                                    {exercise.blocks[index].meta_data.question}
                                                </Text>
                                            ) : null}
                                            {exercise.blocks[index].data ? (
                                                <Image
                                                    style={styles['test__question-image']}
                                                    resizeMode="contain"
                                                    // auto={true}
                                                    source={exercise.blocks[index].data}
                                                />
                                            ) : (
                                                <View style={styles['test__question-placeholder']}>
                                                    <FontAwesome 
                                                        name="question" 
                                                        style = {styles['test__question-placeholder-icon']}/>
                                                </View>
                                            )}
                                        </View>

                                        <View style={styles['test__answers']}>
                                            {exercise.blocks[index].meta_data.answers.map((answer, key) => {
                                                const showResult = state.showResult && state.showResult === answer;
                                                const isCorrect = answer.isTrue;
                                                return (
                                                    <TouchableOpacity
                                                        key={key}
                                                        style={[
                                                            styles["test__answer-item"],
                                                            ...(showResult ? (
                                                                isCorrect
                                                                    ? [styles["test__answer-item_green"]]
                                                                    : [styles["test__answer-item_red"]]
                                                            ) : []
                                                            )
                                                        ]}
                                                        onPress={() => {
                                                            _clickAnswer(answer)
                                                        }}
                                                    >
                                                        <Text style={styles['test__answer-text']}>{answer.value}</Text>
                                                        {showResult && (
                                                            isCorrect
                                                                ? <FontAwesome name="check" style={[styles['test__answer-icon'], styles['test__answer-icon_correct']]} />
                                                                : <FontAwesome name="times" style={[styles['test__answer-icon'], styles['test__answer-icon_wrong']]} />
                                                        )}
                                                    </TouchableOpacity>
                                                )
                                            })}
                                        </View>
                                    </Fragment>
                                ) : null}
                        </>
                        )}
                        
                    </ScrollView>
                )}
                
            </MainLayout>
        )
};

export default Logic(Quiz)
