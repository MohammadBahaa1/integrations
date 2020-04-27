exports.page = {
    title: 'Collections',
    props: [
        {
            name: 'photos',
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
            value: 'Collections'
        },
        {
            type: 'divider',
        },
        {
            type: 'heading3',
            value: 'Gallery View'
        },
        {
            type: 'collection',
            value: '${@photos}',
            attrs: {
                viewType: 'gallery',
                itemSize: 'small',
                renderItem: {
                    blocks: [
                        {
                            type: 'image',
                            value: '${item[photo]}',
                            attrs: {
                                format: 'square'
                            }
                        },
                    ]
                }
            }
        },
        {
            type: 'collection',
            value: '${@photos}',
            attrs: {
                viewType: 'gallery',
                itemSize: 'large',
                renderItem: {
                    blocks: [
                        {
                            type: 'image',
                            value: '${item[photo]}',
                            attrs: {
                                format: 'square'
                            }
                        },
                    ]
                }
            }
        },
        {
            type: 'divider',
        },
        {
            type: 'heading3',
            value: 'List View'
        },
        {
            type: 'collection',
            value: '${@photos}',
            attrs: {
                viewType: 'list',
                renderItem: {
                    blocks: [
                        {
                            type: 'image',
                            value: '${item[photo]}',
                            attrs: {
                                format: 'landscape',
                                caption: '${item[title]}'
                            }
                        },
                    ]
                }
            }
        },
        {
            type: 'divider',
        },
        {
            type: 'heading3',
            value: 'Async Data Sources'
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
    ]
}