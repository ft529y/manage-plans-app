import { useSession } from 'next-auth/react';
import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';

import { User, UserProviderProps } from '@/common/types';

const UserContext = createContext<{ user: User | null }>({ user: null });

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const { data: session } = useSession();
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    if (session !== undefined && session !== null) {
      setUser({
        id: session.user.id,
        email: session.user.email,
      });
    }
  }, [session]);

  return (
    <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>
  );
};
export const useUser = () => {
  return useContext(UserContext);
};
