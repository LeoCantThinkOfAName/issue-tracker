/* AJAX function for getting user's data
   Since the function is called right after we acquired access_token
   I figured it will be safer to pass the token as an argument instead using it from localStorage */
import { API_BASE_URL } from "../constants";
import { User } from "../types";

export const getAuthUser = async (token: string) => {
  try {
    const response: Promise<User> = fetch(`${API_BASE_URL}/user`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/vnd.github+json",
        "X-GitHub-Api-Version": "2022-11-28",
      },
    }).then((res) => res.json());
    return { error: null, response: await response };
  } catch (error) {
    console.error(error);
    return { error: error as Error, response: null };
  }
};
