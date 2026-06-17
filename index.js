import ejs from 'ejs';
import express from 'express';
import bodyParser from 'body-parser';
import env from 'dotenv';
import hijriDate from 'hijri-date';
import axios from 'axios';

env.config();

const app = express();
const port = process.env.PORT || 3000;
const HijriDate = hijriDate.default || hijriDate;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));


const currentYear = new Date().getFullYear();

const currentHijriYear = new HijriDate().getFullYear();



app.get('/', (req, res) => {
    res.render('index.ejs', { books: null, error: null, currentYear: currentYear, currentHijriYear: currentHijriYear });
});


app.post('/search', async (req, res) => {
    const searchType = req.body['search-type'];
    const searchQuery = req.body['search-query'];

    let apiParams = 'q';
    if (searchType && searchType != 'general') {
        apiParams = searchType;
    }

    try {
        const result = await axios.get('https://openlibrary.org/search.json', {
            params: {
                [apiParams]: searchQuery,
                limit: 5
            }
        });

        const booksData = result.data.docs;

        if (booksData.length === 0) {
            res.render('index.ejs', { books: null, error: 'No books found matching your criteria.' });
        }

        res.render('index.ejs', { books: booksData, error: null });
    } catch (error) {
        console.error('Api Fetch Error:', error.message);
        res.render('index.ejs', { books: null, error: 'Failed to retrieve data from Open Library. Please try again.' });
    }
})

app.listen(port, () => {
    console.log(`BookWorm is running on port: ${port}`);
});