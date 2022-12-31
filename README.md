# BookBuddies

# Install

`npm install`

---

# Things to add

- Create a `.env` file in config folder and add the following as `key = value`
  - PORT = 2121 (can be any port example: 3000)
  - DB_STRING = `your database URI`
  - CLOUD_NAME = `your cloudinary cloud name`
  - API_KEY = `your cloudinary api key`
  - API_SECRET = `your cloudinary api secret`

---

# Why does this exist?

Full stack web app utilizing the Google Books API to allow users to create lists/reviews of books they've read. Books are also pushed to all app users through a public feed, who can then discuss individual books.

https://bookbuddies.up.railway.app/

<a href="https://ibb.co/FgLtnq6"><img src="https://i.ibb.co/MMxL95n/1.jpg" alt="1" border="0"></a>
<a href="https://ibb.co/gRfYC7s"><img src="https://i.ibb.co/crZqdvz/2.jpg" alt="2" border="0"></a>
<a href="https://ibb.co/2PcHpVd"><img src="https://i.ibb.co/vmLRMyk/3.jpg" alt="3" border="0"></a>
<a href="https://ibb.co/HBkgmK6"><img src="https://i.ibb.co/GnbPgdy/4.jpg" alt="4" border="0"></a>

## How It's Made:

**Tech used:** HTML, CSS, JavaScript, Express, Node, Tailwind, EJS, MongoDB, Cloudinary, Google Books API

This program, at its core, is a fairly standard CRUD app. The idea is that the user searches for a specific book via the Google Books API. After a book is seleted, the user is prompted to write a short review of the book. Once this is added, the book/review are pushed as a "post," which is both listed individually in the user's dashboard, as well as to a public feed.

## Lessons Learned:

Most of the work here was to feed info into the Google Books API and ensure that the correct data was returned. Lessons learned were to slow down and read documentation in order to minimize issues.
 
 ## Optimizations:

1. Filter feed by user
2. Add "value" reviews (stars, points), sort/filter by these reviews.
3. Affiliate links - generate links to Amazon/Barnes & Noble, etc to allow user to purchase book.
4. More "social media"-type features - likes (on both posts and comments), favorites, etc.
5. Add genres, filter by genre
6. Create logical update/delete functions - ex: only a post's creator can delete entries/comments
