import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { SnakeGame } from './components/SnakeGame';
import './App.scss';

function App() {
  return (
    <div className="host flex flex-col h-full">
      <div className="noise"></div>
      <div className="overlay"></div>
      
      <div className="relative w-full h-full overflow-hidden rounded-lg bg-cover bg-no-repeat flex flex-col">
        <Header />
        
        <main className="relative z-5 w-full flex-1 overflow-y-auto p-md box-border">
          <SnakeGame />
        </main>
        
        <Footer />
      </div>
    </div>
  );
}

export default App;
