import { React, useEffect, useRef } from 'react';
import '../styles/StaticsPage.css';

const StaticsPage = () => {
  const container1Ref = useRef(null); // 시각화 1을 담을 ref
  const container2Ref = useRef(null); // 시각화 2를 담을 ref
  const container3Ref = useRef(null); // 시각화 3를 담을 ref

  useEffect(() => {

    // Tableau 스크립트 동적 로드
    const loadTableauScript = () => {
      const script = document.createElement('script');
      script.src = 'https://online.tableau.com/javascripts/api/tableau-2.6.0.min.js';
      script.onload = () => {
        // 시각화 초기화
        initViz(container1Ref.current, 'https://public.tableau.com/views/pie_16989047528970/1?:language=ko-KR&:display_count=n&:origin=viz_share_link');
        initViz(container2Ref.current, 'https://public.tableau.com/views/1_16989768915930/1?:language=ko-KR&:display_count=n&:origin=viz_share_link');
        initViz(container3Ref.current, 'https://public.tableau.com/views/_16989125985530/1?:language=ko-KR&:display_count=n&:origin=viz_share_link');
      };

      // 스크립트 추가
      if (!document.querySelector('script[src*="tableau-2.6.0.min.js"]')) {
        document.body.appendChild(script);
      }
    };

    const initViz = (containerRef, viewUrl) => {
      if (containerRef && window.tableau) {
        if (!containerRef.querySelector('iframe')) {
          new window.tableau.Viz(containerRef, viewUrl, {
            hideTabs: true,
            hideToolbar: true,
          });
        }
      } else {
        console.error('Tableau가 정의되지 않았거나 컨테이너가 유효하지 않습니다.');
      }
    };

    loadTableauScript();
  }, []);

  return (
    <div className='staticsboard'>
      <p><span className='sign'>{'['}</span> 한눈에 보는 통계 <span className='sign'>{']'}</span></p>
      <div className='container'>
        <div className='vizContainer' ref={container1Ref}></div>
        <div className='vizContainer' ref={container2Ref}></div>
        <div className='vizContainer' ref={container3Ref}></div>
      </div>
    </div>
  );
};
  
  export default StaticsPage;