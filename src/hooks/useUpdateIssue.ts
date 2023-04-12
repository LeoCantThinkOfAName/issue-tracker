import { queryClient } from "../services/client";
import { updateIssue } from "../services/issue";
import { useMutation } from "react-query";
import { useToast } from "@chakra-ui/react";

// the only mutation (just a nerd's term for modify data) hook
export const useUpdateIssue = ({
  number,
  repo,
  owner,
}: {
  number: string | number;
  repo: string;
  owner: string;
}) => {
  const toast = useToast();
  return useMutation(updateIssue, {
    onError: (error: Error) => {
      toast({
        title: error.message,
        status: "error",
      });
    },
    onSuccess: (response) => {
      // here we modify the data from our cache, that can improve the performance
      // which means we don't have to make another request to reflect the change
      // since the API returns the latest state of the issue we can use it directly
      queryClient.setQueryData(["issue", { number, repo, owner }], response);
      toast({
        title: `Update issue: ${response.number} successfully`,
        status: "success",
      });
    },
  });
};
