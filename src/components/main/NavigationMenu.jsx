import React from 'react';

const NavigationMenu = () => {
  return (
    <nav className="lg:hidden" aria-label="Global">
      <div className="mx-auto max-w-3xl space-y-1 px-2 pt-2 pb-3 sm:px-4">
        <a href="#" className="bg-gray-100 text-gray-900 block rounded-md py-2 px-3 text-base font-medium">Home</a>
        <a href="#" className="hover:bg-gray-50 block rounded-md py-2 px-3 text-base font-medium">Popular</a>
        <a href="#" className="hover:bg-gray-50 block rounded-md py-2 px-3 text-base font-medium">Communities</a>
        <a href="#" className="hover:bg-gray-50 block rounded-md py-2 px-3 text-base font-medium">Trending</a>
      </div>
      <div className="border-t border-gray-200 pt-4">
        {/* Add additional navigation links here */}
      </div>
    </nav>
  );
};

export default NavigationMenu;
