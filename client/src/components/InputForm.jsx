const InputForm = ({ handleSubmit, handleChange, userData,buttonName }) => {
  return (
    <div className="w-25 shadow p-3 mb-5 bg-white rounded p-4 w-25">
      <form onSubmit={handleSubmit}>
        <div className="form-group my-4">
          <label className="my-2" htmlFor="exampleInputEmail1">
            User Name
          </label>
          <input
            type="text"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Enter user name"
            name="userName"
            required
            onChange={handleChange}
            value={userData.userName}
          />
        </div>
        <div className="form-group">
          <label className="my-2" htmlFor="exampleInputPassword1">
            Color Name
          </label>
          <input
            type="text"
            className="form-control"
            id="exampleInputPassword1"
            placeholder="Enter color name"
            name="colorName"
            required
            onChange={handleChange}
            value={userData.colorName}
          />
        </div>

        <button type="submit" className="btn btn-primary my-4">
          {buttonName}
        </button>
      </form>
    </div>
  );
};

export default InputForm;
