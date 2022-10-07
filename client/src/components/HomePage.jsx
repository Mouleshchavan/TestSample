import React, { useState } from "react";
import InputForm from "./InputForm";
import Table from "./Table";
import { useDispatch,useSelector } from "react-redux";
import { createUser } from "../Redux/user/Action";

const HomePage = () => {
 const dispatch = useDispatch();
  const {  newUser } = useSelector((store) => store.user);
  
  const [userData, setUserData] = useState({
    userName: "",
    colorName: "",
  });

 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(createUser(userData));
    console.log(userData);
    
    setUserData({ userName: "", colorName: "" });
  };
  return (
   <div className="d-flex flex-column align-items-center mt-5 ">
    <h1 className="py-4">Create New User</h1>
    <InputForm handleChange={handleChange} handleSubmit={handleSubmit} userData={userData} buttonName={ "SUBMIT"} />
      <Table />
    </div>
  );
};

export default HomePage;
