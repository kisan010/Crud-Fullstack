import axios from "axios";
import { useEffect, useRef, useState } from "react";
import swal from "sweetalert";
import { mutate } from "swr";

const Form = ({ updatedata }) => {
  let [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    file: null,
  });
  let [error, setError] = useState({ emailErr: "" });
  let [edit, handleedit] = useState(false);
  function handleonChange(e) {
    e.preventDefault();
    let { name, value, files } = e.target;
    setUser((prev) => {
      return { ...prev, [name]: files ? files[0] : value };
    });
  }
  const fileinputRef = useRef(null);
  console.log(fileinputRef);
  useEffect(() => {
    if (updatedata) {
      let { name, email, password } = updatedata;
      handleedit(true);
      setUser({ _id: updatedata._id, name, email, password });
    }
  }, [updatedata]);

  async function handlesubmit(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", user.name);
    formData.append("email", user.email);
    formData.append("password", user.password);
    if (user.file) {
      formData.append("profile", user.file);
    }
    try {
      const { data } = await axios.post(
        "https://crud-fullstack-33le.onrender.com/users",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      mutate("https://crud-fullstack-33le.onrender.com/users"); 
      swal("success", "user Created !", "success");
      setUser({ name: "", email: "", password: "", file: null });
      if (fileinputRef.current) {
        fileinputRef.current.value = "";
      }
    } catch (err) {
      setError({ emailErr: err });
      swal("Failed", "internal server Error!", "error");
    }
  }
  async function handleUpdate(e) {
    e.preventDefault();
    if (!updatedata || !updatedata._id) {
      swal("Error", "User ID is missing!", "error");
      return;
    }
    try {
      let { _id, name, email, password } = user;
      const formData = new FormData();
      formData.append("name", user.name);
      formData.append("email", user.email);
      formData.append("password", user.password);
      if (user.file) {
        formData.append("profile", user.file);
      }
      console.log(updatedata);
      await axios.put(`https://crud-fullstack-33le.onrender.com/users/${_id}`, 
        formData,
        {
           headers:{
            "Content-Type":"multiplepart/form-data"
          }
        }
    );
      swal("success", "updated user!", "success");
      setUser({ _id: "", name: "", email: "", password: "", file: null });
      if (fileinputRef.current) {
        fileinputRef.current.value = "";
      }
      mutate("https://crud-fullstack-33le.onrender.com/users");
      handleedit(false);
    } catch (err) {
      setError({ emailErr: err });
      swal("Failed", "unable to update!", "warning");
    }
  }

  return (
    <>
      <form className="formSetup" onSubmit={edit ? handleUpdate : handlesubmit}>
        <h1>Please Fill The form</h1>
        <div className="input-group">
          <label>Profile:</label>
          <input
            type="file"
            name="file"
            onChange={handleonChange}
            ref={fileinputRef}
          />
        </div>
        <div className="input-group">
          <label>Name:</label>
          <input
            type="text"
            name="name"
            onChange={handleonChange}
            value={user.name || ""}
          />
        </div>
        <div className="input-group">
          <label>Email:</label>
          <input
            type="text"
            name="email"
            onChange={handleonChange}
            value={user.email || ""}
          />
        </div>
        <small>{error.emailErr ? "Email already exist" : ""}</small>
        <div className="input-group">
          <label>Password:</label>
          <input
            type="text"
            name="password"
            onChange={handleonChange}
            value={user.password || ""}
          />
        </div>
        <div className="btn-group">
          <button>{edit ? "update" : "submit"}</button>
        </div>
      </form>
    </>
  );
};

export default Form;
