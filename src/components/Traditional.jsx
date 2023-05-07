import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/dist/css/splide.min.css";
import { Link } from "react-router-dom";

function Traditional() {
  const [traditional, setTraditional] = useState([]);

  useEffect(() => {
    getTraditional();
  }, []);

  const getTraditional = async () => {
    const check = localStorage.getItem("traditional");

    if (check) {
      setTraditional(JSON.parse(check));
    } else {
      const api = await fetch(
        `https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_API_KEY}&number=9`
      );
      const data = await api.json();

      localStorage.setItem("popular", JSON.stringify(data.recipes));

      console.log(data);
      setTraditional(data.recipes);
    }
  };

  return (
    <div>
      <Wrapper>
        <h3>Traditional Pick</h3>
        <Splide
          options={{
            perPage: 4,
            arrows: false,
            pagination: "free",
            gap: "5rem",
          }}
        >
          {traditional.map((recipe) => {
            return (
              <SplideSlide key={recipe.id}>
                <Card>
                  <Link to={"/recipe/" + recipe.id}>
                    <p>{recipe.title}</p>
                    <img src={recipe.image} alt={recipe.title} />
                  </Link>
                  <Gradient />
                </Card>
              </SplideSlide>
            );
          })}
        </Splide>
      </Wrapper>
    </div>
  );
}

const Wrapper = styled.div`
  margin: 4rem 0rem;
`;
const Card = styled.div`
  min-height: 25rem;
  border-radius: 2rem;
  overflow: hidden;

  img {
    border-radius: 2rem;
    position: 0;
    width: 100%;
    height: 100%
    object-fit: cover
  }
  p {
     position: absolute;
     z-index: 10;
     left: 50%;
     botton: 0%;
     transform: translate(-50%, 0%);
     color: white;
     widht: 100%;
     text-align: center;
     font-size: 1rem;
     height: 40%;
     display: flex;
     justify-content: center;
     align-items: center;
  }
`;

const Gradient = styled.div`
z-index: 3;
position: absolute;
width: 100%:
height: 100%:
background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.5))
`;

export default Traditional;
