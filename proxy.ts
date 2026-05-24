import { auth } from "@shared/auth/auth";

export default auth((req) => {
  const isLoggedIn = !!req.auth;
  const isLoginPage = req.nextUrl.pathname.startsWith("/login");

  const hasRefreshError = req.auth?.error === "RefreshAccessTokenError";

  if (!isLoggedIn || hasRefreshError) {
    if (!isLoginPage) {
      return Response.redirect(new URL("/login", req.url));
    }
  }

  if (isLoggedIn && !hasRefreshError && isLoginPage) {
    return Response.redirect(new URL("/books", req.url));
  }
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
