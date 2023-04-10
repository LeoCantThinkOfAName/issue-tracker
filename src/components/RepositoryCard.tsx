import { Flex, Text } from "@chakra-ui/react";
import { Link, generatePath } from "react-router-dom";

import { FC } from "react";
import { PATHS } from "../routes";
import { Repository } from "../types";
import { issueCountColorMap } from "../utils/issueCountColorMap";

interface RepositoryCardProps {
  repo: Repository;
}

export const RepositoryCard: FC<RepositoryCardProps> = ({ repo }) => {
  return (
    <Link
      to={generatePath(PATHS.REPO, {
        repo: encodeURIComponent(repo.full_name),
      })}
    >
      <Flex
        boxShadow="md"
        p="2"
        rounded="md"
        h="150px"
        w="200px"
        mb="2"
        alignItems="center"
        justifyContent="center"
        flexDir="column"
        transition="all 0.3s ease-in-out"
        _hover={{
          boxShadow: "sm",
          transform: "scale(0.95)",
        }}
        bg={issueCountColorMap(repo.open_issues_count)}
      >
        <Text as="h2" fontSize="lg" fontWeight="bold">
          {repo.name}
        </Text>
        <Text>Open Issues: {repo.open_issues_count}</Text>
      </Flex>
    </Link>
  );
};
