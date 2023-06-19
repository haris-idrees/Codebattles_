import './App.css';
import Home from './components/Home';
import RegisterPage from './components/RegisterPage';
import Signup from './components/Signup';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Timeline from './components/Timeline';
import Competition from './components/Competition';
import ContactUs from './components/Contact';
import About from './components/About';
import UserProfile from './components/UserProfile';
import Update from './components/Update';
import Admin from './components/Admin';
import AdminContent from './components/AdminContent';
import Compiler from './components/Compiler';
import CurrentCompetition from './components/CompetitionContent';
import Test from './components/Test';
import CreateCompetiton from './components/CreateCompetiton';
import CreatePost from './components/createpost';
import CreateProblem from './components/CreateProblem';
import ShowResult from './components/ShowResult';

function App() {
  return (
    <>
        <BrowserRouter>
          <Routes>
            <Route path='/admin' element={<Admin></Admin>}></Route>
            <Route path='/adminContent' element={<AdminContent></AdminContent>}></Route>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/Contact" element={<ContactUs />} />
            <Route path='/timeline' element={<Timeline></Timeline>}></Route>
            <Route path="/quiz" element={<Competition/>}></Route>
            <Route path="/profile" element={<UserProfile/>}></Route>
            <Route path="/updateprofile/:email" element={<Update />} />
            <Route path="/compiler" element={<Compiler />} />
            <Route path="/competition/:competionId" element={<CurrentCompetition />} />
            <Route path="/test/:testID" element={<Test />} />
            <Route path="/createcomp" element={<CreateCompetiton />} />
            <Route path="/createprob" element={<CreateProblem />} />
            <Route path='/result' element={<ShowResult></ShowResult>}></Route>
          </Routes>
        </BrowserRouter>
    </>
  );
}

export default App;
