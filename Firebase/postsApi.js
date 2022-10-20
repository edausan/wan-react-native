/* eslint-disable react-hooks/exhaustive-deps */
// import { getAuth } from 'firebase/auth';
import { FirebaseApp, Firestore } from '../firebase-config';
import {
  collection,
  doc,
  getDoc,
  onSnapshot,
  updateDoc,
  query,
  where,
  getDocs,
  addDoc,
  deleteDoc,
  setDoc,
} from 'firebase/firestore';
import { useEffect, useState } from 'react';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytes,
  uploadString,
} from 'firebase/storage';

// const auth = getAuth(FirebaseApp);
// const user = auth.currentUser;
const postsRef = collection(Firestore, 'posts');
const themesRef = collection(Firestore, 'themes');

export const CreatePost = async ({ post }) => {
  try {
    const created = await addDoc(postsRef, post);

    return created;
  } catch (error) {
    console.log(error.message);
  }
};

export const CreateTheme = async ({ theme }) => {
  try {
    const id = theme?.title?.split(' ')?.join('-')?.toLowerCase();
    const themeRef = doc(themesRef, id);
    const created = await setDoc(themeRef, { ...theme, id });
    return created;
  } catch (error) {
    console.log(error.message);
  }
};

/**
 * TODO: DELETE Post
 */
export const DeletePost = async ({ id }) => {
  try {
    const ref = doc(postsRef, id);
    await deleteDoc(ref);
  } catch (error) {
    console.log(error.message);
  }
};

/**
 * TODO: React Post
 */
export const ReactPost = async ({ postId, reactions }) => {
  try {
    const ref = doc(postsRef, postId);

    const updated = await updateDoc(ref, {
      reactions,
    });

    return updated;
  } catch (error) {
    console.log(error.message);
  }
};

/**
 * TODO: GET Single Post
 */
export const GetPost = async ({ id }) => {
  const docRef = doc(Firestore, 'posts', id);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return { ...docSnap.data(), id: docSnap.id };
  } else {
    // doc.data() will be undefined in this case
  }
};

/**
 * TODO: GET All Posts
 */

export const GetPosts = async ({ id }) => {
  const q = query(postsRef, where('uid', '==', id));

  const querySnapshot = await getDocs(q);
  const posts = [];
  querySnapshot.forEach((doc) => {
    posts.push({ ...doc.data(), id: doc.id });
    // doc.data() is never undefined for query doc snapshots
  });

  return posts;
};

/**
 * TODO: POST a Comment
 */
export const PostComment = async ({ postId, comments }) => {
  try {
    const ref = doc(postsRef, postId);
    const updated = await updateDoc(ref, {
      comments,
    });

    return updated;
  } catch (error) {
    console.log(error.message);
  }
};

/**
 * TODO: Realtime Comments
 */
export const RealtimeComments = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    try {
      onSnapshot(
        collection(Firestore, 'posts'),

        (snapshot) => {
          const docs = snapshot.docs.map((doc) => ({
            id: doc.id,
            comments: doc.data().comments,
          }));

          if (docs.length > 0) {
            console.log({ RealtimeComments: docs });
            //   localStorage.setItem('orders', JSON.stringify(docs));
            //   const local_orders = JSON.parse(localStorage.getItem('orders'));
            setData(docs);
          }
        }
      );
    } catch (error) {
      console.log({ RealtimeMetadata_ERROR: error });
    }
  }, []);

  return { comments: data };
};

/**
 * TODO: Upload Post Media
 */
export const UploadPostMedia = async ({ imageUpload }) => {
  const storage = getStorage(FirebaseApp);

  /**
   * TODO: REFERENCE TO FIREBASE STORAGE FOLDER AND FILENAME
   */
  const imgRef = ref(storage, `posts/${imageUpload.name}`);

  /**
   * TODO: UPLOADING TO FIREBASE STORAGE
   */
  const uploaded = await uploadBytes(imgRef, imageUpload);

  /**
   * TODO:  GET PHOTO DOWNLOAD URL
   */
  const photoURL = await getDownloadURL(uploaded.ref);
  return { photoURL };
};

/**
 * TODO: Upload Theme Media
 */
export const UploadThemeMedia = async ({ image }) => {
  try {
    const storage = getStorage(FirebaseApp);
    console.log({ image });

    /**
     * TODO: REFERENCE TO FIREBASE STORAGE FOLDER AND FILENAME
     */
    const imgRef = ref(storage, `themes/${image.name}`);

    /**
     * TODO: UPLOADING TO FIREBASE STORAGE
     */
    const uploaded = await uploadString(imgRef, image.url, 'data_url');

    /**
     * TODO:  GET PHOTO DOWNLOAD URL
     */
    const photoURL = await getDownloadURL(uploaded.ref);
    console.log({ photoURL });
    return { photoURL };
  } catch (error) {
    console.log(error.message);
  }
};

/**
 * TODO: REALTIME Posts
 */
export const RealtimePosts = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    try {
      onSnapshot(postsRef, (snapshot) => {
        const docs = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        if (docs.length > 0) {
          //   localStorage.setItem('orders', JSON.stringify(docs));
          //   const local_orders = JSON.parse(localStorage.getItem('orders'));
          setData(docs);
        }
      });
    } catch (error) {
      console.log(error.message);
    }
  }, []);

  return { posts: data };
};

/**
 * TODO: REALTIME Themes
 */
export const RealtimeThemes = () => {
  const [data, setData] = useState([]);
  const themesRef = collection(Firestore, 'themes');

  useEffect(() => {
    try {
      onSnapshot(themesRef, (snapshot) => {
        const docs = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        if (docs.length > 0) {
          //   localStorage.setItem('orders', JSON.stringify(docs));
          //   const local_orders = JSON.parse(localStorage.getItem('orders'));
          setData(docs);
        }
      });
    } catch (error) {
      console.log(error.message);
    }
  }, []);

  return { data };
};
