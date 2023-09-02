/*
  Warnings:

  - You are about to drop the column `canEdit` on the `User` table. All the data in the column will be lost.
  - Added the required column `canAdd` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `canDelete` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL DEFAULT '1234',
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "isAdmin" BOOLEAN NOT NULL DEFAULT false,
    "canAdd" BOOLEAN NOT NULL,
    "canDelete" BOOLEAN NOT NULL,
    "firstLog" BOOLEAN NOT NULL DEFAULT true
);
INSERT INTO "new_User" ("firstLog", "firstName", "id", "isAdmin", "lastName", "password", "username") SELECT "firstLog", "firstName", "id", "isAdmin", "lastName", "password", "username" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
