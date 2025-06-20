function Navbar({ onMenuClick }) {
    return (
        <div className="w-full h-16 px-4 flex items-center justify-between bg-gray-800 text-white">
            {/* Left Section: single button */}
            <div>
                <button onClick={onMenuClick} className="bg-gray-700 px-3 py-1 rounded hover:bg-black border-b-blue-950 shadow-blue-950 cursor-pointer " >☰</button>
            </div>

            {/* Right Section: multiple buttons aligned right */}
            <div className="flex items-center space-x-4">
                <button className="bg-gray-700 px-4 py-1 rounded hover:bg-black border-b-blue-950 shadow-blue-950 cursor-pointer">Home</button>
                <button className="bg-gray-700 px-4 py-1 rounded hover:bg-black border-b-blue-950 shadow-blue-950 cursor-pointer ">Signup</button>
                <div className="w-8 h-8 rounded-full bg-blue-500 border-2 border-white"></div> {/* Profile Icon */}
            </div>
        </div>
    );
}

export default Navbar;