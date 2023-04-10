import { IssueResponse } from "../types";
import { getIssues } from "../services/issues";
import { useInfiniteQuery } from "react-query";
import { useToast } from "@chakra-ui/react";

export const useIssues = ({
  page,
  q,
  enabled,
}: {
  page: number;
  q: string;
  enabled: boolean;
}) => {
  const toast = useToast();
  const query = useInfiniteQuery<IssueResponse | undefined, Error>({
    queryKey: ["issues", { q }],
    queryFn: ({ signal, pageParam = page }) =>
      getIssues({ page: pageParam, q, signal }),
    onError: (error: Error) => {
      toast({
        title: error.message,
        status: "error",
      });
    },
    getNextPageParam: (lastPage) => lastPage?.next,
    enabled,
  });

  return { ...query };
};
