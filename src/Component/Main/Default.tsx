import def from "../../assets/default.svg";
function Default() {


    return (
        <div className="flex flex-col justify-center items-center w-3/5 h-screen p-12 gap-4 ">
            <div>
                <img src={def} alt="Default View" />
            </div>
            <div className="text-3xl font-bold">Select a Note to View</div>
            <div className="text-lg text-center">
                <p className="px-20">
                    Choose a note from the list on the left to view its contents,
                    or create a new note to add to your collection.
                </p>
            </div>
        </div>
    );
}

export default Default;
