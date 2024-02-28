import React from "react";
import { Image } from "react-native";
import { connect } from "react-redux";
import { config } from "../../styles/variables";
import CacheImage from "../../components/CacheImage";
import { useCustomAppInfo } from "../../utils/hooks";

const Logo = ({ ...rest }) => {
  const { influencer, isCustomApp } = useCustomAppInfo();
  // console.log("INFLUENCER LOGO", influencer.logo, isCustomApp);
  return isCustomApp && influencer.logo ? (
    <CacheImage {...rest} source={influencer.logo} auto />
  ) : (
    <Image
      {...rest}
      style={{ width: 120, height: 120, borderRadius: 2, marginBottom: 20 }}
      source={require("../../assets/core/logo.png")}
    />
  );
};

export default Logo;
