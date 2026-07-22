import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Solis — Backend Systems for Clinics & Service Businesses" },
      {
        name: "description",
        content:
          "Solis builds the backend systems behind clinics, med spas and service businesses — instant lead response, automated follow-up, no-show recovery and revenue reporting. Get a free systems audit.",
      },
      {
        name: "keywords",
        content:
          "clinic systems, med spa automation, speed to lead, booking automation, no-show recovery, revenue operations, GoHighLevel, service business systems",
      },
      { name: "robots", content: "index, follow" },
      { name: "author", content: "Solis Acquisition" },
      { name: "theme-color", content: "#0a0c10" },
      { name: "apple-mobile-web-app-title", content: "Solis" },
      // Open Graph
      { property: "og:site_name", content: "Solis Acquisition" },
      { property: "og:title", content: "Solis — Backend Systems for Clinics & Service Businesses" },
      {
        property: "og:description",
        content:
          "The backend systems that make sure a clinic never loses a customer to slow response, no-shows or poor follow-up. Get a free 2-minute systems audit.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://solisacquisition.com" },
      { property: "og:locale", content: "en_GB" },
      { property: "og:image", content: "https://solisacquisition.com/og-image.png" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      // Twitter
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Solis — Backend Systems for Clinics & Service Businesses" },
      {
        name: "twitter:description",
        content:
          "The backend systems that make sure a clinic never loses a customer to slow response, no-shows or poor follow-up. Get a free 2-minute systems audit.",
      },
      { name: "twitter:image", content: "https://solisacquisition.com/og-image.png" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "canonical", href: "https://solisacquisition.com" },
      { rel: "icon", href: "/favicon.ico?v=2", type: "image/x-icon" },
      { rel: "apple-touch-icon", href: "/icon-192.png" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap",
      },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ProfessionalService",
          name: "Solis Acquisition",
          description:
            "Backend systems and revenue operations for clinics, med spas and service businesses.",
          url: "https://solisacquisition.com",
          areaServed: "GB",
          serviceType: [
            "Speed-to-lead systems",
            "Workflow automation",
            "No-show recovery",
            "Reporting & revenue intelligence",
          ],
        }),
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
      <Outlet />
    </QueryClientProvider>
  );
}
