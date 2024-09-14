import { useEffect } from "react";
import useAsync from "../hooks/useAsync";

const Home = () => {
    
    const {data , loading , run} = useAsync("api/posts" , "GET")

    useEffect(()=>{
        run()
    },[])

    if(loading)
        return <div className="flex items-center justify-center"><h1>Loading...</h1></div>

    return (<>
        <div className="flex items-center justify-center flex-wrap gap-2 h-[100vh]">
            {data?.data?.map((item , index) => (
                <div key={index} className="w-[300px] flex flex-col items-center justify-evenly h-[300px] rounded-md bg-slate-100">
                    <div className="flex flex-row justify-evenly gap-5">
                        <img src={item.author.profile} className="w-[60px] h-[60px] rounded-md" alt="" />
                        <h3 className="text-[20px]">{item.author.username}</h3>
                    </div>
                    <div className="flex flex-row items-start justify-start gap-5">
                        <p className="text-slate-600">{item.description}</p>
                    </div>
                </div>
            ))}
        </div>
    </>);
}
 
export default Home;