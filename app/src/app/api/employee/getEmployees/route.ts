import prisma from "../../../../lib/prisma";

export async function GET() {
  try {
    const employees = await prisma.employee.findMany();
    return new Response(JSON.stringify(employees));
  } catch (error) {
    console.error("Error fetching services:", error);
    return new Response("Error fetching services", { status: 500 });
  }
}
