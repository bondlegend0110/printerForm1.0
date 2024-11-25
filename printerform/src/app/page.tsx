"use client";
import "../app/globals.css";
import fscube from "./assets/fscube-bunny.png";
import curved from "./assets/curved-bunny.png";
import foursided from "./assets/IMG_7563.jpg";
import curvedBunny from "./assets/IMG_7706.jpg";
import all from "./assets/IMG_7724.jpg";
import poster from "./assets/video_display.jpg";
// import introVideo from "./assets/introvideo3.mp4";

const Home = () => {
  return (
    <main className="flex flex-col min-h-screen w-full items-center justify-center  bg-[#fffffe] text-black gap-[60px] pb-[80px]">
      <section className="flex w-full relative">
        <section className="w-screen justify-center flex flex-col">
          <video
            controls
            loop
            className="w-[80%] self-center rounded"
            src="/introvideo3.mp4"
            poster={poster.src}
            style={{ objectFit: "cover" }}
          ></video>
        </section>
      </section>
      <section className="flex flex-col items-center justify-center px-[10%] pb-[24px] text-center">
        <h2
          className="font-fatfrank text-8xl pb-[30px]"
          style={{ color: "#40001C" }}
        >
          Mission
        </h2>
        <section className="flex flex-col items-center w-full">
          <p className="text-2xl w-[60%]" style={{ color: "#40001C" }}>
            We aim to create a more accessible tool that introduces basic 3D
            modeling and 3D printing into educational and creative spaces. It
            does not replace traditional plastic 3D printing but it hopefully
            provides an opportunity to create quick mock-ups, test, and iterate
            ideas. Using common materials like an inkjet or laser printer,
            8.5”x11” paper, and PrinterForm anyone can practice their 3D
            modeling skills and produce high speed, low resolution 3D objects.
          </p>
        </section>
      </section>

      <section className="flex flex-col items-center">
        <section className="gap-[60px] flex">
          <img
            src={foursided.src}
            alt="foursided"
            className="bg-white-400 w-[300px] h-[200px] rounded drop-shadow"
          ></img>
          <img
            src={all.src}
            alt="all examples"
            className="bg-white-400 w-[300px] h-[200px] rounded drop-shadow"
          ></img>
          <img
            src={curvedBunny.src}
            alt="curved Bunny"
            className="mb-[50px] bg-white-400 w-[300px] h-[200px] rounded drop-shadow"
          ></img>
        </section>
      </section>
      <section className="justify-center items-center">
        <button
          className="font-fatfrank text-7xl bg-red-600 rounded-xl px-[24px] py-[32px] text-white drop-shadow transform transition-all duration-300 ease-in-out hover:bg-red-500 hover:scale-105"
          style={{ backgroundColor: "#D80029" }}
        >
          <a href="how-to">GET STARTED</a>
        </button>
      </section>
    </main>
  );
};

export default Home;
