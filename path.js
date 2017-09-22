const readline = require('readline').createInterface({
    input  : process.stdin,
    output : process.stdout
});

lines = [];

readline.on('line', (input) => {
    if(!input) {
        path(lines);
    } else {
        lines.push(input)
    }
});

path = lines => {
    console.log(lines
        .map(line => line.split('\\'))
        .map(arr => {
            for(let i = 0; i < arr.length; i++) {
                if(arr[i] === '*') {
                    arr.splice(0, i + 1);
                } else
                if(/\.+/.test(arr[i])) {
                    let pop = arr[i].length;
                    arr.splice(i - pop + 1, pop);
                    i -= pop;
                }
            }
            return '\\' + arr.join('\\').replace(/\\+/g, '\\');
        })
        .join('\n')
    );
};