const { json, send } = require('micro')
const { get } = require('lodash')
const cors = require('micro-cors')()

const handler = async (req, res) => {
    // Only accept POST requests
    if (req.method !== 'POST') {
        return sendMessage(res, 404, 'Page not found.');
    }

    const payload = await json(req);

    if (!hasAccess(payload)) {
        return sendMessage(res, 403, 'You do not have access to this content.');
    }
    
    try {
        return sendPage(res, 200, renderPage());
    } catch (e) {
        return sendNotFound(res);
    }
}

const sendPage = (res, code, payload) => {
    send(res, 200, { code, ...payload });
}

const hasAccess = (payload) => {
    return get(payload, 'permissions', []).length > 0;
}

const sendNotFound = (res) => {
    return sendMessage(res, 404, 'Page not found.');
}

const renderPage = () => {
    return {
        title: 'Access Points',
        props: [
            {
                name: 'presences',
                type: 'array',
            }
        ],
        blocks: [
            {
                name: 'proxy',
                type: 'proxyprovider',
                attrs: {
                    events: [
                        {
                            name: 'onPresencesUpdated',
                            action: 'updateProps',
                            props: [
                                {
                                    name: 'presences',
                                    newValue: '${item[presences]}'
                                }
                            ]
                        }
                    ]
                }
            },
            {
                type: 'heading3',
                value: 'Nearby Access Points'
            },
            {
                type: 'collection',
                value: `\${{"items": @presences}}`,
                attrs: {
                    viewType: 'list',
                    renderItem: {
                        blocks: [
                            {
                                type: 'heading2',
                                value: '${item[title]}'
                            },
                            {
                                type: 'image',
                                value: '${item[photo]}'
                            },
                            {
                                type: 'button',
                                value: 'Unlock',
                                attrs: {
                                    onClick: {
                                        action: '${call(block("proxy"), "unlock", item)}'
                                    }
                                }
                            }
                        ]
                    }
                }
            }
        ]
    };
}

module.exports = cors(handler)
