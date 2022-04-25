import React, { useState} from "react";
import axios from "axios";
import { SERVER_URL } from "../config";
import { useForm } from "react-hook-form";


const Email = () => {
   const { register, handleSubmit, watch, formState: {errors} } = useForm();
  const [fullName, setFullName] = useState('');
  const [domain,setDomain] = useState('');
  const [email, setEmail] = useState('');

  const storeEmail =  async (event:any) => {
   let payload={
      full_name: fullName,
      domain: domain
  }
  const data=await axios.post(SERVER_URL+"/api/email", payload, {
      headers: {
        'Content-Type': 'application/json',
      }
    })
    if(data.data.success==true){
      console.log(data);
        setEmail(data.data.result.email);
    }
    else{
      setEmail(data.data.message);
    }
  };

  return (
    <div className="ui segment" style={{backgroundColor:'aliceblue'}}>
        <form onSubmit={handleSubmit(storeEmail)}  className="ui form">
      <div className="field">
        <label>Full Name</label>
        <input  {...register("fullName", { required: true })} type="text" value={fullName} onChange={(e)=>setFullName(e.target.value)}/>
        <span style={{ color: 'red' }}>{errors.fullName && "Full Name is required"}</span>
      </div>
      <div className="field">
        <label>Domain</label>
        <input  value={domain} type="text" {...register("domain", { required: true })} onChange={(e)=>setDomain(e.target.value)} />
        <span style={{ color: 'red' }}>{errors.domain && "Domain is required"}</span>
      </div>
      <button  type="submit" className="ui primary basic button">Generate Email</button>
    </form>
    <h2 className="ui dividing header">Email</h2>
      <div className="text1"> <h2>{email}</h2></div>
    </div>
  );
};

export default Email;
