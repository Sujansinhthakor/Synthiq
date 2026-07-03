import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import jwt from "jsonwebtoken";
const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],

  callbacks: {
    async jwt({ token, account, profile }) {
      if (account) {
        token.accessToken = account.access_token;
        const jwtToken = jwt.sign(
          {
            email: profile?.email,
          },
          process.env.NEXTAUTH_SECRET!
        );
        console.log(jwtToken);
        token.customenToken = jwtToken;
      }
      return token;
    },
    async session({ session, token }) {
      // @ts-expect-error: custom session types
      session.user.accessToken = token.accessToken;
      // @ts-expect-error: custom session types
      session.user.customenToken = token.customenToken;
      return session;
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
  session: { strategy: "jwt" },
});

export { handler as GET, handler as POST };
