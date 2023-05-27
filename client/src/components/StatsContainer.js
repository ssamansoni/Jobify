import StatsItem from "./StatsItem"
import { useAppContext } from "../context/appContext"
import { FaPen , FaSuitcaseRolling , FaCalendarCheck ,FaHandshake, FaBug } from "react-icons/fa"
import Wrapper from "../assets/wrappers/StatsContainer";

const StatsContainer = () => {
  const {stats} = useAppContext();

  const defaultStats = [
    {
        title: 'Pending Applications',
        count : stats.Pending || 0,
        icon : <FaSuitcaseRolling/>,
        bcg : '#fcefc7',
        color: '#e9b949',
    },
    {
        title: 'Tests Scheduled',
        count : stats.Test || 0,
        icon : <FaPen/> ,
        bcg : '#CDF6F1',
        color: '#00B4B4',
    },
    {
        title: 'Interviews Scheduled',
        count : stats.Interview || 0,
        icon : <FaCalendarCheck/>,
        bcg: '#e0e8f9',
        color: '#4867d9',
    },
    {
        title: 'Job Offers',
        count : stats.Offer || 0,
        icon : <FaHandshake/>,
        color: '#2EAC66',
        bcg: '#D1FFD5',
    },
    {
        title: 'Jobs Declined',
        count : stats.Declined || 0,
        icon : <FaBug/>,
        color: '#d66a6a',
        bcg: '#ffeeee',
    }
  ]

  return (
    <Wrapper>
        {defaultStats.map((item,index)=>{
            return <StatsItem key={index} {...item}/>
        })}
    </Wrapper>
  )
}

export default StatsContainer
