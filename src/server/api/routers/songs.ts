import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const songRouter = createTRPCRouter({
  todaysSong: publicProcedure.query(async ({ ctx }) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const tomorrowDate = new Date();
    tomorrowDate.setDate(tomorrowDate.getDate() + 1);
    tomorrowDate.setHours(0, 0, 0, 0);

    const song = await ctx.prisma.songs.findFirst({
      where: {
        date_done: {
          gte: today,
          lt: tomorrowDate,
        },
        status: true,
      },
    });

    if (!song) throw new TRPCError({ code: "NOT_FOUND" });

    return song;
  }),
  getAll: publicProcedure
    .input(
      z.object({
        search: z.string(),
      })
    )
    .query(({ ctx, input }) => {
      console.log(input.search);
      return ctx.prisma.songs.findMany({
        take: 5,
        where: {
          name: {
            contains: input.search,
            mode: "insensitive",
          },
        },
        orderBy: {
          title: "asc",
        },
      });
    }),
});
