import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
// import New from './new';
import Index from './pages/index/index.jsx'
import Resourlist from './pages/resourlist/resourlist.jsx'
import Newpage from './pages/newpage/newpage.jsx'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <BrowserRouter>
   <Switch>
   <Route path='/' exact component={Index}></Route>
     <Route path='/resourlist' component={Resourlist}></Route>
     <Route path='/newpage' component={Newpage}></Route>
   </Switch>
     
   </BrowserRouter>


    , document.getElementById('root'));
registerServiceWorker();
