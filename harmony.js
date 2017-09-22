const readline = require('readline').createInterface({
    input  : process.stdin,
    output : process.stdout
});

lines = [];

readline.on('line', (input) => {
    if(!input) {
        harmony(lines);
    } else {
        lines.push(input)
    }
});

harmony = lines => {
    console.log(lines
        .map(line => line.split(','))
        .filter(arr => arr.length === 2)
        .map(arr => arr.map(num => parseInt(num)))
        .map(([x, y]) => {
            let mask = 1;
            let count = 0;
            for(let i = 0; i < 32; i++) {
                if(mask & x && mask & y) { count++; }
                mask = mask << 1;
            }
            return count;
        })
        .join('\n')
    );
};