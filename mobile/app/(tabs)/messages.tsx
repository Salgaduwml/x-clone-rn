import {
  View,
  Text,
  Alert,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Image,
  Modal,
} from "react-native";
import React, { useState } from "react";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { CONVERSATIONS, ConversationType } from "@/data/conversations";
import { Feather } from "@expo/vector-icons";

const MessagesScreen = () => {
  const insets = useSafeAreaInsets();

  const [searchText, setSearchText] = useState<string>("");
  const [conversationList, setConversationList] =
    useState<ConversationType[]>(CONVERSATIONS);
  const [selectedConversation, setSelectedConversation] =
    useState<ConversationType | null>(null);
  const [isChatOpen, setIsChatOpen] = useState<boolean>(false);
  const [newMessage, setNewMessage] = useState<string>("");

  const deleteConversation = (conversationId: number) => {
    Alert.alert(
      "Delete Conversation",
      "Are you sure you want to delete this conversation?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            setConversationList((prev) =>
              prev.filter((conversation) => conversation.id !== conversationId)
            );
          },
        },
      ]
    );
  };

  const openConversation = (conversation: ConversationType) => {
    setSelectedConversation(conversation);
    setIsChatOpen(true);
  };

  const closeChatModel = () => {
    setIsChatOpen(false);
    setSelectedConversation(null);
    setNewMessage("");
  };

  const sendMessage = () => {
    if (newMessage.trim() && selectedConversation) {
      setConversationList((prev) =>
        prev.map((conv) =>
          conv.id === selectedConversation.id
            ? { ...conv, lastMessage: newMessage, time: "now" }
            : conv
        )
      );
      setNewMessage("");
      Alert.alert(
        "Message Sent",
        `Your message has been sent to ${selectedConversation.user.name}`
      );
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white" edges={["top"]}>
      {/* Header */}
      <View className="flex-row items-center justify-between px-5 py-3 border-b border-gray-100">
        <Text className="text-xl font-bold text-gray-900">Messages</Text>
        <TouchableOpacity>
          <Feather name="edit" size={24} color="#1da1f2" />
        </TouchableOpacity>
      </View>
      {/* Search Bar */}
      <View className="px-5 py-3 border-b border-gray-100">
        <View className="flex-row items-center bg-gray-100 rounded-full px-5 py-2">
          <Feather name="search" size={20} color="#657786" />
          <TextInput
            placeholder="Search for people and groups"
            className="flex-1 ml-3 text-base"
            placeholderTextColor="#657786"
            value={searchText}
            onChangeText={setSearchText}
          />
        </View>
      </View>

      {/* Conversation List */}
      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 100 + insets.bottom,
        }}
      >
        {conversationList.map((conversation) => (
          <TouchableOpacity
            key={conversation.id}
            className="flex-row items-center px-5 py-4 border-b border-gray-50 active:border-gray-50"
            onPress={() => openConversation(conversation)}
            onLongPress={() => deleteConversation(conversation.id)}
          >
            <Image
              source={{ uri: conversation.user.avatar }}
              className="size-12 rounded-full mr-3"
            />
            <View className="flex-1">
              <View className="flex-row items-center justify-between">
                <View className="flex-row items-center mb-0.5">
                  <Text className="text-lg font-bold text-gray-900">
                    {conversation.user.name}
                  </Text>
                  <Text className="text-sm font-bold text-gray-500 ml-2">
                    @{conversation.user.username}
                  </Text>
                  {/* {conversation.user.verified && (
                  <Feather
                    name="check-circle"
                    size={14}
                    color="#1da1f2"
                    className="ml-2"
                  />
                )} */}
                </View>
                <Text className="text-gray-500 text-sm">
                  {conversation.time}
                </Text>
              </View>
              <Text className="text-gray-500 text-base line-clamp-1">
                {conversation.lastMessage}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View className="px-4 py-2 border-t border-gray-100 bg-gray-50">
        <Text className="text-sm text-gray-500 text-center">
          Tap to open - Long press to delete
        </Text>
      </View>

      <Modal
        visible={isChatOpen}
        onRequestClose={closeChatModel}
        animationType="slide"
        presentationStyle="pageSheet"
      >
        {selectedConversation && (
          <SafeAreaView className="flex-1">
            <View className="flex-row items-center px-5 py-3 border-b border-gray-100">
              <TouchableOpacity onPress={closeChatModel} className="mr-3">
                <Feather name="arrow-left" size={24} color="#1da1f2" />
              </TouchableOpacity>
              <Image
                source={{ uri: selectedConversation.user.avatar }}
                className="size-12 rounded-full mr-3"
              />
              <View className="flex-1">
                <View className="">
                  <Text className="font-bold text-lg text-gray-900 mr-1">
                    {selectedConversation.user.name}
                  </Text>
                  <Text className="text-sm text-gray-500">
                    @{selectedConversation.user.username}
                  </Text>
                </View>
              </View>
            </View>
            <ScrollView className="flex-1 px-5 py-4">
              <View className="mb-4">
                <Text className="text-center text-gray-400 text-base mb-4">
                  This is the beginning of your conversation with{" "}
                  {selectedConversation.user.name}.
                </Text>

                {/* converasation messages */}
                {selectedConversation.messages.map((message) => (
                  <View
                    key={message.id}
                    className={`flex-row mb-3 ${message.fromUser && "justify-end"}`}
                  >
                    {!message.fromUser && (
                      <Image
                        source={{ uri: selectedConversation.user.avatar }}
                        className="size-8 rounded-full mr-2"
                      />
                    )}
                    <View
                      className={`flex-1 ${message.fromUser && "items-end"}`}
                    >
                      <View
                        className={`rounded-2xl px-4 py-3 max-w-xs ${message.fromUser ? "bg-blue-500" : "bg-gray-100"}`}
                      >
                        <Text
                          className={`text-base ${message.fromUser ? "text-white" : "text-gray-900"}`}
                        >
                          {message.text}
                        </Text>
                      </View>
                      <Text className="text-xs text-gray-400 mt-1">
                        {message.time}
                      </Text>
                    </View>
                  </View>
                ))}
              </View>
            </ScrollView>

            {/* Message Input */}
            <View className="flex-row items-center px-5 py-3 border-t border-gray-100">
              <View className="flex-row flex-1 items-center bg-gray-100 rounded-full px-4 py-3 mr-3">
                <TextInput
                  placeholder="Type a message"
                  className="flex-1 text-base"
                  placeholderTextColor="#657786"
                  value={newMessage}
                  onChangeText={setNewMessage}
                  multiline
                />
              </View>
              <TouchableOpacity
                onPress={sendMessage}
                disabled={!newMessage.trim()}
                className={`size-10 rounded-full items-center justify-center ${newMessage.trim() ? "bg-blue-500" : "bg-gray-300"}`}
              >
                <Feather name="send" size={20} color="white" />
              </TouchableOpacity>
            </View>
          </SafeAreaView>
        )}
      </Modal>
    </SafeAreaView>
  );
};

export default MessagesScreen;
