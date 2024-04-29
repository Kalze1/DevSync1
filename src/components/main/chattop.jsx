import React from 'react'
import Avatar from './avatar'
const chattop = () => {
    return (
        <div>
            <nav className="bg-white dark:bg-gray-800  shadow ">
                <div className="px-8 mx-auto max-w-7xl">
                    <div className="flex items-center justify-between h-16">
                        <div className=" flex items-center">
                            <a className="flex-shrink-0" href="/">

                            </a>
                            <div className="hidden md:block">
                                <div className="flex items-baseline">
                                    <a className="text-gray-300  hover:text-gray-800 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium" href="/#">
                                        <li className="flex flex-row">
                                            <div className="flex items-center flex-1 p-4 cursor-pointer select-none">
                                                <div className="flex flex-col items-center justify-center w-10 h-10 mr-4">
                                                    <a href="#" className="relative block">
                                                        <Avatar />
                                                    </a>
                                                </div>
                                                <div className="flex-1 pl-1 mr-16">
                                                    <div className="font-medium dark:text-white">
                                                        Jean Marc
                                                    </div>
                                                    <div className="text-sm text-gray-600 dark:text-gray-200">
                                                        online
                                                    </div>
                                                </div>

                                            </div>
                                        </li>
                                    </a>

                                </div>
                            </div>
                        </div>
                        <div className="block">
                            <div className="flex items-center ml-4 md:ml-6">
                                <a href="https://github.com/Charlie85270/tail-kit" className="p-1 text-gray-400 rounded-full focus:outline-none hover:text-gray-200 focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">

                                    <svg width="24px" height="24px" strokeWidth="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#000000"><path d="M18.1182 14.702L14 15.5C11.2183 14.1038 9.5 12.5 8.5 10L9.26995 5.8699L7.81452 2L4.0636 2C2.93605 2 2.04814 2.93178 2.21654 4.04668C2.63695 6.83 3.87653 11.8765 7.5 15.5C11.3052 19.3052 16.7857 20.9564 19.802 21.6127C20.9668 21.8662 22 20.9575 22 19.7655L22 16.1812L18.1182 14.702Z" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                                </a>
                                <div className="relative ml-3">
                                    <div className="relative inline-block text-left">
                                        <div>
                                            <button type="button" className="  flex items-center justify-center w-full rounded-md  px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-50 hover:bg-gray-50 dark:hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-gray-500" id="options-menu">
                                                <svg width="24px" height="24px" viewBox="0 0 24 24" strokeWidth="1.5" fill="none" xmlns="http://www.w3.org/2000/svg" color="#000000"><path d="M17 17L21 21" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /><path d="M3 11C3 15.4183 6.58172 19 11 19C13.213 19 15.2161 18.1015 16.6644 16.6493C18.1077 15.2022 19 13.2053 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11Z" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                                            </button>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex -mr-2 md:hidden">
                            <button className="text-gray-800 dark:text-white hover:text-gray-300 inline-flex items-center justify-center p-2 rounded-md focus:outline-none">

                            </button>
                        </div>
                    </div>
                </div>

            </nav>
        </div>
    )
}

export default chattop