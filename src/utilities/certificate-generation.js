//Required package
var pdf = require('pdf-creator-node');
var fs = require('fs');

const generateCertificate = async (user) => {
    try {
        // Read HTML Template
        var html = fs.readFileSync('template.html', 'utf8');

        var options = {
            format: 'A4',
            orientation: 'landscape',
            border: '0mm'
            // header: {
            //     height: '10mm',
            //     contents: '<div style="text-align: center;">Author: CertiSecure</div>'
            // }
            // footer: {
            //     height: '28mm',
            //     contents: {
            //         first: 'Cover page',
            //         2: 'Second page', // Any page number is working. 1-based index
            //         default:
            //             '<span style="color: #444;">{{page}}</span>/<span>{{pages}}</span>', // fallback value
            //         last: 'Last Page'
            //     }
            // }
        };

        var users = [
            {
                name: 'Shyam Bangera',
                age: '26'
            }
            // {
            //     name: 'Navjot',
            //     age: '26'
            // },
            // {
            //     name: 'Vitthal',
            //     age: '26'
            // }
        ];
        var document = {
            html: html,
            data: {
                users: users
            },
            path: './output.pdf',
            type: ''
        };

        pdf.create(document, options)
            .then((res) => {
                console.log(res);
            })
            .catch((error) => {
                console.error(error);
            });

        res.status(201).json({
            message: 'Certificate Generated!'
            // data: {

            // }
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

module.exports = generateCertificate;
