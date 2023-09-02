import prisma from "../../../../lib/prisma";

interface RequestBody {
  username: string;
  isAdmin: boolean;
  canAdd: boolean;
  canDelete: boolean;
}

export async function PATCH(request: Request) {
  const body: RequestBody = await request.json();

  const updatedUser = await prisma.user.update({
    where: {
      username: body.username,
    },
    data: {
      isAdmin: body.isAdmin,
      canAdd: body.canAdd,
      canDelete: body.canDelete,
    },
  });
  const { password, ...result } = updatedUser;
  return new Response(JSON.stringify(result));
}
