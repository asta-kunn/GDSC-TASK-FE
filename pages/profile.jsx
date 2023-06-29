import React from 'react';

const ProfilePage = () => {
  return (
    <div className="md:container md:mx-auto">
      <div className="flex flex-col items-center justify-center">
        <p className="text-3xl font-bold py-6 text-black">Profile Page</p>
      </div>

      <div className="flex flex-col items-center justify-center">
        <img
          className="h-40 w-40 rounded-full"
          src="/profile.jpg"
          alt=""
        />
      </div>

      <div className="flex flex-col items-center justify-center">
        <p className="text-3xl font-bold py-6 text-black">Muhammad Rifqi Adli Gumay</p>
      </div>

      <div className="grid grid-cols-3 gap-4 mt-10">
        <div className="max-w-sm rounded overflow-hidden shadow-lg">
          <img className="w-full" src="/project1.png" alt="Project 1" />
          <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2 text-black">
              <a
                href="https://koko-space.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 transition-colors"
              >
                Link Deployment
              </a>
            </div>
          </div>
        </div>

        <div className="max-w-sm rounded overflow-hidden shadow-lg">
          <img className="w-full" src="/project2.png" alt="Project 2" />
          <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2 text-black">
              <a
                href="https://github.com/pbp-fasilkom-c02/kembangin-mobile"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 transition-colors"
              >
                Link Github
              </a>
            </div>
          </div>
        </div>

        <div className="max-w-sm rounded overflow-hidden shadow-lg">
          <img className="w-full" src="/project3.png" alt="Project 3" />
          <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2 text-black">
              <a
                href="https://github.com/pbp-fasilkom-c02/kembangin-mobile"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 transition-colors"
              >
                Link Github
              </a>
            </div>
          </div>
        </div>

        <div className="max-w-sm rounded overflow-hidden shadow-lg">
          <img className="w-full" src="/project4.png" alt="Project 4" />
          <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2 text-black">
              <a
                href="https://github.com/asta-kunn/EAN-13-Barcode-Generator"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 transition-colors"
              >
                Link Github
              </a>
            </div>
          </div>
        </div>

        <div className="max-w-sm rounded overflow-hidden shadow-lg">
          <img className="w-full" src="/project5.png" alt="Project 5" />
          <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2 text-black">
              <a
                href="https://github.com/entity-fragile/sepakbola"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 transition-colors"
              >
                Link Github
              </a>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ProfilePage;
