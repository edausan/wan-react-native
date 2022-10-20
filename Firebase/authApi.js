import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from 'firebase/auth';
import { FirebaseApp, Firestore } from '../firebase-config';
import {
  collection,
  doc,
  setDoc,
  getDoc,
  onSnapshot,
  updateDoc,
  query,
  where,
  getDocs,
} from 'firebase/firestore';
import {
  getStorage,
  ref,
  getDownloadURL,
  uploadBytes,
  uploadString,
} from 'firebase/storage';
import { useEffect, useState } from 'react';
import moment from 'moment';

const auth = getAuth(FirebaseApp);
const user = auth.currentUser;

export const SetUserMetadata = async ({ metadata }) => {
  const meta_data = await setDoc(doc(Firestore, 'user_metadata', metadata.id), {
    ...metadata,
  });
};

export const GetUserMetadata = async ({ id }) => {
  // console.log({ id });
  const docRef = doc(Firestore, 'user_metadata', id);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    // console.log('Document data:', docSnap.data());
    return docSnap.data();
  } else {
    // doc.data() will be undefined in this case
    console.log('No user found!');
  }
};

export const CreateAccount = async ({ email, password, ministry }) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    const user = userCredential.user;

    const meta = {
      id: user.uid,
      ministry,
      life_verse: '',
      photoHeart: [],
      photoURL: user.photoURL,
      displayName: user.displayName,
      email: user.email,
      assignments: [],
      notifications: [],
    };

    const user_metadata = await SetUserMetadata({ metadata: meta });

    return { user_metadata, user };
  } catch (error) {
    console.log({ error });
    return error;
  }
};

export const SignIn = async ({ email, password }) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    const metadata = await GetUserMetadata({ id: user.uid });
    const metas = {
      life_verse: metadata.life_verse,
      ministry: metadata.ministry,
      photoHeart: metadata.photoHeart || [],
      photoURL: user.photoURL,
      displayName: user.displayName,
      email: user.email,
      assignments: metadata.assignments || [],
      notifications: metadata.notifications || [],
    };
    const updatedMetadata = await UpdateUserMetadata({ metadata: metas });

    return { user_metadata: metadata, user };
  } catch (error) {
    return error;
  }
};

export const SignOut = () => {
  try {
    signOut(auth);
  } catch (error) {
    console.log(error);
  }
};

export const UpdateProfile = async ({
  displayName,
  phoneNumber,
  photoURL,
  life_verse,
  ministry,
}) => {
  try {
    const userCredential = await updateProfile(auth.currentUser, {
      displayName,
      photoURL,
      phoneNumber,
    });
    const user = auth.currentUser;
    const metadata = await GetUserMetadata({ id: user.uid });

    const metas = {
      life_verse,
      ministry,
      photoHeart: metadata.photoHeart || [],
      posts: metadata.posts || [],
      photoURL: user.photoURL,
      displayName: user.displayName,
      email: user.email,
      assignments: metadata.assignments || [],
      notifications: metadata.notifications || [],
    };

    const update = await UpdateUserMetadata({
      metadata: metas,
    });

    return userCredential;
  } catch (error) {
    return error;
  }
};

export const HeartProfile = async ({ id, heart }) => {
  try {
    const user = auth.currentUser;
    const userRef = doc(Firestore, 'user_metadata', id);
    const updated = await updateDoc(userRef, {
      ...heart,
    });
  } catch (error) {
    console.log(error.message);
  }
};

export const RealtimeMetadata = () => {
  const user = auth.currentUser;
  const [data, setData] = useState([]);

  useEffect(() => {
    if (user?.uid) {
      try {
        onSnapshot(doc(Firestore, 'user_metadata', user.uid), (doc) => {
          setData(doc.data());
        });
      } catch (error) {
        console.log({ RealtimeMetadata_ERROR: error });
      }
    }
  }, [user]);

  return { data };
};

export const UpdatePhotoURL = async ({ photoURL }) => {
  try {
    const user = await updateProfile(auth.currentUser, {
      photoURL,
      displayName: auth.currentUser.displayName,
      uid: auth.currentUser.uid,
    });
  } catch (error) {
    console.log(error);
  }
};

export const UpdateUserMetadata = async ({ metadata }) => {
  //   console.log({ life_verse, ministry });
  try {
    const user = auth.currentUser;
    const userRef = doc(Firestore, 'user_metadata', user.uid);
    const updated = await updateDoc(userRef, {
      ...metadata,
    });

    return updated;
  } catch (error) {
    console.log(error);
  }
};

export const UploadPhoto = async ({ id, imageUpload }) => {
  const storage = getStorage(FirebaseApp);

  /**
   * TODO: REFERENCE TO FIRESTORE user_metadata COLLECTION WITH uid
   */
  const userRef = doc(Firestore, 'user_metadata', auth.currentUser.uid);

  /**
   * TODO: REFERENCE TO FIREBASE STORAGE FOLDER AND FILENAME
   */
  const imgRef = ref(
    storage,
    `profile/${auth.currentUser.uid}~${moment().valueOf()}`
  );

  /**
   * TODO: UPLOADING TO FIREBASE STORAGE
   */
  const uploaded = await uploadString(imgRef, imageUpload, 'data_url');

  /**
   * TODO:  GET PHOTO DOWNLOAD URL
   */
  const photoURL = await getDownloadURL(uploaded.ref);

  /**
   * TODO: UPDATE USER'S METADATA photoURL
   */
  const updated_user_metadata = await updateDoc(userRef, {
    photoURL,
    uid: auth.currentUser.uid,
  });

  /**
   * TODO: UPDATE USER'S photoURL
   */
  const updateProfile = await UpdatePhotoURL({ photoURL });

  return { photoURL, updateProfile };
};

export const RealtimeUsers = () => {
  const user = auth.currentUser;
  const [data, setData] = useState([]);

  useEffect(() => {
    try {
      onSnapshot(
        collection(Firestore, 'user_metadata'),

        (snapshot) => {
          const docs = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));

          if (docs.length > 0) {
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

  return { data };
};

export const GetVIA = async () => {
  try {
    const q = query(
      collection(Firestore, 'user_metadata'),
      where('ministry', '==', 'VIA'),
      where('uid', '!=', null)
    );

    const querySnapshot = await getDocs(q);
    const VIA = [];
    querySnapshot.forEach((doc) => {
      VIA.push({ ...doc.data(), id: doc.id });
      // doc.data() is never undefined for query doc snapshots
    });

    return VIA;
  } catch (error) {
    console.log(error);
  }
};
