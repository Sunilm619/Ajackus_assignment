import React from "react";

const UserList = ({ users, isLoading, onEdit, onDelete }) => {
    if (isLoading) return <p>Loading users...</p>;

    return (
        <div>
            <table className="table-auto w-full border-collapse border border-gray-200">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="border p-2">ID</th>
                        <th className="border p-2">First Name</th>
                        <th className="border p-2">Last Name</th>
                        <th className="border p-2">Email</th>
                        <th className="border p-2">Department</th>
                        <th className="border p-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.id}>
                            <td className="border p-2">{user.id}</td>
                            <td className="border p-2">{user.name.split(" ")[0]}</td>
                            <td className="border p-2">{user.name.split(" ")[1]}</td>
                            <td className="border p-2">{user.email}</td>
                            <td className="border p-2">{user.company.name}</td>
                            <td className="border p-2">
                                <button
                                    className="text-blue-500 mr-2"
                                    onClick={() => onEdit(user)}
                                >
                                    Edit
                                </button>
                                <button
                                    className="text-red-500"
                                    onClick={() => onDelete(user.id)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default UserList;
