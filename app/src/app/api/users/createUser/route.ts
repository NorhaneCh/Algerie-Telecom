import prisma from "../../../../lib/prisma";

import * as bcrypt from "bcrypt";

interface RequestBody {
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  isAdmin: boolean;
  canAdd: boolean;
  canModify: boolean;
  canDelete: boolean;
}

export async function POST(request: Request) {
  const body: RequestBody = await request.json();

  const user = await prisma.user.create({
    data: {
      username: body.username,
      password: await bcrypt.hash(body.password, 10),
      firstName: body.firstName,
      lastName: body.lastName,
      isAdmin: body.isAdmin,
      canAdd: body.canAdd,
      canDelete: body.canDelete,
      canModify: body.canModify,
    },
  });
  const { password, ...result } = user;
  return new Response(JSON.stringify(result));
}
