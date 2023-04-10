import { Badge, Box, Divider, Flex, ListItem, Text } from "@chakra-ui/react";
import { Link, generatePath, useParams } from "react-router-dom";

import { FC } from "react";
import { Issue } from "../types";
import { PATHS } from "../routes";
import { stateColorMap } from "../utils/stateColorMap";

interface IssueItemProps {
  index?: number;
  issue: Issue;
}

export const IssueItem: FC<IssueItemProps> = ({ index = 0, issue }) => {
  const { repo } = useParams();
  return (
    <ListItem
      boxShadow="md"
      rounded="md"
      px="4"
      py="2"
      mb="3"
      transition="all 0.3s ease-in-out"
      _hover={{
        boxShadow: "sm",
      }}
      bg={index % 2 ? "gray.50" : "white"}
    >
      <Flex
        as={Link}
        to={generatePath(PATHS.ISSUE, {
          repo: encodeURIComponent(repo!),
          number: String(issue.number),
        })}
        flexDir="column"
        title="123"
      >
        <Flex alignItems="center" justifyContent="space-between" w="100%">
          <Flex alignItems="center">
            <Text as="h2" fontSize="lg" fontWeight="bold">
              {issue.title}
            </Text>
          </Flex>
          <Badge colorScheme={stateColorMap(issue.state)}>{issue.state}</Badge>
        </Flex>
        <Text color="gray.500" fontSize="xs">
          {new Date(issue.created_at).toLocaleDateString()}
        </Text>
        <Divider my="2" />
        <Box dangerouslySetInnerHTML={{ __html: issue.body! }} />
      </Flex>
    </ListItem>
  );
};
