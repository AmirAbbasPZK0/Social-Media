import { useEffect } from "react";
import useAsync from "../hooks/useAsync";
import Post from "../components/Post";

const Home = () => {
    
    const {data , loading , run} = useAsync("api/posts" , "GET")

    useEffect(()=>{
        run()
    },[])

    if(loading)
        return <div className="flex items-center justify-center"><h1>Loading...</h1></div>

    console.log(data)

    return (<>
        <div className="flex items-center flex-col">
            <h1 className="text-[40px]">Posts</h1>
            <div className="flex items-center justify-center flex-col gap-2 pt-5 pb-4">
                {data?.data?.map((item , index) => (
                    <Post key={index} data={item}/>
                ))}
            </div>
        </div>
    </>);
}
 
export default Home;