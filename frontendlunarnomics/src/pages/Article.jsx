import React from 'react';
import './Article.css';
import NewsDetail from '../components/NewsDetail';
import CompanyList from '../components/CompanyList';
import CompanyDetail from '../components/ComapanyDetail';
import ProjectList from '../components/ProjectList';
import ProjectDetail from '../components/ProjectDetail';
import LaunchList from '../components/LaunchList';
import LaunchDetail from '../components/LaunchDetail';
import ArticleGeneral from '../components/ArticleGeneral';
import Logo from '../components/Logo';
import AnimatedNumber from '../components/AnimatedNumber';
import SmallScreenSidebar from '../components/SmallScreenSidebar';

import { BrowserRouter as useParams, Route, Routes } from 'react-router-dom';

const Article = () => {

  
  return (
    <div className="home-page">
      <SmallScreenSidebar />
      <div className="banner-wrapper">
        <div className="banner first">

              <Logo />
              <LaunchList />
              <ProjectList />
              <CompanyList />

        </div>
        <div className="banner big">
            <div className='middle-line'>
                <div className="middle-line-top">
                  <Routes>
                    <Route path="/news/:pk" element={<NewsDetail />} />
                    <Route path="/company/:id" element={<CompanyDetail />} />
                    <Route path="/project/:id" element={<ProjectDetail type="main"/>} />
                    <Route path="/general/:pk" element={<ArticleGeneral />} />
                    <Route path="/launch/:id" element={<LaunchDetail type="main"/> } />
                  </Routes>
                </div>
                <div className='middle-line-mid'></div>
                <div className="middle-line-down"></div>
            </div>           
        </div>
        <div className="banner last">
        <div className='last-line'>
                <Routes>
                    <Route path="/news/:pk" element={<LaunchList />} />
                    <Route path="/company/:id" element={<ProjectList />} />
                    <Route path="/project/:id" element={<ProjectDetail type="sidebar"/>} />
                    <Route path="/launch/:id" element={<LaunchDetail type="sidebar"/> } />
                  </Routes>
            </div>   
        </div>
      </div>
    </div>
  );
}

export default Article;
