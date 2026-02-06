import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer
      className={`
      mt-auto
      flex
      xs:flex-col
      items-center
      w-full
      px-4xl
      xs:px-md
      pb-[6rem]
      xs:pb-2xl
      pt-4xl
      xs:pt-2xl
      bg-bg-1
      justify-between
      border-bg-body
      border-t-2
    `}
    >
      <h2 className="block h6 xs:mb-md">
        Snake Game Experience<br/>
        <span className="text-f-1 text">© 2026 Copyright Vlad. All rights reserved.</span>
      </h2>

      <div>
        <h2 className="h6">Connect with us</h2>

        <ul className="flex xs:flex-col xs:items-center xs:mt-md">
          <li className="mr-xs xs:mb-md"><a href="#" className="link">GitHub</a></li>
          <li className="mr-xs xs:mb-md"><a href="#" className="link">Twitter</a></li>
          <li className="mr-xs xs:mb-md"><a href="#" className="link">Privacy</a></li>
        </ul>
      </div>
    </footer>
  );
};
