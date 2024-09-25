import { useSelector } from "react-redux";
import useAsync from "../hooks/useAsync"
import {useForm} from 'react-hook-form'
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const AddPost = () => {

    const userId = useSelector(state => state?.user?.data?._id)

    const [image , setImage] = useState(null)

    const [imageUrl , setImageUrl] = useState(null)

    const navigate = useNavigate()

    const {register , handleSubmit} = useForm()

    const {run , loading} = useAsync("api/posts" , "POST")

    const uploadPostImage = () => {
        
        const formData = new FormData()
        formData.append("post" , image)

        fetch("http://localhost:8000/api/user/upload-post" , {
            method : "POST",
            body : formData
        }).then(res => {
            return res.json()
        }).then(data => {
            let pathArray = data.path.split("\\")[2]
            let imagePath = `http://localhost:8000/${pathArray}`
            setImageUrl(imagePath)
        })

    }

    const onSubmit = e => {
        
        const userData = {...e , author : userId , image : imageUrl}

        run(userData).then(() => {
            navigate("/")
            window.location.reload()
        })

    }

    return (<>
        <div className="flex items-center justify-center flex-col pt-6 pb-6">
            <div className="flex flex-col items-center justify-center">
                <form onSubmit={handleSubmit(onSubmit)} action="" className="flex items-center gap-4 flex-col pt-2 pb-2 rounded-md w-[400px] justfy-center bg-slate-200">
                    <h1 className='text-[40px]'>Add Post</h1>
                    <label htmlFor="">
                        <h3>Description</h3>
                        <textarea {...register("description" , {required : true})} placeholder='Description' className="p-3 w-[300px] rounded-md border-none" type="text" />
                    </label>
                    <label>
                        <h3>Upload Image</h3>
                        <input onChange={(e) => setImage(e.target.files[0])} placeholder='Upload Profile' className="pt-2" type="file" />
                        <img src={image && URL.createObjectURL(image)} alt="" />
                        <button onClick={uploadPostImage} className='bg-green-500 p-2 rounded-md text-white' type='button'>Upload</button>
                    </label>
                    <button type='submit' disabled={loading} className="w-[300px] bg-blue-500 text-slate-200 hover:bg-slate-900 hover:text-slate-200 p-2 rounded-md transition">{
                        loading ? "Pending" : "Submit"
                    }</button>
                </form>
            </div>
        </div>
    </>);
}
 
export default AddPost;