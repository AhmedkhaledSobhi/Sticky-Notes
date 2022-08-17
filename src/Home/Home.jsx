import React, { useEffect, useState } from 'react';
import HomeStyle from "./Home.module.css"
import  jwtDecode  from 'jwt-decode';
import { Link } from 'react-router-dom';


import $  from'jquery'
import  Axios  from 'axios';
import Swal from 'sweetalert2';
export default function Home() {

        useEffect(() => {
          ShowData();
          getUserNotes();
          // updateNote()
          // deleteNote()
          // console.log(displayNotePage.Notes);
        },[]); 


        const [LoadingScreen, setLoadingScreen] = useState(false);
        let encoded=localStorage.getItem('UserToken');
        let decoded=jwtDecode(encoded);
        const [displayNotePage, setDisplayNotePage] = useState([]);
        const [isloding, setIsloding] = useState(false);
        let [user, setUser] = useState({
          title:"",
          desc:"",
          userID:decoded._id,
          token:encoded,
        });
        const [displaydata, setDisplaydata] = useState([]);

        
// ======================= get Data Token  ===========================

          function getDataToken(e)
          {
            let Myuser={...user};
            Myuser[e.target.name]=e.target.value;
            setUser(Myuser);
           console.log(Myuser);
          }

// ===================== Add Note ========================

          async function addNote(e)
          {
            setIsloding(true);
            setLoadingScreen(true)
            let {data}=  await Axios.post('https://route-egypt-api.herokuapp.com/addNote', user);
            if(data.message=== 'success')
            {
              
              setIsloding(false);
              setLoadingScreen(false)
              document.getElementById('addNote').classList.add('d-none');
              Swal.fire({
                position: 'center-center',
                icon: 'success',
                title: 'Your work has been saved',
                showConfirmButton: false,
                timer: 1500
              })
                        
            }
            // console.log(data);
          }

//  ======================= get User Notes ===========================

          async function getUserNotes() 
          {
            setLoadingScreen(true);
            let {data}=  await Axios.get('https://route-egypt-api.herokuapp.com/getUserNotes',{
              headers:{ Token: encoded,userID:decoded._id,}
            });
            if(data.message=== 'success')
            {
              setDisplayNotePage(data.Notes)
              setLoadingScreen(false)
              // console.log(data);
            }
            else
            {
              setLoadingScreen(false);
            }
            // console.log(data);
          }

// console.log(displayNotePage)

// ===================== check User Token =========================

        function ShowData ()
        {
          if(localStorage.getItem('UserToken'))
          {
            let disPlayNameToken= localStorage.getItem('UserToken');
            let decoded= jwtDecode(disPlayNameToken);
            setDisplaydata(decoded);
            // console.log(decoded);
          }
        }
             
// ====================== clossNote Togell =======================

        function displayNote()
        {
          let displaypaper =document.getElementById('addNote').classList.value
          if(displaypaper ==='d-none')
          {
            // document.getElementById('addNote').classList.replace('d-none','d-block');
          }
          else
          {
            document.getElementById('addNote').classList.remove('d-none');
          } 
        }
//  ======================== clossNote ===========================

        function clossNote()
        {
          document.getElementById('addNote').classList.add('d-none');
          // console.log('hello');
        }

// ======================= update Note ========================

        const [updateNotes, setUpdateNotes] = useState({NoteID:'', desc:'' ,title:'', token:encoded});
        function dataNote(e) {
          let MyUpdate={...updateNotes};
          MyUpdate[e.target.name]=e.target.value;
          setUpdateNotes(MyUpdate)
          // console.log(MyUpdate);
        }

// ========================= change data UpData ========================

        function getupdateNote(e)
        {
          document.getElementById('recipient-name').value=e.target.title
          document.getElementById('message-text').value=e.target.name
          let MyUpdate= {...updateNotes,title:e.target.title , desc:e.target.name,NoteID: e.target.id};
          setUpdateNotes(MyUpdate);
          // console.log(MyUpdate);
        }

// ==================== update Note in Api ==============================

        async function updateNote()
        {
          setIsloding(true);
          setLoadingScreen(true);
          let {data}= await Axios.put('https://route-egypt-api.herokuapp.com/updateNote',updateNotes);
          if(data.message== "updated")
          {
            // document.getElementById('exampleModal').classList.add('d-none');
            setLoadingScreen(false);
            setIsloding(false);
            getUserNotes();
            Swal.fire({
              position: 'center-center',
              icon: 'success',
              title: 'Your work has been saved',
              showConfirmButton: false,
              timer: 1500
            })
            
          }
          else
          {
            setIsloding(false);
            Swal.fire({
              position: 'center-center',
              icon: 'error',
              title: 'Oops...',
              text: 'Something went wrong!',
              showConfirmButton: false,
              timer: 1500
            })
          }
          // console.log(data);
        }

// ==========================  DeletNote ===========================

        async function deleteNote(e)
        {
          setLoadingScreen(true);
          let {data}=await Axios.delete('https://route-egypt-api.herokuapp.com/deleteNote'
          ,{data:{ NoteID:e.target.id,token:encoded}});
          if(data.message==='deleted')
          {
            getUserNotes();
            setLoadingScreen(false);
            Swal.fire({
              position: 'center-center',
              icon: 'success',
              title: 'Your work has been saved',
              showConfirmButton: false,
              timer: 1500
            })
          }
          else
          {
            getUserNotes();
          }
            // console.log(data);
        }

// ========================================================




  return (<>

      {/* =================== Loading Screen =========================== */}

          {LoadingScreen==true?<div className={`${HomeStyle.readbe} pt-5`}><div className='mt-5 d-flex justify-content-center '><i className=" fa-solid fa-spin fa-3x text-white d-flex bottom-50 fa-spinner"></i></div> </div>:  ''}
          
      {/* ================================== Display Name User ============================== */}
      
          <div className={`${HomeStyle.aaaaa} text-center w-25 m-auto`}>
            <h1 className='fw-bolder '>welcom <><span className='fs-3'>{displaydata.first_name}</span> <span className='fs-3'>{displaydata.last_name}</span> </> </h1>
          </div> 

      {/* ========================= btn Add Note ================================ */}
          
          <div className='position-absolute end-0'>
              <h3 onClick={displayNote} className='py-lg-2 px-lg-4 me-lg-5 me-2 btn btn-outline-warning'>add Note</h3>
          </div>
      {/* ============================ Screen Display Note  ===================================  */}
          
          <div className='container shadow-lg rounded-2 w-100 px-5 my-5 py-4'>
              <div className="row g-3 gx-5">
                  {displayNotePage&&displayNotePage.map((note,i)=> 
                    <div key={note._id} className={`col-lg-3  ${HomeStyle.hnotes} overflow-hidden bg-nfo mx-auto rounded-4`}>
                      <div className={`text-center py-2 position-relative`}>
                        <div className='position-absolute mt-4 me-2 top-0 end-0'>
                          <ul>
                            <l>
                              <a className="nav-lin text-black fw-bolder fs-5"  role="btton" data-bs-toggle="dropdown" >
                                <i className="fa-solid fa-1x fa-ellipsis-vertical"></i>
                              </a>
                              <ul className="dropdown-menu">
                                <li>
                                    <a onClick={ getupdateNote} data-bs-toggle="modal" data-bs-target="#exampleModal" id={note._id} title={note.title} name={note.desc} className="dropdown-item text-center fs-5" to="LogOut"> Edit <i className="fa-solid text-bg-info fs-5 fa-square-pen"></i></a>
                                </li>
                                <li>
                                  <a  onClick={deleteNote} id={note._id} name=" ahmed" className="dropdown-item text-center fs-5" to="LogOut"> delete <i onClick={deleteNote} className="fa-solid fs-5 text-danger fa-trash-can"></i></a>
                                </li>
                              </ul>
                            </l>
                          </ul>
                        </div>
                        <div className='w-75 m-auto overflow-hidden'>
                          <h3 className=" overflow-hidden text-center mt-3">{note.title}</h3>
                        </div>
                        <hr className='w-50 m-auto my-3' />
                        <h5 className='text-center'>{note.desc}</h5>
                      </div>
                    </div>
                    )}
              </div>
          </div>

      {/* ========================== page Add Note ========================== */}
            <div id='addNote' className={`${HomeStyle.PageAddNote} d-none bg-light border rounded-4 mt-5 `}>
              <div className='d-flex justify-content-between px-4 pt-3 w-100 m-auto -4'>
                <h4 className="card-title "> Title</h4>
                <button id='close' onClick={clossNote} type="button" className="btn-close" aria-label="Close"></button>
              </div>
              <hr/>
              <div className='w-100 px-4'>
                <input onChange={getDataToken} type="text" className='w-100 my-3 p-2 rounded-2'  placeholder='Title' name="title"/>
                <textarea onChange={getDataToken} className='w-100 rounded-2 p-2' placeholder='Type your Note' name="desc" id="" cols="30" rows="10"></textarea>
              </div>
              <hr/>
              <div className='d-flex justify-content-end me-3 my-2'>
                
                  <a onClick={()=>{addNote() ;getUserNotes()}} className="card-link btn btn-primary">
                    {isloding===true?<><i className="fa-solid fa-spin fa-atom fs-2 "></i>
                    </>:'Add' }
                  </a>
                  <a onClick={clossNote} className="card-link btn btn-danger ms-2">Cancel</a>
              </div>
            </div>
          
        
      {/* ====================  page UpDate =========================*/}

          <div className="modal fade" id="exampleModal"  aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLabel">Edit</h5>
                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                  <form onSubmit={updateNote}>
                    <div className="mb-3">
                      <input onChange={dataNote} type="text" className='w-100 my-3 p-2 rounded-2 form-control'id="recipient-name"  placeholder='Title' name="title"/>
                    </div>
                    <div className="mb-3">
                      <textarea onChange={dataNote} className='w-100 rounded-2 p-2 form-control' id="message-text" placeholder='desc' name="desc"  cols="30" rows="10"></textarea>
                    </div>
                  </form>
                </div>
                <div className="modal-footer">
                  <button onClick={updateNote} type="button" className="btn btn-primary">
                    {isloding===true?<><i className="fa-solid fa-spin fa-atom fs-2 "></i>
                    </>:'Update' }
                  </button>
                  <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Close</button>
                </div>
              </div>
            </div>
          </div>
      
      {/* =========================================================================== */}
      </> );
}
