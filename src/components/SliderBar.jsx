import { useSelector } from 'react-redux' 
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {tabHandler} from '../redux/tabReducer'


const SlideBar = () => {

    const userData = useSelector(state => state.user.data)

    const dispatch = useDispatch()

    const links = [
        {
            title : "Posts",
            href : "/"
        },
        {
            title : "Add Post",
            href : "/add-post"
        }
    ]

    return (<>
        <div className="container flex fixed z-1 flex-col mx-auto bg-white">
            <aside className="group/sidebar flex flex-col shrink-0 lg:w-[300px] w-[250px] transition-all duration-300 ease-in-out m-0 fixed z-40 inset-y-0 left-0 bg-white border-r border-r-dashed border-r-neutral-200 sidenav fixed-start loopple-fixed-start" id="sidenav-main">
            <button onClick={()=>{
                dispatch(tabHandler())
            }} className='p-2 rounded-md bg-slate-500 text-white'>close</button>
            <div className="flex shrink-0 px-8 items-center justify-between h-[96px]">
            <h2 className='text-[50px] text-blue-700'>Atlas</h2>
        </div>

        <div className="hidden border-b border-dashed lg:block dark:border-neutral-700/70 border-neutral-200"></div>

        <div className="flex items-center justify-between px-8 py-5">
            <div className="flex items-center mr-5">
            <div className="mr-5">
                <div className="cursor-pointer rounded-[.95rem]">
                <img width={50} height={50} className="w-[50px] h-[50px] rounded-[50%]" src={
                    userData?.profile ? userData?.profile : "https://cdn.vectorstock.com/i/500p/53/42/user-member-avatar-face-profile-icon-vector-22965342.jpg"
                } alt="avatar image"/>
                </div>
            </div>
            <div className="mr-2 ">
                <a href="javascript:void(0)" className="dark:hover:text-primary hover:text-primary transition-colors duration-200 ease-in-out text-[0 7rem] font-medium dark:text-neutral-400/90 text-secondary-inverse">{userData?.username}</a>
                <span className="text-secondary-dark dark:text-stone-500 font-medium block text-[0.85rem]">Demo</span>
            </div>
            </div>
            <Link to={"/edit-user"} className="inline-flex relative items-center group justify-end text-base font-medium leading-normal text-center align-middle cursor-pointer rounded-[.95rem] transition-colors duration-150 ease-in-out text-dark bg-transparent shadow-none border-0" >
            Edit
            </Link>
        </div>

        <div className="hidden border-b border-solid lg:block dark:border-neutral-700/70 border-neutral-200"></div>

        <div className="relative pl-3 my-5">
            <div className="flex flex-col w-full font-medium">
            {links.map((item , key) => (
                <div key={key}>
                    <span className={`${window.location.pathname === item.href ? "bg-slate-400" : "bg-white"} select-none flex items-center px-4 py-[.775rem] cursor-pointer my-[.4rem] rounded-[.95rem]`}>
                    <Link to={item.href} className="flex items-center flex-grow text-[1.15rem] dark:text-neutral-800/75 text-stone-7800 hover:text-dark">{item.title}</Link>
                    </span>
                </div>
            ))}
            
            <div>
                <span className="select-none flex items-center px-4 py-[.775rem] cursor-pointer my-[.4rem] rounded-[.95rem]">
                <a onClick={()=>{
                    localStorage.removeItem("token")
                    window.location.reload()
                }} href="javascript:;" className="flex items-center p-2 rounded-md bg-red-500 flex-grow text-[1.15rem] text-slate-50 hover:text-dark">Log Out</a>
                </span>
            </div>

            </div>
            </div>
        </aside>
        </div>
    </>);
}
 
export default SlideBar;