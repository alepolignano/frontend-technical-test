import React, { useEffect, useState } from 'react';
import { Spinner } from 'react-bootstrap';
import ListGroup from 'react-bootstrap/ListGroup';

async function fetchLiteratureData(accession) {

    // Check if literature data has already been fetched
    let literatureData = JSON.parse(localStorage.getItem(`literature-${accession}`))

    if (literatureData == null ) {
        let url = `https://www.ebi.ac.uk/interpro/api/entry/InterPro/${accession}`
        let res = await fetch(url)
        let data = await res.json()
        literatureData = data["metadata"]["literature"]

        // If papers are found (see IPR001084, no papers)
        if (literatureData) {

            // Defining an array to handle the case where the two most recent papers were published on the same year (see IPRO000102)
            let mostRecentPapersIDs = [];

            // Find most recent paper IDs
            let maxYear = 0;
            Object.keys(literatureData).map((paper) => {

                let paperYear = parseInt(literatureData[paper]["year"])

                if (paperYear >= maxYear) {
                    if (paperYear > maxYear) {
                        mostRecentPapersIDs = []
                    }
                    mostRecentPapersIDs.push(paper)
                    maxYear = paperYear
                }

                return 0;
            })

            // Get most recent papers data
            let mostRecentPapers = []
            mostRecentPapersIDs.map((paperID) => {
                mostRecentPapers.push({
                    "title": literatureData[paperID]["title"],
                    "authors": literatureData[paperID]["authors"],
                    "pmid": literatureData[paperID]["PMID"],
                    "pages": literatureData[paperID]["pages"],
                    "journal": literatureData[paperID]["medline_journal"],
                    "doi": literatureData[paperID]["DOI_URL"],
                    "year": literatureData[paperID]["year"],
                }
                )

                return 0;
            })

            console.log(mostRecentPapers)
            return mostRecentPapers
        }
    }

    return literatureData ? literatureData : []
}

export default function Literature({ accession }) {

    const [literatureData, setLiteratureData] = useState(null)

    useEffect(() => {
        const setData = async () => {
            let data = await fetchLiteratureData(accession);
            setLiteratureData(data)
            localStorage.setItem(`literature-${accession}`, JSON.stringify(data))

        };

        setData();

    }, [accession])

    return (
        <>
            <p><b>Most recent reference(s)</b></p>
            {literatureData != null ? 
                literatureData.length > 0 ?
                <ListGroup style={{ marginTop: 10 }}>
                    {literatureData.map((paper) => {
                        return (
                            
                            <ListGroup.Item>

                                <b>{paper.year}</b> 
                                <p> (PMID: {paper.pmid}) <p>{paper.title} <i>{paper.authors.map((author) => {return author + ", "})}</i> <small><b>{paper.journal}</b></small></p>
                                {paper.doi ? <a href={paper.doi}  target="_blank" rel="noreferrer">View paper</a> : "No DOI found"}
                                </p>

                            </ListGroup.Item>
                        )
                    })}
                </ListGroup> :
                "No literature found."
                : <Spinner size = "sm"/>
            }
        </>
    )
}