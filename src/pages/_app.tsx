import "@fall-out/react-calendar/dist/Calendar.css";
import ScreenLayout from "@/components/layout/ScreenLayout";
import "@/styles/globals.css";
import type {AppProps} from "next/app";
import {StoreProvider} from "easy-peasy";
import store from "@/store";
import {useRouter} from "next/router";

export default function App({Component, pageProps}: AppProps) {
  const router = useRouter();

  return (
    <StoreProvider store={store}>
      {router.pathname == "/login" ? (
        <Component {...pageProps} />
      ) : (
        <ScreenLayout>
          <Component {...pageProps} />
        </ScreenLayout>
      )}
    </StoreProvider>
  );
}
