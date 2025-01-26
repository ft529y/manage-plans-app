import { getSession, signIn } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import { ModalProps } from '@/common/types';

import MessageDialog from '../../components/modal';

const SignInPage = () => {
  const [isOpen, setIsOpen] = useState(false);

  const modalProps: ModalProps = {
    open: isOpen,
    onCancel: () => setIsOpen(false),
    onOk: () => setIsOpen(false),
    title: 'CredentialsSignIn',
    content: 'EmailもしくはPasswordが間違っています。ご確認下さい。',
  };

  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // 既にサインインしていた場合はルートへ遷移させる(リダイレクト無限ループ対応)
  useEffect(() => {
    const checkSession = async () => {
      const session = await getSession();
      if (session) {
        router.push('/');
      }
    };
    checkSession();
  }, [router]);

  // ログイン処理を実装
  const onSubmit = async (data: any) => {
    const email = data.email;
    const password = data.password;
    try {
      await signIn('credentials', {
        redirect: false,
        email,
        password,
      }).then((res) => {
        if (res?.error) {
          // you have to make modal screen
          if (res.status === 401) {
            // const createErrorSentence: any = {
            //   title: 'CredentialsSignIn',
            //   content: 'EmailもしくはPasswordが間違っています。ご確認下さい。',
            // };
            setIsOpen(true);
          }
        } else {
          router.push('/');
        }
      });
    } catch (err) {
      console.error('エラーB!');
    }
  };

  return (
    <>
      <div
        className=" h-screen w-full bg-gradient-to-br
  from-violet-800 via-pink-700 to-orange-700 flex items-center justify-center"
      >
        <div className="bg-gray-100 rounded-b-lg py-24 px-36 lg:px-36">
          <div>
            <h1 className="text-center text-3xl text-blue-500 font-light">
              プロジェクト : AAA (ログイン画面)
            </h1>
          </div>
          <p className="text-center text-sm text-gray-500 font-light">
            Or sign in with credentials
          </p>
          <form className="mt-6" onSubmit={handleSubmit(onSubmit)}>
            <div className="relative">
              <input
                className="appearance-none border w-96 border-gray-100 shadow-sm focus:shadow-md focus:placeholder-gray-600  transition  rounded-md  py-3 text-gray-600 leading-tight focus:outline-none focus:ring-gray-600 focus:shadow-outline"
                id="email"
                type="email"
                {...register('email', { required: true })}
                placeholder="Email"
              />
              {errors.email && <p>メールアドレスを入力してください。</p>}
            </div>
            <div className="relative mt-3">
              <input
                className="appearance-none border w-96 border-gray-100 shadow-sm focus:shadow-md focus:placeholder-gray-600  transition  rounded-md py-3 text-gray-600 leading-tight focus:outline-none focus:ring-gray-600 focus:shadow-outline"
                id="password"
                type="password"
                {...register('password', { required: true })}
                placeholder="Password"
              />
              {errors.password && <p>パスワードを入力してください。</p>}
              <div className="mt-4 flex items-center text-gray-500">
                <input
                  type="checkbox"
                  id="remember"
                  name="remember"
                  className="mr-3"
                />
                <label htmlFor="remember">Remember me</label>
              </div>
              <div className="flex items-center justify-center mt-8">
                <button
                  className="text-white py-2 px-4 uppercase rounded bg-indigo-500 hover:bg-indigo-600 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5"
                  type="submit"
                >
                  Sign in
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

      <MessageDialog {...modalProps}></MessageDialog>
    </>
  );
};

export default SignInPage;
