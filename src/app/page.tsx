"use client";

import { useState } from "react";

type Role = "customer" | "owner";
type Mode = "signin" | "signup" | "forgot";

export default function LoginPortal() {

  const [role, setRole] =
    useState<Role>("customer");

  const [mode, setMode] =
    useState<Mode>("signin");

  const [name, setName] =
    useState("");

  const [mobile, setMobile] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [newPassword, setNewPassword] =
    useState("");

  const usersKey =
    role === "owner"
      ? "nikus_owner_users"
      : "nikus_customer_users";

  const loginKey =
    role === "owner"
      ? "nikus_owner"
      : "nikus_customer";

  const getUsers = () => {

    const users =
      localStorage.getItem(usersKey);

    return users
      ? JSON.parse(users)
      : [];

  };

  const signUp = () => {

    if (
      !name ||
      !mobile ||
      !password
    ) {

      alert(
        "Enter name, mobile number and password"
      );

      return;

    }

    const users = getUsers();

    const exists = users.find(
      (user: any) =>
        user.mobile === mobile
    );

    if (exists) {

      alert(
        "Account already exists"
      );

      setMode("signin");

      return;

    }

    const updatedUsers = [
      ...users,
      {
        name,
        mobile,
        password,
        role,
      },
    ];

    localStorage.setItem(
      usersKey,
      JSON.stringify(updatedUsers)
    );

    alert(
      "Account created successfully"
    );

    setMode("signin");

    setName("");

    setMobile("");

    setPassword("");

  };

  const signIn = () => {

    if (
      !mobile ||
      !password
    ) {

      alert(
        "Enter mobile and password"
      );

      return;

    }

    const users = getUsers();

    const validUser = users.find(
      (user: any) =>
        user.mobile === mobile &&
        user.password === password
    );

    if (!validUser) {

      alert(
        "Invalid mobile number or password"
      );

      return;

    }

    localStorage.setItem(
      loginKey,
      JSON.stringify({
        loggedIn: true,
        role,
        name: validUser.name,
        mobile:
          validUser.mobile,
      })
    );

    if (role === "owner") {

      window.location.href =
        "/owner-dashboard";

    } else {

      window.location.href =
        "/customer-dashboard";

    }

  };

  const resetPassword = () => {

    if (
      !mobile ||
      !newPassword
    ) {

      alert(
        "Enter mobile number and new password"
      );

      return;

    }

    const users = getUsers();

    const exists = users.find(
      (user: any) =>
        user.mobile === mobile
    );

    if (!exists) {

      alert(
        "No account found"
      );

      return;

    }

    const updatedUsers =
      users.map((user: any) =>
        user.mobile === mobile
          ? {
              ...user,
              password:
                newPassword,
            }
          : user
      );

    localStorage.setItem(
      usersKey,
      JSON.stringify(updatedUsers)
    );

    alert(
      "Password reset successful"
    );

    setMode("signin");

    setMobile("");

    setNewPassword("");

  };

  return (

    <main className="min-h-screen bg-black text-white flex items-center justify-center px-4 sm:px-6 py-10">

      <div className="max-w-6xl w-full grid lg:grid-cols-2 gap-10 items-center">

        {/* LEFT SIDE */}

        <div>

          <p className="uppercase tracking-[0.35em] text-orange-400 text-sm font-black">
            Nikus Andhra Kitchen
          </p>

          <h1 className="text-5xl md:text-7xl font-black mt-6 leading-tight">
            LOGIN
            <br />
            PORTAL
          </h1>

          <p className="text-gray-400 text-lg md:text-xl mt-8 leading-9">
            Choose customer or owner access.
            Customers can order food and reserve tables.
            Owners can manage the menu and dashboard.
          </p>

          <div className="grid grid-cols-2 gap-5 mt-10">

            <button
              onClick={() => {

                setRole("customer");

                setMode("signin");

              }}
              className={`p-5 rounded-3xl font-black text-lg md:text-xl ${
                role === "customer"
                  ? "bg-orange-500 text-black"
                  : "bg-white text-black"
              }`}
            >

              Customer

            </button>

            <button
              onClick={() => {

                setRole("owner");

                setMode("signin");

              }}
              className={`p-5 rounded-3xl font-black text-lg md:text-xl ${
                role === "owner"
                  ? "bg-orange-500 text-black"
                  : "bg-white text-black"
              }`}
            >

              Owner

            </button>

          </div>

        </div>

        {/* RIGHT SIDE */}

        <div className="bg-orange-500 text-black rounded-[40px] p-6 sm:p-8 md:p-10 shadow-2xl">

          <h2 className="text-4xl md:text-5xl font-black leading-tight">

            {role === "owner"
              ? "Owner"
              : "Customer"}

            {" "}

            {mode === "signin"
              ? "Sign In"
              : mode === "signup"
              ? "Sign Up"
              : "Forgot Password"}

          </h2>

          <div className="mt-8 space-y-5">

            {mode === "signup" && (

              <input
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(e) =>
                  setName(
                    e.target.value
                  )
                }
                className="w-full p-5 rounded-2xl text-lg font-bold outline-none"
              />

            )}

            <input
              type="tel"
              placeholder="Mobile Number"
              value={mobile}
              onChange={(e) =>
                setMobile(
                  e.target.value
                )
              }
              className="w-full p-5 rounded-2xl text-lg font-bold outline-none"
            />

            {mode !== "forgot" && (

              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) =>
                  setPassword(
                    e.target.value
                  )
                }
                className="w-full p-5 rounded-2xl text-lg font-bold outline-none"
              />

            )}

            {mode === "forgot" && (

              <input
                type="password"
                placeholder="New Password"
                value={newPassword}
                onChange={(e) =>
                  setNewPassword(
                    e.target.value
                  )
                }
                className="w-full p-5 rounded-2xl text-lg font-bold outline-none"
              />

            )}

          </div>

          {mode === "signin" && (

            <button
              onClick={signIn}
              className="w-full mt-8 bg-black text-white py-5 rounded-2xl text-xl font-black"
            >

              Sign In

            </button>

          )}

          {mode === "signup" && (

            <button
              onClick={signUp}
              className="w-full mt-8 bg-black text-white py-5 rounded-2xl text-xl font-black"
            >

              Create Account

            </button>

          )}

          {mode === "forgot" && (

            <button
              onClick={
                resetPassword
              }
              className="w-full mt-8 bg-black text-white py-5 rounded-2xl text-xl font-black"
            >

              Reset Password

            </button>

          )}

          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-between text-center">

            <button
              onClick={() =>
                setMode(
                  "signin"
                )
              }
              className="font-black underline"
            >

              Sign In

            </button>

            <button
              onClick={() =>
                setMode(
                  "signup"
                )
              }
              className="font-black underline"
            >

              Sign Up

            </button>

            <button
              onClick={() =>
                setMode(
                  "forgot"
                )
              }
              className="font-black underline"
            >

              Forgot Password

            </button>

          </div>

        </div>

      </div>

    </main>

  );
}