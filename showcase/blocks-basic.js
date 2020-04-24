exports.page = {
    title: 'Basic',
    blocks: [
        {
            type: 'heading2',
            value: 'Basic Blocks'
        },
        {
            type: 'divider'
        },
        {
            type: 'heading3',
            value: 'Text'
        },
        {
            type: 'text',
            value: 'Text'
        },
        {
            type: 'text',
            value: 'Light text',
            attrs: {
                appearance: 'light'
            }
        },
        {
            type: 'text',
            value: 'Danger text',
            attrs: {
                appearance: 'danger'
            }
        },
        {
            type: 'divider'
        },
        {
            type: 'heading3',
            value: 'Headings'
        },
        {
            type: 'heading1',
            value: 'Big and small'
        },
        {
            type: 'divider'
        },
        {
            type: 'bulletedlist',
            value: [ 'Bullet', 'Lists']
        },
        {
            type: 'numberedlist',
            value: [ 'Numbered', 'Lists']
        },
        {
            type: 'quote',
            value: 'Alone we go fast, together we go far.'
        },
        {
            type: 'divider'
        },
        {
            type: 'heading3',
            value: 'Callouts'
        },
        {
            type: 'callout',
            value: 'This is a note with an info message.',
            attrs: {
                type: 'info'
            }
        },
        {
            type: 'callout',
            value: 'This is a note with a success message.',
            attrs: {
                type: 'success'
            }
        },
        {
            type: 'callout',
            value: 'This is a note with a warning message.',
            attrs: {
                type: 'warning'
            }
        },
        {
            type: 'callout',
            value: 'This is a note with an error message.',
            attrs: {
                type: 'error'
            }
        },
        {
            type: 'callout',
            value: 'This is a note with a ~~custom icon~~ and **Markdown**.',
            attrs: {
                iconUrl: 'https://img.icons8.com/color/48/000000/accessibility2--v1.png'
            }
        },
        {
            type: 'callout',
            value: 'This is a note with small text.',
            attrs: {
                type: 'info',
                small: true
            }
        },
        {
            type: 'divider'
        },
        {
            type: 'heading3',
            value: 'Code'
        },
        {
            type: 'code',
            value: 'var http = require("http")\n\nvar app = http.createServer(function(req, res) {\n    var page = {\n        title: "My First Integration",\n        blocks: [\n            {\n                type: "text",\n                value: "Hello World!"\n            }\n        ]\n    }\n\n    res.writeHead(200, { "Content-Type": "application/json" })\n    res.end(JSON.stringify(page))\n})\n\napp.listen(process.argv[2] || 3000)'
        },
        {
            type: 'divider'
        },
        {
            type: 'heading3',
            value: 'Links'
        },
        {
            type: 'link',
            value: 'Plain Link',
            attrs: {
                pageId: 'welcome'
            }
        },
        {
            type: 'link',
            value: 'Link with Custom Icon',
            attrs: {
                url: 'https://withtree.com',
                iconUrl: 'https://img.icons8.com/color/48/000000/gallery.png'
            }
        },
        {
            type: 'link',
            value: 'Large Link with Image',
            attrs: {
                url: 'https://withtree.com',
                size: 'large',
                subtitle: 'Available in 10 min',
                iconUrl: 'https://images.unsplash.com/photo-1431540015161-0bf868a2d407?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2550&q=80'
            }
        },
        {
            type: 'button',
            value: 'Button Link',
            attrs: {
                onClick: {
                    action: 'open',
                    payload: {
                        url: 'https://withtree.com'
                    }
                }
            }
        }
    ]
}