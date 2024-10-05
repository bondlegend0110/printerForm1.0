"use client";
import "../app/globals.css";

const Home = () => {
  return (
    <main className="flex flex-col min-h-screen w-full items-center justify-center  bg-[#fffffe] text-black gap-[80px] pb-[80px]">
      <section className="flex w-full relative">
        <section className="w-screen justify-center flex flex-col">
          <video
            autoPlay
            className="w-full rounded drop-shadow"
            src="/IntroVideoV2.mp4"
          ></video>
        </section>
      </section>
      <section className="flex flex-col items-center justify-center px-[10%] pb-[24px]">
        <h2 className="text-8xl pb-[30px]">Mission</h2>
        <section className="flex w-full">
          <div className="w-[15%] bg-green-400 h-[200px] rounded mr-[5%]"></div>
          <p className="text-2xl w-[60%]">
            We aim to create a more accessible tool that introduces basic 3D
            modeling and 3D printing into educational and creative spaces. It
            does not replace traditional plastic 3D printing but it hopefully
            provides an opportunity to create quick mock-ups, test, and iterate
            ideas. Using common materials like an inkjet or laser printer,
            8.5”x11” paper, and PrinterForm anyone can practice their 3D
            modeling skills and produce high speed, low resolution 3D objects.
          </p>
          <div className="w-[15%] bg-green-400 h-[200px] rounded ml-[5%]"></div>
        </section>
      </section>
      <section className="flex flex-col items-center">
        <h2 className="text-8xl pb-[30px]">Case Studies</h2>
        <section className="gap-[60px] flex">
          <div className="bg-green-400 w-[300px] h-[200px] rounded drop-shadow"></div>
          <div className="bg-blue-400 w-[300px] h-[200px] rounded drop-shadow"></div>
          <div className="bg-purple-400 w-[300px] h-[200px] rounded drop-shadow"></div>
        </section>
      </section>
      <section className="justify-center items-center">
        <button className="text-8xl bg-purple-600 rounded-xl px-[24px] py-[32px] text-white drop-shadow ">
          GET STARTED
        </button>
      </section>
    </main>
  );
};

export default Home;
