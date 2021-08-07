import './App.css';
import NoteInput from './NoteInput';
import Notes from './Notes';

function App() {
  return (
    <>
        <div className="app">
          <NoteInput />
          <Notes />
        </div>
    </>
  );
}

export default App;