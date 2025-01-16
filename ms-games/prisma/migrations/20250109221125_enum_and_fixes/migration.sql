/*
  Warnings:

  - The `genre` column on the `Games` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "Genre" AS ENUM ('ACTION', 'ADVENTURE', 'ROLE_PLAYING', 'SIMULATION', 'STRATEGY', 'SPORTS', 'PUZZLE', 'SHOOTER', 'ROGUELIKE', 'PLATFORMER', 'RACING', 'FIGHTING', 'SURVIVAL', 'HORROR', 'MMORPG', 'OPEN_WORLD');

-- AlterTable
ALTER TABLE "Games" ALTER COLUMN "rating" SET DEFAULT 0,
DROP COLUMN "genre",
ADD COLUMN     "genre" "Genre"[];
