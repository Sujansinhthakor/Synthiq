import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      name?: string | null;
      email?: string | null;
      image?: string | null;
      accessToken?: string;
      customenToken: string;
    };
  }

  interface JWT {
    accessToken?: string;
    customenToken: string;
  }
}
