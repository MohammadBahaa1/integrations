var http = require('http');

const page = {
    props: [
        {
            name: 'counter',
            value: 1
        }
    ],
    blocks: [
        {
            type: 'button',
            value: 'Notify',
            attrs: {
                onClick: {
                    action: 'notify',
                    payload: {
                        message: 'Notification sent ${format(today())}.',
                        type: 'success'
                    }
                }
            }
        },
        {
            type: 'button',
            value: 'Open URL',
            attrs: {
                onClick: {
                    action: 'open',
                    payload: {
                        url: 'https://withtree.com'
                    }
                }
            }
        },
        {
            type: 'button',
            value: 'Open Page',
            attrs: {
                onClick: {
                    action: 'open',
                    payload: {
                        pageId: '1'
                    }
                }
            }
        },
        {
            type: 'button',
            value: 'Counter ${@counter}',
            attrs: {
                onClick: {
                    action: 'updateProps',
                    payload: {
                        props: [
                            {
                                name: 'counter',
                                newValue: '${@counter + 1}'
                            }
                        ]
                    }
                }
            }
        },
        {
            type: 'button',
            value: 'Fetch Photos',
            attrs: {
                onClick: {
                    action: 'fetch',
                    payload: {
                        url: 'https://picsum.photos/v2/list?limit=10',
                    },
                    onSuccess: {
                        action: 'notify',
                        payload: {
                            message: 'Success: got ${length(response)} results.'
                        }
                    },
                    onError: {
                        action: 'notify',
                        payload: {
                            message: '${error[message]}'
                        }
                    }
                }
            }
        },
        {
            type: 'button',
            value: 'Ping',
            attrs: {
                onClick: {
                    action: 'post',
                    payload: {
                        url: 'https://httpbin.org/post',
                        params: {
                            message: 'Ping'
                        }
                    },
                    onSuccess: {
                        action: 'notify',
                        payload: {
                            message: 'Success. Got back: ${response[json][message]}.'
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
        },
        {
            type: 'image',
            value: 'https://source.unsplash.com/800x600/?forest',
            attrs: {
                format: 'landscape',
                caption: 'Images can also perform actions on click.',
                onClick: {
                    action: 'open',
                    payload: {
                        url: 'https://withtree.com'
                    }
                }
            }
        }
    ]
};

var app = http.createServer(function (req, res) {
    // Enable CORS, so that clients can call the Hook.
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers',
        'Authorization, Accept, Content-Type');
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.end(JSON.stringify(page));
})

app.listen(process.argv[2] || 3000);
