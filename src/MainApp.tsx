/*
Sample counting object

  {
    "ac": "Tarapur(164)",
    "part": 1,
    "UPENDRA RAVIDAS": 8,
    "CHIRAG KUMAR PASWAN": 141,
    "BHUDEO CHOUDHARY": 268,
    "AJAY KUMAR": 6,
    "PANKAJ KUMAR DAS": 3,
    "VALAMIKI PASAVAN": 3,
    "VISHNU PRIYA": 3,
    "VIRENDRA KUMAR": 10,
    "SUBHASH PASWAN": 6,
    "total_votes_c": 448,
    "nota": 18,
    "total_votes": 466
  },


  Sample ps object

    {
    "ac": "169",
    "ps": "262",
    "ps_name": "Utkramit Middle School, Siyani, North wing",
    "lat": 25.0210255,
    "long": 85.982116,
    "total_votes": 1163
  }

 */

import pollingStations from './data/ps.ts';
import counting from './data/countings.ts';
import {Select, Table} from '@mantine/core'

import {useEffect, useState} from "react";
// USE MANTINE COMPONENTS
export default function MainApp() {

    const [ac, setAc] = useState(null);
    const [ps, setPs] = useState(null);

    useEffect(() => {
        // reset ps when ac changes
        setPs(null);
    }, [ac]);


    // Select boxes of AC and PS

    const formattedAc = [
        {label: "164-Tarapur", value: "164"},
        {label: "169-Sheikhpura", value: "169"},
        {label: "240-Sikandra", value: "240"},
        {label: "241-Jamui", value: "241"},
        {label: "242-Jhajha", value: "242"},
        {label: "243-Chakai", value: "243"},
    ];

    const formattedPs =
        pollingStations.filter((p) => p.ac === ac).map((p) => {
            return {
                label: `${p.ps} - ${p.ps_name}`,
                value: `${p.ps}-${p.ac}`
            }
        });

    // 164-Tarapur
    // 169-Sheikhpura
    // 240-Sikandra
    // 241-Jamui
    // 242-Jhajha
    // 243-Chakai

    const psToMatch = (ps || '').split('-')[0];
    const resultFound = counting.filter((c) => c.ac === ac && c.part === psToMatch);

    let result = {};

    if (resultFound.length > 0) {
        result = resultFound[0];
        const keysToReadable = {
            // 'ac': "Assembly Constituency",
            // 'part': "Part",
            "UPENDRA RAVIDAS": "Upendra Ravidas",
            "CHIRAG KUMAR PASWAN": "Chirag Kumar Paswan",
            "BHUDEO CHOUDHARY": "Bhudeo Choudhary",
            "AJAY KUMAR": "Ajay Kumar",
            "PANKAJ KUMAR DAS": "Pankaj Kumar Das",
            "VALAMIKI PASAVAN": "Valamiki Pasavan",
            "VISHNU PRIYA": "Vishnu Priya",
            "VIRENDRA KUMAR": "Virendra Kumar",
            "SUBHASH PASWAN": "Subhash Paswan",
            // "total_votes_c": "Total Votes - Candidates",
            "nota": "NOTA",
        };

        result = Object.keys(result).reduce((acc, key) => {
            if (Object.keys(keysToReadable).includes(key)) {

                acc[keysToReadable[key] || key] = result[key];
                return acc;
            }
            return acc;
        }, {});

        // sort the object keys in descending order of votes

        result = Object.fromEntries(
            Object.entries(result).sort(([, a], [, b]) => b - a)
        );

        // add total votes, total votes - candidates at the end

        result['Total Votes - Candidates'] = resultFound[0]['total_votes_c'];
        result['Total Votes'] = resultFound[0]['total_votes'];

    }

    return (

        <div>
            <Select
                searchable={true}
                data={formattedAc} label="Select Assembly" value={ac} onChange={(value) => setAc(value)}/>
            <Select
                searchable={true}
                disabled={!ac}
                data={formattedPs} label="Select Part" value={ps} onChange={(value) => setPs(value)}/>

            <div style={{
                marginTop: '20px'
            }}>
                Showing results for AC- {ac}  Part - {psToMatch}
            </div>

            <Table
                striped={true} mt={20}>
                <Table.Tbody>

                    {Object.keys(result).map((key) => {
                        return (
                            <Table.Tr key={key}>
                                <Table.Td>{key}</Table.Td>
                                <Table.Td>{result[key]}</Table.Td>
                            </Table.Tr>
                        )
                    })}

                </Table.Tbody>
            </Table>

        </div>

    )


}