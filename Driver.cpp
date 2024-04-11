#include <cstdlib>
#include <iostream>
#include <string>
#include <thread>
#include <chrono>
#include <sstream>
#include <algorithm>
#include <iterator>
#include <array>
#include <vector>

std::string exec(const char* cmd) {
    std::array<char, 128> buffer;
    std::string result;
    std::unique_ptr<FILE, decltype(&pclose)> pipe(popen(cmd, "r"), pclose);
    if (!pipe) {
        throw std::runtime_error("popen() failed!");
    }
    while (fgets(buffer.data(), buffer.size(), pipe.get()) != nullptr) {
        result += buffer.data();
    }
    return result;
}

void killProcessesUsingPort(int port) {
    std::string command = "lsof -ti :" + std::to_string(port);
    std::string result = exec(command.c_str());
    if (!result.empty()) {
        std::istringstream iss(result);
        std::vector<int> pids;
        std::copy(std::istream_iterator<int>(iss), std::istream_iterator<int>(), std::back_inserter(pids));
        for (int pid : pids) {
            std::string killCmd = "kill -9 " + std::to_string(pid);
            system(killCmd.c_str());
        }
    }
}

int main() {
    const int port = 8000;
    const char* command = "python3 -m http.server";
    const char* htmlFile = "GameModeSelection.html";
    
    killProcessesUsingPort(port);

    std::string serverCommand = std::string(command) + " &";
    int serverResult = system(serverCommand.c_str());
    if (serverResult != 0) {
        std::cerr << "Failed to start the HTTP server." << std::endl;
        return 1;
    }

    std::this_thread::sleep_for(std::chrono::seconds(1));

    std::string url = "http://localhost:" + std::to_string(port) + "/" + std::string(htmlFile);

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