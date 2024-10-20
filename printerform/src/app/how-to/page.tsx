import React from "react";
import folding from "../assets/IMG_7545.jpg";
import howto1 from "../assets/IMG_7606.jpg";
import howto2 from "../assets/IMG_7630.jpg";
import howto3 from "../assets/IMG_7655.jpg";

const HowTo = () => {
  return (
    <div className="min-h-screen w-full bg-white p-40">
      <h1 className="text-8xl font-bold mt-20 mb-10 text-center text-black">
        Instructions
      </h1>

      {/* Step 1: Upload */}
      <div className="mb-10 flex items-center space-x-6">
        <div className="w-80 h-80 bg-gray-300 flex-shrink-0"></div>
        <div>
          <h2 className="text-5xl mb-5 text-black">1. Upload</h2>
          <p className="text-xl text-black">
            Using any 3D modeling software or 3D print gallery site, create or
            select your desired model. Export your chosen part as a STL file
            type. Then upload your STL to PrinterForm.
          </p>
        </div>
      </div>

      {/* Step 2: Modify */}
      <div className="mb-10 flex items-center space-x-6">
        <div>
          <h2 className="text-5xl mb-5 text-black">2. Modify</h2>
          <p className="text-xl text-black">
            Once you've uploaded your file, select the layout that best fits
            your object. After selecting the layout, you can modify your
            selection using the drop-down tools and sliders located on the right
            of your file preview.
          </p>
        </div>
        <div className="w-80 h-80 bg-gray-300 flex-shrink-0"></div>
      </div>

      {/* Step 3: Download */}
      <div className="mb-10 flex items-center space-x-6">
        <div className="w-80 h-80 bg-gray-300 flex-shrink-0"></div>
        <div>
          <h2 className="text-5xl mb-5 text-black">3. Download</h2>
          <p className="text-xl text-black">
            After finalizing your selections and file layout, confirm after
            viewing your print preview and select download as a PDF file type.
            Save your file in an accessible place to use for printing.
          </p>
        </div>
      </div>

      {/* Step 4: Print and Fold */}
      <div className="mb-10 flex items-center space-x-6">
        <div>
          <h2 className="text-5xl mb-5 text-black">4. Print and Fold</h2>
          <p className="text-xl text-black">
            Using a standard inkjet or laser printer and 8.5” x 11” paper, print
            your saved PDF. Once you've printed out your PDF, use the dots and
            lines shown as instructions for how to fold the sheet into your 3D
            object. (Note that the locations of the lines and dots will change
            based on the size and shape of your file as well as the layout type
            you selected.)
          </p>
        </div>
        <img
          className="w-80 h-80 bg-gray-300 object-cover flex-shrink-0"
          src={folding.src}
          alt=""
        ></img>
      </div>

      <div className="flex flex-col items-center mt-[100px]">
        <div className="gap-[60px] flex">
          <img
            src={howto1.src}
            alt="foursided"
            className="bg-white-400 w-[300px] h-[200px] rounded drop-shadow"
          ></img>
          <img
            src={howto2.src}
            alt="all examples"
            className="bg-white-400 w-[300px] h-[200px] rounded drop-shadow"
          ></img>
          <img
            src={howto3.src}
            alt="curved Bunny"
            className="bg-white-400 w-[300px] h-[200px] rounded drop-shadow"
          ></img>
        </div>
      </div>
    </div>
  );
};

export default HowTo;
