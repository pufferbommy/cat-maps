interface Cat {
  id: string;
  latitude: number;
  longitude: number;
  image: string;
  currentUserLiked: boolean;
  totalLikes: number;
}

interface ToggleLikeData {
  catId: string;
}

interface AddCatData {
  latitude: number;
  longitude: number;
  image: string;
}
