import prisma from "../../../../lib/prisma";

import * as bcrypt from "bcrypt";

interface RequestBody {
  username: string;
  password: string;
  firstLog:boolean;
}

export async function PATCH(request: Request) {
  const body: RequestBody = await request.json();

  const updatedUser = await prisma.user.update({
    where: {
      username: body.username,
    },
    data: {
      //password: body.password,
      password: await bcrypt.hash(body.password, 10),
      firstLog: body.firstLog,
    },
  });
  const { password, ...result } = updatedUser;
  return new Response(JSON.stringify(result));
}
