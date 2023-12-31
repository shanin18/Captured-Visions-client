import React, { useContext } from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  AiOutlineEye,
  AiOutlineEyeInvisible,
  AiOutlineLock,
  AiOutlineUser,
} from "react-icons/ai";
import { BsEnvelopeAt } from "react-icons/bs";
import { HiOutlinePhoto } from "react-icons/hi2";
import { Link, useNavigate } from "react-router-dom";
import LoginWithSocials from "../../Shared/LoginWithSocials/LoginWithSocials";
import { AuthContext } from "../../Context/AuthProvider";
import Swal from "sweetalert2";
import useTitle from "../../Hooks/useTitle";

const SignUp = () => {
  useTitle("Sign up")
  const [passHidden, setPassHidden] = useState(false);
  const [confPassHidden, setConfPassHidden] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm();

  const { createUser, updateUser } = useContext(AuthContext);

  const onSubmit = (data) => {
    createUser(data.email, data.password)
      .then((result) => {
        const user = result.user;
        updateUser(user, data.name, data.photo)
          .then(() => {
            const savedUser = { name: data.name, email: data.email };

            fetch("https://captured-visions-server-shanin18.vercel.app/users", {
              method: "POST",
              headers: {
                "content-type": "application/json",
              },
              body: JSON.stringify(savedUser),
            })
              .then((res) => res.json())
              .then((data) => {
                if (data.insertedId) {
                  navigate("/")
                  reset();
                  Swal.fire({
                    position: "top",
                    icon: "success",
                    title: "Account created successfully",
                    showConfirmButton: false,
                    timer: 1500,
                  });
                }
              });
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err.message));
  };

  return (
    <div>
      <div div className="container mx-auto flex justify-center py-24">
        <div className="border md:min-w-[450px] dark:border-none p-10 dark:bg-[#0c0c0c] rounded-xl">
          <h2 className="font-poppins text-3xl font-semibold text-center dark:text-white mb-10">
            Sign up
          </h2>
          <form className="mb-1" onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-5 dark:text-white">
              <div className="flex dark:bg-[#171719] dark:border-[#77bef8] border rounded-md">
                <div className="w-12 h-12 rounded-l-md flex items-center justify-center">
                  <AiOutlineUser className="text-lg"></AiOutlineUser>
                </div>
                {/* register your input into the hook by invoking the "register" function */}
                <input
                  type="text"
                  name="name"
                  placeholder="Enter your name"
                  className="w-full flex-1 pr-3 py-2 bg-transparent focus:outline-none font-poppins text-sm"
                  {...register("name", { required: true })}
                />
              </div>
              {errors.name && (
                <small className="text-red-600 font-poppins">
                  Name is required
                </small>
              )}
              <div className="flex dark:bg-[#171719] dark:border-[#77bef8] border rounded-md">
                <div className="w-12 h-12 rounded-l-md flex items-center justify-center">
                  <BsEnvelopeAt className="text-lg"></BsEnvelopeAt>
                </div>
                {/* register your input into the hook by invoking the "register" function */}
                <input
                  type="email"
                  name="email"
                  placeholder="Enter you email"
                  className="w-full flex-1 pr-3 py-2 bg-transparent focus:outline-none font-poppins text-sm"
                  {...register("email", { required: true })}
                />
              </div>
              {errors.email && (
                <small className="text-red-600 font-poppins">
                  Email is required
                </small>
              )}

              <div className="flex relative dark:bg-[#171719] dark:border-[#77bef8] border rounded-md">
                <div className="w-12 h-12 rounded-l-md flex items-center justify-center">
                  <AiOutlineLock className="text-lg"></AiOutlineLock>
                </div>

                {/* include validation with required or other standard HTML validation rules */}
                <input
                  type={!passHidden && "password"}
                  name="password"
                  placeholder="Enter your password"
                  className="w-full flex-1 pr-8 py-2 bg-transparent focus:outline-none font-poppins text-sm"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                    pattern: {
                      value: /^(?=.*[A-Z])(?=.*[@$!%*?&])/,
                      message:
                        "Password must contain at least one uppercase letter and one special character",
                    },
                  })}
                />

                <div
                  className="absolute  right-2 top-3"
                  onClick={() => setPassHidden(!passHidden)}
                >
                  {!passHidden ? (
                    <AiOutlineEye className="text-xl cursor-pointer"></AiOutlineEye>
                  ) : (
                    <AiOutlineEyeInvisible className="text-xl cursor-pointer"></AiOutlineEyeInvisible>
                  )}
                </div>
              </div>

              {/* errors will return when field validation fails  */}
              {errors.password && (
                <small className="text-red-600 font-poppins text-xs">
                  {errors.password?.message}
                </small>
              )}
              <div className="flex relative dark:bg-[#171719] dark:border-[#77bef8] border rounded-md">
                <div className="w-12 h-12 rounded-l-md flex items-center justify-center">
                  <AiOutlineLock className="text-lg"></AiOutlineLock>
                </div>
                {/* include validation with required or other standard HTML validation rules */}
                <input
                  type={!confPassHidden && "password"}
                  name="cPassword"
                  placeholder="Enter confirm password"
                  className="w-full flex-1 pr-8 py-2 bg-transparent focus:outline-none font-poppins text-sm"
                  {...register("cPassword", {
                    required: "Confirm password is required",
                    validate: (val) => {
                      if (watch("password") != val) {
                        return "Confirm password is not matching!";
                      }
                    },
                  })}
                />

                <div
                  className="absolute  right-2 top-3"
                  onClick={() => setConfPassHidden(!confPassHidden)}
                >
                  {!confPassHidden ? (
                    <AiOutlineEye className="text-xl cursor-pointer"></AiOutlineEye>
                  ) : (
                    <AiOutlineEyeInvisible className="text-xl cursor-pointer"></AiOutlineEyeInvisible>
                  )}
                </div>
              </div>

              {/* errors will return when field validation fails  */}
              {errors.cPassword && (
                <small className="text-red-600 font-poppins text-xs">
                  {errors.cPassword?.message}
                </small>
              )}

              <div className="flex dark:bg-[#171719] dark:border-[#77bef8] border rounded-md">
                <div className="w-12 h-12 rounded-l-md flex items-center justify-center">
                  <HiOutlinePhoto className="text-lg"></HiOutlinePhoto>
                </div>
                {/* register your input into the hook by invoking the "register" function */}
                <input
                  type="text"
                  placeholder="Enter your photoURL"
                  className="w-full flex-1 pr-3 py-2 bg-transparent focus:outline-none font-poppins text-sm"
                  {...register("photo", { required: true })}
                />
              </div>
              {errors.name && (
                <small className="text-red-600 font-poppins">
                  PhotoURL is required
                </small>
              )}
              <input
                variant="contained"
                className="w-full py-3 rounded-md hover:bg-[#55b3ff] bg-[#77bef8] font-poppins cursor-pointer text-sm"
                type="submit"
                value="Sign up"
              />
            </div>
          </form>
          <small className="font-poppins dark:text-white">
            Already have an account?
            <Link to="/login">
              <span className="hover:underline ml-1 hover:text-[#77bef8]">
                Login
              </span>
            </Link>
          </small>
          <div className="flex items-center my-3">
            <div className="w-full border-b "></div>
            <p className="px-3 font-poppins text-sm dark:text-white">OR</p>
            <div className="w-full border-b "></div>
          </div>

          <LoginWithSocials></LoginWithSocials>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
