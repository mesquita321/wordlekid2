import { useState } from 'react'
import './App.css'
import { fam } from './components/fam'
import clsx from 'clsx'
import { PalavraSecreta, Despedida } from './components/despedida'
import Confetti from 'react-confetti'
import photo from './assets/photo.png'




function App() {

  const [currentWord, setCurrentWord] = useState(() => PalavraSecreta())
  const [guessedLetters, setGuessedLetters] = useState([])
  


  const wrongGuessesCount = guessedLetters.filter(letter => !currentWord.includes(letter)).length
 
  const isGameWon = 
        currentWord.split('').every(letter => guessedLetters.includes(letter))
  const isGameLost = wrongGuessesCount >= fam.length
  const isGameOver = isGameWon || isGameLost
  const lastGuessedLetter = guessedLetters[guessedLetters.length - 1]
  const isLastGuessIncorrect = lastGuessedLetter && !currentWord.includes(lastGuessedLetter)

function startNewGame() {
  setCurrentWord(PalavraSecreta())
  setGuessedLetters([])
}


function handleKeyboardClick(letter) { 
    setGuessedLetters((prevGuessedLetters) => 
      prevGuessedLetters.includes(letter) ?
        prevGuessedLetters :
          [...prevGuessedLetters, letter]
    )
  }
  

  const famElements = fam.map((person, index) => {
    const isLost = index < wrongGuessesCount
    const styles = {
      backgroundColor: person.backgroundColor,
      color: person.color
    }
    const className = clsx("chip", isLost && "lost")
    return (
      <span 
        style={styles} 
        className={className} 
        key={person.name}> 
           {person.name}  
      </span>
    )
  })

  const letters = currentWord.split('').map((letter, index) => {
    const shouldRevealLetter = isGameLost || guessedLetters.includes(letter)
    const letterClassName = clsx(
      isGameLost && !guessedLetters.includes(letter) && 'missed-letter',
    )
    return (
      <span key={index} className={letterClassName}>{shouldRevealLetter ? letter.toUpperCase() : ''}</span>
    )
  })
    
  const keyboard =['qwertyuiop', 'asdfghjkl', 'zxcvbnm']

  const keyboardElements = keyboard.map((row) => {
    return (
      <div className='keyboard-row' key={row}>
        {row.split('').map((letter) => {
          const isGuessed = guessedLetters.includes(letter)
          const isCorrect = isGuessed && currentWord.includes(letter)
          const isWrong = isGuessed && !currentWord.includes(letter)
          const className = clsx({
            correct: isCorrect,
            wrong: isWrong,
          })
          return (
            <button
              className={className}
              key={letter}
              disabled={isGameOver}
              aria-disabled={guessedLetters.includes(letter)}
              aria-label={`Letter ${letter}`}
              onClick={() => handleKeyboardClick(letter)}>
              {letter.toUpperCase()}
            </button>
          )
        })}
      </div>
    )
  })


const gameStatusClass = clsx("game-status", {
  statusWin: isGameWon,
  statusLost: isGameLost,
  farewell: !isGameOver && isLastGuessIncorrect
})

function renderGameStatus() {
  if (!isGameOver && isLastGuessIncorrect) {
    return (
      <p className='farewell-message'>{Despedida(fam[wrongGuessesCount - 1].name)}</p>
    )
  }
  if (isGameWon) {
    return (
    <>
      <Confetti 
        width={700}
        height={800}
      />
      <h3>Chegaste ao destino! </h3>
      <p>Parabéns! 🎉</p>
    </>
  )
  }
  if (isGameLost) {
    return (
    <>
      <h3>Ficamos pelo caminho! </h3>
      <p>Vamos ter todos de voltar a pé...</p>
    </>
  )
}
  return null
} 




  return (
    <>
    <main className='main'>
        <h1 className='game-title'>A viagem do Martim Costa    <img src={photo} alt="Martim Costa" className='martim-costa' /></h1> 
        <p className='game-description'>
          Vais numa viagem para o Algarve. Para chegarem todos, tens de acertar a palavra secreta, letra a letra.
          Por cada letra falhada, um elemento da família Vieira fica apeado!
        </p>

      <section className={gameStatusClass} aria-live='polite' role='status'>
        {renderGameStatus()}
      </section>

      <section className='fam-container'>
          {famElements}
      </section>
      <section className='word'>
        {letters}
      </section>
      <section className='keyboard'>
        {keyboardElements}
      </section>
      {isGameOver && <div className='game-button'>
        <button onClick={startNewGame}>Jogar de novo</button>
      </div>}

        
    </main>
    </>
  )
}

// Teste

export default App
