import { Canvas } from "@react-three/fiber";
import React, { useContext, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { NavbarContext } from "../../context";
import Dog from "./Dog";
import {
  AnimatedSpan,
  DogContainer,
  HomeWrapper,
  Name,
  Position,
  TextContainer,
} from "./Home.styled";

export const Home = () => {
  const { ref, inView } = useInView({
    threshold: 1,
  });

  const setPage = useContext(NavbarContext);

  useEffect(() => {
    if (inView) {
      setPage("home");
    }
  }, [inView]);

  const produceSpans = (name) => {
    return name.split("").map((letter, index) => (
      <AnimatedSpan
        index={index}
        letter={letter}
        aria-hidden="true"
        key={index}
      >
        {letter}
      </AnimatedSpan>
    ));
  };
  return (
    <HomeWrapper ref={ref} id="home-page">
      <TextContainer>
        <Name>Nishanth SPK</Name>
        <Position>
          <div className="text first" aria-label="Full Stack Developer">
            {produceSpans("Full Stack Developer")}
          </div>
          <div className="text second" aria-label="Web3 Enthusiast">
            {produceSpans("Web3 Enthusiast")}
          </div>
          {/* <div className="text second" aria-label="Open Source Contributer">
            {produceSpans("Open Source Contributer")}
          </div>
          <div className="text second" aria-label="Free-lancer">
            {produceSpans("Free-lancer")}
          </div> */}
        </Position>
      </TextContainer>
      <DogContainer>
        <Canvas camera={{ position: [5, 1 ,5] }}>
          <Dog />
        </Canvas>
      </DogContainer>
    </HomeWrapper>
  );
};
