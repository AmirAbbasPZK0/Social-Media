const Post = ({data}) => {
    return (<>
        <figure className="flex flex-col pt-5 pb-5 border-slate-500 border-1 bg-slate-300 w-[60%] rounded-md ">
            <div className="p-4 flex gap-4 items-center flex-row">
                <img src={data?.author?.profile} className="w-[60px] h-[60px] rounded-full" alt="" />
                <h2 className="text-[20px] font-semibold">{data?.author?.username}</h2>
            </div>
            <div className="p-4 flex flex-col gap-5">
                <p>{data?.description}</p>
                <span className="text-slate-600">{new Date(data?.createdAt).toLocaleString()}</span>
            </div>
        </figure>
    </>);
}
 
export default Post;