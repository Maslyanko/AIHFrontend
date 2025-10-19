import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="container">
      <h1>Главная (публично)</h1>
      <p>
        Это публичная страница. Попробуйте зайти на <Link to="/protected">защищённый маршрут</Link>.
      </p>
    </div>
  );
}