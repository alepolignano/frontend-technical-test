import React, { useEffect, useState } from 'react';

import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';

import Literature from './Literature';
import Signatures from './Signatures';

import './DataTable.css';


// Creating a string separating each GOTerm name with a comma, to then display it in the table
function extractGOTerms(GOTermsObj) {

    if (GOTermsObj != undefined || GOTermsObj != null) {
        let GOTermString = ""
        let count = 0

        GOTermsObj.map((GOTerm) => {
            if (count > 0)
                GOTermString += ", "
            GOTermString += GOTerm.name
            count += 1
        })

        return GOTermString
    }

    return ""
}


export default function DataTable({ interProData }) {

    /* 
        Setting collapse state for every hidden row containing the information about the signatures and literature 
        These rows are identified by the id <accession>-hidden
    */

    let rowsHiddenStateDict = {}

    interProData.map((entry) => {
        rowsHiddenStateDict[`${entry.metadata.accession}`] = true
    })

    const [rowsHiddenState, setRowHiddenState] = useState(rowsHiddenStateDict);

    useEffect(() => {
    }, []);

    return (

            <div className="data-table">
                <Table bordered  hover>
                        <thead>
                            <tr>
                                <th></th>
                                <th>Accession</th>
                                <th>Name</th>
                                <th>GO Terms</th>
                            </tr>
                        </thead>
                    <tbody>

                        {interProData.map((entry) => {

                            let accession = entry.metadata.accession
                            let name = entry.metadata.name
                            let GOTerms = extractGOTerms(entry.metadata.go_terms)
                            let memberDatabases = entry.metadata.member_databases

                            return (
                                <>
                                    {/* Create first row, with info needed and a button to control the collapse behaviour */}
                                    <tr key={accession}>
                                        <td>
                                            <button className="expand-btn"
                                                onClick={() => {
                                                    // Updating the collapse state for a specific row inverting its current state
                                                    setRowHiddenState({
                                                        ...rowsHiddenState,
                                                        [`${accession}`]: !rowsHiddenState[`${accession}`],
                                                    })
                                                }}>
                                                {rowsHiddenState[`${accession}`] ? <span>&#43;</span> : <span>&#8722;</span>}
                                            </button>
                                        </td>
                                        <td>{accession}</td>
                                        <td>{name}</td>
                                        <td>{GOTerms}</td>
                                    </tr>

                                    {/* Create second hidden row with full colspan, with the additional info about signatures and literature */}
                                    {<tr hidden={rowsHiddenState[`${accession}`]}>
                                        <td colSpan={4} className='hidden-row'>
                                            <Row>
                                                <Col lg={6}>
                                                    {!rowsHiddenState[`${accession}`] && <Signatures memberDatabases={memberDatabases}></Signatures>}
                                                </Col>
                                                <Col lg={6}>
                                                    {!rowsHiddenState[`${accession}`] && <Literature accession={accession}></Literature>}
                                                </Col>
                                            </Row>
                                        </td>
                                    </tr>}
                                </>
                            )
                        })}
                    </tbody>
                </Table>
            </div >
    );
}

