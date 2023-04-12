// The function for exchange access token with code
import { APIResponse } from "../types";

export const getAccessToken = async (
  code: string,
): Promise<APIResponse<string>> => {
  return await fetch(
    `${process.env.REACT_APP_PROXY_URL}/https://github.com/login/oauth/access_token`,
    {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "X-GitHub-Api-Version": "2022-11-28",
      },
      body: JSON.stringify({
        client_id: process.env.REACT_APP_CLIENT_ID,
        client_secret: process.env.REACT_APP_CLIENT_SECRET,
        code,
      }),
    },
  )
    .then((res) => res.json())
    .then((res) => {
      if (res.error) throw new Error(res.error, res);
      return { error: null, response: res.access_token };
    })
    .catch((err) => {
      return { error: err as Error, response: null };
    });
};
