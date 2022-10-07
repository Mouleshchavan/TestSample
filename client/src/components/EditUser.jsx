import React, { useEffect, useState } from "react";
import InputForm from "./InputForm";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { editUser, getSingleUser, getUsers } from "../Redux/user/Action";
import { useNavigate } from "react-router-dom";

const EditUser = () => {
  const { id } = useParams();
  const { users, singleUser } = useSelector((store) => store.user);
  const [userData, setUserData] = useState({
    userName: "",
    colorName: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  console.log("---",userData)



  const handleChange = (e) => {
    const { name, value } = e.target;

    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(editUser({ data: userData, id }));
    console.log(userData);

    setUserData({ userName: "", colorName: "" });
    navigate(-1);
  };

  useEffect(() => {
    dispatch(getSingleUser(id));
  }, [id]);

  useEffect(() => {
 
    if (singleUser) {
      
      setUserData({userName:singleUser.userName,colorName:singleUser.colorName})
      
    }

    
    
  }, [singleUser]);

  return (
    <div className="d-flex flex-column align-items-center mt-5 justify-content-center">
      <h1 className="py-4">Edit User</h1>
      <InputForm
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        userData={userData}
        buttonName={"UPDATE"}
      />
    </div>
  );
};

export default EditUser;
