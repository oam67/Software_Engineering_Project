#include <cstdlib>

int main() {
    const char* command = "open ContinentSelection.html";

    int result = system(command);

    if (result == 0) {
        return 0;
    } else {
        return 1;
    }
}
