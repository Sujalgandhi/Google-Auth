import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { database } from "../FireBase/firebase";
import { doc, getDoc, updateDoc, addDoc, collection } from "firebase/firestore";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Form = () => {
    const [formData, setFormData] = useState({
        task: "",
        priority: "",
        startDate: "",
        endDate: "",
        notice: "",
    });

    const { id } = useParams();

    useEffect(() => {
        if (id) {
            getEditData();
        }
    }, [id]);

    const getEditData = async () => {
        try {
            const docRef = doc(database, "toDo", id);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                setFormData(docSnap.data());
            } else {
                toast.error("No such document!");
                console.error("No such document!");
            }
        } catch (error) {
            toast.error("Error fetching document: " + error.message);
            console.error("Error fetching document:", error.message);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (id) {
            await updateData();
        } else {
            await addData();
        }
    };

    const addData = async () => {
        try {
            const docRef = await addDoc(collection(database, "toDo"), formData);
            toast.success("Task added successfully!");
            console.log("Document added with ID:", docRef.id);
        } catch (error) {
            toast.error("Error adding task: " + error.message);
            console.error("Error adding document:", error.message);
        }
    };

    const updateData = async () => {
        try {
            const docRef = doc(database, "toDo", id);
            await updateDoc(docRef, formData);
            toast.success("Task updated successfully!");
            console.log("Document updated successfully!");
        } catch (error) {
            toast.error("Error updating task: " + error.message);
            console.error("Error updating document:", error.message);
        }
    };

    return (
        <div className="container mt-5">
            <div className="card shadow p-4">
                <h3 className="card-title text-center text-primary mb-4">
                    {id ? "Edit Task" : "Add Task"}
                </h3>
                <form onSubmit={handleSubmit}>
                    <div className="row">
                        <div className="col-md-6 mb-3">
                            <label htmlFor="task" className="form-label">
                                Task Name
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="task"
                                name="task"
                                value={formData.task}
                                onChange={handleChange}
                                placeholder="Enter Task Name"
                            />
                        </div>
                        <div className="col-md-6 mb-3">
                            <label htmlFor="priority" className="form-label">
                                Priority
                            </label>
                            <select
                                className="form-select"
                                id="priority"
                                name="priority"
                                value={formData.priority}
                                onChange={handleChange}
                            >
                                <option value="">Select Priority</option>
                                <option value="High">High</option>
                                <option value="Medium">Medium</option>
                                <option value="Low">Low</option>
                            </select>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6 mb-3">
                            <label htmlFor="startDate" className="form-label">
                                Start Date
                            </label>
                            <input
                                type="date"
                                className="form-control"
                                id="startDate"
                                name="startDate"
                                value={formData.startDate}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="col-md-6 mb-3">
                            <label htmlFor="endDate" className="form-label">
                                End Date
                            </label>
                            <input
                                type="date"
                                className="form-control"
                                id="endDate"
                                name="endDate"
                                value={formData.endDate}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="notice" className="form-label">
                            Notice
                        </label>
                        <textarea
                            rows="4"
                            className="form-control"
                            id="notice"
                            name="notice"
                            value={formData.notice}
                            onChange={handleChange}
                            placeholder="Enter additional details or comments"
                        ></textarea>
                    </div>
                    <div className="d-flex justify-content-between mt-4">
                        <button type="submit" className="btn btn-success px-4">
                            {id ? "Update Task" : "Add Task"}
                        </button>
                        <Link to="/show">
                            <button type="button" className="btn btn-primary px-4">
                                View Tasks
                            </button>
                        </Link>
                    </div>
                </form>
            </div>
            <ToastContainer />
        </div>
    );
};

export default Form;
