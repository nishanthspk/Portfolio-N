import { Canvas } from "@react-three/fiber";
import gsap from "gsap";
import Flip from "gsap/Flip";
import React, { useEffect } from "react";
import { Page } from "../../components/Page";
import { blue, green, yellow } from "../../utils";
import { Educations, Paragraph, SkillsWrapper, Text } from "./About.styled";
import { AboutItem } from "./AboutItem";
import Skills from "./SkillBall";
import JEC from "../../assets/images/JEC_logo.png";
import KVS from "../../assets/images/KVS_logo.png";
// import sos from "../../assets/images/KVS_LOGO.png";
import { useInView } from "react-intersection-observer";
import { useState } from "react";

export const About = () => {
  const { ref, inView } = useInView({});
  const [show, setShow] = useState(inView);
  useEffect(() => {
    setShow(inView);
  }, [inView]);

  useEffect(() => {
    gsap.registerPlugin(Flip);
    let cards = document.querySelectorAll(".about-item");
    cards.forEach((card, i) => {
      if (i === 0) {
        card.classList.add("active");
      }
      card.addEventListener("mouseenter", (e) => {
        if (card.classList.contains("active")) {
          return;
        }
        const state = Flip.getState(cards);
        cards.forEach((c) => {
          c.classList.remove("active");
        });
        card.classList.add("active");
        Flip.from(state, {
          duration: 0.5,
          ease: "elastic.out(1,0.9)",
          absolute: true,
        });
      });
    });
  }, []);
  return (
    <div ref={ref}>
      <Page header="About">
        <Text>
          <Paragraph>
            I'm a passionate programmer, who is always looking for new
            challenges to improve myself, also a team player, who is always
            ready to learn new things and help others.
            <br />With a focus on full-stack development and a knack for
            creative problem-solving, I offer comprehensive web development
            solutions tailored to your unique needs.
          </Paragraph>
          <Educations>
            <AboutItem
              color={blue}
              active
              data={{
                title: "JAYA ENGINEERING COLLEGE,CHENNAI",
                p: "Bachelors of Computer Engineering (2021-2025)",
                image: JEC,
              }}
            />
            <AboutItem
              color={green}
              data={{
                title: "KVS Matriculation Higher Secondary School,Virudhunagar",
                p: "High School (2019-2021)",
                image: KVS,
              }}
            />
            {/* <AboutItem
              color={yellow}
              data={{
                title: "School of Scholars, Nagpur",
                p: "Secondary Education (2007-2017)",
                image: sos,
              }} */}
            {/* /> */}
          </Educations>
        </Text>
        <SkillsWrapper>
          {show ? (
            <Canvas camera={{ position: [0, 0, 18] }}>
              <Skills />
            </Canvas>
          ) : (
            `${inView}`
          )}
        </SkillsWrapper>
      </Page>
    </div>
  );
};
