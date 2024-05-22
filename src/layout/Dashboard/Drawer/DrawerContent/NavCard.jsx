import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

const QuoteCard = () => {
  const [quote, setQuote] = useState('');
  const [author, setAuthor] = useState('');

  useEffect(() => {
    fetchQuote();
  }, []);

  const fetchQuote = async () => {
    try {
      const response = await fetch('https://api.quotable.io/random');
      const data = await response.json();
      setQuote(data.content);
      setAuthor(data.author);
    } catch (error) {
      console.error('Error fetching quote:', error);
    }
  };

  return (
      <Card sx={{ bgcolor: 'grey.100' }}>
        <CardContent>
          <Box textAlign="center">
            <Typography variant="h6" color="secondary" gutterBottom>
              Quotes
            </Typography>
            <Typography variant="body1" sx={{ whiteSpace: 'pre-line', wordWrap: 'break-word' }}>
              {quote}
            </Typography>
            <Typography variant="caption" color="textSecondary">
              - {author}
            </Typography>
          </Box>
        </CardContent>
      </Card>
  );
};

export default QuoteCard;