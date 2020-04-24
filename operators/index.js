var http = require('http');

const WEEKDAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const PHRASE = 'Welcome to Workwell';
const ICONS = ['calendar', 'christmas-tree', 'faq'];
const IMAGES = {
    Mountain: {
        url: 'https://images.unsplash.com/photo-1549880338-65ddcdfd017b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2100&q=80',
        caption: 'A beautiful sunrise captured in Verbier, Switzerland.'
    },
    Forest: {
        url: 'https://images.unsplash.com/photo-1448375240586-882707db888b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80',
        caption: 'The forests of Mill Valley, California.'
    },
    Beach: {
        url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2106&q=80',
        caption: 'White sand beaches in Punta Cana, Dominican Republic.'
    }
};
const IMAGE_URLS = Object.keys(IMAGES).map((key) => { return IMAGES[key].url; });
const IMAGE_CAPTIONS = Object.keys(IMAGES).map((key) => { return IMAGES[key].caption; });

const page = {
    props: [
        {
            name: 'accepted',
            type: 'boolean',
            value: false
        },
        {
            name: 'hands',
            type: 'array',
            value: []
        },
        {
            name: 'eventDate',
            type: 'daterange',
            value: {
                startDate: '2020-03-20T00:00:00+01',
                endDate: '2020-03-24T00:00:00+01',
                includeTime: false,
            },
        },
        {
            name: 'name',
            type: 'string',
            value: ''
        },
        {
            name: 'icon',
            type: 'number',
            value: 0
        },
        {
            name: 'image',
            type: 'number',
            value: 0
        }
    ],
    blocks: [
        {
            type: 'text',
            value: 'By using the Service, you agree to accept all Terms and Conditions written here. You must not use the Service if you disagree with any of these Terms and Conditions.'
        },
        {
            type: 'switch',
            value: false,
            bindToProp: 'accepted',
            attrs: {
                label: 'Accept Terms'
            }
        },
        {
            type: 'button',
            value: 'Continue',
            attrs: {
                disabled: '${not(prop("accepted"))}',
                onClick: {
                    action: 'notify',
                    payload: {
                        message: 'Terms accepted at ${format(now(), "HH:mm")}',
                        type: 'success'
                    }
                }
            }
        },
        {
            type: 'text',
            value: 'Status: ${if(prop("accepted"), "Thank you!", "Please accept the terms")}',
        },
        {
            type: 'divider'
        },
        {
            type: 'callout',
            value: `Today is day **\${weekday(today())}** of the week. It is **\${elementAt(${JSON.stringify(WEEKDAYS)}, weekday(today())-1)}**. In 697 days, it will be a **\${elementAt(${JSON.stringify(WEEKDAYS)}, weekday(addToDate(today(), 697, "days")))}**, and the 9th digit of π divided by *e* is **\${mod(floor(multiply(pow(10,9), divide(pi(), exp()))), 10)}**. If we replace "Workwell" with "Tree" in "${PHRASE}", we get **"\${replace("${PHRASE}", "Workwell", "Tree")}"**.`,
            attrs: {
                type: 'info'
            }
        },
        {
            type: 'heading5',
            value: 'Event date',
        },
        {
            type: 'datepicker',
            value: {
                startDate: '2020-03-20T00:00:00+01',
                endDate: '2020-03-24T00:00:00+01',
                includeTime: false,
            },
            attrs: {
                label: 'Select event date...',
                allowEndDate: true,
                allowTime: true,
            },
            bindToProp: 'eventDate',
        },
        {
            type: 'text',
            value: `Event lasts **\${if(
                    not(isEmpty(get(prop("eventDate"), "endDate"))),
                    round(dateDifference(
                        get(prop("eventDate"), "endDate"),
                        get(prop("eventDate"), "startDate"),
                        "days"
                    )) + 1,
                    "1"
                )}** day(s).`,
        },
        {
            type: 'divider'
        },
        {
            type: 'heading5',
            value: 'Hands',
        },
        {
            type: 'multiselect',
            value: {
                items: ['Rock', 'Scissors', 'Paper'],
            },
            bindToProp: 'hands',
            attrs: {
                label: 'Select one or more hands...',
            }
        },
        {
            type: 'text',
            value: 'You have selected **${if(isEmpty(prop("hands")), "no", length(prop("hands")))}** hands.',
        },
        {
            type: 'divider'
        },
        {
            type: 'input',
            bindToProp: 'name',
            attrs: {
                placeholder: 'Enter your name',
                label: 'Name'
            }
        },
        {
            type: 'input',
            attrs: {
                placeholder: 'Enter a password',
                label: 'Password',
                disabled: false,
                secure: true,
            }
        },
        {
            type: 'input',
            value: 'Active',
            attrs: {
                label: 'Status',
                disabled: true,
            }
        },
        {
            type: 'button',
            value: 'Save',
            attrs: {
                type: 'success',
                disabled: '${smallerThan(length(prop("name")), 3)}',
                onClick: {
                    action: 'notify',
                    payload: {
                        message: 'Saved!',
                        type: 'success'
                    }
                }
            }
        },
        {
            type: 'text',
            value: '${if(smallerThan(length(prop("name")), 3), "Please enter a name with at least 3 letters", "Input is OK 👍")}',
            attrs: {
                appearance: 'light',
                size: 'small'
            }
        },
        {
            type: 'divider'
        },
        {
            type: 'heading5',
            value: 'Theme',
        },
        {
            type: 'singleselect',
            value: {
                items: ICONS,
            },
            bindToProp: 'icon',
            attrs: {
                label: 'Select an icon...',
            }
        },
        {
            type: 'link',
            value: 'My Item',
            attrs: {
                iconUrl: `https://img.icons8.com/color/48/000000/\${elementAt(${JSON.stringify(ICONS)}, prop("icon"))}.png`
            }
        },
        {
            type: 'divider'
        },
        {
            type: 'heading5',
            value: 'Images',
        },
        {
            type: 'singleselect',
            value: {
                items: Object.keys(IMAGES),
                selectedIndex: 0
            },
            bindToProp: 'image',
            attrs: {
                label: 'Select an image...',
            }
        },
        {
            type: 'image',
            value: `\${elementAt(${JSON.stringify(IMAGE_URLS)}, prop("image"))}`,
            attrs: {
                format: 'square',
                caption: `\${elementAt(${JSON.stringify(IMAGE_CAPTIONS)}, prop("image"))}`,
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


    res.writeHead(200, {'ContentType': 'application/json'});
    res.end(JSON.stringify(page));
})

app.listen(process.argv[2] || 3000);
