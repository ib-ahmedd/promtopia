import { connectToDB } from "@utils/database";
import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import User from "@models/user";
import { ISODateString, Profile } from "next-auth";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID ? process.env.GOOGLE_ID : "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
        ? process.env.GOOGLE_CLIENT_SECRET
        : "",
    }),
  ],

  callbacks: {
    async session({ session }: Param) {
      const sessionUser: sessionUser | null = await User.findOne({
        email: session.user?.email ? session.user.email : "",
      });

      session.user
        ? (session.user.id = sessionUser?._id ? sessionUser._id.toString() : "")
        : null;
      return session;
    },

    async signIn({ profile }: signInProp) {
      try {
        await connectToDB();
        const userExists = await User.findOne({ email: profile?.email });

        if (!userExists) {
          await User.create({
            email: profile?.email,
            username: profile?.name?.replace(/\s/g, "").toLowerCase(),
            image: profile?.image,
          });
        }
        return true;
      } catch (err) {
        console.log(err);
        return false;
      }
    },
  },
});

export { handler as GET, handler as POST };

type signInProp = {
  profile?: Profile;
};

type Param = {
  session: {
    user?:
      | {
          id?: string | null;
          name?: string | null;
          email?: string | null;
          image?: string | null;
        }
      | undefined;
    expires: ISODateString;
  };
};

type sessionUser = {
  _id: number;
  id: string;
  email: string;
  username: string;
  image: string;
};
