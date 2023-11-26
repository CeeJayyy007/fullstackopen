import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { NotificationContextProvider } from "./context/NotificationContext";
import { BlogContextProvider } from "./context/BlogContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <NotificationContextProvider>
      <BlogContextProvider>
        <App />
      </BlogContextProvider>
    </NotificationContextProvider>
  </QueryClientProvider>
);
