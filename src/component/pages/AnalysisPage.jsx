import { React, useState, useEffect } from 'react';
import axios from 'axios';
import { ReChartVertBar, ReChartLine } from '../ui/Recharts';
import '../styles/AnalysisPage.css';
import process from '../ui/process.png';
import rfroest from '../ui/rforest.png';
import group from '../ui/group.png';

const AnalysisPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [vrblImp, setVrblImp] = useState(null);
  const [shtsSc, setShtsSc] = useState(null);

  const getChartData = async()=>{
    try{
      const respVrbl = await axios.get('api/analysis/vrbl-imp')
      const modifiedVData = respVrbl.data.map((item)=>{
        return{
          ...item,
          name : item.variable,
        }
      })
      const respShts = await axios.get('api/analysis/shts-sc')
      const modifiedSData = respShts.data.map((item)=>{
        return{
          ...item,
          name : item.n,
        }
      })
      setVrblImp(modifiedVData)
      setShtsSc(modifiedSData)
      setIsLoading(false)
    }catch(e){
      console.log(e)
    }
  }
  const vrblYData = [{key:'importance', fill:'#ff8b12'}]
  const shtsYData = [{key:'silhouetteScores', stroke:'#12c6ff'}]

  useEffect(()=>{
    getChartData()
  },[])
  // isLoading (비동기 함수 기다리고 출력)
  return (
    <div className='analysisboard'>
      {
        isLoading ? (
          <div>
          </div>
        ) : (
          <div>
            <div className='aProcess'>
              <p className='aTitle'>분석과정</p>
              <img className='process' src={process} alt='process' />
              </div>
            <p className='subtitle'><span className='sign'>{'['}</span> 모델 선택 <span className='sign'>{']'}</span></p>
            <div className='rforest'>
              <img src={rfroest} alt='random forest'/>
              <div className='rtext'>
                <p className='subtitle'>랜덤포레스트</p>
                <p className='content'>· 다수의 의사결정나무모델에 의한 예측을 종합하는 앙상블 방법</p>
                <p className='content'>· 일반적으로 하나의 의사결정나무모델 보다 높은 예측 정확성을 보여줌</p>
                <p className='content'>· 관측치 수보다 변수의 수가 많은 고차원 데이터에서 중요 변수 선택 기법으로 널리 활용됨</p>
              </div>
            </div>
            <p className='subtitle'><span className='sign'>{'['}</span> 주요 변수 추출 <span className='sign'>{']'}</span></p>
            <div className='impve'>
              <ReChartVertBar width={700} height={500} data={vrblImp} xDataKey='name' yDataKey={vrblYData}
                              margin = {{top: 5,right: 30,left: 40,bottom: 5}} />
              <p className='content'>· 랜덤 포레스트 모델을 통해 얻은 변수 중요도를 내림차순으로 나열하고 군집분석을 위한 영향력이 큰 변수를 최종선택</p>
            </div>
            <p className='subtitle'><span className='sign'>{'['}</span>군집 분석<span className='sign'>{']'}</span></p>
            <div className='association'>
            <div className='association1'>
              <div className='nselect'>
                <p className='subtitle'>군집 수 정하기</p>
                <ReChartLine width={700} height={300} data={shtsSc} xDataKey='name' yDataKey={shtsYData}
                                margin = {{top: 5,right: 30,left: 40,bottom: 5}} />
                <p className='gTitle'>{'<'}군집 수에 따른 실루엣 스코어{'>'}</p>
              </div>
              <div className='kmodes'>
                <p className='subtitle'>K-Modes 알고리즘</p>
                <p className='content'>· 군집분석 시 보편적으로 K-Means 알고리즘을 사용하지만, 독립변수가 범주형 데이터이므로 변형된 K-Modes 알고리즘을 사용한다.</p>
                <p className='content'>· 유클리드 거리 대신에 HAMMING 거리나 유사한 대체 거리측정법을 사용해서 범주형 데이터에 대한 중심을 계산하는 알고리즘</p>
              </div>
            </div>
            <div className='association2'>
              <div className='nselect'>
                <img src={group} alt='group association'/>
                <p className='gTitle'>{'<'}군집형성{'>'}</p>
              </div>
              <div className='ntext'>
                <p className='content'>· 군집분석으로 얻은 집단별 특성을 활용하여 목적에 맞는 결과 도출</p>
              </div>
            </div>
            </div>
          </div>
          )
          }
    </div>
  );
};

export default AnalysisPage;