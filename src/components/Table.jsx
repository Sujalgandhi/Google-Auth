import React, { useEffect, useState } from "react";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { database } from "../FireBase/firebase";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Table = () => {
    const [data, setData] = useState([]);
    const navigate = useNavigate();

    // Fetch data from Firestore
    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const querySnapshot = await getDocs(collection(database, "toDo"));
            const fetchedData = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setData(fetchedData);
        } catch (error) {
            toast.error("Error fetching data: " + error.message);
            console.error("Error fetching data:", error.message);
        }
    };

    // Delete a document
    const handleDelete = async (id) => {
        try {
            await deleteDoc(doc(database, "toDo", id));
            setData(data.filter((item) => item.id !== id));
            toast.success("Task deleted successfully!");
        } catch (error) {
            toast.error("Error deleting task: " + error.message);
            console.error("Error deleting document:", error.message);
        }
    };

    // Navigate to edit form
    const editDataId = (id) => {
        navigate(`/${id}`);
    };

    return (
        <div className="container my-5">
            <div className="card shadow border-0 rounded">
                <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
                    <h3 className="mb-0">Task List</h3>
                    <Link to="/form">
                        <button className="btn btn-light btn-sm">
                            Add Task
                        </button>
                    </Link>
                </div>
                <div className="card-body">
                    <div className="table-responsive">
                        <table className="table table-hover">
                            <thead className="table-dark">
                                <tr>
                                    <th>#</th>
                                    <th>Task</th>
                                    <th>Priority</th>
                                    <th>Start Date</th>
                                    <th>End Date</th>
                                    <th>Notice</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.length === 0 ? (
                                    <tr>
                                        <td colSpan="7" className="text-center">
                                            No data available
                                        </td>
                                    </tr>
                                ) : (
                                    data.map((item, index) => (
                                        <tr key={item.id}>
                                            <td>{index + 1}</td>
                                            <td>{item.task}</td>
                                            <td>
                                                <span
                                                    className={`badge ${
                                                        item.priority ===
                                                        "High"
                                                            ? "bg-danger"
                                                            : item.priority ===
                                                              "Medium"
                                                            ? "bg-warning"
                                                            : "bg-success"
                                                    }`}
                                                >
                                                    {item.priority}
                                                </span>
                                            </td>
                                            <td>{item.startDate}</td>
                                            <td>{item.endDate}</td>
                                            <td>{item.notice}</td>
                                            <td>
                                                <button
                                                    className="btn btn-sm btn-outline-danger mx-1"
                                                    onClick={() =>
                                                        handleDelete(item.id)
                                                    }
                                                >
                                                    Delete
                                                </button>
                                                <button
                                                    className="btn btn-sm btn-outline-warning mx-1"
                                                    onClick={() =>
                                                        editDataId(item.id)
                                                    }
                                                >
                                                    Edit
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default Table;
