import { useEffect } from "react";
import { useAppContext } from "../../context/appContext"
import { StatsContainer, Loading , ChartsContainer } from "../../components";

const Stats = () => {
  const {showStats , isLoading , weeklyApplications} = useAppContext();

  useEffect(() => {
    showStats();
    // eslint-disable-next-line
  },[])

  if(isLoading)
  {
    return <Loading center/>
  }

  return (
    <div>
      <StatsContainer/>
      {weeklyApplications.length > 0 && <ChartsContainer/>}
    </div>
  )
}

export default Stats
