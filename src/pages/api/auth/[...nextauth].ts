import NextAuth, { DefaultSession, NextAuthOptions } from 'next-auth';
import { DefaultJWT } from 'next-auth/jwt';
import CredentialsProvider from 'next-auth/providers/credentials';

declare module 'next-auth' {
  interface Session extends DefaultSession {
    user: {
      id: string;
      email: string;
    } & DefaultSession['user'];
  }
}

declare module 'next-auth/jwt' {
  interface JWT extends DefaultJWT {
    id: string;
  }
}

const authOptions: NextAuthOptions = {
  providers: [
    // sample
    CredentialsProvider({
      name: 'sampleMan',
      credentials: {
        email: {
          label: 'email',
          type: 'text',
        },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        // credentials に入力が渡ってくる
        const matched =
          credentials?.email === process.env.DEVELOPMENT_MODE_DUMMY_EMAIL &&
          credentials?.password === process.env.DEVELOPMENT_MODE_DUMMY_PASSWORD;
        if (matched) {
          // ユーザー情報を返却する
          // ※ユーザー情報をDB管理にする場合はDBからユーザー情報を返却しid,emailを処理する必要がある。
          return {
            id: '123',
            email: 'dummy.mail',
          };
        } else {
          return null;
        }
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session?.user) {
        session.user.id = token.id;
      }
      return session;
    },
  },

  // 今後sessionの保持期間等を設定する。
  // session: {
  //   jwt: true,
  //   maxAge:
  // },
  pages: {
    signIn: '/auth/signin',
  },
  secret:
    process.env.NODE_ENV === 'production'
      ? process.env.NEXTAUTH_SECRET
      : undefined,
};

export default NextAuth(authOptions);
