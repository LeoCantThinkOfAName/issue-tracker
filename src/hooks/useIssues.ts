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
  // we use useInfiniteQuery, because user should be able to keep load more data when scrolled to bottom
  const query = useInfiniteQuery<IssueResponse | undefined, Error>({
    // each query with different search terms need to have it's own queryKey
    // so we have to include `q` in the queryKey
    queryKey: ["issues", { q }],
    queryFn: ({ signal, pageParam = page }) =>
      getIssues({ page: pageParam, q, signal }),
    onError: (error: Error) => {
      toast({
        title: error.message,
        status: "error",
      });
    },
    // check out services/issues.ts to learn more
    getNextPageParam: (lastPage) => lastPage?.next,
    enabled,
  });

  return { ...query };
};
