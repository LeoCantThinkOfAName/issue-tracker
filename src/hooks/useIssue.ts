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
    // construct queryKey with detailed information (number, repo, owner) to be more specific
    queryKey: ["issue", { number, repo, owner }],
    // the signal thing is for aborting AJAX function if the component unmount
    // a feature from AbortController if you ever interested
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
