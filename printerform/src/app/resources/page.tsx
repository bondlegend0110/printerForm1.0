import React from "react";
import tinkerCADLogo from "../assets/logo-tinkercad-256.png";
import fusion360Logo from "../assets/autodesk-fusion-360-logo-7F72A76397-seeklogo.com.png";
import thingiverseLogo from "../assets/thingiverse-logo.png";
import grabCADLogo from "../assets/large.jpg";
import xyzLogo from "../assets/xyzLogo.png";
import activityA from "../assets/activityA.png";
import activityB from "../assets/activityB.png";
import lessonA from "../assets/lessonA.png";
import casestudy1 from "../assets/IMG_7563.jpg";
import casestudy2 from "../assets/IMG_7706.jpg";
import casestudy3 from "../assets/IMG_7655.jpg";
import casestudy4 from "../assets/IMG_7724.jpg";

const Resources = () => {
  return (
    <div className="min-h-screen w-full bg-white p-10 mx-auto max-w-7xl">
      <h1
        style={{ color: "#40001C" }}
        className="font-fatfrank text-8xl font-bold mt-24 mb-20 text-center"
      >
        Resources
      </h1>

      <div className="mb-10 flex items-center space-x-6">
        <div>
          <h2 style={{ color: "#40001C" }} className="text-5xl mb-5">
            Using PrinterForm In The Classroom
          </h2>
          <p style={{ color: "#40001C" }} className="text-xl">
            With a focus on making 3D printing accessible through 2D printers,
            we have provided activities and lesson plans that introduce students
            to PrinterForm. Teachers can integrate our activities and lesson
            plans into their curriculum, guiding students on how to use
            PrinterForm in the classroom. This section serves as a detailed
            guide, providing step-by-step instructions on utilizing PrinterForm
            to create 3D forms using 2D printers.
          </p>
        </div>
      </div>

      <div className="mb-10 mt-20 items-center space-x-6">
        <div>
          <h2 style={{ color: "#40001C" }} className="text-5xl mb-5">
            Accessing 3D Files
          </h2>
          <p style={{ color: "#40001C" }} className="text-xl">
            Using the links below anyone can create original model files or
            search crowd sourced catalogs to find the perfect printable parts.
          </p>
          <div className="flex justify-center space-x-20 mt-6">
            <a
              href="https://www.tinkercad.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={tinkerCADLogo.src}
                alt="TinkerCAD Logo"
                className="w-40 h-40 object-contain"
              />
            </a>
            <a
              href="https://www.autodesk.com/products/fusion-360/overview?term=1-YEAR&tab=subscription"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={fusion360Logo.src}
                alt="Fusion 360 Logo"
                className="w-40 h-40 object-contain"
              />
            </a>
            <a
              href="https://www.thingiverse.com/about"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={thingiverseLogo.src}
                alt="Thingiverse Logo"
                className="w-40 h-40 object-contain"
              />
            </a>
            <a
              href="https://grabcad.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={grabCADLogo.src}
                alt="Grab CAD Logo"
                className="w-40 h-40 object-contain"
              />
            </a>
            <a
              href="https://www.xyzprinting.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={xyzLogo.src}
                alt="xyzPrinting Logo"
                className="w-40 h-40 object-contain mb-5"
              />
            </a>
          </div>
        </div>
      </div>

      <div className="mb-10 flex items-center space-x-6 mt-20">
        <div>
          <h2 style={{ color: "#40001C" }} className="text-5xl mb-5">
            Activities and Lesson Plans
          </h2>
          <p style={{ color: "#40001C" }} className="text-xl">
            Here are the activities and lesson plans that can be exercised in
            the classroom using PrinterForm. These lessons aim to introduce
            students to the fundamental concepts in a fun and engaging way.
          </p>
          <div className="flex justify-center space-x-4 mt-6">
            <div className="flex space-x-4">
              <div className="flex flex-col items-center w-80 h-80">
                <img
                  src={activityA.src}
                  alt="Activity A"
                  className="w-full h-full object-cover"
                />
                <a
                  href="/printerform_activitya.pdf"
                  className="mt-5  underline"
                  style={{ color: "#a280ff" }}
                >
                  Download Here
                </a>
              </div>
              <div className="flex flex-col items-center w-80 h-80">
                <img
                  src={activityB.src}
                  alt="Activity B"
                  className="w-full h-full object-cover"
                />
                <a
                  href="/printerform_activityb.pdf"
                  className="mt-5 underline"
                  style={{ color: "#a280ff" }}
                >
                  Download Here
                </a>
              </div>
              <div className="flex flex-col items-center w-80 h-80">
                <img
                  src={lessonA.src}
                  alt="Lesson A"
                  className="w-full h-full object-cover"
                />
                <a
                  href="printerform_lessona.pdf"
                  className="mt-5 mb-20 underline"
                  style={{ color: "#a280ff" }}
                >
                  Download Here
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <h2 style={{ color: "#40001C" }} className="text-5xl mb-5 mt-20">
        Case Studies
      </h2>
      <div className="mb-10 flex justify-center space-x-6">
        <div>
          <div className="flex justify-center space-x-4 mt-6">
            <div className="flex space-x-4">
              <div className="flex flex-col justify-center">
                <img
                  className="w-80 h-80 bg-gray-300 flex-shrink-0 object-cover"
                  src={casestudy1.src}
                />
              </div>
              <div className="flex flex-col items-center">
                <img
                  className="w-80 h-80 bg-gray-300 flex-shrink-0 object-cover"
                  src={casestudy2.src}
                />
              </div>
              <div className="flex flex-col items-center">
                <img
                  className="w-80 h-80 bg-gray-300 flex-shrink-0 object-cover"
                  src={casestudy3.src}
                />
              </div>
              <div className="flex flex-col items-center">
                <img
                  className="w-80 h-80 bg-gray-300 flex-shrink-0 object-cover"
                  src={casestudy4.src}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Resources;
