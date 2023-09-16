-- CreateTable
CREATE TABLE "Employee" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nom" TEXT NOT NULL,
    "prenom" TEXT NOT NULL,
    "service" TEXT NOT NULL,
    "pc_bureau" TEXT NOT NULL,
    "pc_bureau_marque" TEXT NOT NULL,
    "pc_bureau_model" TEXT NOT NULL,
    "pc_bureau_ns" TEXT NOT NULL,
    "pc_bureau_immo" TEXT NOT NULL,
    "pc_bureau_se" TEXT NOT NULL,
    "pc_bureau_ram" TEXT NOT NULL,
    "pc_bureau_etat" TEXT NOT NULL,
    "pc_portable" TEXT NOT NULL,
    "pc_portable_marque" TEXT NOT NULL,
    "pc_portable_model" TEXT NOT NULL,
    "pc_portable_ns" TEXT NOT NULL,
    "pc_portable_immo" TEXT NOT NULL,
    "pc_portable_se" TEXT NOT NULL,
    "pc_portable_ram" TEXT NOT NULL,
    "pc_portable_etat" TEXT NOT NULL,
    "imprimante_multifonctions" TEXT NOT NULL,
    "imprimante_multi_marque" TEXT NOT NULL,
    "imprimante_multi_model" TEXT NOT NULL,
    "imprimante_multi_ns" TEXT NOT NULL,
    "imprimante_multi_immo" TEXT NOT NULL,
    "imprimante_multi_type_config" TEXT NOT NULL,
    "imprimante_multi_adresse_ip" TEXT NOT NULL,
    "imprimante_multi_etat" TEXT NOT NULL,
    "imprimante_simple" TEXT NOT NULL,
    "imprimante_simple_marque" TEXT NOT NULL,
    "imprimante_simple_model" TEXT NOT NULL,
    "imprimante_simple_ns" TEXT NOT NULL,
    "imprimante_simple_immo" TEXT NOT NULL,
    "imprimante_simple_type_config" TEXT NOT NULL,
    "imprimante_simple_adresse_ip" TEXT NOT NULL,
    "imprimante_simple_etat" TEXT NOT NULL,
    "imprimante_thermique" TEXT NOT NULL,
    "imprimante_thermique_marque" TEXT NOT NULL,
    "imprimante_thermique_model" TEXT NOT NULL,
    "imprimante_thermique_ns" TEXT NOT NULL,
    "imprimante_thermique_immo" TEXT NOT NULL,
    "imprimante_thermique_type_config" TEXT NOT NULL,
    "imprimante_thermique_adresse_ip" TEXT NOT NULL,
    "imprimante_thermique_etat" TEXT NOT NULL,
    "scanner" TEXT NOT NULL,
    "adresse_ip" TEXT NOT NULL,
    "securisation" TEXT NOT NULL,
    "date_ajout" TEXT NOT NULL,
    "ajoute_par" TEXT NOT NULL,
    "date_modif" TEXT NOT NULL,
    "modifie_par" TEXT NOT NULL
);
