package com.thehustleapp;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import java.io.InputStream;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.WritableMap;

import org.apache.commons.io.IOUtils;

import org.json.JSONObject;
import org.json.JSONTokener;
public class WhiteLabel extends ReactContextBaseJavaModule {

    private ReactContext reactContext;

    WhiteLabel(ReactApplicationContext context) {
        super(context);
        this.reactContext = context;
    }

    @Override
    public String getName() {
        return "WhiteLabel";
    }

    @ReactMethod
    public void getConfig(final Promise promise) throws Exception {
        try(InputStream is = reactContext.getResources().openRawResource(R.raw.whitelabel);) {
            String json = IOUtils.toString(is, "UTF-8");
            JSONObject jsonObject = new JSONObject(new JSONTokener(json));
            WritableMap gurucanConfig = JsonConvert.jsonToReact(jsonObject);
            promise.resolve(gurucanConfig);
        } catch (Exception e){
            promise.reject("GET_CONFIG_ERROR", e.getMessage(), e);
        }
    }
}
