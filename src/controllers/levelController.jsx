
import { useState } from "react";
import Level1 from "../pages/l1";
import Level2 from "../pages/l2";
import Level3 from "../pages/l3";
import Level4 from "../pages/l4";
import Level5 from "../pages/l5";

const LevelController = () => {
    const [level, setLevel] = useState(1); // Estado para controlar o nível atual
    const [username, setUsername] = useState(''); // Estado para armazenar o nome de usuário

    const handleLevelChange = (newLevel) => {
        setLevel(newLevel);
    };

    return (
        <div>
            {level === 1 && <Level1 onLevelChange={handleLevelChange} setUsername={setUsername} username={username} />}
            {level === 2 && <Level2 onLevelChange={handleLevelChange} username={username} />}
            {level === 3 && <Level3 onLevelChange={handleLevelChange} username={username} />}
            {level === 4 && <Level4 onLevelChange={handleLevelChange} username={username} />}
            {level === 5 && <Level5 onLevelChange={handleLevelChange} username={username} />}
            {/* Adicione outros níveis aqui conforme necessário */}
        </div>
    );
}

export default LevelController;