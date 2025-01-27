import "./css/styles.css";

//routes import
import {
  createBrowserRouter,
  RouterProvider,
  ScrollRestoration,
} from "react-router";

//toastify
import { ToastContainer } from "react-toastify";

//context import
import { ConfigProvider } from "./context/config-context";

//components import
import Home from "@routes/home";
import Blog from "@routes/blog/blog";
import About from "@routes/about";
import Projects from "@routes/projects";
import Newsletter from "@routes/newsletter";

import Category from "@routes/blog/category";
import Author from "@routes/blog/author";
import Tag from "@routes/blog/tag";
import Post from "@routes/blog/post";

//react query imports
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import RootLayout from "./layout/layout";
import Error from "./routes/error";
import NotFound from "./routes/not-found";

//SEO
import { HelmetProvider } from "react-helmet-async";
import HOCPage from "./routes/hoc-page";

//react query client
const queryClient = new QueryClient();

//scroll to top
import ScrollToTop from "./components/scroll-top-top";
import { Suspense } from "react";
import LoadingSpinner from "./components/loading-spinner";

const routes = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <RootLayout />
        <ScrollRestoration />
      </>
    ),
    errorElement: <Error />,
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
        path: "about",
        element: <About />,
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
        path: "*",
        element: <NotFound />,
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
