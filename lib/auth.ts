import db from "@/db";
import bcrypt from "bcrypt";
import { JWTPayload, SignJWT, importJWK } from "jose";
import { NextAuthOptions, Session } from "next-auth";
import { JWT } from 'next-auth/jwt';
import CredentialsProvider from "next-auth/providers/credentials";

export interface session extends Session {
  user: {
    id: string;
    jwtToken: string;
    role: string;
    email: string;
    name: string;
  };
}

interface token extends JWT {
  uid: string;
  jwtToken: string;
}

interface user {
  id: string;
  name: string;
  email: string;
  role: string;
  token: string;
}
const generateJWT = async (payload: JWTPayload) => {
  const secret = process.env.JWT_SECRET || "secret";

  const jwk = await importJWK({ k: secret, alg: "HS256", kty: "oct" });

  const jwt = await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("365d")
    .sign(jwk);

  return jwt;
};

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "email", type: "text", placeholder: "" },
        password: { label: "password", type: "password", placeholder: "" },
      },
      async authorize(credentials: any) {
        try {
          if (process.env.LOCAL_CMS_PROVIDER) {
            return {
              id: "1",
              name: "test",
              email: "test@gmail.com",
              token: await generateJWT({
                id: "1",
              }),
              role: 'EMPLOYEE',
            };
          }
          const userDb = await db.user.findFirst({
            where: {
              email: credentials.username,
            },
            select: {
              password: true,
              id: true,
              name: true,
              role: true,
            },
          });
          if(userDb && userDb.password){
            let valid = await bcrypt.compare(credentials.password, userDb.password);
            if (!valid) {
              return null;
            }
            const jwt = await generateJWT({
              id: userDb.id,
            });

            await db.$transaction(async (prisma) => {
              await prisma.user.update({
                where: {
                  id: userDb.id,
                },
                data: {
                  token: jwt,
                },
              });
            
              await prisma.session.create({
                data: {
                  sessionToken: jwt,
                  userId: userDb.id,
                  expires: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
                },
              });
            });
            
            return {
              id: userDb.id,
              name: userDb.name,
              role: userDb.role,
              email: credentials.username,
              token: jwt,
            };
          }
        } catch (e) {
          console.error(e);
        }
        return null;
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    session: async ({ session, token }) => {
      const newSession: session = session as session;
      if (newSession.user && token.uid) {
        newSession.user.id = token.uid as string;
        newSession.user.jwtToken = token.jwtToken as string;
        newSession.user.role = process.env.ADMINS?.split(',').includes(
          session.user?.email ?? '',
        )
          ? 'ADMIN'
          : 'EMPLOYEE';
      }
      return newSession;
    },
    jwt: async ({ token, user }): Promise<JWT> => {
      const newToken: token = token as token;

      if (user) {
        newToken.uid = user.id;
        newToken.jwtToken = (user as user).token;
      }
      return newToken;
    },
  },
  pages: {
    signIn: "/signin",
  },
} satisfies NextAuthOptions;
