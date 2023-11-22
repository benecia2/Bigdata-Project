import { React, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import '../styles/Result.css';
import bfood from '../ui/bfood.png';
import bshopping from '../ui/bshopping.png';
import bnature from '../ui/bnature.png';
import bculture from '../ui/bculture.png';
import betc from '../ui/betc.png';
import food from '../ui/food.png';
import shopping from '../ui/shopping.png';
import nature from '../ui/nature.png';
import culture from '../ui/culture.png';
import etc from '../ui/etc.png';

// 랜덤으로 데이터 배치
function shuffleArray(array){
  const shuffled = [...array]
  for(let i = shuffled.length -1; i>0; i--){
    const j = Math.floor(Math.random() * (i+1));
    [shuffled[i], shuffled[j]] =[shuffled[j], shuffled[i]]
  }
  return shuffled
}

const Result = () => {

  const location = useLocation()
  const result = location.state.result

  const [isLoading, setIsLoading] = useState(true);
  const [tourData, setTourData] = useState([])
  const [acmData, setAcmData] = useState([])
  const [satisfactionData, setSatisfactionData] = useState([])

  useEffect(() => {
    const fetchTourData = async () => {
      let tourCategory;
      let acmCategory;

      switch (result.question2) {
        case "Food/Gourmet Tour":
          tourCategory = [1];
          break;
        case "Historic/Cultural Sites/Traditional Cultural Experience":
          tourCategory = [4];
          break;
        case "Nature appreciation":
          tourCategory = [2];
          break;
        case "Shopping":
          tourCategory = [3];
          break;
        case "Etc":
          tourCategory = [5];
          break;
        default:
          break;
      }

      switch (result.question3) {
        case "~ 100$":
          acmCategory = [1];
          break;
        case "100$ ~ 200$":
          acmCategory = [2];
          break;
        case "200$ ~ 300$":
          acmCategory = [3];
          break;
        case "300$ ~":
          acmCategory = [4];
          break;
        default:
          break;
      }

      let tourDataResponses = []

      try {
        tourDataResponses = await axios.get(`api/tour/list/${tourCategory}/${acmCategory}`)
            .then((response)=> {

              setTourData(response.data.rec_1);
              setAcmData(response.data.acm);
              setSatisfactionData(response.data.rec_2);
            })
          
        ;
        setIsLoading(false);

      } catch{
        console.log("데이터 로드 실패:");
      }
    };

    fetchTourData();
  }, [result.question2, result.question3]);

  const type = (result.question2 === "Food/Gourmet Tour") ? 'Food Lover'
    : (result.question2 === "Historic/Cultural Sites/Traditional Cultural Experience") ? 'Culture Lover'
    : (result.question2 === "Nature appreciation") ? 'Nature Lover'
    : (result.question2 === "Shopping") ? 'Shopping Lover'
    : 'Etc';
  
  const bImg = (result.question2 === "Food/Gourmet Tour") ? bfood
    : (result.question2 === "Historic/Cultural Sites/Traditional Cultural Experience") ? bculture
    : (result.question2 === "Nature appreciation") ? bnature
    : (result.question2 === "Shopping") ? bshopping
    : betc;

  const rImg = (result.question2 === "Food/Gourmet Tour") ? food
    : (result.question2 === "Historic/Cultural Sites/Traditional Cultural Experience") ? culture
    : (result.question2 === "Nature appreciation") ? nature
    : (result.question2 === "Shopping") ? shopping
    : etc;

  return (
    <div className='resultboard'>
      {
        isLoading ? (
          <div>
          </div>
        ) : (
          <>
            <p className='title'>RESULT</p>
            <div className='ticket'>
              <div className='tText'>
                <p id='tType'>{type}</p>
                <p id='tAge'>{result.question1}</p>
                <p id='tSeason'>{result.question4}</p>    
                <p id='tCost'>{result.question3}</p>
              </div>
              <img className='tImg' src={bImg} alt='bImg'/>
            </div>
            <div className='scroll-down'></div>
            <div className='scroll-down'></div>
            <div className='rResult'>
              <div className='tourList'>
                <p className='listTitle'>Tour List</p>
                  {shuffleArray(tourData).slice(0, 5).map((item, index) => (
                      <div className='tourCard' key={index}>
                          <img src={item.img_url} alt="이미지" />
                          <div className='tourText'>
                            <p className='subtitle'>{item.title}</p>
                            <p>Views: {item.views} | Comments: {item.comments} | Likes: {item.likes}</p>
                            <p>Category: {item.category}</p>
                            <a className='detail' href={item.link_url} target="blank">View Details</a>
                          </div>
                      </div>
                    ))}
              </div>
              <div className='accmList'>
                <p className='listTitle'>Accommodation List</p>
                {shuffleArray(acmData).slice(0,5).map((item,index)=>( 
                  <div className='accmCard' key={index}>
                      <img src={item.img_url} alt='이미지'/>
                      <div className='accmText'>
                        <p className='subtitle'>{item.title}</p>
                        <p>{item.location}</p>
                        {
                          item.rating === 5 ? <span id='star'>⭐⭐⭐⭐⭐</span>
                          : item.rating === 4 ? <span id='star'>⭐⭐⭐⭐</span>
                          : item.rating === 3 ? <span id='star'>⭐⭐⭐</span>
                          : item.rating === 2 ? <span id='star'>⭐⭐</span>
                          : item.rating === 1 ? <span id='star'>⭐</span>
                          : <span>&nbsp;</span>
                        }
                        <span id='score'>{item.score}</span>
                        <p>KRW&nbsp;
                          {
                            Number(item.price).toLocaleString()
                          }
                        </p>
                        <a href={item.link_url} target='blank'>Go Reservation</a>
                        <p id='tax'>* {item.tax_charge}</p>
                      </div>
                  </div>
                ))}
              </div>
              </div>
              <p id='divA'>+ + + + + + + + + +</p>
              <div className='another'>
                <div className='type'>
                  <p className='subtitle'>Your type {'⬇'}</p>
                  <img src={rImg} alt='rImg'/>
                </div>
                <div className='anthrCard'>
                  <p className='subtitle'> &nbsp; Your type may also likes {'⬇'}</p>
                    {shuffleArray(satisfactionData).slice(0, 1).map((item, index) => (
                      <div className='anthrCard_d' key={index}>
                          <img src={item.img_url} alt="이미지" />
                          <div className='anthrText'>
                            <p className='subtitle'>{item.title}</p>
                            <p>Views: {item.views}</p>
                            <p>Comments: {item.comments}</p>
                            <p>Likes: {item.likes}</p>
                            <p>Category: {item.category}</p>
                            <a className='detail' href={item.link_url} target="blank">View Details</a>
                          </div>
                      </div>
                    ))}
                </div>
              </div>
          </>
            )
            }
    </div>
  );
};

export default Result;