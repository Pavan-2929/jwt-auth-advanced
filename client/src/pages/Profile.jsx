import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useRef } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";

function Profile() {
  const { currentUser } = useSelector((state) => state.user);
  const fileref = useRef(null);
  const [image, setImage] = useState(undefined);
  const [imagePercent, setImagePercent] = useState(0);
  const [imageError, setImageError] = useState(false);
  const [formData, setFormData] = useState({});
  console.log(formData);

  useEffect(() => {
    if (image) {
      handleFileUpload(image);
    }
  }, [image]);

  const handleFileUpload = (image) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + image.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImagePercent(Math.round(progress));
      },
      (error) => {
        setImageError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setFormData({ ...formData, profilePicture: downloadURL })
        );
      }
    );
  };

  return (
    <div className="max-w-md mx-auto p-4 text-center bg-gray-200 mt-20 rounded-md">
      <h1 className="text-3xl font-bold mb-14">Profile</h1>
      <form className="flex flex-col items-center space-y-4">
        <input
          type="file"
          ref={fileref}
          hidden
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
        />
        <img
          src={currentUser.profilePicture}
          alt=""
          className="w-20 h-20 rounded-full mb-2"
          onClick={() => fileref.current.click()}
        />
        <p className="font-semibold">
          {imageError ? (
            <span className="text-red-700">Upload valid Image</span>
          ) : imagePercent > 0 && imagePercent < 100 ? (
            <span text-slate-300>{`Uploading: ${imagePercent}`}</span>
          ) : imagePercent === 100 ? (
            <span className="text-green-700">Image Uploaded Successfully</span>
          ) : (
            ""
          )}
        </p>
        <input
          type="text"
          id="username"
          placeholder="Username"
          defaultValue={currentUser.username}
          className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
        />
        <input
          type="email"
          id="email"
          defaultValue={currentUser.email}
          placeholder="Email"
          className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
        />
        <input
          type="password"
          id="password"
          placeholder="Password"
          className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
        />
        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 focus:outline-none"
        >
          Submit
        </button>
      </form>
      <div className="flex justify-between mt-8 text-red-500 font-bold">
        <p>Delete Account</p>
        <p>Sign Out</p>
      </div>
    </div>
  );
}

export default Profile;
