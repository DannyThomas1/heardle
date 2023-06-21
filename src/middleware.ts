import { authMiddleware } from "@clerk/nextjs/server";

export default authMiddleware({
  publicRoutes: [
    "/",
    "/api/cron",
    "/api/trpc/songs.todaysSong",
    "/api/trpc/songs.getAll",
  ],
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};

// matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
