import React from 'react'
import Avatar from './avatar'


const GroupChatBar = () => {
    return (

        <div className="container flex flex-col w-1/4 bg-white rounded-lg shadow dark:bg-gray-800">



            <ul className="flex flex-col divide-y divide">
                <label className="input input-bordered flex items-center gap-2 m-4">
                    <input type="text" className="grow" placeholder="Search" />
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" clipRule="evenodd" /></svg>
                </label>

                <li className="flex flex-row bg-white hover:bg-gray-200">
                    <div className="flex items-center flex-1 p-4 cursor-pointer select-none">
                        <div className="flex flex-col items-center justify-center w-10 h-10 mr-4">
                            <a href="#" className="relative block">
                                <Avatar />
                            </a>
                        </div>
                        <div className="flex-1 pl-1 mr-16">
                            <div className="font-medium dark:text-white">
                                React
                            </div>
                            <div className="text-sm text-gray-600 dark:text-gray-200">
                                <span className='text-blue-400'>Dave:</span> Text me when you get back
                            </div>
                        </div>
                        <div className="text-xs text-gray-600 dark:text-gray-200">
                            6:00 AM
                        </div>
                    </div>
                </li>
                <li className="flex flex-row bg-white hover:bg-gray-200">
                    <div className="flex items-center flex-1 p-4 cursor-pointer select-none">
                        <div className="flex flex-col items-center justify-center w-10 h-10 mr-4">
                            <a href="#" className="relative block">
                                <Avatar />

                            </a>
                        </div>
                        <div className="flex-1 pl-1 mr-16">
                            <div className="font-medium dark:text-white">
                                Svelte
                            </div>
                            <div className="text-sm text-gray-600 dark:text-gray-200">
                                Haney: Hello there, I was hopping if you could help me with something
                            </div>
                        </div>
                        <div className="text-xs text-gray-600 dark:text-gray-200">
                            6:00 AM
                        </div>
                    </div>
                </li>
                <li className="flex flex-row bg-white hover:bg-gray-200">
                    <div className="flex items-center flex-1 p-4 cursor-pointer select-none">
                        <div className="flex flex-col items-center justify-center w-10 h-10 mr-4">
                            <a href="#" className="relative block">
                                <Avatar />
                            </a>
                        </div>
                        <div className="flex-1 pl-1 mr-16">
                            <div className="font-medium dark:text-white">
                                Python
                            </div>
                            <div className="text-sm text-gray-600 dark:text-gray-200">
                                Sean: Marine Jeanne
                            </div>
                        </div>
                        <div className="text-xs text-gray-600 dark:text-gray-200">
                            6:00 AM
                        </div>
                    </div>
                </li>
                <li className="flex flex-row bg-white hover:bg-gray-200">
                    <div className="flex items-center flex-1 p-4 cursor-pointer select-none">
                        <div className="flex flex-col items-center justify-center w-10 h-10 mr-4">
                            <a href="#" className="relative block">
                                <Avatar />
                            </a>
                        </div>
                        <div className="flex-1 pl-1 mr-16">
                            <div className="font-medium dark:text-white">
                                Javascript
                            </div>
                            <div className="text-sm text-gray-600 dark:text-gray-200">
                                Dagi: He is here
                            </div>
                        </div>
                        <div className="text-xs text-gray-600 dark:text-gray-200">
                            6:00 AM
                        </div>
                    </div>
                </li>
            </ul>


            {/* <div className="absolute bottom-0 my-10">
    <a className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100 transition-colors duration-200 flex items-center py-2 px-8" href="#">
      <svg width={20} fill="currentColor" height={20} className="h-5 w-5" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
        <path d="M1088 1256v240q0 16-12 28t-28 12h-240q-16 0-28-12t-12-28v-240q0-16 12-28t28-12h240q16 0 28 12t12 28zm316-600q0 54-15.5 101t-35 76.5-55 59.5-57.5 43.5-61 35.5q-41 23-68.5 65t-27.5 67q0 17-12 32.5t-28 15.5h-240q-15 0-25.5-18.5t-10.5-37.5v-45q0-83 65-156.5t143-108.5q59-27 84-56t25-76q0-42-46.5-74t-107.5-32q-65 0-108 29-35 25-107 115-13 16-31 16-12 0-25-8l-164-125q-13-10-15.5-25t5.5-28q160-266 464-266 80 0 161 31t146 83 106 127.5 41 158.5z">
        </path>
      </svg>
      <span className="mx-4 font-medium">
        Support
      </span>
    </a>
  </div> */}
        </div>




    )
}

export default GroupChatBar