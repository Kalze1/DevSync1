import React from 'react'

const KnowledgeBaseNav = ({ searchTerm, setSearchTerm }) => {
    return (
        <div className="navbar bg-base-100">
            <div className="flex-1">
                <a className="btn btn-ghost text-xl">Knowledge base</a>
            </div>
            <div className="flex-none gap-2">
                <div className="form-control">
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Search posts..." className="input input-bordered w-24 md:w-auto" />
                </div>

            </div>
        </div>
    )
}

export default KnowledgeBaseNav