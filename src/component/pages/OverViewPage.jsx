import { React, useState, useEffect } from 'react';
import axios from 'axios';
import { ReChartBar } from '../ui/Recharts';
import '../styles/OverViewPage.css';

const OverViewPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [foriegnVisitors, setForiegnVisitors] = useState(null);
  const [spotVisitor, setSpotVisitor] = useState(null);
  const getChartData = async()=>{
    try{
      const respVisitor = await axios.get('api/overview/foriegn-visitors')
      //그래프에 맞게 월별로 데이터 그룹화
      const groupedData = groupDataByMonth(respVisitor.data)
      setForiegnVisitors(groupedData);

      const respSpotVisitor = await axios.get('api/overview/spot-visitors')
      const groupedspotData = groupDataBytitle(respSpotVisitor.data)
      setSpotVisitor(groupedspotData)
      
      setIsLoading(false)
    }catch(e){
      console.log(e);
    }
  }
  const visitYData = [{key:2022,fill:'#000846'},{key:2023, fill:'#8dcbfd', stackId:'a'},{key:'excepted', fill:'#FFC600', stackId:'a'}]
  const spotYData = [{key:2022, fill:'#0070FF'},{key:2021, fill:'#ffaf00'}]
  
  useEffect(()=>{
    getChartData()
  },[])
  return (
    
    <div className='viewboard'>
      {
        isLoading ? (
          <div>
          </div>
        ) : (
          <div>
            <p className='title'><span className='sign'>{'['}</span> 부산을 찾는 외국인 관광객 급증 <span className='sign'>{']'}</span></p>
            <div className='part1'>
            <div className='gArea'>
              <ReChartBar width={800} height={300} data={foriegnVisitors} xDataKey='name' yDataKey={visitYData}
                        margin = {{top: 5,right: 30,left: 40,bottom: 5}} />
              <span className='gTitle'>{'<'} 2022~2023년 부산 방문 외국인 관광객 수와 <span className='est'>추정치</span> {'>'}</span>
            </div>
            <div className='tArea'>
              <p className='subtitle'>코로나-19로 인한 관광객 수 회복 추세</p>
              <p className='content'>· 2023년, 코로나-19 엔데믹 선언, 2030 부산세계박람회 유치 홍보 효과, 한류 문화 열풍 등으로 외국인들의 관심이 급증하면서 일본인 관광객뿐 아니라 전반적인 외국인 관광객들의 관심이 크게 증가</p>
              <p className='content'>· 부산 관광에 관심이 있는 외국인들을 위해 차별화된 서비스 제공으로 적극적인 관광 유치 필요</p>
            </div>
            </div>
            <p className='title'><span className='sign'>{'['}</span> '해운대구'로 집중되는 부산 외국인 관광객 <span className='sign'>{']'}</span></p>
            <div className='part2'>
            <div className='gArea'>
              <ReChartBar width={800} height={300} data={spotVisitor} xDataKey='name' yDataKey={spotYData}
                        margin = {{top: 5,right: 30,left: 40,bottom: 5}} />
                        <span className='gTitle'>{'<'} 부산 주요 관광지별 외국인 방문객수 상위 TOP 5 {'>'}</span>
            </div> 
            <div className='tArea'>
                <p className='content'>· 코로나-19 유행 기간 내 감소한 부산의 외국인 관광객 수는 회복되는 추세지만 외국인 관광객 대부분이 ‘해운대구‘로 집중되어 방문하는 경향이 나타나고 있음</p>
                <p className='content'>· 외국인 관광객들에게 해운대구 외 다양한 관광지 정보 제공(추천)을 통해 부산 관광의 균형 있는 활성화가 필요함</p>
            </div>
            </div>
          </div>
        )
      }
    </div>
  );
};

function groupDataByMonth(data) {
  const groupedData = {};

  data.forEach(item => {
    const { month, year, visitor, excepted } = item;

    // "expected" 값이 1인 경우에만 분리
    if (item.hasOwnProperty("excepted") && item.excepted === 1){
      if (!groupedData[month]) {
        groupedData[month] = { name: month };
      }
      // "expected"를 키로 사용해서 데이터 추가
      groupedData[month].excepted = visitor
    }else{
      if (!groupedData[month]) {
        groupedData[month] = {name:month};
      }
      groupedData[month][year] = visitor;
    }
  });
  return Object.values(groupedData);
}


function groupDataBytitle(data) {
  const groupedData = {};
  data.forEach(item => {
    const { title, year, visitor } = item;
    if (!groupedData[title]) {
      groupedData[title] = {name:title};
    }
    groupedData[title][year] = visitor;
    
  });
  return Object.values(groupedData);
}

export default OverViewPage;