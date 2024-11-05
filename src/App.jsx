import { GoogleGenerativeAI } from "@google/generative-ai";
import { useState } from "react";

export default function App() {
  const apiKey = import.meta.env.VITE_API_KEY;
  console.log("API Key:", apiKey); // For testing purposes only
  console.log("All Env Variables:", import.meta.env);

  const genAI = new GoogleGenerativeAI(apiKey);
  const [inputValue, setInputValue] = useState("");
  const [promptResponses, setpromptResponses] = useState(["Hi there..!"]);

  const systemPrompt =
    "You are an assistant that provides plain text responses without any Markdown or special formatting symbols. Please respond with clear, plain text. When the input is ambiguous, ask for clarification.";

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const getResponseForGivenPrompt = async () => {
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      const result = await model.generateContent(
        systemPrompt + "\n\n" + inputValue
      );
      const response = await result.response;
      const text = await response.text();
      setpromptResponses([...promptResponses, text]);
      setInputValue(""); // Clear input after submission
    } catch (error) {
      console.log("Something Went Wrong");
    }
  };

  return (
    <div className="bg-[#DFF2EB] min-h-screen flex flex-col justify-between">
      <header className="w-full p-4 bg-[#48CFCB]  shadow-black shadow-md rounded-b-full fixed top-0">
        <h1 className="font-bold text-center text-3xl text-[#2e446b]">
          Simple Chatbot
        </h1>
        <p className="font-bold text-center text-sm text-[#2e446b]">
          Using Gemini API
        </p>
      </header>

      <main className="flex-1 mb-32 mt-24  p-4">
        {promptResponses.map((promptResponse, index) => (
          <div
            key={index}
            className="mt-4 p-4 font-bold border w-full bg-[#B9E5E8] border-[#7AB2D3] text-black text-left rounded-lg"
          >
            {promptResponse}
          </div>
        ))}
      </main>

      <footer className="w-full shadow-black shadow-inner p-4 fixed bottom-0 bg-[#48CFCB] rounded-2xl lg:rounded-t-full">
        <div className="flex justify-center">
          <textarea
            className="border  shadow-black shadow-inner  border-gray-500 rounded-full px-4 py-2 w-2/3 md:w-4/5 resize-none"
            name="Text1"
            rows="2"
            autoFocus
            value={inputValue}
            onChange={handleInputChange}
            placeholder="Ask Me Something You Want"
          ></textarea>
          <button
            type="submit"
            onClick={getResponseForGivenPrompt}
            className="ml-2 bg-[#B9E5E8] text-[#4A628A] border  rounded-full  border-gray-500 hover:bg-[#A8D4D6] hover:scale-105 px-10 py-1  shadow-black shadow-inner text-md"
          >
            Ask
          </button>
        </div>
        <div>
          <h1 className="text-center text-sm  text-[#2e446b] font-semibold pt-1">
            Build by Arun Jayaraman with React-Vite
          </h1>
        </div>
      </footer>
    </div>
  );
}
