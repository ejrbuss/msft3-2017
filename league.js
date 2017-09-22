const readline = require('readline').createInterface({
    input  : process.stdin,
    output : process.stdout
});

lines = [];

readline.on('line', (input) => {
    if(!input) {
        league(lines);
    } else {
        lines.push(input)
    }
});

league = lines => {

    let strikes = 0;
    let hits = 0;
    let runs = 0;
    let outs = 0;

    lines
        .map(line => line
            .replace(/^\(/, '')
            .replace(/\)$/, '')
            .split('), ')
            .map(action => action
                .replace(/^\(/, '')
                .split(', '))
            .map(([a, b]) => {
                if(a === 'FB' && b === 'F') {
                    // A homerun results in n+1 runs, where n is the number of hits and the hit count returns to zero.
                    runs += hits + 1;
                    hits = 0;
                    strikes = 0;
                } else
                if(a === 'C' && b === 'S') {
                    // hit
                    strikes = 0;
                    hits++;
                } else
                if(a === 'FB' && b === 'S') {
                    // Strike
                    strikes++;
                    if(strikes === 3) {
                        outs++;
                        if(outs === 3) {
                            console.log(runs);
                            process.exit()
                        }
                    }
                } else
                if(a === 'C' && b === 'F') {
                    // Strike
                    strikes++;
                    if(strikes === 3) {
                        outs++;
                        if(outs === 3) {
                            console.log(runs);
                            process.exit()
                        }
                    }
                }
            }));
        console.log(runs);
};
