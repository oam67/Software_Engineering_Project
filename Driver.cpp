#include <cstdlib>
#include <iostream>
#include <string>
#include <thread>
#include <chrono>

int main() {
    const char* command = "python -m http.server";
    const char* htmlFile = "GameModeSelection.html";
    
    std::string serverCommand = std::string(command) + " &";
    int serverResult = system(serverCommand.c_str());
    if (serverResult != 0) {
        std::cerr << "Failed to start the HTTP server." << std::endl;
        return 1;
    }

    std::this_thread::sleep_for(std::chrono::seconds(1));

    std::string url = "http://localhost:8000/" + std::string(htmlFile);

    #ifdef _WIN32
    // For Windows
    std::string browserCommand = "start \"\" \"" + url + "\"";
    #elif __APPLE__
    // For macOS
    std::string browserCommand = "open \"" + url + "\"";
    #else
    // For Linux and other Unix-like systems
    std::string browserCommand = "xdg-open \"" + url + "\"";
    #endif

    int browserResult = system(browserCommand.c_str());
    if (browserResult != 0) {
        std::cerr << "Failed to open the HTML file in the default browser." << std::endl;
        return 1;
    }

    std::cout << "Press Enter to terminate the server..." << std::endl;
    std::cin.ignore();

    const char* terminateCommand = "killall -9 python";
    int terminateResult = system(terminateCommand);
    if (terminateResult != 0) {
        std::cerr << "Failed to terminate the HTTP server." << std::endl;
        return 1;
    }

    return 0;
}
