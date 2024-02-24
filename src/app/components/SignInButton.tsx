"use client";
import { useApp } from "@/context/AppContext";
import useLocalStorage from "@/hooks/useLocalStorage";
import Script from "next/script";
import { useEffect } from "react";

export default function SignInButton() {
  const [_, setUser] = useLocalStorage("user");
  const { setSignerUuid, setFid, fid } = useApp();
  const onSignInSuccess = (data: { signer_uuid: string; fid: number }) => {
    setUser({
      signerUuid: data.signer_uuid,
      fid: data.fid,
    });
    setSignerUuid(data.signer_uuid);
    setFid(data.fid);
  };

  useEffect(() => {
    window.onSignInSuccess = onSignInSuccess;

    return () => {
      delete window.onSignInSuccess;
    };
  }, []);

  if (fid) {
    return null;
  }

  return (
    <>
      <button
        className="neynar_signin btn btn-ghost bgn-block"
        data-client_id={process.env.NEXT_PUBLIC_NEYNAR_CLIENT_ID}
        data-success-callback="onSignInSuccess"
        data-theme="light"
      />
      <Script src="https://neynarxyz.github.io/siwn/raw/1.0.0/index.js" async />
    </>
  );
}
