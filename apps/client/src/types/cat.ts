interface Cat {
  id: string;
  latitude: number;
  longitude: number;
  imageUrl: string;
  likedByUsers: string[];
}

interface CatDetail extends Cat {
  uploader: UserProfile;
  createdAt: string;
}

interface CatDto {
  id: string;
  latitude: number;
  longitude: number;
  imageUrl: string;
  likedByUsers: string[];
}
