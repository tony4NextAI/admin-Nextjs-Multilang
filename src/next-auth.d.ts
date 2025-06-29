declare module "next-auth" {
  interface Session {
    user?: {
      _id?: string;
      userName?: string;
      name?: string;
      email?: string;
      image?: string;
      // ...other fields as needed
    };
    accessToken?: string;
  }

  interface User {
    _id?: string;
    userName?: string;
    accessToken?: string;
    user?: {
      _id?: string;
      userName?: string;
      [key: string]: unknown;
    };
  }

  interface JWT {
    accessToken?: string;
    userData?: {
      _id?: string;
      userName?: string;
      [key: string]: unknown;
    };
    _id?: string;
    userName?: string;
  }
} 