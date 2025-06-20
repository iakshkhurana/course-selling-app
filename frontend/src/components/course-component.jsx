function Course({Label}){
    return (
        <div className="w-64 rounded-lg overflow-hidden shadow-lg bg-[rgb(92,114,133)] text-white m-4">
            <img className="w-full" src={Label.img} alt="Course Thumbnail"></img>
            <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">{Label.name}</div>
            </div>
            <div className="px-6 py-4">
                <div className="font-light text-blue-200">{Label.description}</div>
            </div>
            <div className="px-6 pt-4 pb-2">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full w-full">
                    Buy Now
                </button>
            </div>
        </div>
    );
}

export default Course;