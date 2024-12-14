// App.tsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SharedLayout from "./components/SharedLayout";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import PredictionForm from "./pages/PredictionForm";
import BusinessSetupForm from "./pages/BusinessSetupForm";
import SignInForm from "./pages/SignInForm";

const App: React.FC = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<SharedLayout />}>
          <Route index element={<Home />} />
        </Route>
        <Route path="/predict" element={<PredictionForm />} />
        <Route path="/get-started" element={<BusinessSetupForm />} />
        <Route path="/signin" element={<SignInForm />} />
        <Route path="/about" />
        <Route path="/contact" />
      </Routes>
    </Router>
  );
};

export default App;
