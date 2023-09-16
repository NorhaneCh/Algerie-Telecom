import prisma from "../../../../lib/prisma";

interface RequestBody {
  name: string;
}

export async function DELETE(request: Request) {
  const body: RequestBody = await request.json();

  const deletedPcMarque = await prisma.pcMarque.delete({
    where: {
      name: body.name,
    },
  });
  return new Response(JSON.stringify(deletedPcMarque));
}
