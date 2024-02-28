// import RNFetchBlob from 'rn-fetch-blob'
import * as FileSystem from 'expo-file-system';
//const dirs = RNFetchBlob.fs.dirs;
import AsyncStorage from "@react-native-async-storage/async-storage"
import _ from 'underscore';

//100 kb
const MIN_VIDEO_SIZE = 1000* 1000 * 1;

export const downloadFile = (url, path, progress, cb) => new Promise(async (resolve,reject)=>{
    // console.log("downloadFile: url=>",url," path=>",path)
    let throttleProgress
    const downloadResumable = FileSystem.createDownloadResumable(
        url,
        path,
        {},
        (downloadProgress)=>{
            if(progress){
                if (!throttleProgress) {
                    throttleProgress = _.throttle(progress, 1000)
                    // console.log("set new Func", throttleProgress);
                } 
                throttleProgress(downloadProgress.totalBytesWritten / downloadProgress.totalBytesExpectedToWrite)
            }
        }
    );
    try {
        downloadResumable.downloadAsync().then(async (downloadData)=>{
            // console.log("data downloaded ",downloadData," checkFile===> ",checkFile);
            if(downloadData && downloadData.uri){
                let fileData = await FileSystem.getInfoAsync(downloadData.uri, {})
                // console.log("downloadAsync success ",fileData);
                if(fileData && fileData.exists && fileData.size && fileData.size > MIN_VIDEO_SIZE){
                    // console.log("downloadAsync file ok ",fileData);
                    resolve()
                }else{
                    // console.log("downloadAsync file too small or not exists ",fileData);
                    reject();
                }
            }else{
                // console.log("downloadAsync no data ",fileData);
                reject();
            }
        });
        // resolve();
    } catch (e) {
        console.error(e);
        reject();
    }
});



export const removeTraining = (id, type="training") => new Promise(async (resolve,reject)=>{
    // console.log('removeTraining ',id)
    let filesInDirectory = await FileSystem.readDirectoryAsync(FileSystem.documentDirectory);
    // console.log("filesInDirectory ",filesInDirectory);

    let promiseArr = [];
    promiseArr = filesInDirectory.filter((file)=>{
        if(file.indexOf('training-video-'+id) !==-1){
            return true
        }
        return false;
    }).map((file, fileId)=> new Promise(async (resolve)=>{
        // console.log("removing file ",file);
        await FileSystem.deleteAsync(FileSystem.documentDirectory+file, {idempotent:true});
        resolve();
    }))
    await Promise.all(promiseArr);
    await AsyncStorage.removeItem("training-"+id);

    resolve();
});
export const checkLoaded = (id, type="training", currentVersion=0)=>new Promise(async (resolve, reject)=>{
    let loaded = await AsyncStorage.getItem(type+"-"+id);

    if(loaded && loaded == currentVersion){
        return resolve(true);
    }else{
        return resolve(false);
    }
});

export const getPath = (id, block_id, type="training") => {
    // console.log("getPath ",id,block_id,type);
    if(type=="training"){
        // console.log("url = ",(FileSystem.documentDirectory + 'training-video-'+id+"-"+block_id+".mp4"));
        return FileSystem.documentDirectory + 'training-video-'+id+"-"+block_id+".mp4";
    }else{
        // console.log("unknown type....");
        return "";
    }
};

export const checkFile = async (fileUrl)=>{
    let fileData = await FileSystem.getInfoAsync(fileUrl, {})
    // console.log("fileData ",fileData);
    if(fileData && fileData.exists && fileData.size && fileData.size > MIN_VIDEO_SIZE){
        return fileData;
    }
    return false;
};

export const minProgress = (progressDict) => {
    let min = 1;
    for(let i in progressDict){
        if(progressDict[i]<min){
            min = progressDict[i];
        }
    }
    return min;
};
export const downloadTraining = (training, progress, promiseCb) => new Promise(async (resolve,reject)=>{
    // console.log("downloadTraining ",training);
    let loaded = await checkLoaded(training._id,"training", training.__v);

    let filesInDirectory = await FileSystem.readDirectoryAsync(FileSystem.documentDirectory);
    // console.log("filesInDirectory ",filesInDirectory);
    
    if(loaded){
        return resolve();
    }
    let promiseArr = [];
    promiseArr = filesInDirectory.filter((file)=>{
        if(file.indexOf('training-video-'+training._id) !==-1){
            return true
        }
        return false;
    }).map((file, fileId)=> new Promise(async (resolve)=>{
        // console.log("removing file ",file);
        
        await FileSystem.deleteAsync(FileSystem.documentDirectory+file, {idempotent:true});
        resolve();
    }))

    
    await Promise.all(promiseArr);
    
    // console.log("download training ",training);
    let files = [];
    if(training && training.blocks && training.blocks.length){
        training.blocks.forEach((w)=>{
            if(w && w.data){
                files.push({
                    _id:w._id,
                    url:w.data
                });
            }
        })
    }
    // console.log("files before download => ",files);
    let progressDict = {};
    let downloads = []
    promiseArr = files.map((file, fileId)=> new Promise(async (resolve)=>{
        // console.log("DOWLOAD FILE ",file)
        
        try{
            downloadResumable = await downloadFile(
                file.url,
                // "https://ya.ru",
                FileSystem.documentDirectory + 'training-video-'+training._id+"-"+file._id+".mp4",
                (progressValue)=>{
                    progressDict[file._id] = progressValue;
                    if(progress){
                        // console.log("progress...");
                        progress(minProgress(progressDict))
                    }
                // console.log("progressDict ",progressDict,"  min=",minProgress(progressDict));
                }
            );
            // console.log("downloadResumable <<<<", "DOWNLOAD DONE!!!!",">>>>>>");
            resolve();
        }catch(e){
            resolve();
        }
        // downloads.push(downloadResumable)
    }));

    if(promiseCb){
        promiseCb(downloads)
    }
    
    await Promise.all(promiseArr);
    // console.log("setting training");

    let v = await AsyncStorage.getItem("training-"+training._id );
    if(v=="-1" || v==-1){
        // console.log("-1-1-1-1-1-1-1-1-1-1-1-1")
        await AsyncStorage.removeItem("training-"+training._id );
        // await AsyncStorage.setItem("training-"+training._id,""+(training.__v) );
    }else{
        // console.log("setting _v ",training.__v);
        await AsyncStorage.setItem("training-"+training._id,""+(training.__v) );
    }
    resolve();
})