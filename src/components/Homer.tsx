import React from "react";
import { Image, Dimensions } from "react-native";

export const Homer = ({ share = false }) => {
  const screenWidth = Dimensions.get("window").width;

  const imageWidth = screenWidth * (share ? 0.5 : 0.75);
  const imageAspectRatio = 233 / 200;
  const imageHeight = imageWidth / imageAspectRatio;

  return (
    <Image
      source={require("../app/assets/images/homer-simpson-doughnuts.png")}
      style={{ width: imageWidth, height: imageHeight }}
      resizeMode="contain"
      alt="Homer Simpson eating doughnuts"
    />
  );
};
