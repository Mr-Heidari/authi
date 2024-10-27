import NextAuth from "next-auth";
import authConfig from "./auth.config";
import {
  apiAuthPrefix,
  authRoutes,
  login_redirect_route,
  publicRoutes,
} from "./routes";

export const { auth } = NextAuth(authConfig);

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedin = !!req.auth;
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  if (isApiAuthRoute) return null;
 
  if (isAuthRoute) {
    if (isLoggedin) {
      return Response.redirect(new URL(login_redirect_route, nextUrl));
    }
    return null;
  }

  if (!isLoggedin && !isPublicRoute) {
    return Response.redirect(new URL("/login", nextUrl));
  }

  return null;
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
