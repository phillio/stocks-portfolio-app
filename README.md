# stock-portfolio-app
This app is built on React for the frontend with vanilla CSS (no Sass, etc).
Backend is built on a Node/Express/PostgreSQL stack. API used is IEX Cloud.

Frontend hosted on surge at
https://stocks-portfolio-app.surge.sh

Backend hosted on Heroku.

Landing page will reroute you to a Login page; click the SIGNUP button at the bottom to create an account.

After signing up, you will be rerouted to a home page containing a current Portfolio of stocks with number of shares, a wallet, and an ability to purchase stocks by entering the symbol and number of shares you would like to purchase.

i.e. AAPL, FB, NFLX

Should be able to handle most, if not all stock tickers out there.

After purchasing, click the Transactions button at the top right of the screen to navigate to a transactions history page where you can also input the amount of money you like to "deposit".

After a "pretend" deposit, the site will route you back to the home page where you can see the amount of your wallet has increased.

Buying stock will also live update your wallet amount.

------------------------------

Notes: 
-Portfolio page will list stocks in order they were purchased (oldeest at top).
-Transactions page is the reverse, where the newest purchases are at the top.
-App is currently using API calls to IEX Cloud's sandbox for testing; as such stock prices are randomly generated and NOT the current prices.
-App is currently at MVP (Minimum Viable Product) and will be updated; this is NOT a final product.

To-do:
-Do more with CSS
-Add more functionality (drop-down list for purchasing stocks, list out latest prices for stocks in user's portfolio vs prices they were bought at, add links to IEX Cloud, fix random log outs due to state/prop update speeds, etc )

Thank you.