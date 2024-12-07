import axios from "axios";
import { useEffect, useState } from "react";

const Showuser = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const token = localStorage.getItem("token");

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:8080/user/", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setData(response.data);
      console.log(">>>>response>>>>>>", response);
    } catch (error) {
      console.log("Error in fetching", error);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this user?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:8080/user/${id}`,{headers: { Authorization: `Bearer ${token}` },});
      alert("User deleted successfully!");
      setData(data.filter((user) => user._id !== id));
    } catch (error) {
      console.error("Error deleting user:", error);
      alert("Failed to delete user.");
    }
  };

  return (
    <div className="vh-100 bg-info-subtle">
      <div className="container">
        <div className="row">
          <div className="table-responsive">
            <h1 className="text-center my-3">User List</h1>
            <table className="table">
              <thead className="table-primary">
                <tr>
                  <th>S.No</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Date of Birth</th>
                  <th>Role</th>
                  <th>CreateAt</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item, index) => (
                  <tr key={item._id}>
                    <td>{index + 1}</td>
                    <td><i className="fa fa-user-circle"style={{ fontSize: '25px', padding: '5px' }}></i>{item.name}</td>
                    <td>{item.email}</td>
                    <td>{new Date(item.dateOfBirth).toISOString().split("T")[0]}</td>
                    <td>{item.role}</td>
                    <td>{new Date(item.createdAt).toISOString().split("T")[0]}</td>
                    <td>
                      <i
                        className="fa fa-trash text-danger cursor-pointer"
                        onClick={() => handleDelete(item._id)}
                        style={{ cursor: "pointer" }}
                      ></i>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Showuser;
