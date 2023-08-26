import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: number;
      username: string;
      firstName: string;
      lastName: string;
      isAdmin: boolean;
      canAdd: boolean;
      canDelete: boolean;
      accessToken: string;
    };
  }
}
