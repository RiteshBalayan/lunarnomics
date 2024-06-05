import React, { useState, useEffect } from 'react';
import { Transition } from '@headlessui/react';
import Logo from './Logo';
import LaunchList from './LaunchList';
import CompanyList from './CompanyList';
import ProjectList from './ProjectList';

const SmallScreenSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }
  }, [isOpen]);

  return (
    <div className="relative">
      <div className="lg:hidden fixed inset-y-0 left-0 flex items-center ">
        <button
          onClick={toggleSidebar}
          className="bg-blue-500 text-white p-2 rounded-r-md z-50"
        >
          →
        </button>
      </div>
      
      <Transition
        show={isOpen}
        enter="transition ease-in-out duration-300 transform"
        enterFrom="-translate-x-full"
        enterTo="translate-x-0"
        leave="transition ease-in-out duration-300 transform"
        leaveFrom="translate-x-0"
        leaveTo="-translate-x-full"
      >
        <div
          className="fixed inset-y-0 left-0 bg-white w-4/5 p-4 shadow-lg z-50"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="relative h-full overflow-y-auto">
            <button
              onClick={toggleSidebar}
              className="absolute top-0 right-0 mt-4 mr-4 bg-red-500 text-white p-2 rounded-md"
            >
              ✕
            </button>
            <div className="p-4">
              {/* Content goes here */}
              <Logo />
              <LaunchList />
              <ProjectList />
              <CompanyList />
            </div>
          </div>
        </div>
      </Transition>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={toggleSidebar}
        ></div>
      )}
    </div>
  );
};

export default SmallScreenSidebar;
