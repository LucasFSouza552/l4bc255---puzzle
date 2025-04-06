import { useState } from 'react';
import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(-50px); }
  to { opacity: 1; transform: translateY(0); }
`;

const Wrapper = styled.div`
  font-family: 'Courier New', monospace;
  background: radial-gradient(circle, #111 0%, #000 100%);
  color: #0ff;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: auto;
  padding: 20px;
`;

const Container = styled.div`
  text-align: left;
  animation: ${fadeIn} 2s ease-out;
  width: 100%;
  max-width: 700px;
  display: flex;
  flex-direction: column;
  padding: 20px;
`;

const Title = styled.h1`
  font-size: clamp(1.5rem, 4vw, 2rem);
  letter-spacing: 4px;
  color: #0ff;
  text-shadow: 0 0 10px #0ff;
  margin-bottom: 1rem;
`;

const Paragraph = styled.p`
  font-size: clamp(0.9rem, 2vw, 1rem);
  line-height: 1.6;
  color: #0f0;
  text-shadow: 0 0 4px #0f0;
  margin-bottom: 1rem;
`;

const Terminal = styled.div`
  background-color: #1a1a1a;
  padding: 15px;
  border: 1px solid #333;
  border-radius: 5px;
  font-family: monospace;
  color: #0ff;
  margin: 1rem 0;
  overflow-wrap: break-word;
`;

const Input = styled.input`
  padding: 10px;
  font-size: clamp(0.9rem, 2vw, 1rem);
  border: 2px solid #0ff;
  background: transparent;
  color: #0ff;
  width: 100%;
  text-align: center;
  margin: 1rem 0;

  &:focus {
    outline: none;
    border-color: #0f0;
    box-shadow: 0 0 5px #0f0;
  }
`;

const StartButton = styled.button`
  padding: 10px 30px;
  font-size: clamp(0.9rem, 2vw, 1rem);
  background: transparent;
  border: 2px solid #0ff;
  color: #0ff;
  cursor: pointer;
  width: 100%;
  max-width: 200px;
  margin: 0 auto;
  transition: all 0.3s ease;

  &:hover {
    background: #0ff;
    color: #000;
    box-shadow: 0 0 15px #0ff;
  }

  @media (max-width: 480px) {
    padding: 8px 20px;
  }
`;

const Clickable = styled.div`
  border: 1px dashed #0ff;
  padding: 10px;
  margin: 10px 0;
  cursor: pointer;
  color: ${({ revealed }) => (revealed ? '#0f0' : '#888')};
  background-color: ${({ revealed }) => (revealed ? 'rgba(0,255,0,0.1)' : 'transparent')};
  transition: 0.3s;
  font-size: clamp(0.9rem, 2vw, 1rem);

  &:hover {
    border-color: #0f0;
  }
`;

const Level2 = ({ onLevelChange }) => {
  const [inputValue, setInputValue] = useState('');
  const [clues, setClues] = useState({
    caixa: false,
    parede: false,
    papel: false,
  });

  const handleReveal = (item) => {
    setClues({ ...clues, [item]: true });
  };

  const verifyPassword = () => {
    if (inputValue.toLowerCase() === 'ele') {
      alert('Ele esta chegando...');
      onLevelChange(3);
    } else {
      alert('Algo está errado... ele ainda está por perto.');
    }
  };

  return (
    <Wrapper>
      <Container>
        <Title>Level 2</Title>
        <Paragraph>
          O silêncio pesa. A sensação de estar sendo observado cresce. Há objetos pela sala, mas talvez o perigo esteja mais perto do que parece...
        </Paragraph>

        <Clickable onClick={() => handleReveal('papel')} revealed={clues.papel}>
          📄 Papel amassado
          {clues.papel && (
            <Paragraph>
              Escuridão não é o pior dos males. há algo nos observando por trás dela.
            </Paragraph>
          )}
        </Clickable>

        <Clickable onClick={() => handleReveal('parede')} revealed={clues.parede}>
          🧱 Parede rachada
          {clues.parede && (
            <Paragraph>
              Luz alguma penetra por aqui. nem mesmo o tempo parece se mover neste lugar.
            </Paragraph>
          )}
        </Clickable>

        <Clickable onClick={() => handleReveal('caixa')} revealed={clues.caixa}>
          📦 Caixa empilhada
          {clues.caixa && (
            <Paragraph>
              Ele está observando. sempre esteve.
            </Paragraph>
          )}
        </Clickable>

        {(clues.caixa && clues.parede && clues.papel) && (
          <Terminal>
            As l..ras G.an..S são a S.nh.
          </Terminal>
        )}

        <Input
          type="text"
          placeholder="Digite a senha"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <StartButton onClick={verifyPassword}>Entrar</StartButton>
      </Container>
    </Wrapper>
  );
};

export default Level2;