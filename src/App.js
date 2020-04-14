import React, {useState, useEffect} from "react";

import "./styles.css";
import api from "./services/api";

function App() {
  async function handleAddRepository() {
    const newRepo = {
      title: `Repository ${new Date().getTime()}`,
      url: 'https://github.com/teste',
      techs: ['A', 'B', 'C']
    };
    
    api.post('repositories', newRepo).then((response) => {
      setRepositories([...repositories, response.data]);
    })
  }

  async function handleRemoveRepository(id) {
    api.delete(`repositories/${id}`).then(() => {
      setRepositories(repositories.filter(repo => repo.id !== id));
    });
  }

  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then((response) => {
      setRepositories(response.data);
    });
  }, []);
  


  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => (
          <li key={repository.id}>
            {repository.title}
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
