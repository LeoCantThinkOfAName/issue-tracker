import {
  getToken,
  removeToken,
  setToken as setLocalToken,
} from "../utils/token";
import { useCallback, useContext, useEffect, useState } from "react";

import { AuthContext } from "../contexts/AuthContext";
import { getAccessToken } from "../services/auth";
import { getAuthUser } from "../services/user";
import { useNavigate } from "react-router-dom";
import { useToast } from "@chakra-ui/react";

/**
 * the ignore flag just something dan abramov suggeted people can use to prevent useEffect runs twice in dev mode
 * https://github.com/facebook/react/issues/24502#issuecomment-1118867879
 */
let ignore = false;
export const useAuth = () => {
  const { token, setToken, user, setUser } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const toast = useToast();

  const initialize = useCallback(async () => {
    const localToken = getToken();

    // check if token exist in localStorage
    if (localToken) {
      setLoading(true);
      // always bring user to home page, because I'm too lazy to allows user to login on every page
      navigate("/", {
        replace: true,
      });

      // if token exist: check validity by fetching user data
      const { error, response } = await getAuthUser(localToken);
      // if getAuthUser throws errors
      if (error) {
        // show user an irritating toast notification and remove the expired token from localStorage
        toast({
          title: error.message,
          status: "error",
          description: "Please try again later",
        });
        removeToken();
      }
      // store user, app initialized
      setUser(response);
      setToken(localToken);
      setLoading(false);
    }

    // if there's no token in localStorage
    if (!localToken) {
      // check if there's ?code=xxx in the url
      const code = new URL(window.location.href).searchParams.get("code");
      // if no code presented in the url, abort the actions
      if (!code) return;
      // if code exist, proceed to token exchange
      setLoading(true);
      // same, just bring them to the home page
      navigate("/", {
        replace: true,
      });

      // attempt to get access_token
      const { error: tokenError, response: accessToken } = await getAccessToken(
        code,
      );

      // if exchange failed,
      if (tokenError) {
        // just show user an irritating toast notification
        return toast({
          title: (tokenError as Error).message,
          status: "error",
        });
      } else {
        // if we successfully got token, store it in localStorage for the next time
        // and set token into AuthContext for this session
        setToken(accessToken);
        setLocalToken(accessToken!);
      }

      // attempt to get user's info
      const { error: userError, response: user } = await getAuthUser(
        accessToken!,
      );

      // the rest is the same...
      if (userError) {
        return toast({
          title: userError.message,
          status: "error",
        });
      }
      // store user, app initialized
      setUser(user);
      setLoading(false);
    }
  }, [setToken, navigate, toast, setUser]);

  useEffect(() => {
    // this is where we kick start the authentication process
    if (!ignore) initialize();
    return () => {
      ignore = true;
    };
  }, [setLoading, initialize]);

  return { loading, token, user };
};
