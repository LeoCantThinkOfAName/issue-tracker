// setup file for react-query client
import { QueryCache, QueryClient } from "react-query";

export const queryCache = new QueryCache();
export const queryClient = new QueryClient({
  queryCache,
});
