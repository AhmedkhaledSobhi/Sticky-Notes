import React ,{ useState } from 'react';
import Axios from 'axios';
import { useNavigate }  from 'react-router-dom';

import Joi from 'joi';
// import SignUp from './../SignUp/SignUp';

export default function SignIn(props) {

            let navigate=useNavigate();
        const [isloading, setIsloading] = useState(false);
        const [errorList, setErrorList] = useState([]);
        const [error, setError] = useState('');
        const [user, setUser] = useState({
            email:" ",
            password:" ", 
        });
            //  get-data-form
        function SaveUserData(e)
        {
            let Myuser ={...user};
            Myuser[e.target.name]=e.target.value; 
            setUser(Myuser);
        };

        async function submitRegisterForm(e)
        {
            e.preventDefault();
            setIsloading(true);
            let validatRuselt=validataRegisterForm();
            if(validatRuselt.error)
            {
                setErrorList(validatRuselt.error.details);
                setIsloading(false);
            }
            else
            {
                let {data} = await Axios.post('https://route-egypt-api.herokuapp.com/signin',user);
                if(data.message==='success')
                {
                   setIsloading(false);
                   localStorage.setItem('UserToken',data.token);
                   props.saveUserData()
                   navigate('/Home');
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
                let schema = Joi.object({
                    password: Joi.string().pattern(new RegExp('^[A-Z][a-z]{3,8}$')).required(),
                    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
                });
                
                return schema.validate(user ,{abortEarly:false});
            }


  return ( <>
    
      <div id='Regesiter' className='mt-5 m-auto w-50'>
            <h1>SignUp</h1>
            {/* Register form */}
            {errorList.map((error ,i )=><div key={i}  className='alert alert-danger mt-2'>{error.message}</div>)}
            {error.length>0?<div className='alert alert-danger mt-2'>{error}</div>: ''}
            
            <form onSubmit={submitRegisterForm} >
                <div>
                    <label htmlFor="email"></label>
                    <input  onChange={SaveUserData} type="email" id='email' className='form-control' placeholder='Enter your Email'name='email' />
                    {/* {errorList.filter((detel)=>{return detel.context.label=='email'}).length?<div className='alert alert-danger mt-2'>{errorList.key} Error  email </div>:""} */}
                </div>
                
                <div>
                    <label htmlFor="password"></label>
                    <input  onChange={SaveUserData} type="password" className='form-control' placeholder='Enter Password'id='password' name='password' />
                    {/* {errorList.filter((detel)=>{return detel.context.label==='password'}).length?<div className='alert alert-danger mt-2'>password first letter in capital ( A ) </div>:""} */}
                </div>
                <button type='Submit' className='form-control mt-3 bg-transparent '>
                    {isloading===true?<i className="fa-solid fa-spin fa-atom fs-2 "></i> : "Sign In"}
                    {isloading===true? <span className='fs-2 mx-3 text-center'>wait</span>: ""} </button>
            </form>

        </div>
    </> );
}
