export async function GET(request: Request) {
  return Response.json([
    {
      id: "sad2123",
      position: {
        lat: 51.505,
        lng: -0.09,
      },
    },
    {
      id: "123124#",
      position: {
        lat: 61.505,
        lng: -0.09,
      },
    },
    {
      id: "123123124#",
      position: {
        lat: 20.505,
        lng: -0.09,
      },
    },
    {
      id: "1231sa223124#",
      position: {
        lat: 20.505,
        lng: 40.09,
      },
    },
    {
      id: "12311223124#",
      position: {
        lat: 15.505,
        lng: 10.09,
      },
    },
    {
      id: "12s311223124#",
      position: {
        lat: 15.505,
        lng: 100.09,
      },
    },
  ]);
}
