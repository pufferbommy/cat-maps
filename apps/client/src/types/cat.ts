interface Cat {
  id: string;
  latitude: number;
  longitude: number;
  imageUrl: string;
  likedByUsers: string[];
}

interface ToggleLikeData {
  catId: string;
}
