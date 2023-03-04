export function* generatorId() {

    let id = 1;

    while (true) {
        yield id++;
    }

    return id;

}