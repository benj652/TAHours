import { HTMLInputTypeAttribute, useState } from "react";

interface SearchableDropdownProps {
    options: string[];
    // onSelect: (option: string) => void;
    placeholder?: string;
}

export const SearchableDropdown = ({
    options,
    placeholder = "Search...",
}: SearchableDropdownProps) => {
    const [search, setSearch] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [selected, setSelected] = useState<string | null>(null);

    const filteredOptions = options.filter((option) =>
        option.toLowerCase().includes(search.toLowerCase()),
    );

    const handleClick = async (e: React.MouseEvent<HTMLLIElement, MouseEvent>, option: string) => {
        e.preventDefault();
        setSelected(option);
        setSearch(option);
        setIsOpen(false);
        document.getElementById("my_modal_3").showModal();
    }; 

    return (
        <div className="relative w-64">
            <input
                type="text"
                placeholder={placeholder}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onFocus={() => setIsOpen(true)}
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {isOpen && (
                <ul className="absolute w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-40 overflow-y-auto z-10">
                    {filteredOptions.length > 0 ? (
                        filteredOptions.map((option, index) => (
                            <li
                                key={index}
                                onClick={(e) => handleClick(e, option)}
                                className="p-2 cursor-pointer hover:bg-blue-500 hover:text-white"
                            >
                                {option}
                            </li>
                        ))
                    ) : (
                        <li className="p-2 text-gray-500">No results found</li>
                    )}
                </ul>
            )}
            <dialog id="my_modal_3" className="modal">
                <div className="modal-box">
                    <form method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                            ✕
                        </button>
                    </form>
                    <h3 className="font-bold text-lg">Edit Role: {selected}</h3>
                    <p className="py-4">Press ESC key or click on ✕ button to close</p>
                </div>
            </dialog>
        </div>
    );
};
