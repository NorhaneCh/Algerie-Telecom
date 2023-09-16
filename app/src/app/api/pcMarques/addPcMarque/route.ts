import prisma from "../../../../lib/prisma";

interface RequestBody {
  name: string;
}

export async function POST(request: Request) {
  const body: RequestBody = await request.json();

  const addedPcMarque = await prisma.pcMarque.create({
    data: {
      name: body.name,
    },
  });
  return new Response(JSON.stringify(addedPcMarque));
}
