import "@fall-out/react-calendar/dist/Calendar.css";
import ScreenLayout from "@/components/layout/ScreenLayout";
import "@/styles/globals.css";
import type {AppProps} from "next/app";
import {StoreProvider} from "easy-peasy";
import store from "@/store";
import {useRouter} from "next/router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export default function App({Component, pageProps}: AppProps) {
  const router = useRouter();

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnMount: false,
        refetchOnWindowFocus: false,
      },
    },
  });

  return (
    <StoreProvider store={store}>
      <QueryClientProvider client={queryClient}>
        {router.pathname == "/login" ? (
          <Component {...pageProps} />
        ) : (
          <ScreenLayout>
            <Component {...pageProps} />
          </ScreenLayout>
        )}
      </QueryClientProvider>
    </StoreProvider>
  );
}
