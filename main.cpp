#include "GeoQuest.cpp"
#include <iostream>
#include <string>
using namespace std;

int main() {
    GeoQuest game("game_dataset.csv");
    game.setMode("Easy");
    game.setContinent("Europe");
    game.loadCountries("Europe");

    cout << "Mode: " << game.getMode() << endl;
    cout << "Continent: " << game.getContinent() << endl;

    cout << "Current Country: " << game.getCountry() << endl;

    cout << "Latitude: " << game.getLatitude() << endl;
    cout << "Longitude: " << game.getLongitude() << endl;

    cout << "Score: " << game.getScore() << endl;

    string guess = "France";
    game.getGuess(guess);
    
    game.getCorrectGuesses();
    game.getIncorrectGuesses();

    game.getGuess(game.getCountry());

    game.getCorrectGuesses();
    game.getIncorrectGuesses();

    return 0;
}
