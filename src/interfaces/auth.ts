interface Auth {
  accessToken: string;
  refreshToken: string;
}

interface Profile {
  _id: string;
  username: string;
}

interface AuthPayload {
  userId: string;
}
