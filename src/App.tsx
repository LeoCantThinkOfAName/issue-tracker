import { Box, ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { AuthContextProvider } from "./contexts/AuthContext";
import { FC } from "react";
import { IssueDetail } from "./pages/IssueDetail";
import { IssueList } from "./pages/IssueList";
import { LoginModal } from "./components/LoginModal";
import { PATHS } from "./routes";
import { QueryClientProvider } from "react-query";
import { ReposList } from "./pages/ReposList";
import { queryClient } from "./services/client";

const App: FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider
        toastOptions={{
          defaultOptions: {
            position: "top",
          },
        }}
      >
        <AuthContextProvider>
          <Box p="4" maxW="2xl" mx="auto" h="100%">
            <BrowserRouter>
              <Routes>
                <Route element={<IssueDetail />} path={PATHS.ISSUE} />
                <Route element={<IssueList />} path={PATHS.REPO} />
                <Route element={<ReposList />} path={PATHS.HOME} />
              </Routes>
              <LoginModal />
            </BrowserRouter>
          </Box>
        </AuthContextProvider>
      </ChakraProvider>
    </QueryClientProvider>
  );
};

export default App;
