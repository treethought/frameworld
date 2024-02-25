"use client";
import { useApp } from "@/context/AppContext";
import useLocalStorage from "@/hooks/useLocalStorage";
import Script from "next/script";
import { useEffect } from "react";

declare global {
  interface Window {
    onSignInSuccess: any;
  }
}

export default function SignInButton() {
  const [_, setUserStorage] = useLocalStorage("session");
  const { userInfo, lookupUser } = useApp();
  const onSignInSuccess = (data: { signer_uuid: string; fid: number }) => {
    setUserStorage({
      signerUuid: data.signer_uuid,
      fid: data.fid,
    });
    console.log("Sign in success for fid:", data.fid);
    lookupUser();
  };

  useEffect(() => {
    window.onSignInSuccess = onSignInSuccess;

    return () => {
      delete window.onSignInSuccess;
    };
  }, []);

  if (userInfo?.fid) {
    return null;
  }

  return (
    <>
      {!userInfo?.fid &&
        (
          <>
            <button
              className="neynar_signin btn btn-ghost bgn-block"
              data-client_id={process.env.NEXT_PUBLIC_NEYNAR_CLIENT_ID}
              data-success-callback="onSignInSuccess"
              data-theme="light"
            />
            <Script
              src="https://neynarxyz.github.io/siwn/raw/1.0.0/index.js"
              async
            />
          </>
        )}
    </>
  );
}
