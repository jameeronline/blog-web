import "./css/styles.css";

//routes import
import { createBrowserRouter, RouterProvider } from "react-router";

//context import

//components import
import Home from "./routes/home";
import Blog from "./routes/blog";
import About from "./routes/about";
import Projects from "./routes/projects";
import Newsletter from "./routes/newsletter";

import Category from "./routes/category";
import Author from "./routes/author";
import Tag from "./routes/tag";
import Post from "./routes/post";

//react query imports
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import RootLayout from "./layout/layout";
import { DarkModeProvider } from "./context/darkmode-context";

const queryClient = new QueryClient();

const routes = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
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
    ],
  },
]);

function App() {
  return (
    <>
      <DarkModeProvider>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={routes}></RouterProvider>
        </QueryClientProvider>
      </DarkModeProvider>
    </>
  );
}

export default App;
