import "@fall-out/react-calendar/dist/Calendar.css";
import ScreenLayout from "@/components/layout/ScreenLayout";
import "@/styles/globals.css";
import type {AppProps} from "next/app";

export default function App({Component, pageProps}: AppProps) {
  return (
    <ScreenLayout>
      <Component {...pageProps} />
    </ScreenLayout>
  );
}
