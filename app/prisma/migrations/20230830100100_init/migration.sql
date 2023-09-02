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
INSERT INTO "new_User" ("canAdd", "canDelete", "firstName", "id", "isAdmin", "lastName", "password", "username") SELECT "canAdd", "canDelete", "firstName", "id", "isAdmin", "lastName", "password", "username" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
