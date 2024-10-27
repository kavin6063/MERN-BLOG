import { Alert, Button, TextInput } from "flowbite-react";
import React, { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { app } from "../firebase";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const DashProfile = () => {
  // state
  const { currentUser } = useSelector((state) => state.user);
  const [imageFile, setImageFile] = useState(null);
  const [imageFileUrl, setImageFileUrl] = useState(null);
  const [imageFileUploadProgresss, setImageFileUploadProgresss] =
    useState(null);
  const [imageFileUploadError, setImageFileUploadError] = useState(null);

  const filePickerRef = useRef(null);
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImageFileUrl(URL.createObjectURL(file));
    }
  };

  useEffect(() => {
    if (imageFile) {
      uploadImage();
    }
  }, [imageFile]);

  const uploadImage = async () => {
    setImageFileUploadError(null);
    const storage = getStorage(app);
    const fileName = new Date().getTime() + imageFile.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImageFileUploadProgresss(progress.toFixed(0));
      },
      (error) => {
        setImageFileUploadError(
          "Could Not Upload Image (File must be less than 2MB)"
        );
        setImageFileUploadProgresss(null);
        setImageFile(null);
        setImageFileUrl(null);
        // Remove error after 2 seconds
        setTimeout(() => {
          setImageFileUploadError(null);
        }, 4000);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageFileUrl(downloadURL);
          setImageFileUploadProgresss(null); // Hide progress bar after successful upload
        });
      }
    );
  };
  return (
    <div className="max-w-lg mx-auto p-3 w-full">
      <h1 className="text-3xl text-center my-7 font-semibold">Profile</h1>
      <form className="flex flex-col gap-4 ">
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          ref={filePickerRef}
          hidden
        />
        <div
          className="relative w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full"
          onClick={() => filePickerRef.current.click()}
        >
          {imageFileUploadProgresss && (
            <CircularProgressbar
              value={imageFileUploadProgresss || 0}
              text={`${imageFileUploadProgresss}%`}
              strokeWidth={5}
              styles={{
                root: {
                  width: "100%",
                  height: "100%",
                  position: "absolute",
                  top: 0,
                  left: 0,
                },
                path: {
                  stroke: `rbga(62, 152, 199, ${
                    imageFileUploadProgresss / 100
                  })`,
                },
              }}
            />
          )}
          <img
            src={imageFileUrl || currentUser.profilePicture}
            alt="user"
            className={`rounded-full w-full h-full object-cover border-4 border-teal-500 ${
              imageFileUploadProgresss &&
              imageFileUploadProgresss < 100 &&
              "opacity-65"
            }`}
          />
        </div>
        {imageFileUploadError && (
          <Alert color="failure">{imageFileUploadError}</Alert>
        )}
        <input
          className=" field-input md:w-full w-3/4 self-center"
          type="text"
          id="username"
          placeholder="Username"
          defaultValue={currentUser.username}
        />
        <input
          className="field-input md:w-full w-3/4 self-center"
          type="email"
          id="email"
          placeholder="email"
          defaultValue={currentUser.email}
        />
        <input
          type="password"
          id="password"
          className="field-input md:w-full w-3/4 self-center"
          placeholder="Password"
        />
        <Button
          className="w-3/4 md:w-full self-center"
          gradientDuoTone="purpleToBlue"
          type="submit"
          outline
        >
          Update
        </Button>
      </form>
      <div className="flex justify-center">
        <div className=" w-3/4 md:w-full text-red-500 flex justify-between mt-5">
          <span className="cursor-pointer">Delete Account</span>
          <span className="cursor-pointer">Log out</span>
        </div>
      </div>
    </div>
  );
};

export default DashProfile;
