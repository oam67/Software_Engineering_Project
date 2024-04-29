# Logical View
## Emscripten is used to compile c++ code to WebAssembly which is called by the Game Mode Selection Screen and the Game Screen. The Continent Selection Screen and the Score Board Screen are not directly connected to the backend logic, and therefore, are stand-alone components in the logical view. 
```mermaid
classDiagram
    class GeoQuestWrapper {
        JsonStack()
        readCSV()
        game_dataset.csv
    }
    class WebAssembly {
    }
    class gameModeSelection {
        startGame()
    }
    class continentSelection {
        setContinent()
        getContinent()
        filterData()
    }
    class Game {
        shuffleArray()
        generateHint()
        popAndDisplayNextCountry()
        getImagePath()
        storeScore()
    }
    class scoreBoard {
        setHighScore()
        getHighScores()
        playAgain()
        quitGame()
    }

    GeoQuestWrapper --> WebAssembly
    WebAssembly --> gameModeSelection
    WebAssembly --> Game
```

# Use Case Diagram
## This diagram demonstrates how a user interacts with the GeoQuest software. It walks through how a user would play the game.
```mermaid
graph LR;
    USER[User]
    SelectGameMode[Select Game Mode]
    SelectContinent[Select Continent]
    MakeGuess[Make Guess]
    Quit[Quit]
    PlayAgain[Play Again]

    USER -->|Select Easy| SelectGameMode
    USER -->|Select Hard| SelectGameMode
    SelectGameMode -->|Select North America| SelectContinent
    SelectGameMode -->|Select South America| SelectContinent
    SelectGameMode -->|Select Europe| SelectContinent
    SelectGameMode -->|Select Africa| SelectContinent
    SelectGameMode -->|Select Asia| SelectContinent
    SelectGameMode -->|Select Oceania| SelectContinent
    SelectContinent -->|Make Correct Guess| MakeGuess
    SelectContinent -->|Make Incorrect Guess| MakeGuess
    MakeGuess -->|Decide to Quit| Quit
    MakeGuess -->|Decide to Play Again| PlayAgain
```

# GUI Routing
## This diagram demonstrates how the GUI components of GeoQuest are routed from one component to the next.
```mermaid
classDiagram
    class gameModeSelection {
        startGame()
    }
    class continentSelection {
        setContinent()
        getContinent()
        filterData()
    }
    class Game {
        shuffleArray()
        generateHint()
        popAndDisplayNextCountry()
        getImagePath()
        storeScore()
    }
    class scoreBoard {
        setHighScore()
        getHighScores()
        playAgain()
        quitGame()
    }

    gameModeSelection --> continentSelection
    continentSelection --> Game
    Game --> scoreBoard
    scoreBoard --> gameModeSelection
```
