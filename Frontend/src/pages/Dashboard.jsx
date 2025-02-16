import { useState, useEffect } from "react";
import axios from "axios";
import { FaUser, FaEdit, FaTrash } from "react-icons/fa";

export default function Dashboard() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [listItems, setListItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [refresh, setRefresh] = useState(true);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    dueDate: "",
  });

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  // Fetch tasks
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:5000/api/tasks", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setListItems(response.data);
      } catch (error) {
        console.error("Error fetching items:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, [refresh]);

  const handleInputChange = (e) => {
    setNewTask({ ...newTask, [e.target.name]: e.target.value });
  };

  // Add new tasks
  const addTask = async () => {
    if (!newTask.title || !newTask.description || !newTask.dueDate) {
      alert("All fields are required!");
      return;
    }

    try {
      const token = localStorage.getItem("token");

      const response = await axios.post(
        "http://localhost:5000/api/tasks",
        newTask,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      setRefresh((prev) => !prev);
      setNewTask({ title: "", description: "", dueDate: "" });
      closeModal();
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  // Delete a task
  const deleteTask = async (taskId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this task?"
    );
    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:5000/api/tasks/${taskId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setRefresh((prev) => !prev);
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  // Open Edit Modal
  const openEditModal = (task) => {
    setEditingTask(task);
    setEditModalOpen(true);
  };

  // Close Edit Modal
  const closeEditModal = () => {
    setEditModalOpen(false);
    setEditingTask(null);
  };

  // Handle Input Change for Edit Form
  const handleEditInputChange = (e) => {
    setEditingTask({ ...editingTask, [e.target.name]: e.target.value });
  };

  // Update Task
  const updateTask = async () => {
    if (
      !editingTask.title ||
      !editingTask.description ||
      !editingTask.dueDate
    ) {
      alert("All fields are required!");
      return;
    }
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `http://localhost:5000/api/tasks/${editingTask._id}`,
        editingTask,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      setRefresh((prev) => !prev);
      closeEditModal();
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <header className="bg-blue-600 p-4 text-white flex justify-between items-center shadow-md">
        <h1 className="text-xl font-semibold">Dashboard</h1>
        <div className="relative">
          <button
            onClick={toggleDropdown}
            className="flex items-center space-x-2 cursor-pointer"
          >
            <FaUser className="text-lg" />
            <span className="font-medium cursor-pointer">Shamim Al Mamun</span>
          </button>

          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-white shadow-md rounded-md overflow-hidden">
              <ul className="text-gray-700">
                <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">
                  <a href="/profile">Profile</a>
                </li>
                <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">
                  <a onClick={()=>{
                    localStorage.removeItem("token")
                  }} href="/login">Logout</a>
                </li>
              </ul>
            </div>
          )}
        </div>
      </header>

      <main className="p-6">
        <div className="bg-white shadow-md rounded-lg p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Task List</h2>
            <button
              onClick={openModal}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
            >
              Add Task
            </button>
          </div>

          {loading ? (
            <p className="text-gray-500">Loading tasks...</p>
          ) : (
            <ul>
              {listItems.map((task) => (
                <li
                  key={task._id}
                  className="flex justify-between items-center p-3 border-b last:border-none"
                >
                  <div>
                    <p className="font-medium">{task.title}</p>
                    <p className="text-sm text-gray-600">{task.description}</p>
                    <p className="text-xs text-gray-500">Due: {task.dueDate}</p>
                  </div>
                  <div className="space-x-3">
                    <button
                      onClick={() => openEditModal(task)}
                      className="text-blue-500 hover:text-blue-700 cursor-pointer"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => deleteTask(task._id)}
                      className="text-red-500 hover:text-red-700 cursor-pointer"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </main>

      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-lg font-semibold mb-4">Add New Task</h2>
            <div className="mb-3">
              <label className="block text-sm font-medium text-gray-700">
                Title
              </label>
              <input
                type="text"
                name="title"
                value={newTask.title}
                onChange={handleInputChange}
                className="w-full border rounded-md px-3 py-2 mt-1"
                placeholder="Enter task title"
              />
            </div>
            <div className="mb-3">
              <label className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                name="description"
                value={newTask.description}
                onChange={handleInputChange}
                className="w-full border rounded-md px-3 py-2 mt-1"
                placeholder="Enter task description"
              />
            </div>
            <div className="mb-3">
              <label className="block text-sm font-medium text-gray-700">
                Due Date
              </label>
              <input
                type="date"
                name="dueDate"
                value={newTask.dueDate}
                onChange={handleInputChange}
                className="w-full border rounded-md px-3 py-2 mt-1"
              />
            </div>
            <div className="flex justify-end space-x-2">
              <button
                onClick={closeModal}
                className="px-4 py-2 text-gray-600 bg-gray-200 rounded-md hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={addTask}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Add Task
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Task Modal */}
      {editModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-lg font-semibold mb-4">Edit Task</h2>
            <div className="mb-3">
              <label className="block text-sm font-medium text-gray-700">
                Title
              </label>
              <input
                type="text"
                name="title"
                value={editingTask.title}
                onChange={handleEditInputChange}
                className="w-full border rounded-md px-3 py-2 mt-1"
              />
            </div>
            <div className="mb-3">
              <label className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                name="description"
                value={editingTask.description}
                onChange={handleEditInputChange}
                className="w-full border rounded-md px-3 py-2 mt-1"
              />
            </div>
            <div className="mb-3">
              <label className="block text-sm font-medium text-gray-700">
                Due Date
              </label>
              <input
                type="date"
                name="dueDate"
                value={editingTask.dueDate}
                onChange={handleEditInputChange}
                className="w-full border rounded-md px-3 py-2 mt-1"
              />
            </div>
            <div className="mb-3">
              <label className="block text-sm font-medium text-gray-700">
                Status
              </label>
              <select
                name="status"
                value={editingTask.status}
                onChange={handleEditInputChange}
                className="w-full border rounded-md px-3 py-2 mt-1"
              >
                <option value="pending">Pending</option>
                <option value="completed">Completed</option>
              </select>
            </div>
            <div className="flex justify-end space-x-2">
              <button
                onClick={closeEditModal}
                className="px-4 py-2 text-gray-600 bg-gray-200 rounded-md hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={updateTask}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Update Task
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
