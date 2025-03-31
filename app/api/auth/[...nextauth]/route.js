import NextAuth, { NextAuthOptions } from "next-auth";
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
            console.log("Received credentials:", credentials); // Log the received credentials
            if (!credentials.username || !credentials.password || !credentials.userData){
                throw new Error("Missing Credentials")
            } else if (credentials?.username === "admin" && credentials?.password === "asdfqwer") {
              return { id: credentials.username, username: credentials.username, password: credentials.password, userData: credentials.userData, winnersData: [] };
            } 
            throw new Error("Invalid Credentials");
          },
        }),
      ],
    session: {
        strategy: "jwt"
    },
    callbacks: {
      async session({ session, token, trigger }) {
        session.user = { ...session.user, id: token.username, username: token.username, password: token.password, userData: token.userData, winnersData: token.winnersData };
        if (trigger === "update") {
          session.user.winnersData = token.winnersData; // Fix: Ensure it updates under user object
        } else {
          session.user.winnersData = token.winnersData || [];
        }
        return session;
      },
      async jwt({ token, trigger, user, session }) {
        if (trigger === "update") {
          token.winnersData = session.winnersData; // Ensure token gets new winnersData
        }
      
        if (user) {
          token.id = user.username;
          token.username = user.username;
          token.password= user.password;
          token.userData = user.userData;
          token.winnersData = user.winnersData || [];
        }
        return token;
      },
    },
    secret: "samplesamplesample",
    debug: process.env.NODE_ENV === "development"
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }