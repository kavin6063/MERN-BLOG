import { Button, Label, TextInput } from "flowbite-react";
import React from "react";
import { Link } from "react-router-dom";

const SignUp = () => {
  return (
    <div className="min-h-screen mt-20">
      <div className="flex  p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-8">
        {/* left */}
        <div className="flex-1">
          <Link to="/" className=" font-bold text-4xl  dark:text-white">
            <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">
              JS
            </span>
            Connect
          </Link>
          {/* need to change the text font mono or something */}
          <p className="text-sm  mt-5">
            This a free and open source for javascript developer. You can sign
            up with your email and password or with Google
          </p>
        </div>

        {/* right */}
        <div className="flex-1">
          <form className="flex flex-col gap-4">
            <div className="">
              <Label value="Your username" />
              <TextInput id="username" type="text" placeholder="username" />
            </div>
            <div className="">
              <Label value="Your email" />
              <TextInput
                id="email"
                type="email"
                placeholder="name@company.com"
              />
            </div>
            <div className="">
              <Label value="Your password" />
              <TextInput id="password" type="password" placeholder="password" />
            </div>
            <Button gradientDuoTone="purpleToPink" type="submit">
              Sign Up
            </Button>
          </form>
          <div className="flex gap-2 text-sm mt-5">
            <span>Already have an account? </span>
            <Link to="/sign-in" className="text-blue-500">
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
