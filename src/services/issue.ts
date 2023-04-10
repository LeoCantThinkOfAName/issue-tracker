import { API_BASE_URL } from "../constants";
import { Issue } from "../types";
import { getToken } from "../utils/token";

export const getIssue = async ({
  owner,
  repo,
  number,
  signal,
}: {
  owner: string;
  repo: string;
  number: number | string;
  signal: AbortSignal | undefined;
}) => {
  const response: Promise<Issue> = fetch(
    `${API_BASE_URL}/repos/${owner}/${repo}/issues/${number}`,
    {
      method: "GET",
      headers: {
        Accept: "application/vnd.github+json",
        Authorization: `Bearer ${getToken()}`,
        "X-GitHub-Api-Version": "2022-11-28",
      },
      signal,
    },
  ).then((res) => res.json());
  return response;
};

export const updateIssue = async ({
  owner,
  repo,
  number,
  body,
}: {
  owner: string;
  repo: string;
  number: number | string;
  body: { [key: string]: string };
}) => {
  const response: Promise<Issue> = fetch(
    `${API_BASE_URL}/repos/${owner}/${repo}/issues/${number}`,
    {
      method: "PATCH",
      headers: {
        Accept: "application/vnd.github+json",
        Authorization: `Bearer ${getToken()}`,
        "X-GitHub-Api-Version": "2022-11-28",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    },
  ).then((res) => res.json());
  return response;
};
