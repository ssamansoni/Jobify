import Wrapper from "../assets/wrappers/SmallSidebar";
import { IoCloseCircle } from "react-icons/io5";
import {useAppContext} from "../context/appContext";
import Logo from "./Logo";
import SmallNavLinks from "./SmallNavLinks";

const SmallSidebar = () => {
  const {showSidebar, toggleSidebar} = useAppContext();

  return (
    <Wrapper>
      <div className={showSidebar?"sidebar-container show-sidebar":"sidebar-container"}>
        <div className="content">
          <button className="close-btn" onClick={toggleSidebar}>
            <IoCloseCircle/>
          </button>
          <header>
            <Logo/>
          </header>
          <SmallNavLinks/>
        </div>
      </div>
    </Wrapper>
  )
}

export default SmallSidebar;
