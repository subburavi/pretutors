// firebaseUtils.js
import { getDownloadURL, ref, uploadBytes, deleteObject } from 'firebase/storage';
import { storage } from './firebase';

export const uploadFile = async (file, path) => {
  const storageRef = ref(storage, path);
  await uploadBytes(storageRef, file);
  const downloadURL = await getDownloadURL(storageRef);
  return { downloadURL, path };
};

export const deleteFile = async (path) => {
  const fileRef = ref(storage, path);
  await deleteObject(fileRef).catch(err => {
    if (err.code !== 'storage/object-not-found') throw err;
  });
};
