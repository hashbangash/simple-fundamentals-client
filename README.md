# the simple fundamentals of programming
## flashcards and definitions

## about
This app shows definitions of fundamental terms to programming and gives simple, accessible definitions. Once signed in, users can add comments to these flashcards. They can also edit and delete their comments.

![screenshot of the app](https://user-images.githubusercontent.com/22508682/78834849-3436ae00-79bd-11ea-9bd4-2fc10a8e4c2b.png)

## links
- [front-end/production live link, i.e. the actual webiste](https://hashbangash.github.io/simple-fundamentals-client/)
- [back-end/api repository](https://github.com/hashbangash/simple-fundamentals-api)
- [back-end/api live link](https://simple-fundamentals.herokuapp.com/cards)

## set up
To use this open-source repository yourself, clone from GitHub and run these commands to set up a local development environment:
- `npm install`
- `npm start`

Use this command to deploy your own site on your GitHub if you've forked and cloned this repository. In that case, ensure you've followed all the instructions in the `react-auth-template` README to succesfully deploy.
- `npm run deploy`

Note that I also did install `styled-components` for React styling with this command:
- `npm install --save styled-components`

## dependencies
- [react-auth-template](https://git.generalassemb.ly/ga-wdi-boston/react-auth-template)
- [styled-components](https://styled-components.com/)

## technologies used
- React
- JavaScript
- HTML
- CSS
- npm (package manager to manage front-end development)
- various production and development node modules viewable in [package.json](./package.json)
- various backend technologies (see [back-end repository](https://github.com/hashbangash/simple-fundamentals-api) for more info)

## unsolved problems
- fix vulnerabilities by patching all node modules & technologies to latest versions

## planning
I created detailed wireframes([1](https://media.git.generalassemb.ly/user/25387/files/959aa680-7272-11ea-90b4-0c6efa4085fc) and [2](https://media.git.generalassemb.ly/user/25387/files/992e2d80-7272-11ea-994d-046a84c8c1d4)), as well as [user stories and an ERD](https://media.git.generalassemb.ly/user/25387/files/9af7f100-7272-11ea-8068-a2c8264a4ae6).

## process & problem-solving
I set up my Rails API first and deployed it on Heroku. I tested the endpoints locally and on Heroku using Postman. Then, I built with React for a few days, getting used to the syntax and the new way of thinking with a declarative paradigm.

After nearly finishing my app, I got stuck trying to create a component within a component in order to perform deletion of a resource. I was having issues with managing props and state. I decided to take a step back.

Then, I read all the [React Main Concepts documentation](https://reactjs.org/docs/hello-world.html) slowly and methodically. Then I read most of the [React Hooks documentation](https://reactjs.org/docs/hooks-intro.html).

Then, I rearchitected my app based on the [Thinking in React documentation](https://reactjs.org/docs/thinking-in-react.html). I made [multiple React component hierarchy wireframes/diagrams](https://media.git.generalassemb.ly/user/25387/files/9cfc3700-7979-11ea-923d-9cd2c7dcac5a) showing what I had done, what I had tried, and what I was going to try.

Then I got back to coding. It ended up working out. So the study and refactoring was incredibly worth it for my understand of React as a whole. I feel really comfortable with the main concepts of React and am looking forward to building with React again.
