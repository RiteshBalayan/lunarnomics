import React from 'react';
import './News.css';
import NewsStory from '../components/NewsStory';
import { BrowserRouter as useParams, Route, Routes } from 'react-router-dom';
import CompanyList from '../components/CompanyList';
import ProjectList from '../components/ProjectList';
import LaunchList from '../components/LaunchList';
import Headlines from '../components/Headlines';
import HighlightsCards from '../components/HighlightsCards';
import Logo from '../components/Logo';
import AnimatedNumber from '../components/AnimatedNumber';
import SmallScreenSidebar from '../components/SmallScreenSidebar';

const News = () => {
  return (
    <div className="home-page">
      <div >
      <SmallScreenSidebar />
      </div>
      <div className="banner-wrapper">
        <div className="banner first">
          <Logo />
          <LaunchList />
          <ProjectList />
          <CompanyList />
        </div>
        <div className="banner big">
        <div className='last-linenews'>
                <div className="last-linenews-top">
                  <Routes>
                    <Route path="/" element={<React.Fragment> <HighlightsCards/> <Headlines/> </React.Fragment>} />
                  </Routes>
                </div>
                <div className="last-linenews-down"></div>
            </div>          
        </div>
      </div>
    </div>
  );
}

export default News;
