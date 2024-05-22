import ListGroup from 'react-bootstrap/ListGroup';

export default function Signatures({ memberDatabases }) {
    return (
        <>
            <b>Integrated signatures</b>
            <ListGroup style={{ marginTop: 10 }}>
                {Object.keys(memberDatabases).map((db) => {

                    //Get signature ID
                    let signatureID = Object.keys(memberDatabases[db])[0]
                    let signatureDescription = memberDatabases[db][signatureID]

                    return <ListGroup.Item> <b>{signatureID}</b> <p>{signatureDescription}</p> </ListGroup.Item>
                })}
            </ListGroup>

        </>
    )
}