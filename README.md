# Pitch-Deck-Backend-Application
This is basically a backend application named "Xharktank". XharkTank is a panel of potential investors, termed as "Xharks", who listen to entrepreneurs pitch ideas for a business or product they wish to develop. These self-made multi-millionaires judge the business concepts and products pitched and then decide whether to invest their own money to help market and mentor each contestant. 

This backend application has been build to take entries from budding entrepreneurs who wish to pitch ideas for a business or product they wish to develop by providing their name, title & idea for the business, the investment amount they expect to be fulfilled, and the percentage of equity they are ready to shed away to the potential investors. Investors must be able to retrieve the list of all pitches and share their feedback/comments with a counter offer as per their interests.

Product Flows for the backend of the XharkTank application:

1. Entrepreneurs will post Pitch by providing these inputs
	a. Name of the entrepreneur posting the pitch
	b. Title of the pitch
	c. Business Idea for the Product they wish to develop
	d. Ask Expected Amount for investment
	e. Percentage of Equity to be diluted

2. Investors will view all the latest pitches posted to date
	a. If the entrepreneurs post a new pitch, that should also get listed.
	
3. Investors will make a counteroffer to the pitch by providing these inputs:
	a. Unique Id of the Pitch made by the entrepreneur
	b. Name of the investor making a counteroffer
	c. Amount ready to invest in the idea
	d. Ask Percentage of Equity for a company

API Features:
The backend is based on a REST API which supports the following 4 endpoints:
1. Endpoint to post a pitch to the backend.
2. Endpoint to make a counter offer for a pitch to the backend.
3. Endpoint to fetch the all the pitches in the reverse chronological order (i.e. last created one first) from the backend
If there are no pitches available then an empty array will be returned.
4. Endpoint to specify a particular id (identifying the pitch) to fetch a single Pitch.


[![Pitch-Deck-Backend-Application](https://img.youtube.com/vi/IgOZx8WuuVE/0.jpg)](https://www.youtube.com/watch?v=IgOZx8WuuVE)
