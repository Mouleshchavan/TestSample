import React, { useEffect, useState } from "react";
import { GrEdit } from "react-icons/gr";
import { MdDelete } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, editUser, getUsers } from "../Redux/user/Action";
import { useNavigate } from "react-router-dom";
import Spinner from "./Spinner";

const Table = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [page, setPage] = useState(1);

  const { users, newUser, edit, deleted, isLoading } = useSelector(
    (store) => store.user
  );
  const [loading, setLoading] = useState(isLoading);

  console.log(users);

  useEffect(() => {
    dispatch(getUsers(page));
    setLoading(false);
  }, [newUser, edit, deleted,page]);

  const handleDelete = (id) => {
    dispatch(deleteUser(id));
    setLoading(true);
  };

  const handlePage = (value) => {
    setPage(page + value)
    
  }

  return (
    <div className="px-5 w-10">
      {loading && <Spinner />}
      <table className="table table-striped" >
        <thead>
          <tr>
            <th scope="col">Index</th>
            <th scope="col">User Name</th>
            <th scope="col">Color Name</th>
            <th scope="col">Edit Name</th>
            <th scope="col">Delete</th>
          </tr>
        </thead>
        <tbody>
          {users?.map((item, index) => (
            <tr>
              <th scope="row">{((page-1)*10)+index + 1}</th>
              <td>{item.userName}</td>
              <td>{item.colorName}</td>
              <td className="">
                <GrEdit onClick={() => navigate(`/edit/${item._id}`)} />
              </td>
              <td>{<MdDelete onClick={() => handleDelete(item._id)} />}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
      <nav aria-label="Page navigation example">
  <ul class="pagination">
    <li class="page-item" onClick={()=>{page>1?handlePage(-1):handlePage(0)}}> <li class="page-link" >Previous</li></li>
    <li class="page-item"><li class="page-link" >{page}</li></li>
  
    <li class="page-item" onClick={()=>{handlePage(1)}}><li class="page-link" >Next</li></li>
  </ul>
</nav>
      </div>
    </div>
  );
};

export default Table;
