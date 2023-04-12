// AJAX function for getting all repositories from the user

import { API_BASE_URL } from "../constants";
import { Repository } from "../types";
import { getToken } from "../utils/token";

export const getRepositories = async (signal: AbortSignal | undefined) => {
  const response: Promise<Repository[]> = fetch(`${API_BASE_URL}/user/repos`, {
    method: "GET",
    headers: {
      Accept: "application/vnd.github+json",
      Authorization: `Bearer ${getToken()}`,
      "X-GitHub-Api-Version": "2022-11-28",
    },
    signal,
  }).then((res) => res.json());
  return (await response).sort(
    (repoA, repoB) => repoB.open_issues_count - repoA.open_issues_count,
  );
};
