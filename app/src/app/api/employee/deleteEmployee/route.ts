import prisma from "../../../../lib/prisma";

interface RequestBody {
  id: number;
}

export async function DELETE(request: Request) {
  const body: RequestBody = await request.json();

  const deletedEmployee = await prisma.employee.delete({
    where: {
      id: body.id,
    },
  });
  return new Response(JSON.stringify(deletedEmployee));
}
