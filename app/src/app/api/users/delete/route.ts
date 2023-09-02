import prisma from "../../../../lib/prisma";

interface RequestBody {
  username: string;
}

export async function DELETE(request: Request) {
  const body: RequestBody = await request.json();

  const deletedUser = await prisma.user.delete({
    where: {
      username: body.username,
    },
  });
  const { password, ...result } = deletedUser;
  return new Response(JSON.stringify(result));
}
