import { NavLink } from "react-router-dom";
import links from "../util/links";
import { useAppContext } from "../context/appContext";

const SmallNavLinks = () => {
    const {toggleSidebar} = useAppContext();

  return (
    <div className="nav-links">
            {links.map((item)=>{
              const {text,id,path,icon} = item;

              return <NavLink to={path} key={id} onClick={()=>{toggleSidebar()}} className={({isActive}) => isActive ? 'nav-link active' : 'nav-link'}>
                <span className="icon">{icon}</span> {text}               
              </NavLink>
            })}
    </div>
  )
}

export default SmallNavLinks
