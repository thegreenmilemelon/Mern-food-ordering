import ReactDOM from "react-dom/client";
import AppRouter from "./AppRoutes";
import { BrowserRouter as Router } from "react-router-dom";
import "./global.css";
import Auth0ProviderWithNavigate from "./auth/Auth0ProviderWithNavigate";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Router>
    <QueryClientProvider client={queryClient}>
      <Auth0ProviderWithNavigate>
        <AppRouter />
      </Auth0ProviderWithNavigate>
    </QueryClientProvider>
  </Router>
);

