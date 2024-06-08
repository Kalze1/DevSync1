import React, { useState } from 'react';
import KnowledgeBaseNav from '../navs/KnowledgeBaseNav';

const KnowledgeBase = () => {
    const [knowledgeBaseData, setKnowledgeBaseData] = useState([
        {
            title: "ModuleNotFoundError: No module named 'psutil_psutil_windows'",
            description: "I'm trying to upload my python file to create a web apps on streamlit and run into a problem like this. I don't know what cause this problem and how to fix it. I need some advises to find the problem and fix it. Or i just code everything again?",
            tags: ["#python", "#streamline"],
            askedDate: "Feb 26, 2022, 6:00 AM",
            askedBy: {
                name: "Dagim Debebe",
                avatar: "https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
            },
            answeredBy: {
                name: "Kaleab Bekele",
                avatar: "https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
            },
            comments: [
                { text: "Hey How are you today?", user: "A" },
                { text: "Hey, Im good, you?", user: "A" },
                { text: "Hey How are you today?", user: "A" },
                { text: "Hey, Im good, you?", user: "A" }
            ]
        },
        {
            title: "Another Example Error",
            description: "This is another example of a problem description. It explains what the user is experiencing and asks for help.",
            tags: ["#example", "#error"],
            askedDate: "Mar 10, 2023, 9:00 AM",
            askedBy: {
                name: "John Doe",
                avatar: "https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
            },
            answeredBy: {
                name: "Jane Doe",
                avatar: "https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
            },
            comments: [
                { text: "Can you provide more details?", user: "B" },
                { text: "Sure, here are the details...", user: "A" },
                { text: "Thanks, that helps a lot!", user: "B" },
                { text: "You're welcome!", user: "A" }
            ]
        }
        // Add more items as needed
    ]);

    return (
        <div className="w-full">
            <KnowledgeBaseNav />

            {knowledgeBaseData.map((item, index) => (
                <div key={index} tabIndex={0} className="collapse collapse-arrow border border-base-300 bg-base-200 m-4 w-full">
                    <input type="checkbox" />
                    <div className="collapse-title text-xl font-medium">
                        {item.title}
                        <div className="stat flex">
                            <div className="stat-title"></div>
                            {item.tags.map((tag, i) => (
                                <div key={i} className="stat-desc">{tag}</div>
                            ))}
                        </div>
                    </div>
                    <div className="collapse-content">
                        <p>{item.description}</p>
                        <div className="stats bg-navbarBg mt-8">
                            <div className="stat">
                                <div className="stat-title">Asked:</div>
                                <div className="stat-desc">{item.askedDate}</div>
                            </div>
                            <div className="stat">
                                <div className="stat-figure text-secondary">
                                    <div className="avatar online">
                                        <div className="w-12 rounded-full">
                                            <img src={item.askedBy.avatar} alt={item.askedBy.name} />
                                        </div>
                                    </div>
                                </div>
                                <div className="stat-title">Asked by:</div>
                                <div className="stat-desc text-secondary">{item.askedBy.name}</div>
                            </div>
                            <div className="stat">
                                <div className="stat-figure text-secondary">
                                    <div className="avatar online">
                                        <div className="w-12 rounded-full">
                                            <img src={item.answeredBy.avatar} alt={item.answeredBy.name} />
                                        </div>
                                    </div>
                                </div>
                                <div className="stat-title">Answered by:</div>
                                <div className="stat-desc text-secondary">{item.answeredBy.name}</div>
                            </div>
                        </div>
                        <div className='divider'></div>
                        <div className="flex flex-col h-full overflow-x-auto mb-4">
                            <div className="flex flex-col h-full">
                                <div className="grid grid-cols-12 gap-y-2">
                                    {item.comments.map((comment, i) => (
                                        <div key={i} className={`col-start-${i % 2 === 0 ? '1' : '6'} col-end-${i % 2 === 0 ? '8' : '13'} p-3 rounded-lg`}>
                                            <div className="flex flex-row items-center">
                                                <div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">
                                                    {comment.user}
                                                </div>
                                                <div className={`relative ml-3 text-sm ${i % 2 === 0 ? 'bg-white' : 'bg-indigo-100'} py-2 px-4 shadow rounded-xl`}>
                                                    <div>{comment.text}</div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default KnowledgeBase;
