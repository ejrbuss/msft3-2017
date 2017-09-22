const readline = require('readline').createInterface({
    input  : process.stdin,
    output : process.stdout
});

lines = [];

readline.on('line', (input) => {
    if(!input) {
        calendar(lines);
    } else {
        lines.push(input)
    }
});

const calendar = lines => {
    console.log(lines
        .map(line => line.split(' '))
        .map(([date, from, to]) => {
            info = {};
            from.replace(/yyyy/g, (match, offset) => {
                info.year = parseInt(date.substr(offset, 4));
            });
            from.replace(/mm/g, (match, offset) => {
                info.month = parseInt(date.substr(offset, 2));
            });
            from.replace(/dd/g, (match, offset) => {
                info.day = parseInt(date.substr(offset, 2));
            });
            return [info, to];
        })
        .map(([info, to]) => to
            .replace(/yyyy/g, pad(info.year, 4))
            .replace(/mm/g, pad(info.month, 2))
            .replace(/dd/g, pad(info.day, 2))
        )
        .join('\n')
    );
};

const pad = (n, width) => {
    n = n + '';
    return n.length >= width ? n : new Array(width - n.length + 1).join(0) + n;
};