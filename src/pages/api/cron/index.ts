import { type NextApiRequest, type NextApiResponse } from "next";
import { prisma } from "~/server/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const songs = await prisma.songs.findMany({
      where: {
        date_done: null,
        status: false,
      },
    });

    if (!songs.length) {
      console.log("No song list found");
      return res.status(500).json({ message: "No song list found" });
    }

    const song = songs[Math.floor(Math.random() * songs.length)] || songs[0];

    if (!song) {
      console.log("No songs found");
      return res.status(500).json({ message: "No songs found" });
    }

    await prisma.songs.update({
      where: {
        id: song.id,
      },
      data: {
        date_done: new Date(),
        status: true,
      },
    });

    return res.status(200).json({ message: "Song updated" });
  } catch (err) {
    console.log(err);
  }
}
