-- DropForeignKey
ALTER TABLE "UserStats" DROP CONSTRAINT "UserStats_song_id_fkey";

-- AddForeignKey
ALTER TABLE "UserStats" ADD CONSTRAINT "UserStats_song_id_fkey" FOREIGN KEY ("song_id") REFERENCES "Songs"("id") ON DELETE CASCADE ON UPDATE CASCADE;
