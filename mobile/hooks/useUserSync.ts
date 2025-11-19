import { useApiClient, userApi } from "@/utils/api";
import { useAuth } from "@clerk/clerk-expo";
import { useMutation } from "@tanstack/react-query";
import { useEffect } from "react";

export const useUserSync = () => {
  const { isSignedIn } = useAuth();
  const api = useApiClient();

  const syncUserMutation = useMutation({
    mutationFn: () => userApi.syncUser(api),
    onError: (error: any) => console.log("Error syncing user", error),
  });

  useEffect(() => {
    if (isSignedIn && !syncUserMutation.data) syncUserMutation.mutate();
  }, [isSignedIn]);

  return null;
};
