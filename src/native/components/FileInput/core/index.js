import React from "react";
import {View, Text, Image, ImageBackground, TouchableOpacity} from "react-native";
import styles from "../styles";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import FilePickerWithUpload from "../../FilePickerWithUpload";
import Button from '../../Button';
import Preloader from '../../Preloader'
import Logic from '../logic'

const FileInput = ({ state, onFilePick, progressFile, onFileRemove , imgOnly , onImagePick, files, imageFormats, t}) => {
        return(
            <View style = {styles['file-input']}>
                <View style = {styles['file-input__list']}>
                    {state.loading && <Preloader/>}
                    {(files && files.length) ? files.map((file,key)=>
                        <View key = {key} style = {styles['file-input__item']}>
                            <View style = {styles['file-input__item-preview']}>
                                {
                                    imageFormats.includes(file.split('.').pop()) ? (
                                        <Image style = {styles['file-input__item-img']} source = {{uri:file}}/>
                                    ) : (
                                        <Text style = {styles['file-input__item-format']}>{file.split('.').pop()}</Text>
                                    )
                                }
                            </View>
                            <Text numberOfLines = {1} ellipsizeMode="head" style = {styles['file-input__item-text']}>{file.split('/').pop()}</Text>
                            {onFileRemove && (
                                <TouchableOpacity style={styles['file-input__item-remove']} activeOpacity = {0.7} onPress={() => onFileRemove(key)}>
                                    <FontAwesome style={styles['file-input__item-remove__icon']} name="trash-o"/>
                                </TouchableOpacity>)
                            }
                        </View>) : null}
                </View>
                {onFilePick && (
                    <FilePickerWithUpload onUpload={onFilePick} onPick={progressFile}>
                        <Button
                            title={t('app_basic:choose_file_button')}
                            theme="ghost-accent"
                            disabled={state.loading}
                        />
                    </FilePickerWithUpload>
                )}
            </View>);
}

export default Logic(FileInput)
