import {
  Badge,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Textarea,
} from "@chakra-ui/react";
import { FC, useEffect, useState } from "react";

import { ChevronDownIcon } from "@chakra-ui/icons";
import { stateColorMap } from "../utils/stateColorMap";
import { useAuth } from "../hooks/useAuth";
import { useIssue } from "../hooks/useIssue";
import { useParams } from "react-router-dom";
import { useUpdateIssue } from "../hooks/useUpdateIssue";

interface IssueDetailProps {}

export const IssueDetail: FC<IssueDetailProps> = () => {
  const { user } = useAuth();
  const { repo, number } = useParams();
  const options = {
    repo: repo!.split("/")[1],
    number: number!,
    owner: user!.login!,
  };
  const { data } = useIssue({
    enabled: !!user,
    ...options,
  });
  const { mutate } = useUpdateIssue(options);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  useEffect(() => {
    if (data) {
      setTitle(data.title);
      setBody(data.body);
    }
  }, [setBody, setTitle, data]);

  const onToggleState = (state: "open" | "closed") => {
    mutate({
      ...options,
      body: {
        state,
      },
    });
  };

  const onSave = () => {
    mutate({
      ...options,
      body: {
        title,
        body,
      },
    });
  };

  return (
    <Flex h="100%" alignItems="center" justifyContent="center">
      <Flex boxShadow="md" w="100%" px="3" py="2" flexDir="column">
        <Flex mt="3" flexDir="column">
          <Flex alignItems="center" justifyContent="space-between">
            <FormControl mb="2">
              <FormLabel
                alignItems="center"
                justifyContent="space-between"
                w="100%"
                display="flex"
              >
                Title
                <Menu>
                  {() => (
                    <>
                      <Badge
                        as={MenuButton}
                        colorScheme={stateColorMap(data?.state)}
                      >
                        {data?.state}
                        <ChevronDownIcon />
                      </Badge>
                      <MenuList>
                        {data?.state === "open" && (
                          <MenuItem onClick={() => onToggleState("closed")}>
                            Close
                          </MenuItem>
                        )}
                        {data?.state === "closed" && (
                          <MenuItem onClick={() => onToggleState("open")}>
                            Open
                          </MenuItem>
                        )}
                      </MenuList>
                    </>
                  )}
                </Menu>
              </FormLabel>
              <Input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </FormControl>
          </Flex>
          <Textarea
            mb="2"
            minH="200px"
            value={body}
            onChange={(e) => setBody(e.target.value)}
          />
          <Flex my="1" justifyContent="end">
            <Button colorScheme="blue" mr="2" onClick={onSave}>
              Save
            </Button>
            <Button
              colorScheme="red"
              onClick={() => onToggleState("closed")}
              isDisabled={data?.state === "closed"}
            >
              Delete
            </Button>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};
