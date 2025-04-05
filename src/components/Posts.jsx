import { useEffect } from "react";
import { deletePost, getPost } from "../api/PostApi";
import { useState } from "react";
//import { getPost } from "./api/PostApi";
import "../App.css";
import { Form } from "./Form";
export const Posts = () => {
    const [data, setData] = useState([]);
    const [updateDataApi, setUpdateDataApi] = useState({});

    const getPostData = async () => {
        const res = await getPost();
        console.log(res.data);
        setData(res.data);
      };
    
      useEffect(()=>{
        getPostData();
      },[]);

      //dlete method
      const handleDeletepost = async (id) => {
        try{
        const res = await deletePost(id);
        if(res.status === 200){
            const newData = data.filter((curElem) => {
                return curElem.id !== id;
            });
            setData(newData);
        } else{
            console.log("Error deleting post", res.status);
        }
      }
        catch(error){
            console.log(error);
        }
      };   
      
      //update method
      const handleUpdatePost = (curElem) => setUpdateDataApi(curElem);
      
      return (
      <>
      <section >
        <Form 
        data={data} 
        setData={setData}
        updateDataApi={updateDataApi}
        setUpdateDataApi={setUpdateDataApi}/>
      </section>
      <section className="body">
        <ol className="container">
            {data.map((curElem) => {
                const {id,body,title}=curElem;
                return(
                <li key={id} className="card">
                <p >Title:{title}</p>
                <p >Body: {body}</p>
                <button className="edit-btn" onClick={()=>handleUpdatePost(curElem)}>Edit</button>
                <button className="delete-btn" onClick={()=>handleDeletepost(id)}>Delete</button>
                </li>
                );
            })
            }
        </ol>
      </section>
      </>
      );
    }
