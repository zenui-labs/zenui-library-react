import {SearchInput} from "./SearchInput";

const SearchInputExample = () => (
    <div className="flex w-full flex-col items-center gap-5">
        <SearchInput variant="icon" className="md:w-[80%]"/>
        <SearchInput variant="text" className="md:w-[80%]"/>
        <SearchInput variant="pill" className="md:w-[80%]"/>
    </div>
);

export default SearchInputExample;
