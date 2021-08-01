import './App.css';
import NoteInput from './NoteInput';
import Notes from './Notes';

function App() {
  return (
    <>
        <div className="app">
          <Notes />
          <NoteInput />
        </div>
    </>
  );
}

export default App;