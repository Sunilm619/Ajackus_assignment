import React, { useState, useEffect } from "react";

const UserForm = ({ selectedUser, onSave, onCancel }) => {
    const [user, setUser] = useState({
        id: null,
        firstName: "",
        lastName: "",
        email: "",
        company: { name: "" },
    });

    useEffect(() => {
        if (selectedUser) {
            const [firstName, lastName] = selectedUser.name.split(" "); // Split the name for editing
            setUser({
                id: selectedUser.id,
                firstName: firstName || "",
                lastName: lastName || "",
                email: selectedUser.email,
                company: { name: selectedUser.company.name || "" },
            });
        } else {
            setUser({
                id: null,
                firstName: "",
                lastName: "",
                email: "",
                company: { name: "" },
            });
        }
    }, [selectedUser]);

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === "companyName") {
            setUser((prev) => ({
                ...prev,
                company: { ...prev.company, name: value },
            }));
        } else {
            setUser((prev) => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!user.firstName || !user.lastName || !user.email || !user.company.name) {
            alert("Please fill in all fields");
            return;
        }

        const fullName = `${user.firstName} ${user.lastName}`;
        onSave({ ...user, name: fullName });
        setUser({ id: null, firstName: "", lastName: "", email: "", company: { name: "" } });
    };

    return (
        <form className="mt-4 p-4 border rounded" onSubmit={handleSubmit}>
            <h2 className="text-lg font-bold">
                {user.id ? "Edit User" : "Add New User"}
            </h2>
            <div className="mt-2">
                <label className="block text-sm">First Name:</label>
                <input
                    className="border p-2 w-full"
                    name="firstName"
                    value={user.firstName}
                    onChange={handleChange}
                    placeholder="Enter first name"
                />
            </div>
            <div className="mt-2">
                <label className="block text-sm">Last Name:</label>
                <input
                    className="border p-2 w-full"
                    name="lastName"
                    value={user.lastName}
                    onChange={handleChange}
                    placeholder="Enter last name"
                />
            </div>
            <div className="mt-2">
                <label className="block text-sm">Email:</label>
                <input
                    className="border p-2 w-full"
                    name="email"
                    value={user.email}
                    onChange={handleChange}
                    placeholder="Enter email"
                />
            </div>
            <div className="mt-2">
                <label className="block text-sm">Department:</label>
                <input
                    className="border p-2 w-full"
                    name="companyName"
                    value={user.company.name}
                    onChange={handleChange}
                    placeholder="Enter department name"
                />
            </div>
            <div className="mt-4 flex justify-end">
                <button
                    className="bg-gray-200 px-4 py-2 mr-2"
                    type="button"
                    onClick={onCancel}
                >
                    Cancel
                </button>
                <button
                    className="bg-blue-500 text-white px-4 py-2"
                    type="submit"
                >
                    Save
                </button>
            </div>
        </form>
    );
};

export default UserForm;
