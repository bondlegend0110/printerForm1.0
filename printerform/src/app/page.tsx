"use client";
import "../app/globals.css";
import fscube from "./assets/fscube-bunny.png";
import curved from "./assets/curved-bunny.png";
import foursided from "./assets/IMG_7563.jpg";
import curvedBunny from "./assets/IMG_7706.jpg";
import all from "./assets/IMG_7724.jpg";

const Home = () => {
  return (
    <main className="flex flex-col min-h-screen w-full items-center justify-center  bg-[#fffffe] text-black gap-[120px] pb-[80px]">
      <section className="flex w-full relative">
        <section className="w-screen justify-center flex flex-col">
          <video
            autoPlay
            className="w-full rounded drop-shadow"
            src="/IntroVideoV2.mp4"
          ></video>
        </section>
      </section>
      <section className="flex flex-col items-center justify-center px-[10%] pb-[24px] text-center">
        <h2 className="text-8xl pb-[30px]">Mission</h2>
        <section className="flex flex-col items-center w-full">
          {/* <img
            src={fscube.src}
            alt="FSCube Bunny"
            className="w-[30%] h-[350px] object-overflow mr-[5%] rounded"
          /> */}
          <p className="text-2xl w-[60%]">
            We aim to create a more accessible tool that introduces basic 3D
            modeling and 3D printing into educational and creative spaces. It
            does not replace traditional plastic 3D printing but it hopefully
            provides an opportunity to create quick mock-ups, test, and iterate
            ideas. Using common materials like an inkjet or laser printer,
            8.5”x11” paper, and PrinterForm anyone can practice their 3D
            modeling skills and produce high speed, low resolution 3D objects.
          </p>
          {/* <img
            src={curved.src}
            alt="Curved Bunny"
            className="w-[25%] h-[350px] object-contain ml-[5%] rounded"
          /> */}
        </section>
      </section>
      <section className="justify-center items-center">
        <button className="text-8xl bg-purple-600 rounded-xl px-[24px] py-[32px] text-white drop-shadow ">
          <a href="/how-to">GET STARTED</a>
        </button>
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
            className="bg-white-400 w-[300px] h-[200px] rounded drop-shadow"
          ></img>
        </section>
      </section>
    </main>
  );
};

export default Home;
