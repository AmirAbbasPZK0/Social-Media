import useAsync from "../hooks/useAsync";
import { useForm } from "react-hook-form"
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const SignUp = () => {

    const navigate = useNavigate()

    const isLogged = useSelector(state => state.user.isLogin)

    if(isLogged){
        navigate("/")
        window.location.reload()
    }

    const {register , handleSubmit} = useForm()

    const {run , loading} = useAsync("api/auth/signup" , "POST")

    const onSubmit = (e) => {
        run(e).then(res => {
            localStorage.setItem("token" , JSON.stringify(res.data.token))
            navigate('/')
            window.location.reload()
        })
    }

    return (<>
        <div className="flex h-[100vh] items-center justify-center">
            <form onSubmit={handleSubmit(onSubmit)} className="pt-5 pb-5 w-[400px] gap-2 bg-slate-300 rounded-md flex flex-col items-center justify-center" action="">
                <h1 className="text-[40px]">Sign Up</h1>
                <div className="flex flex-col items-center justify-start gap-2">
                    <label className="gap-2" htmlFor="">
                        <h4>Firstname : </h4>
                        <input type="text" {...register("firstname" , {required : true})} className="p-3 text-[17px] w-[340px] rounded-md border-none outline-none " />
                    </label>
                    <label className="gap-2" htmlFor="">
                        <h4>Lastname : </h4>
                        <input type="text" {...register("lastname" , {required : true})} className="p-3 text-[17px] w-[340px] rounded-md border-none outline-none " />
                    </label>
                    <label className="gap-2" htmlFor="">
                        <h4>Email : </h4>
                        <input type="text" {...register("email" , {required : true})} className="p-3 text-[17px] w-[340px] rounded-md border-none outline-none " />
                    </label>
                    <label className="gap-2" htmlFor="">
                        <h4>Username : </h4>
                        <input type="text" {...register("username" , {required : true})} className="p-3 text-[17px] w-[340px] rounded-md border-none outline-none " />
                    </label>
                    <label className="gap-2" htmlFor="">
                        <h4>Password : </h4>
                        <input type="text" {...register("password" , {required : true})} className="p-3 text-[17px] w-[340px] rounded-md border-none outline-none " />
                    </label>
                    <div className="flex items-center justify-center text-center">
                        <p className="text-[14px]">Do you Have Already an account? <Link className="text-blue-400" to={"/login"}>Login To Your Account</Link></p>
                    </div>
                    <button type="submit" disabled={loading} className="p-4 w-[300px] hover:bg-blue-500 transition-all hover:text-slate-200 font-semibold bg-blue-100 rounded-md">{loading ? "Pending..." : "Sign Up"}</button>
                </div>
            </form>
        </div>
    </>);
}
 
export default SignUp;