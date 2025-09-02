import Folderlist from "./Folderlist";
import Header from "./header";
import More from "./More";
import Recent from "./Recent";

function Menu() {

    return (
        <div className="flex flex-col px-2 gap-4 w-1/5  h-screen">
            <div className="headergroup sticky top-0 ">
                <Header />
                <Recent/>
            </div>
            <div className="flex-grow min-h-[20vh] overflow-auto [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-thumb]:bg-gray-400">
                <Folderlist />
            </div>
            <div className="moregroup sticky bottom-0">
                <More />
            </div>

        </div>
    );
}

export default Menu;
