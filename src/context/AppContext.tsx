"use client";
import useLocalStorage from "@/hooks/useLocalStorage";
import { UserInfo } from "@/types";
import { useSearchParams } from "next/navigation";
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
  displayName: string;
  setDisplayName: (name: string) => void;
  pfp: string;
  setPfp: (pfp: string) => void;
  signerUuid: string;
  setSignerUuid: (uuid: string) => void;
  fid: number | null;
  setFid: (fid: number | null) => void;
}

const AppContext = createContext<IAppContext | null>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [displayName, setDisplayName] = useState("");
  const [pfp, setPfp] = useState("");
  const [signerUuid, setSignerUuid] = useState("");
  const [fid, setFid] = useState<number | null>(null);
  // const searchParams = useSearchParams();
  const [user, setUser, removeUser] = useLocalStorage<UserInfo | null>(
    "user",
    null,
  );

  const lookupUser = useCallback(async () => {
    if (user && user.fid) {
      try {
        const { data } = await axios.get<{ user: User }>(
          `/api/user/${user.fid}`,
        );
        setFid(user.fid);
        setDisplayName(data.user.display_name);
        setPfp(data.user.pfp_url);
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
  }, [user]);

  useEffect(() => {
    lookupUser();
  }, [lookupUser]);

  const isUserloggedIn = useCallback(async () => {
    if (!user) {
      const verifiedUser = await verifyUser(signerUuid, fid);
      if (verifiedUser) {
        setUser({ signerUuid, fid });
        setSignerUuid(signerUuid);
      } else {
        removeUser();
      }
    } else {
      setSignerUuid(user.signerUuid);
      // set screen
    }
  }, [user, signerUuid, fid, setUser, removeUser]);

  useEffect(() => {
    isUserloggedIn();
  }, [isUserloggedIn]);

  const value: IAppContext | null = useMemo(
    () => ({
      // screen,
      // setScreen,
      displayName,
      setDisplayName,
      pfp,
      setPfp,
      signerUuid,
      setSignerUuid,
      fid,
      setFid,
    }),
    [displayName, pfp, signerUuid, fid],
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
