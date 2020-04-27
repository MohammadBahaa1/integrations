var http = require('http');

const page = {
    props: [
        {
            name: 'news',
            type: 'array',
            value: {
                items: [
                    {
                        title: 'Forest',
                        photo: 'https://source.unsplash.com/800x600/?forest',
                    },
                    {
                        title: 'Beach',
                        photo: 'https://source.unsplash.com/800x600/?beach',
                    },
                    {
                        title: 'Mountain',
                        photo: 'https://source.unsplash.com/800x600/?mountain',
                    },
                    {
                        title: 'Desert',
                        photo: 'https://source.unsplash.com/800x600/?desert',
                    }
                ]
            }
        },
    ],
    blocks: [
        {
            type: 'heading2',
            value: 'Async Fetch'
        },
        {
            type: 'collection',
            value: '${@news}',
            attrs: {
                viewType: 'gallery',
                itemSize: 'small',
                renderItem: {
                    blocks: [
                        {
                            type: 'image',
                            value: '${item[photo]}',
                            attrs: {
                                format: 'square',
                            }
                        },
                        {
                            type: 'button',
                            value: 'Join',
                            attrs: {
                                fill: true,
                                onClick: {
                                    action: 'notify',
                                    payload: {
                                        message: "Joined!"
                                    }
                                }
                            }
                        },
                    ]
                }
            }
        },
        {
            type: 'divider'
        },
        {
            type: 'heading2',
            value: 'Async Fetch'
        },
        {
            type: 'collection',
            value: {
                source: 'https://picsum.photos/v2/list?limit=10&page=${round(10*rand())}'
            },
            attrs: {
                viewType: 'gallery',
                itemSize: 'medium',
                renderItem: {
                    blocks: [
                        {
                            type: 'image',
                            value: '${item[download_url]}',
                            attrs: {
                                format: 'square',
                                caption: 'Author: ${item[author]}',
                            }
                        },
                    ]
                }
            }
        },
        {
            type: 'divider'
        },
        {
            type: 'heading2',
            value: 'Button Grid'
        },
        {
            type: 'collection',
            value: {
                items: [
                    {
                        label: 'Action 1',
                        pageId: '1'
                    },
                    {
                        label: 'Action 2',
                        pageId: '2'
                    },
                    {
                        label: 'Action 3',
                        pageId: '3'
                    },
                    {
                        label: 'Action 4',
                        pageId: '4'
                    }
                ],
            },
            attrs: {
                viewType: 'gallery',
                itemSize: 'medium',
                renderItem: {
                    blocks: [
                        {
                            type: 'button',
                            value: '${item[label]}',
                            attrs: {
                                fill: true,
                            }
                        },
                    ]
                }
            }
        },
        {
            type: 'divider'
        },
        {
            type: 'heading2',
            value: 'List View'
        },
        {
            type: 'collection',
            value: '${@news}',
            attrs: {
                viewType: 'list',
                renderItem: {
                    blocks: [
                        {
                            type: 'heading3',
                            value: '${item[title]}'
                        },
                        {
                            type: 'image',
                            value: '${item[photo]}',
                            attrs: {
                                format: 'landscape'
                            }
                        },
                        {
                            type: 'link',
                            value: 'See more →',
                            attrs: {
                                url: '${item[photo]}'
                            }
                        },
                    ]
                }
            }
        }
    ]
};

var app = http.createServer(function (req, res) {
    // Enable CORS, so that clients can call the Hook.
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS')
    res.setHeader('Access-Control-Allow-Headers',
        'Authorization, Accept, Content-Type')

    res.writeHead(200, {'Content-Type': 'application/json'});
    res.end(JSON.stringify(page));
})

app.listen(process.argv[2] || 3000);
