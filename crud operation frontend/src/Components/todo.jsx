import useSWR from "swr";
import Form from "./Form";
import Result from "./Result";
import axios from "axios";
import { useState } from "react";

const Todo = () => {

  let [updateData,setupdateData]=useState(null);


const fetcher = async (url) => {
  try {
    const { data } = await axios.get(url);
    console.log(data);
    return data?.data
   
  } catch (err) {
    return null;
  }
};
 
  
const { data: users, error: usersError } = useSWR("https://crud-fullstack-33le.onrender.com/users",fetcher);
if (usersError) return <div>Error fetching users!</div>;
  if (!users) return <div>Loading users...</div>;
   const update=(item)=>{
        console.log(item);
        setupdateData(item);
    }
  return (
    <>
      <div className="container">
        <div className="form">
          <Form updatedata={updateData}/>
        </div>
        <div className="result">
          <Result allusers={users} update={update}/>
        </div>
      </div>
    </>
  );
};

export default Todo;
