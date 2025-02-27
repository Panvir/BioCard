import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Create = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState();
  const [error, setError] = useState("");
const navigate=useNavigate();
  //function for handling submit
  const handleSubmit = async (e) => {
    e.preventDefault();//for preventing fedaultbehaviour oh submit

    const addUser = { name, email, age };

    const response = await fetch("http://localhost:5000", {
      method: "POST",
      body: JSON.stringify(addUser),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const result = await response.json(); //ethe backend ne jo res.json nl send kita smaan oh ayega
    if (!response.ok) {
      console.log(result.error);
      //agr error hai tn jo state bnai hai ohnu eroro likhdo te oh show hoe ui te
      setError(result.error);
    }
    if (response.ok) {
      console.log(result);
      //agr response ok a sab tn clear krdo sab ui te aya c jo
      setError("");
      setName("");
      setEmail("");
      setAge(0);
      navigate('/all');//eh navigate krduga aall post page te
    }
  };
  return (
    <div className="container my-2">
      {/* agr humare submit te koi backnedn te error anda hai tn ohnu dikhaan lyi sanu ethe padena chaida te asi oh bootstrap to coopy krlende a alert*/}
      {error && <div className="alert alert-danger">{error}</div>}
      <h2 className="text-center">Enter the data</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input
            type="text"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Email address</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Age</label>
          <input
            type="number"
            className="form-control"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Create;
