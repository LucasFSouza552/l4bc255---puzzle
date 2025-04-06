import { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
`;

const blink = keyframes`
  0% { opacity: 0; }
  50% { opacity: 1; }
  100% { opacity: 0; }
`;

const Wrapper = styled.div`
  font-family: 'Courier New', monospace;
  background: #000;
  color: #0ff;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Container = styled.div`
  animation: ${fadeIn} 1s ease-out;
  text-align: center;
  max-width: 100dvw;
  padding: 20px;
`;

const Title = styled.h1`
  font-size: 2rem;
  color: #0ff;
  margin-bottom: 20px;
`;

const Description = styled.p`
  color: #0f0;
  margin-bottom: 30px;
  text-shadow: 0 0 5px #0f0;
`;

const MorseDisplay = styled.div`
  font-size: 1.5rem;
  letter-spacing: 10px;
  color: #0ff;
  margin-bottom: 30px;
`;

const MorseLight = styled.div`
  display: inline-block;
  width:  20px;
  height: 20px;
  margin: 0 5px;
  border-radius: 50%;
  background: ${({ type }) => (type === '.' ? '#0ff' : '#0f0')};
  animation: ${blink} 1.2s infinite;
  animation-delay: ${({ delay }) => delay}s;
`;

const Input = styled.input`
  padding: 10px;
  font-size: 1rem;
  border: 2px solid #0ff;
  background: transparent;
  color: #0ff;
  text-align: center;
  width: 200px;

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

const morseCode = "-.-. --- .-. .-. .-"; // corra

const Level4 = ({ onLevelChange }) => {
    const [inputValue, setInputValue] = useState('');
    const [playAudio, setPlayAudio] = useState(false);
    const [playingAudio, setPlayingAudio] = useState(false);

    useEffect(() => {
        if (playAudio) {
            setPlayAudio(false);
            setPlayingAudio(true);
            const PlayMorse = () => {
                const context = new (window.AudioContext)();
                const dotDuration = 200;
                const dashDuration = 600;
                const symbolSpacing = 0.3; // segundos entre ponto e traço
                const letterSpacing = 0.8; // segundos entre letras

                let currentTime = context.currentTime;

                morseCode.split(' ').forEach(letter => {
                    letter.split('').forEach(symbol => {
                        const osc = context.createOscillator();
                        const gain = context.createGain();
                        osc.frequency.setValueAtTime(600, currentTime);
                        gain.gain.setValueAtTime(0.2, currentTime);

                        osc.connect(gain);
                        gain.connect(context.destination);

                        const duration = symbol === '.' ? dotDuration : dashDuration;
                        osc.start(currentTime);
                        osc.stop(currentTime + duration / 1000);

                        currentTime += duration / 1000 + symbolSpacing;
                    });
                    currentTime += letterSpacing;
                });

                // Check if Morse code playback has ended
                const checkIfEnded = () => {
                    if (currentTime >= context.currentTime) {
                        console.log("Morse code playback ended");
                        setPlayingAudio(false);
                    }
                };

                // Call the checkIfEnded function after the last sound is scheduled
                setTimeout(checkIfEnded, (currentTime - context.currentTime) * 1000);

            }

            PlayMorse();

        }
    }, [playAudio, setPlayAudio]);



    const checkPassword = () => {
        if (inputValue.toLowerCase() === "corra" || inputValue.toLowerCase() === morseCode.toLowerCase()) {
            alert("Não olhe para trás!");
            onLevelChange(5);
        } else {
            alert("Código incorreto.");
        }
    };

    // Converte o morse para luzes piscantes
    const renderMorseLights = () => {
        const morsePerLetter = morseCode.split(' '); // ["-.-.", "---", ".-.", ".-.", ".-"]
        let delay = 0;

        return morsePerLetter.map((letter, idx) => {
            const dotsAndDashes = letter.split('');
            const lights = dotsAndDashes.map((symbol, i) => {
                const light = (
                    <MorseLight
                        key={`${idx}-${i}`}
                        type={symbol}
                        delay={delay}
                    />
                );
                delay += symbol === '.' ? 0.5 : 1; // . = curto, - = longo
                return light;
            });

            delay += 1; // Pausa entre letras
            return (
                <span key={idx} style={{ margin: '0 10px' }}>
                    {lights}
                </span>
            );
        });
    };

    return (
        <Wrapper>
            <Container>
                <Title>Level 4 — Ecos de Luz</Title>
                <Description>
                    Pequenas luzes piscam na escuridão e um som se torna mais forte. Talvez estejam tentando dizer algo...
                </Description>

                <MorseDisplay>{renderMorseLights()}</MorseDisplay>

                <Button onClick={() => { if (!playingAudio) setPlayAudio(true); }}>Ouvir o código</Button>

                <Input
                    placeholder="Traduza o código"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                />

                <Button onClick={checkPassword}>Decifrar</Button>
            </Container>
        </Wrapper>
    );
};

export default Level4;
