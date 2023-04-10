import { Flex, Text } from "@chakra-ui/react";

import { FC } from "react";
import { RepositoryCard } from "../components/RepositoryCard";
import { useAuth } from "../hooks/useAuth";
import { useRepositories } from "../hooks/useRepositories";

interface ReposListProps {}

export const ReposList: FC<ReposListProps> = () => {
  const { user } = useAuth();
  const { data } = useRepositories(!!user);
  console.log(data);

  return (
    <Flex flexDir="column">
      <Text as="h1" fontSize="2xl" fontWeight="bold" textAlign="center" mb="5">
        All Repos
      </Text>
      <Flex flexWrap="wrap" justifyContent="space-around">
        {data?.map((repo) => (
          <RepositoryCard repo={repo} key={repo.id} />
        ))}
      </Flex>
    </Flex>
  );
};
