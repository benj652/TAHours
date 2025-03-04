import { useEffect, useState } from "react";
import { useGetAllUsers } from "@/hooks";
import { Modals, PLACEHOLER_USER, User } from "@/types";
import { RoleChangePopup } from "./RoleChangePopup";

interface SearchableDropdownProps {
  // onSelect: (option: string) => void;
  placeholder?: string;
}

export const SearchableDropdown = ({
  placeholder = "Search...",
}: SearchableDropdownProps) => {
  const [search, setSearch] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<User | null>(PLACEHOLER_USER);

  const { getAllUsers, data: options } = useGetAllUsers();

  useEffect(() => {
    getAllUsers();
  }, []);

  const filteredOptions = options?.filter(
    (option) =>
      option.firstName.toLowerCase().includes(search.toLowerCase()) ||
      option.lastName.toLowerCase().includes(search.toLowerCase()) ||
      (
        option.firstName.toLowerCase() +
        " " +
        option.lastName.toLowerCase()
      ).includes(search.toLowerCase()),
  );

  const handleClick = async (
    e: React.MouseEvent<HTMLLIElement, MouseEvent>,
    option: User,
  ) => {
    e.preventDefault();
    setSelected(option);
    setSearch(option.firstName + " " + option.lastName);
    setIsOpen(false);
    document.getElementById(Modals.RoleChange).showModal();
  };

  if (!options) {
    return <div>Loading...</div>;
  }
  return (
    <div className="relative w-64">
      <input
        type="text"
        placeholder={placeholder}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onFocus={() => setIsOpen(true)}
        className="w-36 lg:w-56 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      {isOpen && (
        <ul className="absolute w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-40 overflow-y-auto z-10">
          {filteredOptions && filteredOptions.length > 0 ? (
            filteredOptions.map((option, index) => (
              <li
                key={index}
                onClick={(e) => handleClick(e, option)}
                className="p-2 cursor-pointer hover:bg-blue-500 hover:text-white"
              >
                {option.firstName} {option.lastName}
              </li>
            ))
          ) : (
            <li className="p-2 text-gray-500">No results found</li>
          )}
        </ul>
      )}
      {selected && <RoleChangePopup selected={selected} />}
    </div>
  );
};
