import { postApi, useApiClient } from "@/utils/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const usePosts = (username?: string) => {
  const api = useApiClient();
  const queryClient = useQueryClient();

  const {
    data: postData,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: username ? ["userPosts", username] : ["posts"],
    queryFn: () =>
      username ? postApi.getUserPosts(api, username) : postApi.getPosts(api),
    select: (response) => response.data.posts,
  });

  const likePostMutation = useMutation({
    mutationFn: (postId: string) => postApi.likePost(api, postId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      if (username) {
        queryClient.invalidateQueries({ queryKey: ["userPosts", username] });
      }
    },
  });

  const deletePostMutaion = useMutation({
    mutationFn: (postId: string) => postApi.deletePost(api, postId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      if (username) {
        queryClient.invalidateQueries({ queryKey: ["userPosts", username] });
      }
    },
  });

  const checkIsLiked = (postLikes: string[], currentUser: any) => {
    const isLiked = currentUser && postLikes.includes(currentUser._id);
    return isLiked;
  };

  return {
    posts: postData || [],
    isLoading,
    error,
    refetch,
    toggleLike: (postId: string) => likePostMutation.mutate(postId),
    deletePost: (postId: string) => deletePostMutaion.mutate(postId),
    checkIsLiked,
  };
};
