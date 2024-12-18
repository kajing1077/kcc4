const BASE_URL = 'https://jsonplaceholder.typicode.com/';

export type Photo = {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
};

export default async function getPhoto(photoId: number) {
  const data = await fetch(`${BASE_URL}/photos/${photoId}`, {
    cache: 'force-cache',
    // next: { revalidate: 5 }, // ISR
  }).then((res) => res.json());

  return data as Photo;
}

export const getPhotos = async (albumId: number = 1) => {
  const data = await fetch(`${BASE_URL}/albums/${albumId}/photos`, {
    cache: 'force-cache', // SSG
  }).then((res) => res.json());
  return data as Photo[];
};
