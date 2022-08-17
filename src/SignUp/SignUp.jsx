import React ,{ useState } from 'react';
import Axios from 'axios';
import { useNavigate }  from 'react-router-dom';
import Joi from 'joi';


export default function SignUp() {
        let navigate=useNavigate();
        const [isloading, setIsloading] = useState(false);
        const [errorList, setErrorList] = useState([]);
        const [error, setError] = useState();
        const [user, setUser] = useState({
           first_name:"", 
            last_name:"",
            age:0, 
            email:"",
            password:"", 
        });
            //  get-data-form
        function SaveUserData(e)
        {
            let Myuser ={...user};
            Myuser[e.target.name]=e.target.value; 
            setUser(Myuser);
            // console.log(Myuser);
        };

        async function submitRegisterForm(e)
        {
            e.preventDefault();
            setIsloading(true);
            let validatRuselt=validataRegisterForm();
            if(validatRuselt.error)
            {
                setErrorList(validatRuselt.error.details);
                setError(validatRuselt.error.details)
                setIsloading(false);
            }
            else
            {
                let {data} = await Axios.post('https://route-egypt-api.herokuapp.com/signup',user);
                if(data.message==='success')
                {
                    navigate('/SignIn');
                    setIsloading(false);
                }
                else
                {
                   setError(data.message);
                   setIsloading(false);
                }
            }
            // console.log();
        }

            function validataRegisterForm()
            {
                let schema =Joi.object({
                    first_name:Joi.string().alphanum().min(3).max(30).required(),
                    last_name:Joi.string().alphanum().min(3).max(30).required(),
                    age:Joi.number().integer().min(10).max(100),
                    email:Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
                    password: Joi.string().pattern(new RegExp('[A-Z][a-z]{3,8}')).required(),
                })
                return schema.validate(user ,{abortEarly:false});
            }


  return ( <>
        <div id='Regesiter' className='mt-5 m-auto w-50'>
            <h1>SignUp</h1>

            {/* {errorList.map((error,i )=><div key={i} className='w-50 mx-auto rounded-pill alert alert-danger mt-2 text-center'>{error.message}</div>)} */}
            {/* {error.length>0?<div className='alert alert-danger mt-2'>{error}</div>: ''} */}
            
            <form onSubmit={submitRegisterForm} >
                <div className='d-flex'>
                    <div className='w-75 me-2'>
                        <label htmlFor="first_name"></label>
                        <input onChange={SaveUserData} type="text" className='form-control'placeholder='Enter Firest Name' id='first_name' name='first_name' />
                        {errorList.filter((detel1)=>{return detel1.context.label==='first_name'}).length?<div className='alert alert-danger  rounded-pill mt-2 text-center'>{errorList.message} Error  first_name</div>:""}
                        {/* {console.log(errorList)} */}
                    </div>
                    <div className='w-75 ms-2' >
                        <label htmlFor="last_name"></label>
                        <input onChange={SaveUserData} type="text" className='form-control' placeholder='Enter Last Name' id='last_name' name='last_name' />
                        {errorList.filter((detel)=>{return detel.context.label==='last_name'}).length?<div className='alert rounded-pill  alert-danger mt-2 text-center'>{errorList.message} Error  last_name</div>:""}
                    </div>
                </div>
                <div>
                    <label htmlFor="age"></label>
                    <input onChange={SaveUserData} type="number" className='form-control' placeholder='Enter Your Age'id='age' name='age' />
                    {errorList.filter((detel)=>{return detel.context.label==='age'}).length?<div className='alert alert-danger rounded-pill  mt-2 text-center'>{errorList.message} Error  age</div>:""}
                </div>
                <div>
                    <label htmlFor="email"></label>
                    <input  onChange={SaveUserData} type="email"className='form-control' placeholder='Enter your Email' id='email' name='email' />
                    {errorList.filter((detel)=>{return detel.context.label==='email'}).length?<div className='alert alert-danger rounded-pill  mt-2 text-center'>{errorList.key} Error  email</div>:""}
                </div>
                
                <div>
                    <label htmlFor="password"></label>
                    <input  onChange={SaveUserData} type="password" className='form-control' placeholder='Enter Password'id='password' name='password' />
                    {errorList.filter((detel)=>{return detel.context.label==='password'}).length?<div className='alert alert-danger rounded-pill w-25 mt-2 text-center'>password first letter in capital ( A ) </div>:""}
                </div>
                <button type='Submit' className='form-control mt-3 bg-transparent '>
                    {isloading===true?<i className="fa-solid fa-spin fa-atom fs-2 "></i> : "Sign Up"}
                    {isloading===true? <span className='fs-2 mx-3 text-center'>wait</span>: ""} </button>
            </form>

        </div>
    </> );
}
