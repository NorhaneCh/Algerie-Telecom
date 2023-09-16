import prisma from "../../../../lib/prisma";

interface RequestBody {
  name: string;
}

export async function DELETE(request: Request) {
  const body: RequestBody = await request.json();

  const deletedImprMarque = await prisma.imprimanteMarque.delete({
    where: {
      name: body.name,
    },
  });
  return new Response(JSON.stringify(deletedImprMarque));
}
