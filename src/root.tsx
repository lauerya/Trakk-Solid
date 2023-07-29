// @refresh reload
import { Suspense } from "solid-js";
import {
  useLocation,
  A,
  Body,
  ErrorBoundary,
  FileRoutes,
  Head,
  Html,
  Meta,
  Routes,
  Scripts,
  Title,
} from "solid-start";
import "./root.css";
import {GlobalContextProvider} from "~/state";
import Navbar from "~/components/Navbar";
import {useNavigate} from "@solidjs/router";
import {supabase} from "~/supabase-client";

export default function Root() {
  const location = useLocation();
  const active = (path: string) =>
    path == location.pathname
      ? "border-sky-600"
      : "border-transparent hover:border-sky-600";


  const navigate = useNavigate()

  async function logout() {
    var result = await supabase.auth.signOut();
    navigate("/login", { replace: true })

    if (result.error){

    }else {
      navigate("/login", { replace: true })
    }
  }

  return (
    <Html lang="en">
      <Head>
        <Title>SolidStart - With TailwindCSS</Title>
        <Meta charset="utf-8" />
        <Meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Body>
        <Suspense>
          <ErrorBoundary>
            <GlobalContextProvider>
              <Navbar/>
            <Routes>
              <FileRoutes />
            </Routes>
            </GlobalContextProvider>
          </ErrorBoundary>
        </Suspense>
        <Scripts />
      </Body>
    </Html>
  );
}
