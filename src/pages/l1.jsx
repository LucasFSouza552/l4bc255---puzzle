import { useState } from 'react';
import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-50px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const Wrapper = styled.div`
  font-family: 'Courier New', monospace;
  background: radial-gradient(circle, #111 0%, #000 100%);
  color: #0ff;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;

const Container = styled.div`
  text-align: left;
  animation: ${fadeIn} 2s ease-out;
  max-width: 600px;
  padding: 30px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Title = styled.h1`
  font-size: 2rem;
  letter-spacing: 4px;
  color: #0ff;
  text-shadow: 0 0 10px #0ff;
`;

const Paragraph = styled.p`
  font-size: 1rem;
  line-height: 1.6;
  color: #0f0;
  text-shadow: 0 0 4px #0f0;
`;

const WallNote = styled.div`
  background: rgba(255, 255, 255, 0.05);
  padding: 10px;
  border-left: 4px solid #79c7ff;
  font-style: italic;
  color: #79c7ff;
  width: fit-content;
`;

const Terminal = styled.div`
  background-color: #1a1a1a;
  padding: 15px;
  border: 1px solid #333;
  border-radius: 5px;
  font-family: monospace;
  color: #0ff;
`;

const Input = styled.input`
  padding: 10px;
  font-size: 1rem;
  border: 2px solid #0ff;
  background: transparent;
  color: #0ff;
  width: 100%;
  text-align: center;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #0f0;
    box-shadow: 0 0 5px #0f0;
  }
`;

const StartButton = styled.button`
  padding: 10px 30px;
  font-size: 1rem;
  background: transparent;
  border: 2px solid #0ff;
  color: #0ff;
  cursor: pointer;
  transition: all 0.3s ease;
  width: fit-content;

  &:hover {
    background: #0ff;
    color: #000;
    box-shadow: 0 0 15px #0ff;
  }
`;

const senhas = {
  "NX-42Ω-552": "Nathália",
  "G7H-00X-552": "Lucas",
  "GMX-199X-552": "Daniel",
  "ST-33N-552": "Gabriel"
};

const Level1 = ({ onLevelChange, setUsername }) => {
  const [inputValue, setInputValue] = useState('');

  const passwordVerification = () => {
    if (inputValue in senhas) {
      setUsername(senhas[inputValue]);
      alert(`Bem-vindo, ${senhas[inputValue]}`);
      onLevelChange(2);
    } else {
      alert('Senha inválida!');
    }
  };

  return (
    <Wrapper>
      <Container>
        <Title>L4B - C255</Title>

        <Paragraph>
          O chão é metálico, áspero, gelado ao toque. O ar está pesado, com cheiro de ferrugem e um leve traço de ozônio.
          A escuridão domina por alguns segundos, até que um clique ecoa no teto. Um holofote solitário se acende, revelando o centro da sala.
        </Paragraph>

        <Paragraph>
          As paredes mostram marcas antigas. No centro, um papel amassado repousa sob a luz.
        </Paragraph>

        <WallNote>552</WallNote>
        <Paragraph>Rabiscado na parede oposta, com algo escuro. A sequência parece incompleta.</Paragraph>

        <Input
          type="text"
          value={inputValue}
          placeholder="Insira a senha para continuar."
          onChange={(e) => setInputValue(e.target.value)}
        />
        <StartButton onClick={passwordVerification}>Abrir</StartButton>
      </Container>
    </Wrapper>
  );
};

export default Level1;
