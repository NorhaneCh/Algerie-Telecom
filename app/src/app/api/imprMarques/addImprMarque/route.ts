import prisma from "../../../../lib/prisma";

interface RequestBody {
  name: string;
}

export async function POST(request: Request) {
  const body: RequestBody = await request.json();

  const addedImprMarque = await prisma.imprimanteMarque.create({
    data: {
      name: body.name,
    },
  });
  return new Response(JSON.stringify(addedImprMarque));
}
