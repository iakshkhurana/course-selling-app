export default function Sidebar({ isOpen }) {
    return (
        <div
            className={`fixed top-0 my-16 left-0 h-full w-64 bg-gray-800 text-white p-4 transform ${
                isOpen ? "translate-x-0" : "-translate-x-full"
            } transition-transform duration-300 ease-in-out`}
        >
            <h2 className="text-2xl font-bold mb-4">Sidebar</h2>
            <ComponentButton label="📖 Courses" />
            <ComponentButton label="🛒 Cart" />
            <ComponentButton label="📚 My Learnings" />
            <ComponentButton label="⚙️ Settings" />
            <ComponentButton label="👤 Profile" />
        </div>
    );
}

function ComponentButton({ label }) {
    return (
        <div>
            <button className="w-full text-left p-2 mb-2 rounded hover:bg-gray-700">
                {label}
            </button>
        </div>
    );
}