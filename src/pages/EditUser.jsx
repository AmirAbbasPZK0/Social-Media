import { useState } from 'react';
import {useSelector} from 'react-redux'
import useAsync from '../hooks/useAsync'
import { useForm } from 'react-hook-form';

const EditUser = () => {

    const userData = useSelector(state => state.user.data)

    const {register , handleSubmit , setValue} = useForm()

    setValue("username" , userData?.username)
    setValue("email" , userData?.email)
    setValue("password" , userData?.password)
    setValue("firstname" , userData?.firstname)
    setValue("lastname" , userData?.lastname)

    const [image , setImage] = useState(null)

    const [imageUrl , setImageUrl] = useState(null)

    const {run , loading} = useAsync("api/user/edit" , "PUT")

    const uploadProfileHandler = () => {
        
        const formData = new FormData()
        formData.append("profile" , image)

        fetch("http://localhost:8000/api/user/upload-profile" , {
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
        
        const userInfo = {...e , profile : imageUrl , _id : userData._id}

        run(userInfo).then(() => {
            window.location.reload()
        })

    }

    return (<>
        <div className="flex items-center justify-center flex-col pt-6 pb-6">
            <div className="flex flex-col items-center justify-center">
                <form onSubmit={handleSubmit(onSubmit)} action="" className="flex items-center gap-4 flex-col pt-2 pb-2 rounded-md w-[400px] justfy-center bg-slate-200">
                    <h1 className='text-[40px]'>Edit User</h1>
                    <label htmlFor="">
                        <h3>FirstName</h3>
                        <input {...register("firstname" , {required : true})} placeholder='Firstname' className="p-3 w-[300px] rounded-md border-none" type="text" />
                    </label>
                    <label htmlFor="">
                        <h3>Lastname</h3>
                        <input {...register("lastname" , {required : true})} placeholder='Lastname' className="p-3 w-[300px] rounded-md border-none" type="text" />
                    </label>
                    <label htmlFor="">
                        <h3>Email</h3>
                        <input {...register("email" , {required : true})} placeholder='Email' className="p-3 w-[300px] rounded-md border-none" type="email" />
                    </label>
                    <label htmlFor="">
                        <h3>Username</h3>
                        <input {...register("username" , {required : true})} placeholder='Usename' className="p-3 w-[300px] rounded-md border-none" type="text" />
                    </label>
                    {/* <label htmlFor="">
                        <h3>Password</h3>
                        <input {...register("password" , {required : true})} placeholder='Password' className="p-3 w-[300px] rounded-md border-none" type="text" />
                    </label> */}
                    <label>
                        <h3>Upload Profile</h3>
                        <input onChange={(e) => setImage(e.target.files[0])} placeholder='Upload Profile' className="pt-2" type="file" />
                        <img src={image && URL.createObjectURL(image)} alt="" />
                        <button onClick={uploadProfileHandler} className='bg-green-500 p-2 rounded-md text-white' type='button'>Upload</button>
                    </label>
                    <button type='submit' disabled={loading} className="w-[300px] bg-blue-500 text-slate-200 hover:bg-slate-900 hover:text-slate-200 p-2 rounded-md transition">{
                        loading ? "Pending" : "Submit"
                    }</button>
                </form>
            </div>
        </div>
    </>);
}
 
export default EditUser;