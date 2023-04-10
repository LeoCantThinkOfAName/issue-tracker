import { getRepositories } from "../services/repositories";
import { useQuery } from "react-query";
import { useToast } from "@chakra-ui/react";

export const useRepositories = (skip: boolean) => {
  const toast = useToast();
  const query = useQuery({
    queryKey: ["repositories"],
    queryFn: ({ signal }) => getRepositories(signal),
    onError: (error: Error) => {
      toast({
        title: error.message,
        status: "error",
      });
    },
    enabled: !skip,
  });
  return query;
};
