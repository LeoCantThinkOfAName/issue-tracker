import { API_BASE_URL } from "../constants";
import { IssueResponse } from "../types";
import { getToken } from "../utils/token";

export const getIssues = async ({
  page,
  q,
  signal,
}: {
  page: number;
  q: string;
  signal: AbortSignal | undefined;
}) => {
  const params = {
    per_page: 10,
    order: "desc",
    sort: "created",
    page,
    q: encodeURIComponent(q),
  } as const;

  const response: Promise<IssueResponse> = fetch(
    `${API_BASE_URL}/search/issues?` +
      Object.keys(params)
        .map((key) => `${key}=${params[key as keyof typeof params]}`)
        .join("&"),
    {
      method: "GET",
      headers: {
        Accept: "application/vnd.github+json",
        Authorization: `Bearer ${getToken()}`,
        "X-GitHub-Api-Version": "2022-11-28",
      },
      signal,
    },
  )
    .then((res) => res.json())
    .then((res) => ({
      ...res,
      next: res.items.length === 10 ? page + 1 : undefined,
    }));
  return response;
};
