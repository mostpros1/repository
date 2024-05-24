import React, { useEffect, useState } from 'react';
import { dynamo } from '../../../../declarations';
const OfferTemplate = () => {
    const [status, setStatus] = useState<'accepted' | 'declined' | null>(null);
    const [id, setId] = useState<string | null>(null);
    const [amount, setAmount] = useState<number>(0);
    const [description, setDescription] = useState<string>('');
    const [title, setTitle] = useState<string>('');
    const TableName = 'Offers';
    // Function to extract ID and amount from the URL
    const extractParamsFromUrl = () => {
        const params = new URLSearchParams(window.location.search);
        const idParam = params.get('ID');
        const amountParam = params.get('amount');
        const descriptionParam = params.get('description');
        const titleParam = params.get('title');

        if ( idParam != null && amountParam != null && descriptionParam != null && titleParam != null) {
            setId(idParam);
            setAmount(Number(amountParam));
            setDescription(descriptionParam);
            setTitle(titleParam);
        }
    };

    useEffect(() => {
        extractParamsFromUrl();
    }, []);

    useEffect(() => {
        dynamo
            .get({
                TableName: TableName,
                Key: {
                    id: id,
                },
            })
            .promise()
            .then(data => {
                if (data.Item) {
                    setAmount(data.Item.amount);
                    setDescription(data.Item.description);
                    setTitle(data.Item.title);
                    if (data.Item.status === 'accepted') {
                        setStatus('accepted');
                    } else if (data.Item.status === 'declined') {
                        setStatus('declined');
                    }
                }
            }).catch(console.error)
    }, []);

    const handleAccept = () => {
        setStatus('accepted');
        dynamo
            .update({
                TableName: TableName,
                Key: {
                    id: id,
                },
                UpdateExpression: `set offerStatus = :status`,
                ExpressionAttributeValues: {
                    ":status": status,
                },
            })
            .promise()
            .then(data => console.log(data.Attributes))
            .catch(console.error)
    };

    const handleDecline = () => {
        setStatus('declined');
        dynamo
            .update({
                TableName: TableName,
                Key: {
                    id: id,
                },
                UpdateExpression: `set offerStatus = :status`,
                ExpressionAttributeValues: {
                    ":status": status,
                },
            })
            .promise()
            .then(data => console.log(data.Attributes))
            .catch(console.error)
    };

    return (
        <div className="card">
            {status === null && (
                <>
                    <p>Offerte.</p>
                    <p>ID: {id}</p>
                    <p>Title: {title}</p> {/* Display the extracted ID */}
                    <p>Bedrag: {amount}</p> {/* Display the extracted amount */}
                    <p>Beschijving: {description}</p>
                    <button
                        onClick={handleAccept}
                        style={{
                            backgroundColor: 'blue',
                            color: 'white',
                            borderRadius: '10px',
                            padding: '10px 20px',
                            border: 'none',
                            cursor: 'pointer',
                            width: '125px'
                        }}
                    >
                        Accept
                    </button>
                    <button
                        onClick={handleDecline}
                        style={{
                            backgroundColor: 'blue',
                            color: 'white',
                            borderRadius: '10px',
                            padding: '10px 20px',
                            border: 'none',
                            cursor: 'pointer',
                            width: '125px'
                        }}
                    >
                        Decline
                    </button>
                </>
            )}

            {status === 'accepted' && (
                <div className="checkmark-circle" style={{ maxWidth: '250px' }}>
                    <svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" className="iconify iconify--emojione" preserveAspectRatio="xMidYMid meet">
                        <circle cx="32" cy="32" r="30" fill="#4bd37b"></circle>
                        <path fill="#ffffff" d="M46 14L25 35.6l-7-7.2l-7 7.2L25 50l28-28.8z"></path>
                    </svg>
                </div>
            )}

            {status === 'declined' && (
                <div className="cross-circle" style={{ maxWidth: '250px' }}>
                    <svg version="1.0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512.000000 512.000000" preserveAspectRatio="xMidYMid meet">
                        <g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)" fill="#FF0000" stroke="none">
                            <path d="M2415 5113 c-523 -33 -1018 -219 -1434 -541 -111 -85 -348 -322 -433
                -433 -289 -374 -470 -814 -529 -1284 -16 -129 -16 -462 0 -590 50 -401 192
                -788 409 -1115 414 -623 1057 -1025 1802 -1126 152 -21 480 -23 625 -5 600 76
                1133 340 1545 767 390 404 630 910 701 1479 16 128 16 462 0 585 -63 489 -221
                878 -515 1270 -82 109 -317 350 -425 435 -104 82 -271 193 -375 250 -413 225
                -912 337 -1371 308z m-303 -1600 l448 -448 448 448 c246 246 452 447 457 447
                6 0 123 -113 260 -250 l250 -250 -448 -448 c-246 -246 -447 -452 -447 -457 0
                -5 201 -211 447 -457 l448 -448 -253 -252 -252 -253 -448 448 c-246 246 -452
                447 -457 447 -5 0 -211 -201 -457 -447 l-448 -448 -250 250 c-137 137 -250
                254 -250 260 0 5 201 211 447 457 l448 448 -450 450 -450 450 250 250 c137
                137 252 250 255 250 3 0 206 -201 452 -447z"/>
                        </g>
                    </svg>
                </div>
            )}
        </div>
    );
};

export default OfferTemplate;