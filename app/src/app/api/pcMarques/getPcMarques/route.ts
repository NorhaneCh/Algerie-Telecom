import prisma from "../../../../lib/prisma";

export async function GET() {
  try {
    const pcMarques = await prisma.pcMarque.findMany();
    return new Response(JSON.stringify(pcMarques));
  } catch (error) {
    console.error("Error fetching services:", error);
    return new Response("Error fetching services", { status: 500 });
  }
}
