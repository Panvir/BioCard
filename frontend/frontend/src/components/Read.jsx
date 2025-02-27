import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Read = () => {

const [data,setData]=useState([]);
const [error, setError] = useState("");

//jo data backend to areha ohde lyi sanu api banna pena
async function getData(){
    const response=await fetch("http://localhost:5000");


    const result = await response.json(); //ethe backend ne jo res.json nl send kita smaan oh ayega
    if (!response.ok) {
      console.log(result.error);
      //agr error hai tn jo state bnai hai ohnu eroro likhdo te oh show hoe ui te
      setError(result.error);
    }

    if(response.ok){
        setData(result.Alldata);
    }
}

//delete operTION
const handleDelete=async(id)=>{
    const response=await fetch(`http://localhost:5000/${id}`,{
        method:"DELETE"
    });

    const result= await response.json();
    if (!response.ok) {
        console.log(result.error);
        //agr error hai tn jo state bnai hai ohnu eroro likhdo te oh show hoe ui te
        setError(result.error);
      }
  
      if(response.ok){
          alert("Deleted Suuceefulyy");
        setTimeout(() => {
        setError("");
        getData();
        }, 500);
      }

}

//bat hai jb bhi data add hoega hum chahte hai allpost ka dat abhi sath hi rerender hoke latest dikhaye so use useefect
useEffect(()=>{
    getData();//here it is called
},[]); 
console.log(data);


  return (
    <div className="container my-2">
      <h2 className="text-center">All Data</h2>
      <div className="row">
      {error && <div className="alert alert-danger">{error}</div>}
        {data && data.map((eLe)=>(
                <div key={eLe._id} className="col-3">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">{eLe.name}</h5>
                    <h6 className="card-subtitle mb-2 text-muted">{eLe.email}</h6>
      
                    <p className="card-text">{eLe.age}</p>
                    <a href="#" className="card-link" onClick={()=>handleDelete(eLe._id)}>
                      Delete
                    </a>
                    <Link to={`/${eLe._id}`} className="card-link">
                      Edit
                    </Link>
                  </div>
                </div>
              </div>
        ))}
        
      </div>
    </div>
  );
};

export default Read;
