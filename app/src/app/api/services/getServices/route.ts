import prisma from "../../../../lib/prisma";

export async function GET() {
  try {
    const services = await prisma.service.findMany({
      select: {
        name: true,
      },
    });
    return new Response(JSON.stringify(services));
  } catch (error) {
    console.error("Error fetching services:", error);
    return new Response("Error fetching services", { status: 500 });
  }
}
