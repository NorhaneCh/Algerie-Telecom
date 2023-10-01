import prisma from "../../../../lib/prisma";

interface RequestBody {
  id: number;
  nom: string;
  prenom: string;
  service: string;
  pc_bureau: string;
  pc_bureau_marque: string;
  pc_bureau_model: string;
  pc_bureau_ns: string;
  pc_bureau_immo: string;
  pc_bureau_se: string;
  pc_bureau_ram: string;
  pc_bureau_etat: string;
  pc_portable: string;
  pc_portable_marque: string;
  pc_portable_model: string;
  pc_portable_ns: string;
  pc_portable_immo: string;
  pc_portable_se: string;
  pc_portable_ram: string;
  pc_portable_etat: string;
  imprimante_multifonctions: string;
  imprimante_multi_marque: string;
  imprimante_multi_model: string;
  imprimante_multi_ns: string;
  imprimante_multi_immo: string;
  imprimante_multi_type_config: string;
  imprimante_multi_adresse_ip: string;
  imprimante_multi_etat: string;
  imprimante_simple: string;
  imprimante_simple_marque: string;
  imprimante_simple_model: string;
  imprimante_simple_ns: string;
  imprimante_simple_immo: string;
  imprimante_simple_type_config: string;
  imprimante_simple_adresse_ip: string;
  imprimante_simple_etat: string;
  imprimante_thermique: string;
  imprimante_thermique_marque: string;
  imprimante_thermique_model: string;
  imprimante_thermique_ns: string;
  imprimante_thermique_immo: string;
  imprimante_thermique_type_config: string;
  imprimante_thermique_adresse_ip: string;
  imprimante_thermique_etat: string;
  scanner: string;
  adresse_ip: string;
  securisation: string;
  date_ajout: string;
  ajoute_par: string;
  date_modif: string;
  modifie_par: string;
}

export async function PATCH(request: Request) {
  const body: RequestBody = await request.json();

  const updatedEmployee = await prisma.employee.update({
    where: {
      id: body.id,
    },
    data: {
      nom: body.nom,
      prenom: body.prenom,
      service: body.service,
      pc_bureau: body.pc_bureau,
      pc_bureau_marque: body.pc_bureau_marque,
      pc_bureau_model: body.pc_bureau_model,
      pc_bureau_ns: body.pc_bureau_ns,
      pc_bureau_immo: body.pc_bureau_immo,
      pc_bureau_se: body.pc_bureau_se,
      pc_bureau_ram: body.pc_bureau_ram,
      pc_bureau_etat: body.pc_bureau_etat,
      pc_portable: body.pc_portable,
      pc_portable_marque: body.pc_portable_marque,
      pc_portable_model: body.pc_portable_model,
      pc_portable_ns: body.pc_portable_ns,
      pc_portable_immo: body.pc_portable_immo,
      pc_portable_se: body.pc_portable_se,
      pc_portable_ram: body.pc_portable_ram,
      pc_portable_etat: body.pc_portable_etat,
      imprimante_multifonctions: body.imprimante_multifonctions,
      imprimante_multi_marque: body.imprimante_multi_marque,
      imprimante_multi_model: body.imprimante_multi_model,
      imprimante_multi_ns: body.imprimante_multi_ns,
      imprimante_multi_immo: body.imprimante_multi_immo,
      imprimante_multi_type_config: body.imprimante_multi_type_config,
      imprimante_multi_adresse_ip: body.imprimante_multi_adresse_ip,
      imprimante_multi_etat: body.imprimante_multi_etat,
      imprimante_simple: body.imprimante_simple,
      imprimante_simple_marque: body.imprimante_simple_marque,
      imprimante_simple_model: body.imprimante_simple_model,
      imprimante_simple_ns: body.imprimante_simple_ns,
      imprimante_simple_immo: body.imprimante_simple_immo,
      imprimante_simple_type_config: body.imprimante_simple_type_config,
      imprimante_simple_adresse_ip: body.imprimante_simple_adresse_ip,
      imprimante_simple_etat: body.imprimante_simple_etat,
      imprimante_thermique: body.imprimante_thermique,
      imprimante_thermique_marque: body.imprimante_thermique_marque,
      imprimante_thermique_model: body.imprimante_thermique_model,
      imprimante_thermique_ns: body.imprimante_thermique_ns,
      imprimante_thermique_immo: body.imprimante_thermique_immo,
      imprimante_thermique_type_config: body.imprimante_thermique_type_config,
      imprimante_thermique_adresse_ip: body.imprimante_thermique_adresse_ip,
      imprimante_thermique_etat: body.imprimante_thermique_etat,
      scanner: body.scanner,
      adresse_ip: body.adresse_ip,
      securisation: body.securisation,
      date_ajout: body.date_ajout,
      ajoute_par: body.ajoute_par,
      date_modif: body.date_modif,
      modifie_par: body.modifie_par,
    },
  });
  return new Response(JSON.stringify(updatedEmployee));
}
