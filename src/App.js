import React, { useState, useEffect } from "react";
import UserList from "./components/UserList";
import UserForm from "./components/UserForm";


const App = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("https://jsonplaceholder.typicode.com/users");
        if (!response.ok) throw new Error("Failed to fetch users.");
        const data = await response.json();
        setUsers(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const handleSaveUser = async (user) => {
    try {
      setIsLoading(true);
      const response = user.id
        ? await fetch(`https://jsonplaceholder.typicode.com/users/${user.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(user),
        })
        : await fetch("https://jsonplaceholder.typicode.com/users", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(user),
        });
      if (!response.ok) throw new Error("Failed to save user.");
      const savedUser = await response.json();
      if (user.id) {
        setUsers(users.map((u) => (u.id === user.id ? savedUser : u)));
      } else {
        setUsers([...users, savedUser]);
      }
      setSelectedUser(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteUser = async (id) => {
    try {
      setIsLoading(true);
      const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to delete user.");
      setUsers(users.filter((user) => user.id !== id));
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">User Management</h1>
      {error && <p className="text-red-500">{error}</p>}
      <UserList
        users={users}
        isLoading={isLoading}
        onEdit={(user) => setSelectedUser(user)}
        onDelete={handleDeleteUser}
      />
      <UserForm
        selectedUser={selectedUser}

        onSave={handleSaveUser}
        onCancel={() => setSelectedUser(null)}
      />
    </div>
  );
};

export default App;
