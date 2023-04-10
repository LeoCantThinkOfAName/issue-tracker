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
      // if token exist: check validity by fetching user data
      navigate("/", {
        replace: true,
      });

      const { error, response } = await getAuthUser(localToken);
      if (error) {
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

    if (!localToken) {
      // if token doesn't exist: keep modal open
      const code = new URL(window.location.href).searchParams.get("code");
      if (!code) return;
      setLoading(true);
      navigate("/", {
        replace: true,
      });

      const { error: tokenError, response: accessToken } = await getAccessToken(
        code,
      );

      if (tokenError) {
        return toast({
          title: (tokenError as Error).message,
          status: "error",
        });
      } else {
        setToken(accessToken);
        setLocalToken(accessToken!);
      }

      const { error: userError, response: user } = await getAuthUser(
        accessToken!,
      );

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
    if (!ignore) initialize();
    return () => {
      ignore = true;
    };
  }, [setLoading, initialize]);

  return { loading, token, user };
};
