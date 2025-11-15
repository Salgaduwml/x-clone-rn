import { useState } from "react";
import {
  ActivityIndicator,
  Image,
  ImageBackground,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useSocialAuth } from "@/hooks/useSocialAuth";

export default function Index() {
  const { isLoading, handleSocialAuth } = useSocialAuth();
  return (
    <ImageBackground
      source={require("@/assets/images/welcome.png")}
      resizeMode="cover"
      className="flex-1"
    >
      <LinearGradient
        colors={[
          "rgba(0,0,0,0.5)",
          "transparent",
          "transparent",
          "transparent",
          "rgba(0,0,0,0.5)",
        ]}
        style={{
          flex: 1,
        }}
      >
        <StatusBar barStyle="light-content" />
        <View className="flex-1 justify-end p-5 pb-12">
          <View className="flex-col gap-4">
            <TouchableOpacity
              className="flex-row items-center justify-center bg-white border border-gray-300 rounded-full py-3 px-6 h-16"
              onPress={() => handleSocialAuth("oauth_google")}
              disabled={isLoading}
            >
              {isLoading ? (
                <ActivityIndicator size="small" color="black" />
              ) : (
                <View className="flex-row items-center justify-center">
                  <Image
                    source={require("@/assets/images/google.png")}
                    className="w-8 h-8 mr-3"
                    resizeMode="contain"
                  />
                  <Text className="text-black font-medium text-lg">
                    Continue with Google
                  </Text>
                </View>
              )}
            </TouchableOpacity>
            <TouchableOpacity
              className="flex-row items-center justify-center bg-white border border-gray-300 rounded-full py-3 px-6 h-16"
              onPress={() => handleSocialAuth("oauth_apple")}
              disabled={isLoading}
            >
              {isLoading ? (
                <ActivityIndicator size="small" color="black" />
              ) : (
                <View className="flex-row items-center justify-center">
                  <Image
                    source={require("@/assets/images/apple.png")}
                    className="w-8 h-8 mr-3"
                    resizeMode="contain"
                  />
                  <Text className="text-black font-medium text-lg">
                    Continue with Apple
                  </Text>
                </View>
              )}
            </TouchableOpacity>
          </View>
          {/* Terms and Privacy */}
          <Text className="text-center text-white/70 leading-6 max-w-sm mt-6 px-2 mx-auto">
            By signing up, you agree to our{" "}
            <Text className="text-blue-500 font-medium">Terms</Text>
            {" ,"}{" "}
            <Text className="text-blue-500 font-medium">Privacy Policy</Text>{" "}
            {", and"}{" "}
            <Text className="text-blue-500 font-medium">Cookie Use</Text>
          </Text>
        </View>
      </LinearGradient>
    </ImageBackground>
  );
}
