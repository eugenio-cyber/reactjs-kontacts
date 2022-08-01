import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login/index';
import SignUp from './pages/SignUp/index';
import Home from './pages/Home/index';

const ProjectRoutes = () => {
  return (
    <Routes>
      <Route path="/">
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
      </Route>

      <Route path="/sign-up" element={<SignUp />} />
      <Route path="/home" element={<Home />} />
    </Routes>
  );
};

export default ProjectRoutes;
