"use client";

import { useState } from "react";

type AuthProps = {
  role: "customer" | "owner";
};

type Mode =
  | "signin"
  | "signup"
  | "forgot";

export default function Auth({
  role,
}: AuthProps) {

  const [mode, setMode] =
    useState<Mode>("signin");

  const [name, setName] = useState("");

  const [phone, setPhone] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [newPassword, setNewPassword] =
    useState("");

  const storageKey =
    role === "owner"
      ? "nikus_owner_users"
      : "nikus_customer_users";

  const loginKey =
    role === "owner"
      ? "nikus_owner"
      : "nikus_customer";

  const getUsers = () => {

    const users =
      localStorage.getItem(storageKey);

    return users
      ? JSON.parse(users)
      : [];

  };

  const signUp = () => {

    if (
      !name ||
      !phone ||
      !password
    ) {

      alert(
        "Enter name, phone and password"
      );

      return;

    }

    const users = getUsers();

    const exists = users.find(
      (user: any) =>
        user.phone === phone
    );

    if (exists) {

      alert(
        "Account already exists"
      );

      return;

    }

    const updatedUsers = [
      ...users,
      {
        name,
        phone,
        password,
        role,
      },
    ];

    localStorage.setItem(
      storageKey,
      JSON.stringify(updatedUsers)
    );

    alert(
      "Account created successfully"
    );

    setMode("signin");

    setName("");

    setPhone("");

    setPassword("");

  };

  const signIn = () => {

    if (!phone || !password) {

      alert(
        "Enter phone and password"
      );

      return;

    }

    const users = getUsers();

    const validUser = users.find(
      (user: any) =>
        user.phone === phone &&
        user.password === password
    );

    if (!validUser) {

      alert(
        "Invalid phone or password"
      );

      return;

    }

    localStorage.setItem(
      loginKey,
      JSON.stringify({
        loggedIn: true,
        role,
        name: validUser.name,
        phone:
          validUser.phone,
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
      !phone ||
      !newPassword
    ) {

      alert(
        "Enter phone and new password"
      );

      return;

    }

    const users = getUsers();

    const exists = users.find(
      (user: any) =>
        user.phone === phone
    );

    if (!exists) {

      alert(
        "No account found"
      );

      return;

    }

    const updatedUsers =
      users.map((user: any) =>
        user.phone === phone
          ? {
              ...user,
              password:
                newPassword,
            }
          : user
      );

    localStorage.setItem(
      storageKey,
      JSON.stringify(updatedUsers)
    );

    alert(
      "Password changed successfully"
    );

    setMode("signin");

    setPhone("");

    setNewPassword("");

  };

  return (

    <section className="min-h-screen bg-black text-white flex items-center justify-center px-4 sm:px-6 py-10">

      <div className="bg-orange-500 text-black p-6 sm:p-8 md:p-10 rounded-[35px] max-w-md w-full shadow-2xl">

        <p className="uppercase tracking-[0.3em] text-sm font-black">
          Nikus Andhra Kitchen
        </p>

        <h1 className="text-4xl sm:text-5xl font-black mt-4 leading-tight">

          {role === "owner"
            ? "OWNER"
            : "CUSTOMER"}

          <br />

          {mode === "signin"
            ? "SIGN IN"
            : mode === "signup"
            ? "SIGN UP"
            : "RESET PASSWORD"}

        </h1>

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
              className="w-full p-4 rounded-2xl text-lg outline-none"
            />

          )}

          <input
            type="tel"
            placeholder="Mobile Number"
            value={phone}
            onChange={(e) =>
              setPhone(
                e.target.value
              )
            }
            className="w-full p-4 rounded-2xl text-lg outline-none"
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
              className="w-full p-4 rounded-2xl text-lg outline-none"
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
              className="w-full p-4 rounded-2xl text-lg outline-none"
            />

          )}

        </div>

        {mode === "signin" && (

          <button
            onClick={signIn}
            className="w-full mt-8 bg-black text-white py-4 rounded-2xl text-xl font-black"
          >

            Sign In

          </button>

        )}

        {mode === "signup" && (

          <button
            onClick={signUp}
            className="w-full mt-8 bg-black text-white py-4 rounded-2xl text-xl font-black"
          >

            Create Account

          </button>

        )}

        {mode === "forgot" && (

          <button
            onClick={
              resetPassword
            }
            className="w-full mt-8 bg-black text-white py-4 rounded-2xl text-xl font-black"
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

    </section>

  );
}