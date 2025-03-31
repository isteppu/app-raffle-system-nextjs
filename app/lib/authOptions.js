import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  providers: [
    CredentialsProvider({
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
        userData: { label: "User Data", type: "text" },
        winnersData: { label: "Winners Data", type: "text" },
      },
      async authorize(credentials) {
        if (!credentials.username || !credentials.password || !credentials.userData) {
          throw new Error("Missing Credentials");
        }

        if (credentials.username === "admin" && credentials.password === "asdfqwer") {
          return {
            id: credentials.username,
            name: credentials.username,
            email: `${credentials.username}@example.com`,
            image: null,
            username: credentials.username,
            password: credentials.password,
            userData: credentials.userData,
            winnersData: [], // ✅ Ensure winnersData exists
          };
        }

        throw new Error("Invalid Credentials");
      },
    }),
  ],
  session: { strategy: "jwt" },
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.image = user.image;
        token.username = user.username;
        token.password = user.password;
        token.userData = user.userData;
        token.winnersData = user.winnersData || [];
      }

      // ✅ Handle session updates properly
      if (trigger === "update" && session.winnersData) {
        token.winnersData = session.winnersData;
      }

      return token;
    },
    async session({ session, token }) {
      return {
        ...session,
        user: {
          id: token.id,
          name: token.name,
          email: token.email,
          image: token.image,
          username: token.username,
          password: token.password,
          userData: token.userData,
          winnersData: token.winnersData || [],
        },
      };
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === "development",
};
