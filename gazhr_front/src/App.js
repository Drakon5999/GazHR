import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom';
import {Home, CreateVacancy, CreateVacancyCustomer, VacancyList, Vacancy, VacancyListCustomer, CreateTemplate} from './pages';
import CreateScript from './pages/CreateScript';

function App() {
  return (
    <div className="App">
      <Router>
        <div>
          <Switch>
            <Route path="/vacancy/:id">
              <Vacancy/>
            </Route>

            <Route path="/vacancy">
              <VacancyList/>
            </Route>

            <Route path="/vacancy-customer">
              <VacancyListCustomer/>
            </Route>

            <Route path="/create-vacancy-customer">
              {/*<CreateVacancyCustomer/> багнутая*/}
              <CreateVacancy/>
            </Route>

            <Route path="/create-vacancy">
              <CreateVacancy/>
            </Route>

            <Route path="/create-script">
              <CreateScript/>
            </Route>

            <Route path="/create-template">
              <CreateTemplate/>
            </Route>

            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
