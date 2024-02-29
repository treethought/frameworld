import { User } from "@neynar/nodejs-sdk/build/neynar-api/v2";
import axios from "axios";
import useSWR from "swr";

async function userFetcher(key: string): Promise<User> {
  const { data } = await axios.get<{ user: User }>(
    key,
  );
  return data.user;
}

export default function useUser(username: string, viewer: number) {
  const { data, error, isLoading } = useSWR<User, Error>(
    username ? `/api/user/${username}?viewer=${viewer}` : null,
    userFetcher,
    { refreshInterval: 0 },
  );

  return {
    profileUser: data as User,
    error,
    isLoading,
  };
}
