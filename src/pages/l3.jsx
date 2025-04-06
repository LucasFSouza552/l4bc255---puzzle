import { useState } from 'react';
import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(-20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const Wrapper = styled.div`
  font-family: 'Courier New', monospace;
  background: linear-gradient(to bottom, #000 0%, #111 100%);
  color: #0ff;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Container = styled.div`
  animation: ${fadeIn} 1.5s ease-out;
  max-width: 700px;
  text-align: center;
  padding: 30px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Title = styled.h1`
  font-size: 2rem;
  color: #0ff;
  text-shadow: 0 0 10px #0ff;
`;

const Description = styled.p`
  font-size: 1rem;
  color: #0f0;
  text-shadow: 0 0 5px #0f0;
`;

const Mirror = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border: 2px dashed #0ff;
  padding: 20px;
  margin-top: 20px;
  font-size: 1.2rem;
  font-style: italic;
  color: #0ff;
  text-shadow: 0 0 5px #0ff;
`;

const Input = styled.input`
  padding: 10px;
  font-size: 1rem;
  border: 2px solid #0ff;
  background: transparent;
  color: #0ff;
  text-align: center;
  transition: 0.3s;

  &:focus {
    outline: none;
    border-color: #0f0;
    box-shadow: 0 0 5px #0f0;
  }
`;

const Button = styled.button`
  margin-top: 10px;
  padding: 10px 30px;
  font-size: 1rem;
  background: transparent;
  border: 2px solid #0ff;
  color: #0ff;
  cursor: pointer;

  &:hover {
    background: #0ff;
    color: #000;
    box-shadow: 0 0 15px #0ff;
  }
`;

const Level3 = ({ onLevelChange, username }) => {
  const [inputValue, setInputValue] = useState('');

  const reversedUsername = username.split('').reverse().join('');

  const checkPassword = () => {
    if (inputValue.toLocaleLowerCase() === reversedUsername.toLocaleLowerCase()) {
      alert('A passagem se abre... vá rápido!');
      onLevelChange(4);
    } else {
      alert('O espelho permanece imóvel...');
    }
  };

  return (
    <Wrapper>
      <Container>
        <Title>Level 3 — O Reflexo</Title>
        <Description>
          Um espelho quebrado repousa no centro da sala. Riscado com algo esverdeado, uma frase:
        </Description>

        <Mirror>"Seu nome é a chave, mas não como você o conhece..."</Mirror>

        <Input
          placeholder="Digite a senha"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />

        <Button onClick={checkPassword}>Desbloquear</Button>
      </Container>
    </Wrapper>
  );
};

export default Level3;
