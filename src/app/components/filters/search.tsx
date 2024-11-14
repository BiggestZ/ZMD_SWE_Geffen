import SearchBar from "./searchbar";

const SearchBlock : React.FC = () => {
    return (
        <div className = "flex fixed left-0 h-full bg-slate-200 overscroll-contain w-52 grid grid-cols-1 justify-top">
            <h2 className="grow-0">Search</h2>
            <p>Manual Search</p>
            <SearchBar  />
            <p>Search by Tags</p>
        </div>
    );
};

export default SearchBlock;