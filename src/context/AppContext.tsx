"use client";
import useLocalStorage from "@/hooks/useLocalStorage";
import { UserInfo } from "@/types";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import axios, { AxiosError } from "axios";
import { ErrorRes, User } from "@neynar/nodejs-sdk/build/neynar-api/v2";
import { toast } from "react-toastify";
import { verifyUser } from "@/utils/helpers";

interface IAppContext {
  user: User | null;
  userInfo: UserInfo | null;
  setUserInfo: (userInfo: UserInfo) => void;
  lookupUser: () => void;
}

const AppContext = createContext<IAppContext | null>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [userStorage, setUserStorage, removeUserStorage] = useLocalStorage<
    UserInfo | null
  >(
    "session",
    null,
  );

  const lookupUser = useCallback(async () => {
    if (userStorage && userStorage.fid) {
      try {
        const { data } = await axios.get<{ user: User }>(
          `/api/user/${userStorage.fid}`,
        );
        setUser(data.user);
      } catch (error) {
        console.error(error);
        const err = error as AxiosError<ErrorRes>;
        toast(err.response?.data?.message || "An error occurred", {
          type: "error",
          theme: "dark",
          autoClose: 3000,
          position: "bottom-right",
          pauseOnHover: true,
        });
      }
    }
  }, [userStorage]);

  useEffect(() => {
    lookupUser();
  }, [lookupUser]);

  const isUserloggedIn = useCallback(async () => {
    if (!userInfo) {
      console.log("No user session, verifying: ", userStorage);
      const verifiedUser = await verifyUser(
        userStorage?.signerUuid!,
        userStorage?.fid!,
      );
      if (verifiedUser) {
        setUserInfo({
          signerUuid: userStorage?.signerUuid!,
          fid: userStorage?.fid!,
        });
      } else {
        console.log("User not verified");
        removeUserStorage();
        setUserInfo(null);
        setUser(null);
      }
      // set screen
    }
  }, [user, userInfo, userStorage, setUserInfo, setUserInfo, setUser, removeUserStorage]);

  useEffect(() => {
    isUserloggedIn();
  }, [isUserloggedIn]);

  const value: IAppContext | null = useMemo(
    () => ({
      user,
      userInfo,
      setUserInfo,
      lookupUser,
    }),
    [user, userInfo],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export const useApp = (): IAppContext => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
};
