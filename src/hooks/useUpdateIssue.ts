import { queryClient } from "../services/client";
import { updateIssue } from "../services/issue";
import { useMutation } from "react-query";
import { useToast } from "@chakra-ui/react";

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
      queryClient.setQueryData(["issue", { number, repo, owner }], response);
      toast({
        title: `Update issue: ${response.number} successfully`,
        status: "success",
      });
    },
  });
};
