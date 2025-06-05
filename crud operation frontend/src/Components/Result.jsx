import axios from "axios";
import { useState } from "react";
import { mutate } from "swr";

const Result=({allusers,update})=>{
 const [currentPage, setCurrentPage] = useState(1);
    const profilesPerPage = 4;

    const totalPages = Math.ceil(allusers.length / profilesPerPage);

    const startIndex = (currentPage - 1) * profilesPerPage;
    const currentUsers = allusers.slice(startIndex, startIndex + profilesPerPage);

    console.log(allusers)
   const handleDelete=(e,id)=>{
    alert("data is deleting");
    onDelete(id);
   }
  async function onDelete(id)
   {
    console.log(id)
    try{
           await axios.delete(`https://crud-fullstack-33le.onrender.com/users/${id}`);
           swal("success","Delete success!","success");
           mutate("https://crud-fullstack-33le.onrender.com/users")
    }
    catch(err)
    {
        swal("failed","unable to delete!","warning")
    }
   }
   function handleEdit(item)
   {
      update(item);
   }
    return(
        <>
        <div className="result_alldata">
        <h1>Result</h1>
        <table>
    <thead>
        <tr>
            <th>Profile</th>
            <th>Name</th>
            <th>Email</th>
            <th>Password</th>
            <th>Actions</th>
        </tr>
    </thead>
    <tbody >
        {currentUsers.map((item, index) => (
            <tr key={index}>
                <td><img src={`https://crud-fullstack-33le.onrender.com/${item.profile}`} alt="User Profile" width="100" height="100" style={{border:'2px solid black',borderRadius:'50%'}} /></td>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>{item.password ? "••••••••" : "Not Set"}</td>
                <td>
                    <button className="updatebtn" onClick={(e)=>handleEdit(item)} >Edit</button>
                    <button className="deletebtn" onClick={(e)=>handleDelete(e,item._id)}>Delete</button>
                </td>
            </tr>
        ))}
    </tbody>
</table>
 <div className="pagination">
                    <button
                        onClick={() => setCurrentPage(currentPage - 1)}
                        disabled={currentPage === 1}
                    >
                        Previous
                    </button>

                    <span>Page {currentPage} of {totalPages}</span>

                    <button
                        onClick={() => setCurrentPage(currentPage + 1)}
                        disabled={currentPage === totalPages}
                    >
                        Next
                    </button>
                </div>
        </div>
        </>
    )
}


export default Result;