import { FC } from 'react';
import './styles/index.scss';
import { ToDoListPage } from '@/pages/ToDoListPage';

const App: FC = () => {
  return (
    <div className="App">
      <ToDoListPage />
    </div>
  );
};

export default App;
