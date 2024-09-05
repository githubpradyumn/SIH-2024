import React from "react";
import styled from "styled-components";
import Login from "./Login";

const Card = () => {
  return (
    <StyledContainer>
      <StyledWrapper>
        <div className="card">
          <div className="card-info">
            <p className="title">
              <Login />
            </p>
          </div>
        </div>
      </StyledWrapper>
    </StyledContainer>
  );
};

const StyledContainer = styled.div`
  min-height: 100vh;
  background-size: cover;
  color: white; /* Ensure text color is visible on background */
`;

const StyledWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh; /* Full height to center vertically */
  background-color: rgba(0, 0, 0, 0.5); /* Optional: add semi-transparent background for better text readability */

  .card {
    --background: linear-gradient(to right, #13b37f 40%, #11a3c8 100%);
    width: 25%;
    height: 50%;
    padding: 0.9px;
    border-radius: 0.7rem;
    overflow: visible;
    background: #f7ba2b;
    background: var(--background);
    position: relative;
    z-index: 1;
  }

  .card::after {
    position: absolute;
    content: "";
    top: -22px;
    left: 0px;
    right: 0;
    z-index: -1;
    height: 100%;
    width: 100%;
    transform: scale(0.76);
    filter: blur(34.5px);
    background: #f7ba2b;
    background: var(--background);
    transition: opacity 0.5s;
  }

  .card-info {
    --color: #1f1a1d;
    background: var(--color);
    color: var(--color);
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    overflow: visible;
    border-radius: 0.7rem;
  }

  .card .title {
    font-weight: light;
    letter-spacing: 0.2em;
    color: #fff; /* Ensure text color is visible on background */
  }

  /* Hover */
  .card:hover::after {
    opacity: 0.6;
    padding: 0.7rem 0;
    top: 18px;
    transition: 0.6s;
  }

  .card:hover .card-info {
    color: #fff9f9;
    transition: color 1s;
  }
`;

export default Card;
