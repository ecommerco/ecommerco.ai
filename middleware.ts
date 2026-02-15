import { withAuth } from "next-auth/middleware";

const middleware = withAuth({
  pages: {
    signIn: "/login"
  }
});

export default middleware;

export const config = {
  matcher: ["/dashboard/:path*", "/orders/:path*", "/products/:path*", "/customers/:path*", "/analytics/:path*", "/settings/:path*"]
};
