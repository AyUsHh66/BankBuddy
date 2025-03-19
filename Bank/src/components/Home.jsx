import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      {/* Header Section */}
      <header className="bg-blue-600 text-white w-full py-6 text-center text-3xl font-bold shadow-lg">
        AI-Powered Branch Manager
      </header>

      {/* Main Content */}
      <div className="mt-10 bg-white p-8 rounded-2xl shadow-lg max-w-3xl text-center">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">
          Welcome to Your Virtual Banking Experience!
        </h2>
        <p className="text-gray-600 mb-6">
          Our AI-powered Branch Manager helps you apply for loans digitally with video interaction, 
          document submission, and instant eligibility checks.
        </p>

        {/* AI Video Section */}
       
        {/* <div className="mb-6">
          <video className="w-full rounded-lg shadow-md" controls>
            <source src="/welcome_intro.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <p className="text-gray-500 mt-2 text-sm">Meet your AI Branch Manager!</p>
        </div> */}

<video className="rounded-lg shadow-md" width="500" height="400" controls>
  <source src="/welcome_intro.mp4" type="video/mp4" />
  Your browser does not support the video tag.
</video>

        {/* Action Buttons */}
        <div className="flex flex-wrap justify-center gap-4">
          <Link to="/VideoInteraction">
            <button className="bg-blue-600 text-white px-6 py-3 rounded-xl shadow-md hover:bg-blue-700">
              Start Video Interaction
            </button>
          </Link>

          <Link to="/DocumentUpload">
            <button className="bg-green-500 text-white px-6 py-3 rounded-xl shadow-md hover:bg-green-600">
              Upload Documents
            </button>
          </Link>

          <Link to="/LoanEligibility">
            <button className="bg-purple-600 text-white px-6 py-3 rounded-xl shadow-md hover:bg-purple-700">
              Check Loan Eligibility
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
