import BarChartComp from './BarChartComp';

import {useAppContext} from '../context/appContext';
import Wrapper from '../assets/wrappers/ChartsContainer';

const ChartsContainer = () => {
  const { weeklyApplications: data} = useAppContext();

  return (
    <Wrapper>
      <h4>Weekly Applications</h4>
      <BarChartComp data={data}/>
    </Wrapper>
  )
}

export default ChartsContainer
