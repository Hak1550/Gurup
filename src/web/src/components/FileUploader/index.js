import React from 'react';
import { connect } from 'react-redux';
import ReactDropzone from 'react-dropzone';

import { upload } from 'actions/misc';

import { applyModifiers } from 'utils';
import { withNamespaces } from 'react-i18next';

export const Dropzone = ({
    multiple,
    ...rest,
}) => (
    <ReactDropzone
        multiple={multiple || false}
        maxSize={10485760*3000} // 30000MB
        {...rest}
    />
)

const SmartDropzone = connect(null)(({
    onDrop,
    Tag = Dropzone,
    dispatch,
    onChange,
    onUploadProgress,
    onUploadStart,
    name,
    setInputProps,
    maxSize,
    t,
    url = "/misc/upload",
    index,
    type="default",
    multiple,
    withInfo,
    accept="",
    ...rest,
}) => (
    <Tag
        {...rest}
        accept={accept.includes("video/*") ? "video/mp4,video/x-m4v,video/*" : accept}
        multiple={multiple}
        maxSize = {maxSize}
        onDrop={(acceptedFiles, rejectedFiles = []) => {
            // console.log("ONDROP FILES", acceptedFiles, rejectedFiles, type)
            // console.log("MAX SIZE", maxSize)
            if(rejectedFiles && rejectedFiles.length){
                rejectedFiles.forEach(file => {
                    console.log("REJECTED FILE", file);
                    if (file.size > maxSize) {
                        dispatch({
                            type: 'ERROR',
                            code: t('large_file'),
                        });
                    } else {
                        dispatch({
                            type: 'ERROR',
                            code: 'FILE_UPLOAD_REJECTED',
                        });
                    }
                });
            } else {
                if (onUploadStart) {
                    onUploadStart();
                }
                dispatch(upload({
                    files: acceptedFiles,
                    onUploadProgress: (progress) => {
                        if (onUploadProgress){
                            onUploadProgress(progress, index)
                        }
                    },
                    url,
                    withInfo,
                })).then(res => {
                    // console.log("Dropzone ref", this.Dropzone);
                    console.log("FileUploader res", {name, value: multiple ? res.data.files : res.data.files[0]});
                    onChange({name, value: multiple ? res.data.files : res.data.files[0]}, index)
                } )
            }
        }}
    />
))

const StyledDropzone = ({
    Tag = Dropzone,
    className = '',
    modifiers = [],
    layout,
    style = {},
    ...rest,
}) => {
    if (layout) modifiers.push('layout_' + layout);
    return (
        <Tag {...rest} style={style} className={`${applyModifiers('file-uploader', modifiers)} ${className}`} />
    )
}

const CustomDropzone = ({
    tReady, i18nOptions, defaultNS, reportNS, ...rest,
}) => (
    <SmartDropzone Tag={StyledDropzone} {...rest} />
)

const Content = ({
    children
}) => (
    <div className="file-uploader__content">
        {children}
    </div>
)

CustomDropzone.Content = Content

export default withNamespaces("alerts")(CustomDropzone)
// export default CustomDropzone
