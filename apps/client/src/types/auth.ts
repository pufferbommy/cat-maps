interface AuthUserResDto {
  accessToken: string;
  refreshToken: string;
}

interface UserProfileResDto {
  id: string;
  username: string;
}

interface AuthPayload {
  userId: string;
}
