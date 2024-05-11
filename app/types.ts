export type Post = {
  creator: {
    email: string;
    image: string;
    username: string;
    id: string;
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
