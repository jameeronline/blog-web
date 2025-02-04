import Header from "./header";
import Footer from "./footer";

import Error from "../routes/error";

import { useNavigation, useRouteError } from "react-router";
import { Outlet } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import { Spinner } from "../components/spinner";

const RootLayout = () => {
  const error = useRouteError();
  const navigation = useNavigation();

  const isLoading = navigation.state === "loading";

  return (
    <>
      <Header />
      <main className="w-full xl:container mx-auto px-4">
        {isLoading && (
          <motion.div
            className="h-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Spinner />
          </motion.div>
        )}
        {error && <Error />}
        {!error && !isLoading && (
          <AnimatePresence mode="wait">
            <motion.div
              className="h-full"
              key="content"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        )}
      </main>
      <Footer />
    </>
  );
};

export default RootLayout;
