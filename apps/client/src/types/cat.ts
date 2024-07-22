interface Cat {
  id: string;
  latitude: number;
  longitude: number;
  image: string;
  likedByUsers: string[];
}

interface ToggleLikeData {
  catId: string;
}

interface AddCatData {
  latitude: number;
  longitude: number;
  image: string;
}
