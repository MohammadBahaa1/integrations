exports.page = {
    title: 'Media',
    props: [
        {
            type: 'text',
            name: 'photo_url',
            value: 'https://images.unsplash.com/photo-1496776574435-bf184935f729'
        }
    ],
    blocks: [
        {
            type: 'heading2',
            value: 'Media'
        },
        {
            type: 'divider',
        },
        {
            type: 'heading3',
            value: 'Image'
        },
        {
            type: 'image',
            value: '${@photo_url}',
            attrs: {
                caption: 'The trees of Mill Valley, California (click to open).',
                format: 'landscape',
                onClick: {
                    action: 'open',
                    payload: {
                        url: 'https://withtree.com'
                    }
                }
            }
        },
        {
            type: 'image',
            value: '${@photo_url}',
            attrs: {
                format: 'square',
                caption: 'Square'
            }
        },
        {
            type: 'image',
            value: '${@photo_url}',
            attrs: {
                format: 'original',
                caption: 'Original'
            }
        },
        {
            type: 'divider',
        },
        {
            type: 'heading3',
            value: 'QR Code'
        },
        {
            type: 'qr',
            value: 'https://withtree.com'
        }
    ]
}