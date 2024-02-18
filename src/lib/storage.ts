import { StorageReference, listAll, ref, uploadBytes } from "firebase/storage";
import storage from "../config/storage";

export const imagesRef = ref(storage, "images");

type FileMetadata = {
  name: string;
  contentType: string;
  size: number;
  timeCreated: number;
};

export const uploadImage = async (
  image: ArrayBuffer,
  metadata: FileMetadata
) => {
  try {
    const imageRef = ref(imagesRef, `${metadata.name}`);
    const snapshot = await uploadBytes(imageRef, image, metadata);
    return [null, snapshot];
  } catch (e) {
    return [e, null];
  }
};

export const listAllImages = async () => {
  const listRef = imagesRef;
  try {
    const res = await listAll(listRef);
    const items: StorageReference[] = [];
    res.items.forEach((itemRef) => items.push(itemRef));
    return [null, { items }];
  } catch (e) {
    console.error(e);
    return [e, null];
  }
};
