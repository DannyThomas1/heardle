import { TRPCError } from "@trpc/server";
import { z } from "zod";
import {
  createTRPCRouter,
  privateProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const songRouter = createTRPCRouter({
  todaysSong: publicProcedure.query(async ({ ctx }) => {
    const song = await ctx.prisma.songs.findFirst({
      where: {
        status: true,
      },
      orderBy: {
        date_done: "desc",
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
      return ctx.prisma.songs.findMany({
        take: 10,
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
  submitScore: privateProcedure
    .input(
      z.object({
        songId: z.number(),
        score: z.number(),
        success: z.boolean(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.userId;

      const score = await ctx.prisma.userStats.create({
        data: {
          num_guesses: input.score,
          user_id: userId,
          song_id: input.songId,
          success: input.success,
        },
      });

      return score;
    }),
  getScores: privateProcedure.query(async ({ ctx }) => {
    const userId = ctx.userId;

    const scores = await ctx.prisma.userStats.groupBy({
      by: ["num_guesses"],
      where: {
        user_id: userId,
      },
      _count: {
        id: true,
      },
    });

    const wins = await ctx.prisma.userStats.count({
      where: {
        user_id: userId,
        success: true,
      },
    });

    const losses = await ctx.prisma.userStats.count({
      where: {
        user_id: userId,
        success: false,
      },
    });

    const totalGames = await ctx.prisma.userStats.count({
      where: {
        user_id: userId,
      },
    });

    return {
      totalGames,
      scores,
      wins,
      losses,
    };
  }),
});
