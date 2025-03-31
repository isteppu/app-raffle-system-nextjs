"use client";
import React, { useState } from "react";
import moment from "moment";
import { signIn } from "next-auth/react";
import swal from "sweetalert";
import { useRouter } from "next/navigation";
import axios from "axios";

const page = () => {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [drawDate, setDrawDate] = useState("");
  const [drawWeek, setDrawWeek] = useState("")
  const [loginError, setLoginError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const dateSelection = [
    { date: "2025-06-06", week: "WEEK-A1-FRI" },
    { date: "2025-06-07", week: "WEEK-A1-SAT" },
    { date: "2025-06-13", week: "WEEK-A2-FRI" },
    { date: "2025-06-14", week: "WEEK-A2-SAT" },
    { date: "2025-06-20", week: "WEEK-A3-FRI" },
    { date: "2025-06-21", week: "WEEK-A3-SAT" },
    { date: "2025-06-27", week: "WEEK-A4-FRI" },
    { date: "2025-06-28", week: "WEEK-A4-SAT" },
    { date: "2025-07-04", week: "WEEK-B1-FRI" },
    { date: "2025-07-05", week: "WEEK-B1-SAT" },
    { date: "2025-07-11", week: "WEEK-B2-FRI" },
    { date: "2025-07-12", week: "WEEK-B2-SAT" },
    { date: "2025-07-18", week: "WEEK-B3-FRI" },
    { date: "2025-07-19", week: "WEEK-B3-SAT" },
    { date: "2025-07-25", week: "WEEK-B4-FRI" },
    { date: "2025-07-26", week: "WEEK-B4-SAT" },
    { date: "2025-08-01", week: "WEEK-C1-FRI" },
    { date: "2025-08-02", week: "WEEK-C1-SAT" },
    { date: "2025-08-08", week: "WEEK-C2-FRI" },
    { date: "2025-08-09", week: "WEEK-C2-SAT" },
    { date: "2025-08-15", week: "WEEK-C3-FRI" },
    { date: "2025-08-16", week: "WEEK-C3-SAT" },
    { date: "2025-08-22", week: "WEEK-C4-FRI" },
    { date: "2025-08-23", week: "WEEK-C4-SAT" },
    { date: "2025-08-29", week: "WEEK-C5-FRI" },
    { date: "2025-08-30", week: "WEEK-C5-SAT" },
    { date: "2025-09-05", week: "WEEK-D1-FRI" },
    { date: "2025-09-06", week: "WEEK-D1-SAT" },
    { date: "2025-09-12", week: "WEEK-D2-FRI" },
    { date: "2025-09-13", week: "WEEK-D2-SAT" },
    { date: "2025-09-19", week: "WEEK-D3-FRI" },
    { date: "2025-09-20", week: "WEEK-D3-SAT" },
    { date: "2025-09-26", week: "WEEK-D4-FRI" },
    { date: "2025-09-27", week: "WEEK-D4-SAT" },
    { date: "2025-10-03", week: "WEEK-E1-FRI" },
    { date: "2025-10-04", week: "WEEK-E1-SAT" },
    { date: "2025-10-10", week: "WEEK-E2-FRI" },
    { date: "2025-10-11", week: "WEEK-E2-SAT" },
    { date: "2025-10-17", week: "WEEK-E3-FRI" },
    { date: "2025-10-18", week: "WEEK-E3-SAT" },
    { date: "2025-10-24", week: "WEEK-E4-FRI" },
    { date: "2025-10-25", week: "WEEK-E4-SAT" },
    { date: "2025-10-31", week: "WEEK-E5-FRI" },
    { date: "2025-11-01", week: "WEEK-E5-SAT" },
    { date: "2025-11-07", week: "WEEK-F1-FRI" },
    { date: "2025-11-08", week: "WEEK-F1-SAT" },
    { date: "2025-11-14", week: "WEEK-F2-FRI" },
    { date: "2025-11-15", week: "WEEK-F2-SAT" },
    { date: "2025-11-21", week: "WEEK-F3-FRI" },
    { date: "2025-11-22", week: "WEEK-F3-SAT" },
    { date: "2025-11-28", week: "WEEK-F4-FRI" },
    { date: "2025-11-29", week: "WEEK-F4-SAT" },
    { date: "2025-12-05", week: "WEEK-G1-FRI" },
    { date: "2025-12-06", week: "WEEK-G1-SAT" },
    { date: "2025-12-12", week: "WEEK-G2-FRI" },
    { date: "2025-12-13", week: "WEEK-G2-SAT" },
    { date: "2025-12-19", week: "WEEK-G3-FRI" },
    { date: "2025-12-20", week: "WEEK-G3-SAT" },
    { date: "2025-12-30", week: "WEEK-H1-TUE" },
  ];

  const weeklyPrizes = [
    "2,000 PHP",
    "2,000 PHP",
    "2,000 PHP",
    "2,000 PHP",
    "2,000 PHP"
  ]

  const grandPrizes = [
    "3,000 PHP", // 1
    "3,000 PHP", // 2
    "3,000 PHP", // 3
    "3,000 PHP", // 4
    "3,000 PHP", // 5
    "3,000 PHP", // 6
    "3,000 PHP", // 7
    "3,000 PHP", // 8
    "3,000 PHP", // 9
    "3,000 PHP", // 10
    "3,000 PHP", // 11
    "3,000 PHP", // 12
    "3,000 PHP", // 13
    "3,000 PHP", // 14
    "3,000 PHP", // 15
    "3,000 PHP", // 16
    "3,000 PHP", // 17
    "3,000 PHP", // 18
    "3,000 PHP", // 19
    "3,000 PHP", // 20
    "5,000 PHP", // 21
    "5,000 PHP", // 22
    "5,000 PHP", // 23
    "5,000 PHP", // 24
    "5,000 PHP", // 25
    "5,000 PHP", // 26
    "5,000 PHP", // 27
    "5,000 PHP", // 28
    "5,000 PHP", // 29
    "5,000 PHP", // 30
    "5,000 PHP", // 31
    "5,000 PHP", // 32
    "5,000 PHP", // 33
    "5,000 PHP", // 34
    "5,000 PHP", // 35
    "5,000 PHP", // 36
    "5,000 PHP", // 37
    "5,000 PHP", // 38
    "5,000 PHP", // 39
    "5,000 PHP", // 40
    "10,000 PHP", // 41
    "10,000 PHP", // 42
    "10,000 PHP", // 43
    "10,000 PHP", // 44
    "10,000 PHP", // 45
    "10,000 PHP", // 46
    "10,000 PHP", // 47
    "10,000 PHP", // 48
    "10,000 PHP", // 49
    "10,000 PHP", // 50
    "10,000 PHP", // 51
    "10,000 PHP", // 52
    "10,000 PHP", // 53
    "10,000 PHP", // 54
    "10,000 PHP", // 55
    "10,000 PHP", // 56
    "10,000 PHP", // 57
    "10,000 PHP", // 58
    "10,000 PHP", // 59
    "10,000 PHP", // 60
    "10,000 PHP + 10,000 PHP (or 20,000 PHP)", // 61
    "15,000 PHP + 15,000 PHP (or 30,000 PHP)", // 62
    "25,000 PHP + 25,000 PHP (or 50,000 PHP)", // 63
    "iPhone 16 Pro Max (512GB)", // 64
    "Toyota Corolla Cross 1.8 G HEV CVT (or ₱1,000,000)" // 65
  ];

  const groupedDates = dateSelection.reduce((acc, item) => {
    const weekNumber =
      item.week.split("-")[0] === "GRAND"
        ? item.week.split("-")[0]
        : `${item.week.split("-")[0]}-${item.week.split("-")[1]}`;
    if (!acc[weekNumber]) {
      acc[weekNumber] = [];
    }
    acc[weekNumber].push({ date: item.date, fullWeek: item.week });
    return acc;
  }, {});

  const handleInputUsername = (e) => {
    setUsername(e.target.value);
  };

  const handleInputPassword = (e) => {
    setPassword(e.target.value);
  };

  const handleSelectDrawDate = (e) => {
    const value = JSON.parse(e.target.value)
    setDrawDate(value[0]);
    setDrawWeek(value[1])
  };

  const login = async (e) => {
    e.preventDefault();
    const userData = drawDate === "2025-12-30" ? JSON.stringify(grandPrizes) : JSON.stringify(weeklyPrizes)
    try {
      const loginRes = await signIn("credentials", {
        redirect: false,
        username,
        password,
        userData
      });
      console.log(loginRes)
      if (!loginRes.ok) {
        setLoginError(loginRes.error);
      } else {
        swal({
            title: "Login Success",
            icon: "success",
            closeOnClickOutside: false,
            closeOnEsc: false,
          }).then((e) => {
            router.push("/raffle")
          });
      }
    } catch (error) {
      console.log(error.error);
    }
  };

  return (
    <div className="flex justify-center align-center">
      <div className="md:card lg:card sm:card bg-base-100 w-96 lg:shadow-sm md:shadow-sm sm:shadow-sm md:mt-50 lg:mt-50 sm:mt-50">
        <div className="card-body">
          <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-10 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm text-center">
              <svg
                className="w-20 h-20 text-indigo-800 dark:text-white w-full"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  fillRule="evenodd"
                  d="M12 20a7.966 7.966 0 0 1-5.002-1.756l.002.001v-.683c0-1.794 1.492-3.25 3.333-3.25h3.334c1.84 0 3.333 1.456 3.333 3.25v.683A7.966 7.966 0 0 1 12 20ZM2 12C2 6.477 6.477 2 12 2s10 4.477 10 10c0 5.5-4.44 9.963-9.932 10h-.138C6.438 21.962 2 17.5 2 12Zm10-5c-1.84 0-3.333 1.455-3.333 3.25S10.159 13.5 12 13.5c1.84 0 3.333-1.455 3.333-3.25S13.841 7 12 7Z"
                  clipRule="evenodd"
                />
              </svg>

              <h2 className=" mt-5 text-center text-2xl dark:text-white tracking-tight text-gray-900">
                Sign in to draw raffle winners
              </h2>
            </div>

            <div className="mt-3 sm:mx-auto sm:w-full sm:max-w-sm">
              <form onSubmit={(e) => login(e)} className="space-y-4">
                <div>
                  <div className="mt-2">
                    <label className="input w-full">
                      <svg
                        className="w-6 h-6 text-gray-800 dark:text-white"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5 5a1 1 0 0 0 1-1 1 1 0 1 1 2 0 1 1 0 0 0 1 1h1a1 1 0 0 0 1-1 1 1 0 1 1 2 0 1 1 0 0 0 1 1h1a1 1 0 0 0 1-1 1 1 0 1 1 2 0 1 1 0 0 0 1 1 2 2 0 0 1 2 2v1a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V7a2 2 0 0 1 2-2ZM3 19v-7a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Zm6.01-6a1 1 0 1 0-2 0 1 1 0 0 0 2 0Zm2 0a1 1 0 1 1 2 0 1 1 0 0 1-2 0Zm6 0a1 1 0 1 0-2 0 1 1 0 0 0 2 0Zm-10 4a1 1 0 1 1 2 0 1 1 0 0 1-2 0Zm6 0a1 1 0 1 0-2 0 1 1 0 0 0 2 0Zm2 0a1 1 0 1 1 2 0 1 1 0 0 1-2 0Z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <select
                        value={drawDate}
                        className="grow text-gray-500"
                        required
                        onChange={handleSelectDrawDate}
                      >
                        <option disabled value="">
                          Pick draw date
                        </option>
                        {Object.keys(groupedDates).flatMap((week) => [
                          <optgroup
                            key={week}
                            label={
                              week.split("-")[1][0] === "A"
                                ? `1st Month ${week.split("-")[0]} ${
                                    week.split("-")[1][1]
                                  }`
                                : week.split("-")[1][0] === "B"
                                ? `2nd Month ${week.split("-")[0]} ${
                                    week.split("-")[1][1]
                                  }`
                                : week.split("-")[1][0] === "C"
                                ? `3rd Month ${week.split("-")[0]} ${
                                    week.split("-")[1][1]
                                  }`
                                : week.split("-")[1][0] === "D"
                                ? `4th Month ${week.split("-")[0]} ${
                                    week.split("-")[1][1]
                                  }`
                                : week.split("-")[1][0] === "E"
                                ? `5th Month ${week.split("-")[0]} ${
                                    week.split("-")[1][1]
                                  }`
                                : week.split("-")[1][0] === "F"
                                ? `6th Month ${week.split("-")[0]} ${
                                    week.split("-")[1][1]
                                  }`
                                : week.split("-")[1][0] === "G"
                                ? `7th Month ${week.split("-")[0]} ${
                                    week.split("-")[1][1]
                                  }`
                                : `GRAND DRAW`
                            }
                          >
                            ,
                            {...groupedDates[week].map((data) => (
                              <option
                                key={data.date}
                                value={JSON.stringify([
                                  data.date,
                                  data.fullWeek,
                                ])}
                              >
                                {moment(data.date).format("MMM DD, YYYY")} (
                                {moment(data.date).day() === 5
                                  ? "Friday"
                                  : moment(data.date).day() === 6
                                  ? "Saturday"
                                  : "Tuesday"}
                                )
                              </option>
                            ))}
                          </optgroup>,
                        ])}
                      </select>
                    </label>
                  </div>
                </div>

                <div>
                  <label className="input w-full">
                    <svg
                      className="w-6 h-6 text-gray-800 dark:text-white"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm-2 9a4 4 0 0 0-4 4v1a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-1a4 4 0 0 0-4-4h-4Z"
                        clipRule="evenodd"
                      />
                    </svg>

                    <input
                      id="username"
                      name="username"
                      type="username"
                      value={username}
                      onChange={handleInputUsername}
                      required
                      placeholder="Username"
                      autoComplete="username"
                      className="grow"
                    />
                  </label>
                </div>

                <div>
                  <div className="flex items-center justify-between">
                    <label className="input w-full">
                      <svg
                        className="w-6 h-6 text-gray-800 dark:text-white"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fillRule="evenodd"
                          d="M8 10V7a4 4 0 1 1 8 0v3h1a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h1Zm2-3a2 2 0 1 1 4 0v3h-4V7Zm2 6a1 1 0 0 1 1 1v3a1 1 0 1 1-2 0v-3a1 1 0 0 1 1-1Z"
                          clipRule="evenodd"
                        />
                      </svg>

                      <input
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={handleInputPassword}
                        required
                        placeholder="Password"
                        autoComplete="current-password"
                        className="grow"
                      />
                      <button type="button" className="cursor-pointer" onClick={() => setShowPassword(!showPassword)}>
                        { showPassword ? (
                          <svg
                            className="w-6 h-6 text-gray-800 dark:text-white"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="m4 15.6 3.055-3.056A4.913 4.913 0 0 1 7 12.012a5.006 5.006 0 0 1 5-5c.178.009.356.027.532.054l1.744-1.744A8.973 8.973 0 0 0 12 5.012c-5.388 0-10 5.336-10 7A6.49 6.49 0 0 0 4 15.6Z" />
                            <path d="m14.7 10.726 4.995-5.007A.998.998 0 0 0 18.99 4a1 1 0 0 0-.71.305l-4.995 5.007a2.98 2.98 0 0 0-.588-.21l-.035-.01a2.981 2.981 0 0 0-3.584 3.583c0 .012.008.022.01.033.05.204.12.402.211.59l-4.995 4.983a1 1 0 1 0 1.414 1.414l4.995-4.983c.189.091.386.162.59.211.011 0 .021.007.033.01a2.982 2.982 0 0 0 3.584-3.584c0-.012-.008-.023-.011-.035a3.05 3.05 0 0 0-.21-.588Z" />
                            <path d="m19.821 8.605-2.857 2.857a4.952 4.952 0 0 1-5.514 5.514l-1.785 1.785c.767.166 1.55.25 2.335.251 6.453 0 10-5.258 10-7 0-1.166-1.637-2.874-2.179-3.407Z" />
                          </svg>
                        ) : (
                          <svg
                            className="w-6 h-6 text-gray-800 dark:text-white"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <path
                              stroke="currentColor"
                              strokeWidth="2"
                              d="M21 12c0 1.2-4.03 6-9 6s-9-4.8-9-6c0-1.2 4.03-6 9-6s9 4.8 9 6Z"
                            />
                            <path
                              stroke="currentColor"
                              strokeWidth="2"
                              d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                            />
                          </svg>
                        )}
                      </button>
                    </label>
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    className="btn btn-active btn-primary w-full hover:bg-indigo-500"
                  >
                    Sign in
                  </button>
                </div>
              </form>
            </div>

            {loginError === "" ? (
              ""
            ) : (
              <div
                role="alert"
                className="alert mt-2 alert-error alert-soft sm:mx-auto sm:w-full sm:max-w-sm"
              >
                <span>Login Failed! Error: {loginError}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
