import { router, publicProcedure } from "../trpc";
import { z } from "zod";

export const postRouter = router({
  getPosts: publicProcedure
    .input(z.object({ take: z.number(), skip: z.number().optional() }))
    .query(async ({ ctx, input }) => {
      const { skip, take } = input;
      const data = await ctx.prisma.post.findMany({
        skip,
        take,
        include: {
          creator: {
            select: {
              name: true,
            },
          },
        },
      });
      return data;
    }),
});
