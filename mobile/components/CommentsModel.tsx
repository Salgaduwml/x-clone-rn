import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  ScrollView,
  Image,
  TextInput,
  ActivityIndicator,
} from "react-native";
import React from "react";
import { Post } from "@/types";
import { useComments } from "@/hooks/useComments";
import { formatDate } from "@/utils/formatters";
import { useCurrentUser } from "@/hooks/useCurrentUser";

interface CommentsModelProps {
  selectedPost: Post | null;
  onClose: () => void;
}

const CommentsModel = ({ selectedPost, onClose }: CommentsModelProps) => {
  const { currentUser } = useCurrentUser();
  const { commentText, setCommentText, createComment, isCreating } =
    useComments();

  const handleClose = () => {
    onClose();
    setCommentText("");
  };
  return (
    <Modal
      visible={!!selectedPost}
      animationType="slide"
      presentationStyle="pageSheet"
    >
      <View className="flex-row items-center justify-between px-5 py-3 border-b border-gray-100">
        <TouchableOpacity onPress={handleClose}>
          <Text className="text-blue-500 text-lg">Close</Text>
        </TouchableOpacity>
        <Text className="font-semibold text-lg">Comments</Text>
        <View className="w-12" />
      </View>
      {selectedPost && (
        <ScrollView className="flex-1">
          <View className="border-b border-gray-100 bg-white px-5 py-4">
            <View className="flex-row">
              <Image
                source={{ uri: selectedPost.user.profilePicture }}
                className="size-12 rounded-full mr-3"
              />
              <View className="flex-1">
                <View className="flex-row items-center justify-between mb-1">
                  <View className="flex-row items-center">
                    <Text className="font-bold text-gray-900 mr-1">
                      {selectedPost.user.firstName} {selectedPost.user.lastName}
                    </Text>
                    <Text className="text-gray-500 ml-1">
                      @{selectedPost.user.username} ·{" "}
                      {formatDate(selectedPost.createdAt)}
                    </Text>
                  </View>
                </View>
                {selectedPost.content && (
                  <Text className="text-gray-900 text-base leading-5 mb-3">
                    {selectedPost.content}
                  </Text>
                )}

                {selectedPost.image && (
                  <Image
                    source={{ uri: selectedPost.image }}
                    className="w-full h-48 rounded-2xl mb-3"
                    resizeMode="cover"
                  />
                )}
              </View>
            </View>
          </View>

          {/* Comment List */}
          {selectedPost.comments.map((comment) => (
            <View
              key={comment._id}
              className="border-b border-gray-100 bg-white px-5 py-4"
            >
              <View className="flex-row">
                <Image
                  source={{ uri: comment.user.profilePicture }}
                  className="size-10 rounded-full mr-3"
                />
                <View className="flex-1">
                  <View className="flex-row items-center mb-1">
                    <Text className="font-bold text-gray-900 mr-1">
                      {comment.user.firstName} {comment.user.lastName}
                    </Text>
                    <Text className="text-gray-500 ml-1">
                      @{comment.user.username}
                    </Text>
                  </View>
                  <Text className="text-gray-900 text-base leading-5 mb-2">
                    {comment.content}
                  </Text>
                </View>
              </View>
            </View>
          ))}

          {/* Add comments */}
          <View className="px-5 py-4 border-t border-gray-100">
            <View className="flex-row">
              <Image
                className="size-10 rounded-full mr-3"
                source={{ uri: currentUser?.profilePicture }}
              />
              <View className="flex-1">
                <TextInput
                  className="border border-gray-200 rounded-lg p-3 text-base mb-3"
                  placeholder="Write a comment..."
                  value={commentText}
                  onChangeText={setCommentText}
                  multiline
                  numberOfLines={3}
                  textAlignVertical="top"
                />
                <TouchableOpacity
                  className={`px-4 py-2 rounded-lg self-start ${commentText.trim() ? "bg-blue-500" : "bg-gray-300"}`}
                  onPress={() => createComment(selectedPost._id)}
                  disabled={isCreating || !commentText.trim()}
                >
                  {isCreating ? (
                    <ActivityIndicator size="small" color="white" />
                  ) : (
                    <Text
                      className={`font-semibold ${commentText.trim() ? "text-white" : "text-gray-500"}`}
                    >
                      Reply
                    </Text>
                  )}
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      )}
    </Modal>
  );
};

export default CommentsModel;
