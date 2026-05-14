import React from 'react';

const SideBar = () => {
    const recentChats = ['Chat 1', 'Chat 2', 'Chat 3'];

    return (
        <div className="w-64 h-full bg-zinc-800 flex flex-col p-2">
            {/* New Chat Button */}
            <div className="mb-4">
                <button className="w-full flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-white bg-zinc-700 rounded-md hover:bg-zinc-600 transition-colors">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                    </svg>
                    New Chat
                </button>
            </div>

            {/* Recent Chats */}
            <div className="flex-1 overflow-y-auto">
                <h2 className="text-xs font-semibold text-zinc-400 uppercase px-2 mb-2">Recent Chats</h2>
                <div className="space-y-1">
                    {recentChats.map((chat, index) => (
                        <a
                            key={index}
                            href="#"
                            className="block px-4 py-2 text-sm text-zinc-300 rounded-md hover:bg-zinc-700"
                        >
                            {chat}
                        </a>
                    ))}
                </div>
            </div>

            {/* User Profile */}
            <div className="border-t border-zinc-700 pt-2">
                <a href="#" className="flex items-center gap-3 px-4 py-3 hover:bg-zinc-700 rounded-md">
                    <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold">S</span>
                    </div>
                    <span className="text-sm font-medium text-white">shub</span>
                </a>
            </div>
        </div>
    );
};

export default SideBar;