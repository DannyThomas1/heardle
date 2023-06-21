import { authMiddleware } from "@clerk/nextjs/server";

export default authMiddleware({
  publicRoutes: ["/", "/api/cron", "/api/trpc/songs.todaysSong"],
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};

// matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
