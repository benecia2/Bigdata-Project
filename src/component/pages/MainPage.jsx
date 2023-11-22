import React from 'react';
import '../styles/MainPage.css';

const MainPage = () => {
  return (
    <div>
      <div className='home'>
        <div className='track1'>
          <span>
            HAEUNDAE BEACH 
            | GWANGALLI BEACH 
            | GAMCHEON CULTURE VILLAGE 
            | MOONTAN ROAD
            | MILLAK WATERSIDE PARK 
            | BIFF SQUARE 
            | JAGALCHI MARKET
            | TAEJONGDAE 
            | JEONPO CAFE STREET 
            | SONGDO BEACH 
            | GUKJE MARKET 
            | DADAEPO BEACH 
            | GALMAETGIL 
            </span>
        </div>
        <div className='track2'>
          <span>
            BEXCO 
            | X THE SKY 
            | BUSAN CINEMA CENTER 
            | DIAMOND TOWER 
            | GWANGAN BRIDGE 
            | BEOMEOSA 
            | NURIMARU APEC HOUSE 
            | HAEDONG YONGGNUNGSA 
            | NATIONAL MARITIME MUSEUM 
            | MUSEUM OF CONTEMPORARY ART BUSAN 
            </span>
        </div>
        <div className='track3'>
          <span>
            G-STAR 
            | BUSAN INTERNATIONAL FILM FESTIVAL 
            | BUSAN BIENNALE 
            | BUSAN INTERNATIONAL ROCK FESTIVAL 
            | BUSAN FIREWORKS FESTIVAL 
            | BUSAN ONEASIA FESTIVAL 
            | BUSAN HIPHOP FESTIVAL 
            | BUSAN INTERNATIONAL ART FAIR 
            </span>
        </div>
        <div className='track4'>
          <span>
            LANDSCAPE
            | FOOD/GOURMET 
            | SHOPPING 
            | CULTURE 
            | FESTIVAL 
            | HISTORY 
            | YACHT 
            | SKY CAPSULE 
            | SURFING 
            | CABLE CAR 
            | HIKING 
            </span>
        </div>
        <div className='track5'>
          <span>
            GWANGALLI 
            | SEOMYEON 
            | HAEUNDAE 
            | YOUNGDO 
            | NAMPODONG 
            | JEONPO
            | CENTUM CITY 
            | MARINE CITY
            </span>
        </div>
      </div>
      <div className='enter'>
        <p><a href='/overview'>Have a nice <p>B-trip!</p></a></p>
      </div>
    </div>
  );
};

export default MainPage;