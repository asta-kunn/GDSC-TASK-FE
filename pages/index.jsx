import React from 'react';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="text-5xl text-center py-10 text-black">Welcome to Home Page</div>
      <div className="flex justify-center">
        <button className="mr-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          <a href="/todos">Go to Todos</a>
        </button>
        <button className="ml-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          <a href="/profile">Go to Profile</a>
        </button>
      </div>
    </div>
  );
}
