import { getIssue } from "../services/issue";
import { useQuery } from "react-query";
import { useToast } from "@chakra-ui/react";

export const useIssue = ({
  enabled,
  number,
  owner,
  repo,
}: {
  enabled: boolean;
  number: number | string;
  owner: string;
  repo: string;
}) => {
  const toast = useToast();
  return useQuery({
    queryKey: ["issue", { number, repo, owner }],
    queryFn: ({ signal }) => getIssue({ number, owner, repo, signal }),
    onError: (error: Error) => {
      toast({
        title: error.message,
        status: "error",
      });
    },
    enabled,
  });
};
