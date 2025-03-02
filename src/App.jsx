import "./css/styles.css";

//routes import
import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
  ScrollRestoration,
} from "react-router";

//toastify
import { ToastContainer } from "react-toastify";

//context import
import { ConfigProvider } from "./context/config-context";

//routes components import
import Home from "@routes/home";
import Blog from "@routes/blog/blog";
import Page from "@/routes/page";
import Projects from "@routes/projects";
import Newsletter from "@routes/newsletter";

import Category from "@routes/blog/category";
import Author from "@routes/blog/author";
import Tag from "@routes/blog/tag";
import Post from "@routes/blog/post";

//react query imports
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

//status components
import RootLayout from "./layout/layout";
import Error from "./components/error";
import NotFound from "./routes/not-found";

//SEO
import { HelmetProvider } from "react-helmet-async";
import HOCPage from "./components/hoc/hoc-page";

//i118n

//error boundary
import { ErrorBoundary } from "react-error-boundary";

//react query client
const queryClient = new QueryClient();

//scroll to top
//import { Suspense } from "react";
//import LoadingSpinner from "./components/loading-spinner";

const routes = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <RootLayout />
        <ScrollRestoration />
      </>
    ),
    children: [
      {
        element: (
          <ErrorBoundary FallbackComponent={Error}>
            <Outlet />
          </ErrorBoundary>
        ),
        children: [
          {
            index: true,
            element: <Home />,
          },
          {
            path: "blog",
            children: [
              {
                index: true,
                element: <Blog />,
              },
              {
                path: "category",
                children: [
                  {
                    path: ":category",
                    element: <Category />,
                  },
                ],
              },
              {
                path: "author",
                children: [
                  {
                    path: ":author",
                    element: <Author />,
                  },
                ],
              },
              {
                path: "tag",
                children: [
                  {
                    path: ":tag",
                    element: <Tag />,
                  },
                ],
              },
            ],
          },
          {
            path: "post/:slug",
            element: <Post />,
          },
          {
            path: "projects",
            element: <Projects />,
          },
          {
            path: "newsletter",
            element: <Newsletter />,
          },
          {
            path: "hoc-page",
            element: <HOCPage />,
          },
          {
            path: "static",
            children: [
              {
                path: ":page_slug",
                element: <Page />,
              },
            ],
          },
          {
            path: "*",
            element: <NotFound />,
          },
        ],
      },
    ],
  },
]);

function App() {
  return (
    <>
      <HelmetProvider>
        <ConfigProvider>
          <QueryClientProvider client={queryClient}>
            <RouterProvider router={routes}></RouterProvider>
            <ToastContainer
              position="bottom-right"
              autoClose={5000}
              hideProgressBar
              newestOnTop={false}
              closeOnClick={false}
              closeButton={false}
              limit={1}
              rtl={false}
              pauseOnFocusLoss={false}
              draggable={false}
              pauseOnHover={false}
              theme="dark"
            />
          </QueryClientProvider>
        </ConfigProvider>
      </HelmetProvider>
    </>
  );
}

export default App;
