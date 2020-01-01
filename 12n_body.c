// advent of code 2019 day 12: https://adventofcode.com/2019/day/12

#include <stdio.h>
#include <stdlib.h>
#include <string.h>

// stolen from: https://stackoverflow.com/a/8287124
int *intdup(int const *src, size_t len)
{
    int *p = malloc(len * sizeof(int));
    memcpy(p, src, len * sizeof(int));
    return p;
}

int abssum(int *array)
{
    int sum;
    for (size_t i = 0; i < sizeof array / sizeof array[0] + 1; i++) {
        sum += abs(*(array + i));
    }
    return sum;
}

int calcgrav(int bdy1pos[], int bdy2pos[], int bdy1vel[], int bdy2vel[], size_t arrsize)
{
    for (size_t i = 0; i < arrsize; i++) {
        if (bdy1pos[i] > bdy2pos[i]) {
            bdy1vel[i] -= 1;
            bdy2vel[i] += 1;
        }
        else if (bdy1pos[i] < bdy2pos[i]) {
            bdy1vel[i] += 1;
            bdy2vel[i] -= 1;
        }
    }
}

int calcpos(int vel[], int pos[], size_t arrsize)
{
    for (size_t i = 0; i < arrsize; i++) {
        pos[i] += *(vel + i);
    }
}

int main(int argc, char const *argv[])
{
    int arrsize = 3;
    int mooncount = 4;
    int moonenergy;

    // init positions of Io, Europa, Ganymede, and Callisto (x y z)
    int moons[4][3] = {{14, 2, 8},
                       {7, 4, 10},
                       {1, 17, 16},
                       {-4, -1, 1}};
    // init velocities of Io, Europa, Ganymede, and Callisto (x y z)
    int vels[4][3] = {{0, 0, 0},
                      {0, 0, 0},
                      {0, 0, 0},
                      {0, 0, 0}};

    // run the sim for a thousand steps
    for (size_t i = 0; i < 1000; i++) {
        // go over all pairs of moons and apply gravity
        for (size_t i = 0; i < mooncount - 1; i++) {
            for (size_t j = i + 1; j < mooncount; j++) {
                if (i != j) {
                    printf("cur pair %i %i \n", i, j);
                    calcgrav(moons[i], moons[j], vels[i], vels[j], arrsize);
                }
            }
        }

        // apply velocity, update moon positions
        for (size_t i = 0; i < mooncount; i++) {
            int *vel;
            vel = intdup(vels[i], arrsize);
            calcpos(vel, moons[i], arrsize);
            printf("pos %i\n", moons[i][0]);
            printf("velocity %i\n", vels[i][0]);
        }
    }

    for (size_t i = 0; i < mooncount; i++) {
        moonenergy += abssum(vels[i]) * abssum(moons[i]);
    }

    printf("total energy of the system: %i\n", moonenergy);
}