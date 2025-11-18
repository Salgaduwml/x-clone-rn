import { View, Text, ScrollView } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import SignOutButton from "@/components/SignOutButton";
import { useUserSync } from "@/hooks/useUserSync";
import { Ionicons } from "@expo/vector-icons";
import PostComposer from "@/components/PostComposer";
import PostList from "@/components/PostList";

const HomeScreen = () => {
  useUserSync();
  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-row justify-between items-center px-5 py-3 bprder-b border-gray-100">
        <Ionicons name="logo-twitter" size={24} color="#1da1f2" />
        <Text className="text-xl font-bold text-gray-900">Home</Text>
        <SignOutButton />
      </View>
      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 80 }}
      >
        <PostComposer />
        <PostList />
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
