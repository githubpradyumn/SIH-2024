import React, { useContext, useEffect, useState } from "react";
import CardComponent from "./CardComponent";
import TwoCardComponent from "./TwoCardComponent";
import Social from "./SocialComponent";
import { useAuth0 } from "@auth0/auth0-react";
import { UserContext } from "../App";

const HeroSection = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const { isAuthenticated, user } = useContext(UserContext);

  useEffect(() => {
    // Update the date every 24 hours
    const intervalId = setInterval(() => {
      setCurrentDate(new Date());
    }, 24 * 60 * 60 * 1000); // 24 hours in milliseconds

    return () => clearInterval(intervalId);
  }, []);

  const formatDate = (date) => {
    return new Intl.DateTimeFormat("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(date);
  };

  useEffect(() => {
    console.log("user  logged in");
    console.log(user);
  }, [user]);
  return (
    <>
      {isAuthenticated ? (
        <div>
          <section className="text-center py-20 px-6 bg-fixed ">
            <h1 className="text-5xl font-bold mb-6">Introducing ChatGPT</h1>
            <p className="mb-6">{formatDate(currentDate)}</p>
            <div className="flex justify-center space-x-4 mb-10">
              <button className="bg-blue-500 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded">
                Try ChatGPT
              </button>
              <button className="bg-gray-800 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded">
                Download ChatGPT desktop
              </button>
            </div>
            <p className="text-lg mb-8">
              Free to use. Easy to try. Just ask and ChatGPT can help with
              writing, learning, brainstorming, and more.
            </p>
          </section>
          <div className="bg-custom-gradient text-white min-h-screen ">
            <CardComponent />
            <TwoCardComponent />
            <Social />
          </div>
        </div>
      ) : (
        <div>
          <h1>login first</h1>
        </div>
      )}
    </>
  );
};

export default HeroSection;
