export { default } from 'next-auth/middleware';

// このマッチャでログイン情報を保持していないユーザーを仕分けする。
export const config = {
  matcher: ['/((?!api|auth/signin|_next).*)'],
};
