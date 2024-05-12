export type Post = {
  creator: {
    email: string;
    image: string;
    username: string;
    id: string;
    _id: string;
  };
  prompt: string;
  tag: string;
  _id: string;
  _v: number;
};

export type SecondArg = {
  params: {
    id: string;
  };
};

type SessionData = {
  user?:
    | {
        id?: string | null | undefined;
        name?: string | null | undefined;
        email?: string | null | undefined;
        image?: string | null | undefined;
      }
    | undefined;
  expires: string;
};

export type UseSession =
  | {
      update: any;
      data: SessionData;
      status: "authenticated";
    }
  | {
      update: any;
      data: null;
      status: "unauthenticated" | "loading";
    };
