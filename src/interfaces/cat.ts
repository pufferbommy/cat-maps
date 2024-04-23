interface PreviewCat {
  _id: string;
  latitude: number;
  longitude: number;
  imageUrl: string;
}

interface Cat {
  _id: string;
  latitude: number;
  longitude: number;
  comments: {
    _id: string;
    username: string;
    text: string;
  }[];
  imageUrl: string;
  createdByUser: {
    _id: string;
    username: string;
  };
  createdAt: string;
}
