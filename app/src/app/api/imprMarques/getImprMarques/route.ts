import prisma from "../../../../lib/prisma";

export async function GET() {
  try {
    const imprMarques = await prisma.imprimanteMarque.findMany();
    return new Response(JSON.stringify(imprMarques));
  } catch (error) {
    console.error("Error fetching services:", error);
    return new Response("Error fetching services", { status: 500 });
  }
}
