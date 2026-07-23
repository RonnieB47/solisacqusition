import { QueryClient } from "@tanstack/react-query";
import { createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";

export const getRouter = () => {
  const queryClient = new QueryClient();

  const router = createRouter({
    routeTree,
    context: { queryClient },
    scrollRestoration: true,
    // The landing page controls its own scrolling via smoothScrollTo(). Leaving
    // hash-scroll-into-view on lets the router yank the page to whatever section
    // id is in the URL — which, combined with the scroll-spy, fought the user's
    // scroll (random jumps / getting stuck). Off = we own all scrolling.
    defaultHashScrollIntoView: false,
    defaultPreloadStaleTime: 0,
  });

  return router;
};
