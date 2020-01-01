// advent of code 2019 day 12: https://adventofcode.com/2019/day/12

#include <stdio.h>
#include <stdlib.h>
#include <string.h>


// stolen from: https://stackoverflow.com/a/8287124
int *intdup(int const *src, int *dest, size_t len)
{
    dest = malloc(len * sizeof(int));
    memcpy(dest, src, len * sizeof(int));
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
    printf("vel1 %i\n", bdy1vel[0]);
}

int *calcpos(int vel[], int pos[], size_t arrsize)
{
    for (size_t i = 0; i < arrsize; i++) {
        pos[i] += *(vel + i);
    }
    printf("m2 %i\n", pos[0]);

    return pos;
}

int main(int argc, char const *argv[])
{
    int arrsize = 3;
    int *nm1;

    // positions of Io, Europa, Ganymede, and Callisto (x y z)
    int muns[4][3] = {{14,  2,  8},
                      { 7,  4, 10},
                      { 1, 17, 16},
                      {-4, -1,  1}};
    // inti velocities of Io, Europa, Ganymede, and Callisto (x y z)
    int vels[4][3] = {{0, 0, 0},
                      {0, 0, 0},
                      {0, 0, 0},
                      {0, 0, 0}};

    // apply gravity
    for (size_t i = 0; i < arrsize + 1; i++) {
        for (size_t j = 0; j < arrsize + 1; j++) {
            if (muns[i] != muns[j]) {
                printf("set %i %i \n", i, j);
                calcgrav(muns[i], muns[j], vels[i], vels[j], arrsize);
            }
        }
    }

    // calcgrav(m1, m2, v1, v2, sizeof m2 / sizeof m2[0]);
    // printf("velocity1 %i\n", v1[0]);

    int *vel;
    // intdup(v1, vel, sizeof v1 / sizeof v1[0]);
    // nm1 = calcpos(m1, vel, sizeof m1 / sizeof m1[0]);

    // printf("velocity2 %i\n", v1[0]);

    for (size_t i = 0; i < 3; i++) {
        // printf("%i ", *(nm1 + i));
    }
    printf("\n");

    for (size_t i = 0; i < 3; i++) {
        // printf("%i ", v1[i]);
    }
    printf("\n");
}