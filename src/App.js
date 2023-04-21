import "./App.css";
import { Home } from "./Home/Home";
import { AnimationBackground } from "./AnimationBackground/AnimationBackground";

function App() {
  return <div className="App bg-slate-400 h-screen">
    <AnimationBackground />
    <Home />
    
  </div>;
}

export default App;
