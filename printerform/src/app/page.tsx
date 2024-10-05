"use client";
import "../app/globals.css";

const Home = () => {
  return (
    <main className="flex flex-col min-h-screen w-full items-center justify-center  bg-[#fffffe] text-black gap-[120px]">
      <section className="flex w-full h-[100px] relative">
        <section className="w-screen justify-center flex flex-col">
          <video
            autoPlay
            className="w-full rounded drop-shadow"
            src="/IntroVideoV2.mp4"
          ></video>
          {/* <b>
            {" "}
            <h1 className="sora-font text-9xl pb-[8px] text-purple-600">
              PrinterForm
            </h1>{" "}
          </b>
          <p className="text-2xl">Short tagline for PrinterForm</p> */}
        </section>
        {/* <section className="max-w-1/3 rounded">
          <video
            autoPlay
            className="w-full rounded drop-shadow"
            src="/IntroVideoV2.mp4"
          ></video>
        </section> */}
      </section>
      <section className="flex flex-col items-center pt-[300px] px-[24px] pb-[24px]">
        <h2 className="text-7xl pb-[30px]">Mission</h2>
        <section className="flex">
          <div className="w-[12%] bg-green-400 h-[200px] rounded mr-[60px]"></div>
          <p className="text-2xl w-2/3">
            We aim to create a more accessible tool that introduces basic 3D
            modeling and 3D printing into educational and creative spaces. It
            does not replace traditional plastic 3D printing but it hopefully
            provides an opportunity to create quick mock-ups, test, and iterate
            ideas. Using common materials like an inkjet or laser printer,
            8.5”x11” paper, and PrinterForm anyone can practice their 3D
            modeling skills and produce high speed, low resolution 3D objects.
          </p>
          <div className="w-[12%] bg-green-400 h-[200px] rounded ml-[60px]"></div>
        </section>
      </section>
      <section className="flex flex-col items-center">
        <h2 className="text-7xl pb-[30px]">Case Studies</h2>
        <section className="gap-[60px] flex">
          <div className="bg-green-400 w-[300px] h-[200px] rounded drop-shadow"></div>
          <div className="bg-blue-400 w-[300px] h-[200px] rounded drop-shadow"></div>
          <div className="bg-purple-400 w-[300px] h-[200px] rounded drop-shadow"></div>
        </section>
      </section>
      <section className="justify-center items-center">
        <button className="text-7xl bg-purple-600 rounded-xl px-[24px] py-[32px] text-white drop-shadow">
          GET STARTED
        </button>
      </section>
    </main>
  );
};

export default Home;
