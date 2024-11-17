import React from "react";
import xinyu from "../assets/Xinyu.jpeg";
import havi from "../assets/havi.jpeg";
import lynda from "../assets/lynda.jpeg";
import jackie from "../assets/jackie.jpeg";
import sophia from "../assets/sophia.jpeg";

const About = () => {
  return (
    <div className="min-h-screen w-full bg-white p-40">
      <div className="flex flex-col items-center">
        <h1
          style={{ color: "#40001C" }}
          className="font-fatfrank text-8xl mt-15 mb-32 text-center"
        >
          About
        </h1>
      </div>
      <div className="max-w-7xl w-full mx-auto">
        <h2 style={{ color: "#40001C" }} className="text-6xl text-left mb-12">
          Our Team
        </h2>
        <div className="flex justify-start space-x-10 mb-12">
          <div>
            <img
              src="https://printerform.com/pictures/profiles/IanGonsher.jpg"
              alt="Ian Gonsher"
              className="object-cover max-w-[300px] min-w-[300px] min-h-[350px] max-h-[350px] w-full h-auto"
            />
            <p
              style={{ color: "#40001C" }}
              className="text-left text-4xl font-bold mt-8 text-xl"
            >
              Ian Gonsher
            </p>
            <p style={{ color: "#40001C" }} className="text-left text-lg mt-4">
              Ian Gonsher is Assistant Professor of Practice in the School of
              Engineering and Department of Computer Science at Brown
              University. His teaching and research interests examine creative
              process as applied to interdisciplinary design practices, and the
              development of emerging and speculative technologies. Visit Ian&apos;s
              website{" "}
              <a
                href="www.gonsherdesign.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-800 underline"
                style={{ color: "#a280ff" }}
              >
                here
              </a>
              .
            </p>
          </div>
          <div>
            <img
              src={xinyu.src}
              alt="Xinyu Zhou"
              className="object-cover max-w-[300px] min-w-[300px] min-h-[350px] max-h-[350px] w-full h-auto"
            />
            <p
              style={{ color: "#40001C" }}
              className="text-left text-4xl font-bold mt-8 text-xl"
            >
              Xinyu Zhou
            </p>
            <p style={{ color: "#40001C" }} className="text-left text-lg mt-4">
              Xinyu Zhou is a master’s student at Brown University studying
              Computer Science and a graduate of the University of
              Wisconsin-Madison. She is passionate about merging creativity with
              technology through UI/UX design. And she is also interested in the
              transformative potential of AI in healthcare.
            </p>
          </div>
          <div className="max-w-[300px]">
            <img
              src={lynda.src}
              alt="Lynda Umuhoza"
              className="object-cover max-w-[300px] min-w-[300px] min-h-[350px] max-h-[350px] w-full h-auto"
            />
            <p
              style={{ color: "#40001C" }}
              className="text-left text-4xl font-bold mt-8 text-xl"
            >
              Lynda Winnie Umuhoza
            </p>
            <p style={{ color: "#40001C" }} className="text-left text-lg mt-4">
              Lynda is a senior at Brown University studying Computer Science.
              She is from Kigali, Rwanda. Lynda is particularly interested in
              Artificial Intelligence, software principles, and the ethical use
              of technology.
            </p>
          </div>
        </div>
        <div className="flex justify-start space-x-10 mb-12">
          <div>
            <img
              src={havi.src}
              alt="Havi Nguyen"
              className="object-cover max-w-[300px] min-w-[300px] min-h-[350px] max-h-[350px] w-full h-auto"
            />
            <p
              style={{ color: "#40001C" }}
              className="text-left text-4xl font-bold mt-8 text-xl"
            >
              Havi Nguyen
            </p>
            <p style={{ color: "#40001C" }} className="text-left text-lg mt-4">
              Havi Nguyen is a junior at Brown University studying Computer
              Science, with a focus on the connection between user interaction
              and tech. She is fascinated by UI/UX design and enjoys creating
              intuitive digital experiences.
            </p>
          </div>
          <div>
            <img
              src={jackie.src}
              alt="Jaclyn Cohen"
              className="object-cover max-w-[300px] min-w-[300px] min-h-[350px] max-h-[350px] w-full h-auto"
            />
            <p
              style={{ color: "#40001C" }}
              className="text-left text-4xl font-bold mt-8 text-xl"
            >
              Jaclyn Cohen
            </p>
            <p style={{ color: "#40001C" }} className="text-left text-lg mt-4">
              Jaclyn Cohen is a junior at Brown University studying Computer
              Science and Visual Arts. She is passionate about intersections
              between technology and the arts. You can view her work{" "}
              <a
                href="https://jaclyncohen.dev/"
                target="_blank"
                rel="noopener noreferrer"
                className=" hover:text-blue-800 underline"
                style={{ color: "#a280ff" }}
              >
                here
              </a>
              .
            </p>
          </div>
          <div className="max-w-[300px]">
            <img
              src={sophia.src}
              alt="Sophia Lim"
              className="object-cover max-w-[300px] min-w-[300px] min-h-[350px] max-h-[350px] w-full h-auto"
            />
            <p
              style={{ color: "#40001C" }}
              className="text-left text-4xl font-bold mt-8 text-xl"
            >
              Sophia Lim
            </p>
            <p style={{ color: "#40001C" }} className="text-left text-lg mt-4">
              Sophia Lim is a junior at Brown University studying Computer
              Science - Economics. She is originally from Auckland, New Zealand
              and is particularly interested in AI, Design, and Human-Computer
              Interaction.
            </p>
          </div>
        </div>
        <div className="flex justify-start space-x-10 mb-12">
          <div className="max-w-[300px]">
            <img
              src="https://printerform.com/pictures/profiles/JoseSandoval.jpg"
              alt="Jose Sandoval"
              className="object-cover max-w-[300px] min-w-[300px] min-h-[350px] max-h-[350px] w-full h-auto"
            />
            <p
              style={{ color: "#40001C" }}
              className="text-left text-4xl font-bold mt-8 text-xl"
            >
              Jose Sandoval
            </p>
            <p style={{ color: "#40001C" }} className="text-left text-lg mt-4">
              Jose Sandoval is a Brown University student studying computer
              science and Portuguese and Brazilian Studies. He is passionate
              about information security and the intersection of social justice
              and media. His latest projects can be found{" "}
              <a
                href="linktr.ee/josesandoval018"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-800 underline"
                style={{ color: "#a280ff" }}
              >
                here
              </a>
              .
            </p>
          </div>
        </div>
        <h2
          style={{ color: "#40001C" }}
          className="mt-20 text-6xl text-left mb-12"
        >
          Past Contributors
        </h2>
        <div className="flex justify-start space-x-10 mb-12">
          <div className="max-w-[300px]">
            <img
              src="https://printerform.com/pictures/profiles/AlaraKalfazade.jpg"
              alt="Alara Kalfazade"
              className="object-cover max-w-[300px] min-w-[300px] min-h-[350px] max-h-[350px] w-full h-auto"
            />
            <p
              style={{ color: "#40001C" }}
              className="text-left text-4xl font-bold mt-8 text-xl"
            >
              Alara Kalfazade
            </p>
            <p style={{ color: "#40001C" }} className="text-left text-lg mt-4">
              Alara Kalfazade is a senior at Brown University studying Computer
              Science-Economics. She is from Istanbul, Turkey. She is passionate
              about UI/UX and graphic design. View Alara&apos;s website{" "}
              <a
                href="https://akalfaza.github.io/"
                target="_blank"
                rel="noopener noreferrer"
                className=" hover:text-blue-800 underline"
                style={{ color: "#a280ff" }}
              >
                here
              </a>
              .
            </p>
          </div>
          <div className="max-w-[300px]">
            <img
              src="https://printerform.com/pictures/profiles/CatherinaNiu.JPEG"
              alt="Catherina Niu"
              className="object-cover max-w-[300px] min-w-[300px] min-h-[350px] max-h-[350px] w-full h-auto"
            />
            <p
              style={{ color: "#40001C" }}
              className="text-left text-4xl font-bold mt-8 text-xl"
            >
              Catherina Niu
            </p>
            <p style={{ color: "#40001C" }} className="text-left text-lg mt-4">
              Ian Gonsher is Assistant Professor of Practice in the School of
              Engineering and Department of Computer Science at Brown
              University. His teaching and research interests examine creative
              process as applied to interdisciplinary design practices, and the
              development of emerging and speculative technologies.
            </p>
          </div>
          <div>
            <img
              src="https://printerform.com/pictures/profiles/KatieLynch.jpg"
              alt="Katie Lynch"
              className="object-cover max-w-[300px] min-w-[300px] min-h-[350px] max-h-[350px] w-full h-auto"
            />
            <p
              style={{ color: "#40001C" }}
              className="text-left text-4xl font-bold mt-8 text-xl"
            >
              Katie Lynch
            </p>
            <p style={{ color: "#40001C" }} className="text-left text-lg mt-4">
              Katie Lynch holds a BFA in Industrial Design from SCAD and is
              currently pursuing her MA in Design Engineering from RISD and
              Brown in a dual degree program. Her work primarily features
              physical products but she is excited by opportunities that allow
              for collaboration between the digital and physical realms of
              design. View Katie&apos;s website{" "}
              <a
                href="http://katielynchdesign.com"
                target="_blank"
                rel="noopener noreferrer"
                className=" hover:text-blue-800 underline"
                style={{ color: "#a280ff" }}
              >
                here
              </a>
              .
            </p>
          </div>
        </div>
        <div className="max-w-[300px]">
          <img
            src="https://printerform.com/pictures/profiles/VivianLi.jpg"
            alt="Vivian Li"
            className="object-cover max-w-[300px] min-w-[300px] min-h-[350px] max-h-[350px] w-full h-auto"
          />
          <p
            style={{ color: "#40001C" }}
            className="text-left text-4xl font-bold mt-8 text-xl"
          >
            Vivian Li
          </p>
          <p
            style={{ color: "#40001C" }}
            className="text-left text-lg mt-4"
          ></p>
        </div>
      </div>
    </div>
  );
};

export default About;
