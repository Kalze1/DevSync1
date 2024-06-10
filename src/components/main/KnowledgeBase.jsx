import React, { useState, useEffect } from 'react';
import KnowledgeBaseNav from '../navs/KnowledgeBaseNav';
import axios from 'axios';

const KnowledgeBase = () => {
    const [data, setData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:3001/api/posts');
                setData(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []); // Empty dependency array means this effect runs once when the component mounts

    const filteredData = data.filter(item =>
        item.title?.toLowerCase().includes(searchTerm?.toLowerCase()) ||
        item.description?.toLowerCase().includes(searchTerm?.toLowerCase()) ||
        item.tags?.some(tag => tag.toLowerCase().includes(searchTerm?.toLowerCase()))
    );

    return (
        <div className="ml-24 mr-24 flex-1 p-4 overflow-y-auto">
            <KnowledgeBaseNav searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

            {filteredData.map((item, index) => (
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
                            {item.askedBy && (
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
                            )}
                            {item.answeredBy && (
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
                            )}
                        </div>
                        <div className='divider'></div>
                        <div className="flex flex-col h-full overflow-x-auto mb-4">
                            <div className="flex flex-col h-full">
                                <div className="grid grid-cols-12 gap-y-2">
                                    {item.comments.map((comment, i) => (
                                        <div key={i} className={`col-start-${i % 2 === 0 ? '1' : '6'} col-end-${i % 2 === 0 ? '8' : '13'} p-3 rounded-lg`}>
                                            <div className="flex flex-row items-center">
                                                <div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">
                                                    {comment.user.charAt(0).toUpperCase()}
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
