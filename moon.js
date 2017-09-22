const readline = require('readline').createInterface({
    input  : process.stdin,
    output : process.stdout
});

lines = [];

readline.on('line', (input) => {
    if(!input) {
        moon(lines);
    } else {
        lines.push(input)
    }
});

moon = lines => {

    const msg = {};
    let max = -1;
    let act = '';
    lines.forEach(line => {
        if(msg[line]) {
            return;
        }
        msg[line] = 0;
        lines.forEach(other => {
            if(other === line) {
                msg[line]++;
            }
        });
        if(msg[line] > max) {
            max = msg[line];
            act = line;
        }
    });
    console.log(act);
    console.log(msg[act]);
};