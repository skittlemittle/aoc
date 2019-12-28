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


int calcgrav(int moon1pos[], int moon2pos[], int moon1vel[], int moon2vel[], size_t sizepos)
{
    for (size_t i = 0; i < sizepos; i++) {

        if (moon1pos[i] > moon2pos[i]) {
            moon1vel[i] -= 1;
            moon2vel[i] += 1;
        }
        else if (moon1pos[i] < moon2pos[i]) {
            moon1vel[i] += 1;
            moon2vel[i] -= 1;
        }  
    }
    printf("vel1 %i\n", moon1vel[0]);
}


int *calcpos(int moonvel[], int moonpos[], size_t sizepos)
{

    for (size_t i = 0; i < sizepos; i++) {
        moonpos[i] += *(moonvel + i);
    }
    printf("m2 %i\n", moonpos[0]);

    return moonpos;
}


int main(int argc, char const *argv[])
{
    int m1[3] = {2, 11, 22};
    int m2[3] = {3, 4, 5};
    int v1[3] = {0, 0, 0};
    int v2[3] = {0, 0, 0};
    int *nm1;

    calcgrav(m1, m2, v1, v2, sizeof m2 / sizeof m2[0]);
    printf("velocity1 %i\n", v1[0]);

    int *vel = intdup(v1, sizeof v1 / sizeof v1[0]);
    nm1 = calcpos(m1, vel, sizeof m1 / sizeof m1[0]);

    printf("velocity2 %i\n", v1[0]);

    for (size_t i = 0; i < 3; i++) { 
        printf("%i\n", *(nm1 + i));
        printf("fv %i\n", v1[i]);
    }

    return 0;
}
