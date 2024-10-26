import { Button, TextInput } from "flowbite-react";
import React from "react";
import { useSelector } from "react-redux";

const DashProfile = () => {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <div className="max-w-lg mx-auto p-3 w-full">
      <h1 className="text-3xl text-center my-7 font-semibold">Profile</h1>
      <form className="flex flex-col gap-4 ">
        <div className="w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full">
          <img
            src={currentUser.profilePicture}
            alt="user"
            className="rounded-full w-full h-full object-cover border-4 border-teal-500"
          />
        </div>
        <TextInput
          className="w-3/4 md:w-full self-center"
          type="text"
          id="username"
          placeholder="Username"
          defaultValue={currentUser.username}
        />
        <TextInput
          className="w-3/4 md:w-full self-center"
          type="email"
          id="email"
          placeholder="email"
          defaultValue={currentUser.email}
        />
        <TextInput
          type="password"
          id="password"
          className="w-3/4 md:w-full self-center"
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
