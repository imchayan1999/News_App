import React, { useState, useEffect } from 'react';
import { Typography } from '@material-ui/core';
import wordsToNumbers from 'words-to-numbers';
import alanBtn from '@alan-ai/alan-sdk-web';

import logo from './images/logo.png';
import { NewsCards} from './components';
import useStyles from './styles';

// const alanKey = 'bb4d7b40c28fa4bbfb80f31e9cf1f67c2e956eca572e1d8b807a3e2338fdd0dc/stage';

const App = () => {
    const [activeArticle, setActiveArticle] = useState(0);
    const [newsArticles, setNewsArticles] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
  
    const classes = useStyles();
  
    useEffect(() => {
      alanBtn({
        key: 'bb4d7b40c28fa4bbfb80f31e9cf1f67c2e956eca572e1d8b807a3e2338fdd0dc/stage',
        onCommand: ({ command, articles, number }) => {
          if (command === 'newHeadlines') {
            setNewsArticles(articles);
            setActiveArticle(-1);
          } else if (command === 'instructions') {
            setIsOpen(true);
          } else if (command === 'highlight') {
            setActiveArticle((prevActiveArticle) => prevActiveArticle + 1);
          } else if (command === 'open') {
            const parsedNumber = number.length > 2 ? wordsToNumbers((number), { fuzzy: true }) : number;
            const article = articles[parsedNumber - 1];
  
            if (parsedNumber > articles.length) {
              alanBtn().playText('Please try that again...');
            } else if (article) {
              window.open(article.url, '_blank');
              alanBtn().playText('Opening...');
            } else {
              alanBtn().playText('Please try that again...');
            }
          }
        },
      });
    }, []);
  
    return (
      <div>
        <div className={classes.logoContainer}>
          {newsArticles.length ? (
            <div className={classes.infoContainer}>
              <div className={classes.card}><Typography variant="h5" component="h2">Try saying: <br /><br />Open article number [4]</Typography></div>
              <div className={classes.card}><Typography variant="h5" component="h2">Try saying: <br /><br />Go back</Typography></div>
            </div>
          ) : null}
          <img src="https://media-exp1.licdn.com/dms/image/C561BAQFzAiAvq0Jg8Q/company-background_10000/0/1565260089604?e=2159024400&v=beta&t=ygcEIMzRHClwTjBwChX2naoGiS2TCeDwozFfEAM73ek" className={classes.alanLogo} alt="logo" />
        </div>
        <NewsCards articles={newsArticles} activeArticle={activeArticle} />
        {!newsArticles.length ? (
          <div className={classes.footer}>
            <Typography variant="body1" component="h2">
              Created by
              <a className={classes.link} href="https://github.com/imchayan1999"> Chayan Sharma</a> -
              {/* <a className={classes.link} href="http://youtube.com/javascriptmastery"> JavaScript Mastery</a> */}
            </Typography>
            <img className={classes.image} src={logo} height="50px" alt="JSMastery logo" />
          </div>
        ) : null}
      </div>
    );
  };
  
  export default App;