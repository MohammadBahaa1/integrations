var http = require('http');

const store = {
    firstName: '',
    lastName: ''
};

var app = http.createServer(function (req, res) {
    // Enable CORS, so that clients can call the Hook.
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS')
    res.setHeader('Access-Control-Allow-Headers',
        'Authorization, Accept, Content-Type')
    
    if (req.method !== 'POST') {
        res.writeHead(404, {'Content-Type': 'text/plain'});
        res.write('Not found');
        res.end();
    }

    var payload = '';
    req.on('data', function (chunk) {
        payload += chunk;
    });

    req.on('end', function () {
        var body = JSON.parse(payload);
        if (body.action === 'submit') {
            store.firstName = body.props.firstName;
            store.lastName = body.props.lastName;
            console.log('Store updated with values:', JSON.stringify(store));
        }

        var page = {
            code: 200,
            props: [
                {
                    name: 'firstName',
                    type: 'text',
                    value: store.firstName
                },
                {
                    name: 'lastName',
                    type: 'text',
                    value: store.lastName
                }
            ],
            blocks: [
                {
                    type: 'input',
                    bindToProp: 'firstName',
                    attrs: {
                        label: 'First name'
                    }
                },
                {
                    type: 'input',
                    bindToProp: 'lastName',
                    attrs: {
                        label: 'Last name'
                    }
                },
                {
                    type: 'button',
                    value: 'Submit',
                    attrs: {
                        onClick: {
                            action: 'post',
                            payload: {
                                url: 'https://httpbin.org/post',
                                params: {
                                    firstName: '${@firstName}',
                                    lastName: '${@lastName}'
                                }
                            },
                            onSuccess: {
                                action: 'notify',
                                payload: {
                                    message: 'Success. Response: ${response}.'
                                }
                            },
                            onError: {
                                action: 'notify',
                                payload: {
                                    message: 'Error: ${error[message]}'
                                }
                            }
                        }
                    }
                }
            ]
        };

        res.writeHead(200, {'Content-Type': 'application/json'});
        res.end(JSON.stringify(page));
    });
})

app.listen(process.argv[2] || 3000);
