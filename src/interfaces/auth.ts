interface Auth {
  accessToken: string;
  refreshToken: string;
}

interface Profile {
  username: string;
}

interface AuthPayload {
  userId: string;
}
