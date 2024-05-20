interface Cat {
  _id: string;
  latitude: number;
  longitude: number;
  imageUrl: string;
  liked: boolean;
  totalLikes: number;
}

interface CatDetail extends Cat {
  uploader: Profile;
  createdAt: string;
}

interface CatDto {
  _id: string;
  latitude: number;
  longitude: number;
  imageUrl: string;
  liked: boolean;
  totalLikes: number;
}
