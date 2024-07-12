import React from 'react'
import '../styles/Blogs.css'
import { useParams,useNavigate } from 'react-router-dom'
import { useState,useEffect } from 'react'
import { useAuthContext } from '../hooks/useAuthContext'

const FullBlog = () => {

   const { id } = useParams();
   const [blog,setBlog] = useState(null);
   const [isEditing, setIsEditing] = useState(false);
   const [editedTitle, setEditedTitle] = useState('');
   const [editedContent, setEditedContent] = useState('');
   const {user} = useAuthContext();
   const navigate = useNavigate();
   const apiUrl = process.env.REACT_APP_API_URL;

   useEffect(()=>{
      const fetchBlog = async () => {
         const res = await fetch(`${apiUrl}/api/blogs/${id}`,{
            headers: {
               'Authorization':`Bearer ${user.token}`
            }
         });

         const blog = await res.json();

         if(blog) {
            setBlog(blog);
            setEditedTitle(blog.title);
            setEditedContent(blog.content);
         } else {
            alert('No Blog Found');
         }
      }

      fetchBlog();
   },[id,user,apiUrl]);

   const handleEdit = (e) => {
      
      setIsEditing(true);

   }

   const handleCancelEdit = () => {
      setIsEditing(false);
      setEditedTitle(blog.title);
      setEditedContent(blog.content);
   }

   const handleEditSubmit = async (e) => {
      e.preventDefault();
      
      const res = await fetch(`${apiUrl}/api/blogs/${id}`,{
         method:'PUT',
         body: JSON.stringify({title:editedTitle,author:blog.author,content:editedContent}),
         headers: {
            'Authorization':`Bearer ${user.token}`,
            'Content-Type':'application/json'
         }
      });

      const updatedBlog = await res.json();

      setIsEditing(false);
      setBlog(updatedBlog);
      alert('Blog Updated Successfully');
   }

   const handleDelete = async (e) => {

      const res = await fetch(`${apiUrl}/api/blogs/${id}`,{
         method:'DELETE',
         headers: {
            'Authorization':`Bearer ${user.token}`
         }
      });

      const blog = await res.json();

      alert(blog.message);

      navigate('/blogs');
   }

   if(!blog) {
      return (
         <div className='loading'><h1>Loading...</h1></div>
      );
   }

   return (
      <div className="full-blog">
         <h2>{blog.title.toUpperCase()}</h2>
         <h3>~ By {blog.author}</h3>
         <p>{blog.content}</p>
         <div className="btns">
            {blog.author===user.name && <button onClick={handleEdit}>Edit</button> }
            {blog.author===user.name && <button onClick={handleDelete}>Delete</button> }
            <button onClick={() => navigate(-1) }>Back</button>
         </div>

         {isEditing && (
         <div className="edit-form">
            <form onSubmit={handleEditSubmit}>
               <input type="text" value={editedTitle} onChange={(e)=>{setEditedTitle(e.target.value)}} />
               <textarea value={editedContent} onChange={(e)=>{setEditedContent(e.target.value)}} />
               <div className='edit-btns'>
                  <button type="submit">Submit</button>
                  <button type="button" onClick={handleCancelEdit}>Cancel</button>
               </div>
            </form>
         </div>
      )}
      </div>
   )
}

export default FullBlog