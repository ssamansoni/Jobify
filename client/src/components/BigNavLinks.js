import { NavLink } from "react-router-dom";
import links from "../util/links";

const BigNavLinks = () => {

  return (
    <div className="nav-links">
            {links.map((item)=>{
              const {text,id,path,icon} = item;

              return <NavLink to={path} key={id} className={({isActive}) => isActive ? 'nav-link active' : 'nav-link'}>
                <span className="icon">{icon}</span> {text}               
              </NavLink>
            })}
    </div>
  )
}

export default BigNavLinks