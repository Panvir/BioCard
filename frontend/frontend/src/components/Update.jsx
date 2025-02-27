import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const Update = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState(0);
  const [error, setError] = useState("");
  const { id } = useParams();
  const navigate=useNavigate();

  //like for edit first we need to fetch the user data
  const getsingleuser = async () => {
    const response = await fetch(`http://localhost:5000/${id}`);

    const result = await response.json();
    if (!response.ok) {
      console.log(result.error);
      //agr error hai tn jo state bnai hai ohnu eroro likhdo te oh show hoe ui te
      setError(result.error);
    }

    if (response.ok) {
      setError("");
      console.log("updated user", result.data);
      setName(result.data.name);
      setAge(result.data.age);
      setEmail(result.data.email);
    }
  };

  //send uodated data to backend
  const handleupdate = async (e) => {
    e.preventDefault();
    const updateduser = { name, email, age };

    const response = await fetch(`http://localhost:5000/${id}`, {
      method: "PUT",
      body: JSON.stringify(updateduser),
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
      navigate("/all"); //eh navigate krduga aall post page te
    }
  };

  useEffect(() => {
    getsingleuser();
  }, []);

  return (
    //evrthing is copied from create page adn changed to some extent
    <div className="container my-2">
      {/* agr humare submit te koi backnedn te error anda hai tn ohnu dikhaan lyi sanu ethe padena chaida te asi oh bootstrap to coopy krlende a alert*/}
      {error && <div className="alert alert-danger">{error}</div>}
      <h2 className="text-center">Edit the data</h2>
      <form onSubmit={handleupdate}>
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

export default Update;
