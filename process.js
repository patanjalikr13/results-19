import fs from 'fs';

// load file data/ps.json

// [
//     {
//         "ac": "240-Sikandra (SC) [38-Jamui]",
//         "ps": 1,
//         "ps_name": "01 U.M.S KAITHA N. PART",
//         "type": "M",
//         "from": 1,
//         "to": 422,
//         "lat": 24.9797,
//         "long": 85.843078
//     },
//     {
//         "ac": "240-Sikandra (SC) [38-Jamui]",
//         "ps": "1A",
//         "ps_name": "01 U.M.S KAITHA M. PART",
//         "type": "A",
//         "from": 423,
//         "to": 1041,
//         "lat": 24.97988,
//         "long": 85.843287
//     },
//     {
//         "ac": "240-Sikandra (SC) [38-Jamui]",
//         "ps": 2,
//         "ps_name": "02 U.M.S KAITHA S. PART",
//         "type": "M",
//         "from": 1,
//         "to": 681,
//         "lat": 24.97975,
//         "long": 85.84323075
//     },
//     {
//         "ac": "240-Sikandra (SC) [38-Jamui]",
//         "ps": "2A",
//         "ps_name": "02 U.M.S KAITHA W. PART",
//         "type": "A",
//         "from": 682,
//         "to": 1039,
//         "lat": 24.97982,
//         "long": 85.843085
//     },
//     {
//         "ac": "240-Sikandra (SC) [38-Jamui]",
//         "ps": 3,
//         "ps_name": "03 M.S TAJPUR",
//         "type": "M",
//         "from": 1,
//         "to": 571,
//         "lat": 24.967177,
//         "long": 85.860187
//     },
//     {
//         "ac": "240-Sikandra (SC) [38-Jamui]",
//         "ps": 4,
//         "ps_name": "04 P.S MAHTPUR",
//         "type": "M",
//         "from": 1,
//         "to": 785,
//         "lat": 24.958515,
//         "long": 85.858615
// }]


const data = JSON.parse(fs.readFileSync('src/data/ps.json', 'utf8'));

const cleaned = [];

// get numeric ac from each object,
// merge all subparts of same ac


data.forEach((d) => {
    // extra number from ac using regex
    const ac = d.ac.match(/\d+/)[0];
    const ps = `${d.ps}`.match(/\d+/)[0];
    const ind = cleaned.findIndex((c) => c.ac === ac && c.ps === ps);
    if (ind !== -1) {
        cleaned[ind].total_votes = d.to;
    } else {
        cleaned.push({
            ac,
            ps: ps,
            ps_name: d.ps_name,
            lat: d.lat,
            long: d.long,
            total_votes: d.to
        });
    }
});

fs.writeFileSync('src/data/ps_cleaned.json', JSON.stringify(cleaned, null, 2));


// load couting data

const countingData = JSON.parse(fs.readFileSync('src/data/countings.json', 'utf8'));

const countingCleaned = [];

countingData.forEach((d) => {
    // just extract ac number from ac name, leave out the rest
    const ac = d.ac.match(/\d+/)[0];
    countingCleaned.push({
        ...d,
        ac: `${ac}`,
        part: `${d.part}`
    });
});

fs.writeFileSync('src/data/counting_cleaned.json', JSON.stringify(countingCleaned, null, 2));
