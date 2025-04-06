import { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: #000;
  color: #0ff;
  font-family: 'Courier New', monospace;
  gap:10px;
`;

const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: 20px;
`;

const SpinnerWrapper = styled.div`
  display: flex;
  gap: 30px;
  margin-bottom: 20px;
  user-select: none;
`;

const Spinner = styled.div`
  width: 80px;
  height: 80px;
  border: 6px solid #0ff;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  cursor: pointer;
  box-shadow: 0 0 10px #0ff;
  transition: transform 0.3s ease;

  &:hover {
    transform: rotate(20deg);
  }
`;

const Encoded = styled.div`
  font-size: 1.2rem;
  margin-top: 10px;
  color: #0f0;
  text-shadow: 0 0 5px #0f0;
`;

const Description = styled.p`
  font-size: 1rem;
  color: #0f0;
  margin: 20px;
  max-width: 600px;
  text-align: center;
  text-shadow: 0 0 5px #0f0;
`;

const Alert = styled.p`
  font-size: 1.2rem;
  color: #f00;
  margin: 10px;
  text-align: center;
`;

const Button = styled.button`
  padding: 10px 30px;
  font-size: 1rem;
  background: transparent;
  border: 2px solid #0ff;
  color: #0ff;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: #0ff;
    color: #000;
    box-shadow: 0 0 15px #0ff;
  }
`;

const CaesarCipher = ({ text, shift }) => {
  return text.split('').map(char => {
    if (!char.match(/[a-z]/i)) return char;
    const base = char === char.toLowerCase() ? 97 : 65;
    return String.fromCharCode(((char.charCodeAt(0) - base + shift) % 26) + base);
  }).join('');
};

const Level5 = () => {
  const [spins, setSpins] = useState([0, 0, 0, 0]);
  const [alert, setAlert] = useState(null);

  const senha = "Rsir vjkr jilnu";

  //Ao terminar de colocar o codigo a porta se abre e você se vê livre.
  const encodedSenha = CaesarCipher({ text: senha.split(" ").map((word, index) => CaesarCipher({ text: word, shift: spins[index] })).join(" "), shift: spins[3] }); //CaesarCipher({ text: senha, shift });

  const handleSpin = (index, event) => {
    const delta = event.deltaY > 0 ? 1 : -1;
    const updated = [...spins];
    updated[index] = (updated[index] + delta + 26) % 26;
    setSpins(updated);
  };

  const handleConfirm = () => {
    if (encodedSenha === "A porta se abre") {
      setAlert(null);
      alert("Parabens! Você conseguiu!");
    } else {
      setAlert("Senha incorreta!");
    }
  };

  return (
    <Container>
      <Title>Level 5 — Cifra de César</Title>
      <Description>
        A sala escura pulsa com energia. No centro, quatro roletas brilham suavemente, esperando serem giradas.
        Você percebe que não está sozinho — três sombras ao seu redor também observam, em silêncio.
        A sensação é clara: a saída depende da cooperação de todos.
      </Description>

      <SpinnerWrapper onWheel={event => handleSpin(event.target.id, event)}>
        {spins.map((val, i) => (
          <Spinner key={i} id={i}>
            {val}
          </Spinner>
        ))}
      </SpinnerWrapper>
      <Encoded>Senha codificada: {encodedSenha}</Encoded>
      {alert && <Alert>{alert}</Alert>}
      <Button onClick={handleConfirm}>Confirmar</Button>
    </Container>
  );
};

export default Level5;

