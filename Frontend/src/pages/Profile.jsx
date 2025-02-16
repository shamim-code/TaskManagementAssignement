import { useState, useEffect } from "react";
import { FaUser, FaTimes } from "react-icons/fa";
import axios from "axios";

const Profile = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [refresh, setRefresh] = useState(true);
  const [updatedUser, setUpdatedUser] = useState({
    username: "",
    email: "",
    password: "",
  });

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
  const openModal = () => {
    setUpdatedUser(user);
    setIsModalOpen(true);
  };
  const closeModal = () => setIsModalOpen(false);

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setError("Unauthorized: No token found");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(
          "https://taskmanagementbackend-65fp.onrender.com/api/auth/profile",
          {
            headers: {
              Authorization: `Bearer ${token}`, // Send token in headers
            },
          }
        );

        setUser(response.data.user);
      } catch (err) {
        setError("Failed to fetch profile");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [refresh]);

  const handleUpdate = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      setError("Unauthorized: No token found");
      return;
    }

    try {
      const response = await axios.put(
        "https://taskmanagementbackend-65fp.onrender.com/api/auth/profile",
        updatedUser,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      setUser(response.data.user);
      setIsModalOpen(false);
    } catch (err) {
      setError("Failed to update profile");
    }
  };

  if (loading) return <div className="text-center mt-10">Loading...</div>;
  if (error)
    return <div className="text-center mt-10 text-red-500">{error}</div>;

  return (
    <div className="flex flex-col items-center gap-8 min-h-screen bg-gray-100">
      <header className="bg-blue-600 w-full p-4 text-white flex justify-between items-center shadow-md">
        <h1 className="text-xl font-semibold">Dashboard</h1>
        <div className="relative">
          <button
            onClick={toggleDropdown}
            className="flex items-center space-x-2 cursor-pointer"
          >
            <FaUser className="text-lg" />
            <span className="font-medium cursor-pointer">{user.name}</span>
          </button>

          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-white shadow-md rounded-md overflow-hidden">
              <ul className="text-gray-700">
                <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">
                  <a href="/profile">Profile</a>
                </li>
                <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">
                  <a href="/login">Logout</a>
                </li>
              </ul>
            </div>
          )}
        </div>
      </header>
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">
          Profile
        </h2>

        {/* Name Field */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            type="text"
            value={user.username}
            className="w-full border rounded-md px-3 py-2 mt-1 bg-gray-100"
            disabled
          />
        </div>

        {/* Email Field */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            value={user.email}
            className="w-full border rounded-md px-3 py-2 mt-1 bg-gray-100"
            disabled
          />
        </div>

        {/* Password Field */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            type="password"
            value="********"
            className="w-full border rounded-md px-3 py-2 mt-1 bg-gray-100"
            disabled
          />
        </div>

        {/* Edit Profile Button */}
        <div className="text-center">
          <button
            onClick={openModal}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Edit Profile
          </button>
        </div>
      </div>

      {/* Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative">
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-gray-600"
            >
              <FaTimes />
            </button>
            <h2 className="text-xl font-semibold text-center text-gray-700 mb-4">
              Edit Profile
            </h2>

            {/* Name Input */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                value={updatedUser.username}
                onChange={(e) =>
                  setUpdatedUser({ ...updatedUser, username: e.target.value })
                }
                className="w-full border rounded-md px-3 py-2 mt-1"
              />
            </div>

            {/* Email Input */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                value={updatedUser.email}
                onChange={(e) =>
                  setUpdatedUser({ ...updatedUser, email: e.target.value })
                }
                className="w-full border rounded-md px-3 py-2 mt-1"
              />
            </div>

            {/* Password Input */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                New Password
              </label>
              <input
                type="password"
                value={updatedUser.password}
                onChange={(e) =>
                  setUpdatedUser({ ...updatedUser, password: e.target.value })
                }
                className="w-full border rounded-md px-3 py-2 mt-1"
              />
            </div>

            {/* Update Button */}
            <div className="text-center">
              <button
                onClick={handleUpdate}
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
              >
                Update Profile
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
