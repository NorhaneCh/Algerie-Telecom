/*
  Warnings:

  - You are about to alter the column `imprimante_multifonctions` on the `Employee` table. The data in that column could be lost. The data in that column will be cast from `String` to `Boolean`.
  - You are about to alter the column `imprimante_simple` on the `Employee` table. The data in that column could be lost. The data in that column will be cast from `String` to `Boolean`.
  - You are about to alter the column `imprimante_thermique` on the `Employee` table. The data in that column could be lost. The data in that column will be cast from `String` to `Boolean`.
  - You are about to alter the column `pc_bureau` on the `Employee` table. The data in that column could be lost. The data in that column will be cast from `String` to `Boolean`.
  - You are about to alter the column `pc_portable` on the `Employee` table. The data in that column could be lost. The data in that column will be cast from `String` to `Boolean`.
  - You are about to alter the column `scanner` on the `Employee` table. The data in that column could be lost. The data in that column will be cast from `String` to `Boolean`.
  - You are about to alter the column `securisation` on the `Employee` table. The data in that column could be lost. The data in that column will be cast from `String` to `Boolean`.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Employee" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nom" TEXT NOT NULL,
    "prenom" TEXT NOT NULL,
    "service" TEXT NOT NULL,
    "pc_bureau" BOOLEAN NOT NULL,
    "pc_bureau_marque" TEXT NOT NULL,
    "pc_bureau_model" TEXT NOT NULL,
    "pc_bureau_ns" TEXT NOT NULL,
    "pc_bureau_immo" TEXT NOT NULL,
    "pc_bureau_se" TEXT NOT NULL,
    "pc_bureau_ram" TEXT NOT NULL,
    "pc_bureau_etat" TEXT NOT NULL,
    "pc_portable" BOOLEAN NOT NULL,
    "pc_portable_marque" TEXT NOT NULL,
    "pc_portable_model" TEXT NOT NULL,
    "pc_portable_ns" TEXT NOT NULL,
    "pc_portable_immo" TEXT NOT NULL,
    "pc_portable_se" TEXT NOT NULL,
    "pc_portable_ram" TEXT NOT NULL,
    "pc_portable_etat" TEXT NOT NULL,
    "imprimante_multifonctions" BOOLEAN NOT NULL,
    "imprimante_multi_marque" TEXT NOT NULL,
    "imprimante_multi_model" TEXT NOT NULL,
    "imprimante_multi_ns" TEXT NOT NULL,
    "imprimante_multi_immo" TEXT NOT NULL,
    "imprimante_multi_type_config" TEXT NOT NULL,
    "imprimante_multi_adresse_ip" TEXT NOT NULL,
    "imprimante_multi_etat" TEXT NOT NULL,
    "imprimante_simple" BOOLEAN NOT NULL,
    "imprimante_simple_marque" TEXT NOT NULL,
    "imprimante_simple_model" TEXT NOT NULL,
    "imprimante_simple_ns" TEXT NOT NULL,
    "imprimante_simple_immo" TEXT NOT NULL,
    "imprimante_simple_type_config" TEXT NOT NULL,
    "imprimante_simple_adresse_ip" TEXT NOT NULL,
    "imprimante_simple_etat" TEXT NOT NULL,
    "imprimante_thermique" BOOLEAN NOT NULL,
    "imprimante_thermique_marque" TEXT NOT NULL,
    "imprimante_thermique_model" TEXT NOT NULL,
    "imprimante_thermique_ns" TEXT NOT NULL,
    "imprimante_thermique_immo" TEXT NOT NULL,
    "imprimante_thermique_type_config" TEXT NOT NULL,
    "imprimante_thermique_adresse_ip" TEXT NOT NULL,
    "imprimante_thermique_etat" TEXT NOT NULL,
    "scanner" BOOLEAN NOT NULL,
    "adresse_ip" TEXT NOT NULL,
    "securisation" BOOLEAN NOT NULL,
    "date_ajout" TEXT NOT NULL,
    "ajoute_par" TEXT NOT NULL,
    "date_modif" TEXT NOT NULL,
    "modifie_par" TEXT NOT NULL
);
INSERT INTO "new_Employee" ("adresse_ip", "ajoute_par", "date_ajout", "date_modif", "id", "imprimante_multi_adresse_ip", "imprimante_multi_etat", "imprimante_multi_immo", "imprimante_multi_marque", "imprimante_multi_model", "imprimante_multi_ns", "imprimante_multi_type_config", "imprimante_multifonctions", "imprimante_simple", "imprimante_simple_adresse_ip", "imprimante_simple_etat", "imprimante_simple_immo", "imprimante_simple_marque", "imprimante_simple_model", "imprimante_simple_ns", "imprimante_simple_type_config", "imprimante_thermique", "imprimante_thermique_adresse_ip", "imprimante_thermique_etat", "imprimante_thermique_immo", "imprimante_thermique_marque", "imprimante_thermique_model", "imprimante_thermique_ns", "imprimante_thermique_type_config", "modifie_par", "nom", "pc_bureau", "pc_bureau_etat", "pc_bureau_immo", "pc_bureau_marque", "pc_bureau_model", "pc_bureau_ns", "pc_bureau_ram", "pc_bureau_se", "pc_portable", "pc_portable_etat", "pc_portable_immo", "pc_portable_marque", "pc_portable_model", "pc_portable_ns", "pc_portable_ram", "pc_portable_se", "prenom", "scanner", "securisation", "service") SELECT "adresse_ip", "ajoute_par", "date_ajout", "date_modif", "id", "imprimante_multi_adresse_ip", "imprimante_multi_etat", "imprimante_multi_immo", "imprimante_multi_marque", "imprimante_multi_model", "imprimante_multi_ns", "imprimante_multi_type_config", "imprimante_multifonctions", "imprimante_simple", "imprimante_simple_adresse_ip", "imprimante_simple_etat", "imprimante_simple_immo", "imprimante_simple_marque", "imprimante_simple_model", "imprimante_simple_ns", "imprimante_simple_type_config", "imprimante_thermique", "imprimante_thermique_adresse_ip", "imprimante_thermique_etat", "imprimante_thermique_immo", "imprimante_thermique_marque", "imprimante_thermique_model", "imprimante_thermique_ns", "imprimante_thermique_type_config", "modifie_par", "nom", "pc_bureau", "pc_bureau_etat", "pc_bureau_immo", "pc_bureau_marque", "pc_bureau_model", "pc_bureau_ns", "pc_bureau_ram", "pc_bureau_se", "pc_portable", "pc_portable_etat", "pc_portable_immo", "pc_portable_marque", "pc_portable_model", "pc_portable_ns", "pc_portable_ram", "pc_portable_se", "prenom", "scanner", "securisation", "service" FROM "Employee";
DROP TABLE "Employee";
ALTER TABLE "new_Employee" RENAME TO "Employee";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
