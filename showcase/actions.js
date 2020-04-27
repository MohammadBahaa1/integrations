exports.page = {
    props: [
        {
            name: 'counter',
            value: 1
        }
    ],
    blocks: [
        {
            type: 'heading2',
            value: 'Actions',
        },
        {
            type: 'link',
            value: 'Documentation: Actions →',
            attrs: {
                url: 'https://treedocs.now.sh/docs/v1/hooks/ui/actions/'
            }
        },
        {
            type: 'divider'
        },
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
                        pageId: 'welcome'
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
            value: 'Send GET Request',
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
                            message: '${[error[message]}'
                        }
                    }
                }
            }
        },
        {
            type: 'button',
            value: 'Send POST Request',
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
                caption: 'Click me!',
                onClick: {
                    action: 'notify',
                    payload: {
                        message: 'Image clicked!',
                        type: 'success'
                    }
                }
            }
        }
    ]
}
