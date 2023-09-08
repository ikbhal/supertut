import "./App.css";
import Header from "./Pages/Header";
import Footer from "./Pages/Footer";
import MainPage from "./Pages/MainPage";
import TeacherPage from "./Pages/TeacherPage";
import SingleTeacher from "./Pages/SingleTeacher";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';



function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<MainPage/>} />
        <Route path="/teachers" element={<TeacherPage/>} />
        <Route path="/teachers/:id" element= {<SingleTeacher />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
