import Wrapper from "../assets/wrappers/BigSidebar";
import {useAppContext} from "../context/appContext";
import Logo from "./Logo";
import BigNavLinks from "./BigNavLinks";

const BigSidebar = () => {
  const {showSidebar} = useAppContext();

  return (
    <Wrapper>
      <div className={showSidebar?"sidebar-container":"sidebar-container show-sidebar"}>
        <div className="content">
          <header>
            <Logo/>
          </header>
          <BigNavLinks/>
        </div>
      </div>
    </Wrapper>
  )
}

export default BigSidebar
