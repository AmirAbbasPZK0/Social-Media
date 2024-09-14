import useAsync from "../hooks/useAsync";
import { useForm } from "react-hook-form"
import { Link } from "react-router-dom";
import {useNavigate} from "react-router-dom"
import { useSelector } from "react-redux";
import {toast} from 'react-toastify'

const LogIn = () => {

    const {register , handleSubmit} = useForm()

    const isLogin = useSelector(state => state.user.isLogin)

    const navigate = useNavigate()

    if(isLogin){
        navigate("/")
        window.location.reload()
    }

    const {run , loading} = useAsync("api/auth/login" , "POST")

    const onSubmit = (e) => {
        run(e).then(res => {
            localStorage.setItem("token" , JSON.stringify(res.data.token))
            navigate("/")
            window.location.reload()
        }).catch(err => {
            console.log(err)
            toast(err?.response?.data?.message , {
                type : "error",
                position : "bottom-right"
            })
        })
    }

    return (<>
        <div className="flex h-[100vh] items-center justify-center">
            <form onSubmit={handleSubmit(onSubmit)} className="pt-5 pb-5 w-[400px] gap-2 bg-slate-300 rounded-md flex flex-col items-center justify-center" action="">
                <h1 className="text-[40px]">Login</h1>
                <div className="flex flex-col items-center justify-start gap-2">
                    <label className="gap-2" htmlFor="">
                        <h4>Username | Email : </h4>
                        <input type="text" {...register("connector" , {required : true})} className="p-3 text-[17px] w-[340px] rounded-md border-none outline-none " />
                    </label>
                    <label className="gap-2" htmlFor="">
                        <h4>Password : </h4>
                        <input type="password" {...register("password" , {required : true})} className="p-3 text-[17px] w-[340px] rounded-md border-none outline-none " />
                    </label>
                    <div className="flex items-center justify-center text-center">
                        <p className="text-[14px]">Don't you Have an account? <Link className="text-blue-400" to={"/signup"}>Sign up</Link></p>
                    </div>
                    <button type="submit" disabled={loading} className="p-4 w-[300px] hover:bg-blue-500 transition-all hover:text-slate-200 font-semibold bg-blue-100 rounded-md">{loading ? "Pending..." : "Login"}</button>
                </div>
            </form>
        </div>
    </>);
}
 
export default LogIn;