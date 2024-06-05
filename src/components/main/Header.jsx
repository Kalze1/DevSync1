import React from 'react';
import SearchBar from './SearchBar';
import MobileMenuButton from './MobileMenuButton';
import DesktopMenu from './DesktopMenu';
import NavigationMenu from './NavigationMenu';

const Header = () => {
  return (
    <header className="bg-white shadow-sm lg:static lg:overflow-y-visible">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative flex justify-between lg:gap-8 xl:grid xl:grid-cols-12">
          <div className="flex md:absolute md:inset-y-0 md:left-0 lg:static xl:col-span-2">
            <div className="flex flex-shrink-0 items-center">
              <a href="#">
                <img className="block h-8 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=rose&shade=500" alt="Your Company" />
              </a>
            </div>
          </div>
          <div className="min-w-0 flex-1 md:px-8 lg:px-0 xl:col-span-6">
            <SearchBar />
          </div>
          <div className="flex items-center md:absolute md:inset-y-0 md:right-0 lg:hidden">
            <MobileMenuButton />
          </div>
          <div className="hidden lg:flex lg:items-center lg:justify-end xl:col-span-4">
            <DesktopMenu />
          </div>
        </div>
      </div>
      {/* <NavigationMenu /> */}
    </header>
  );
};

export default Header;
