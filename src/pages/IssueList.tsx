import { ChangeEvent, FC, useEffect, useRef, useState } from "react";
import {
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  OrderedList,
  Spinner,
  Text,
} from "@chakra-ui/react";

import { IssueItem } from "../components/IssueItem";
import { SearchIcon } from "@chakra-ui/icons";
import { useAuth } from "../hooks/useAuth";
import { useIssues } from "../hooks/useIssues";
import { useParams } from "react-router-dom";

interface IssueListProps {}

export const IssueList: FC<IssueListProps> = () => {
  const { repo } = useParams();
  const inputTimout = useRef<NodeJS.Timeout>();
  const [q, setQ] = useState("");
  const { user } = useAuth();
  const { data, fetchNextPage, hasNextPage } = useIssues({
    page: 1,
    q: `${q} repo:${repo}`,
    enabled: !!user,
  });

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    const loadMore = (_e: Event) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        const root = document.querySelector("#root");
        if (window.scrollY === root!.clientHeight - window.innerHeight) {
          fetchNextPage();
        }
      }, 1000);
    };

    window.addEventListener("scroll", loadMore);
    return () => {
      window.removeEventListener("scroll", loadMore);
      clearTimeout(timeout);
      clearTimeout(inputTimout.current);
    };
  }, [fetchNextPage]);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    clearTimeout(inputTimout.current);
    inputTimout.current = setTimeout(() => {
      setQ(e.target.value);
    }, 1000);
  };

  return (
    <Flex flexDir="column" h="100%">
      <InputGroup>
        <InputLeftElement
          pointerEvents="none"
          children={<SearchIcon color="gray.300" />}
        />
        <Input type="text" placeholder="Search issues..." onChange={onChange} />
      </InputGroup>

      <OrderedList listStyleType="none" m="0" mt="4">
        {data?.pages.map((page) => {
          return page?.items.map((issue, index) => (
            <IssueItem index={index} issue={issue} key={issue.id} />
          ));
        })}
      </OrderedList>

      {data?.pages[0]?.items.length === 0 ? (
        <Flex h="100%" w="100%" justifyContent="center" alignItems="center">
          <Text>Empty</Text>
        </Flex>
      ) : null}
      {hasNextPage && (
        <Flex alignItems="center" justifyContent="center">
          <Spinner />
          <Text textAlign="center" ml="2">
            Loading...
          </Text>
        </Flex>
      )}
    </Flex>
  );
};
