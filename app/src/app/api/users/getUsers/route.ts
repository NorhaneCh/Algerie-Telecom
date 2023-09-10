import prisma from "../../../../lib/prisma";

export async function GET() {
  const users = await prisma.user.findMany({
    select: {
      username: true,
      firstName: true,
      lastName: true,
      isAdmin: true,
      canAdd: true,
      canDelete: true,
      canModify: true,
    },
  });
  return new Response(JSON.stringify(users));
}
