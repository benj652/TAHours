/*
 * RoleChangePopup.tsx
 * This file contains the role change popup component
 * It is a popup that allows the user to change the role of a user
 */
import { useUpdateRoleTA } from "@/hooks";
import { useUpdateRoleProfessor } from "@/hooks/user/updateRoleHooks/useUpdateRoleProfessor";
import { useUpdateRoleStudent } from "@/hooks/user/updateRoleHooks/useUpdateRoleStudent";
import { authStore } from "@/store";
import { Modals, RolesConfig, User } from "@/types";
import { useEffect, useState } from "react";

// defines the props for the RoleChangePopup component
type RoleChangePopupProps = {
  selected: User;
};

/**
 * A popup to change the role of a user
 * @param selected - the user whose role is to be changed
 * @returns a dialog element containing the form to change the role of the user
 *
 * It opens when you click on a user from the searchable dropdown component
 *
 * It works by changing the role of the user to the selected role
 */
export const RoleChangePopup: React.FC<RoleChangePopupProps> = ({
  selected,
}) => {
  const [selectedRole, setSelectedRole] = useState(""); // the role selected by the user

  // function to handle the change in the selected role
  // This is called whenever hte user clicks on another item in the dropdown
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedRole(e.target.value); // sets the role to the clicked option
  };

  // For when the user selects a new user to change roles, sets the default role in the dropdown
  // to the role of the selected user
  useEffect(() => {
    if (selected.roles) setSelectedRole(selected.roles); // If statement prevents if selected is null
  }, [selected]); // Change everytime selected is changed

  const { userItems } = authStore(); // user items used for visual disply if they are allowed to change roles

  /** Makes sure frontend UI matches up with the following rules
   * - Admins cannot change their role
   *   - Professors can not change roles of other professors
   *   - No one can change the role of an admin
   */
  const roleChangeNotAllowed =
    selected.roles === RolesConfig.Admin ||
    (userItems.roles === RolesConfig.Professor &&
      selected.roles === RolesConfig.Professor);

  // Unpack hooks to update roles
  const { updateRoleTA, taLoading, taError } = useUpdateRoleTA();
  const { updateRoleStudent, studentLoading, studentError } =
    useUpdateRoleStudent();
  const { updateRoleProfessor, professorLoading, professorError } =
    useUpdateRoleProfessor();

  /** Function to handle the submission of the form
   *
   * It also closes the popup and calls hooks to change the role of the user
   */
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevents the page from reloading

    // console.log(selectedRole);
    // console.log(selected.roles);

    // close the modal
    // @ts-ignore
    document.getElementById(Modals.RoleChange)?.close();

    // If the user does not change the users role, do nothing on submit
    if (selectedRole === selected.roles) {
      return;
    }

    // make sure the user at least selected something
    if (!selectedRole) {
      return;
    }

    // Makes sure there is a selected target user/the selected target user is
    // loaded in
    if (!selected) return;

    // Makes sure the selected target user has an ID
    if (!selected._id) return;

    /// If the selected role is a TA, call the hook to update the role
    if (selectedRole === RolesConfig.Ta) {
      await updateRoleTA(selected._id); // This hook also updates the role in the user cache
    } else if (selectedRole === RolesConfig.Student) {
      await updateRoleStudent(selected._id); // This hook also updates the role in the user cache
    } else if (selectedRole === RolesConfig.Professor) {
      await updateRoleProfessor(selected._id); // This hook also updates the role in the user cache
    }
  };

  // HTML for the popup
  return (
    <dialog id={Modals.RoleChange} className="modal">
      <div className="modal-box">
        <form method="dialog">
          {/* if there is a button in form, it will close the modal */}
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
        </form>
        <h2 className="font-bold text-lg">
          Edit Role: {selected.firstName} {selected.lastName}
        </h2>
        <img
          src={selected.profilePic}
          alt="Profile"
          className="w-20 h-20 rounded-full"
        />
        <h3>Email: {selected.email}</h3>
        <p>Current Role: {selected.roles}</p>
        <form className="rounded-lg" onSubmit={handleSubmit}>
          <label className="block text-lg font-semibold mb-2">Set Role:</label>
          {roleChangeNotAllowed ? (
            <p>Cannot change role of this user</p>
          ) : (
            <div className="space-y-2">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="role"
                  value={RolesConfig.Student}
                  checked={selectedRole === RolesConfig.Student}
                  onChange={handleChange}
                  className="size-5 text-primary"
                />
                <span className="text-lg">Student</span>
              </label>
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="role"
                  value={RolesConfig.Ta}
                  checked={selectedRole === RolesConfig.Ta}
                  onChange={handleChange}
                  className="size-5 text-primary"
                />
                <span className="text-lg">TA</span>
              </label>
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="role"
                  value={RolesConfig.Professor}
                  checked={selectedRole === RolesConfig.Professor}
                  onChange={handleChange}
                  className="size-5 text-primary"
                />
                <span className="text-lg">Professor</span>
              </label>
            </div>
          )}

          {!roleChangeNotAllowed && (
            <button
              type="submit"
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Submit
            </button>
          )}
        </form>
      </div>
    </dialog>
  );
};
