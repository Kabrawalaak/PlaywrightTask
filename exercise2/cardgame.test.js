import { test, expect } from '@playwright/test';

test('Card Game', async ({ page }) => {
  // Navigate to the Card Game API
  await page.goto('https://deckofcardsapi.com/');

  // Confirm that the site is up
  const siteIsUp = await page.title();
  expect(siteIsUp).toBe('Deck of Cards API');

  // Get a new deck of cards
  const response = await page.evaluate(async () => {
    const response = await fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1');
    return response.json();
  });

  const deckId = response.deck_id;

  // Shuffle the deck
  await page.evaluate(async (deckId) => {
    await fetch(`https://deckofcardsapi.com/api/deck/${deckId}/shuffle/`, {
      method: 'POST',
    });
  }, deckId);

  // Deal three cards to each of two players
  const player1Cards = await page.evaluate(async (deckId) => {
    const response = await fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=3`);
    const data = await response.json();
    return data.cards;
  }, deckId);

  const player2Cards = await page.evaluate(async (deckId) => {
    const response = await fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=3`);
    const data = await response.json();
    return data.cards;
  }, deckId);

  // Check for blackjack
  const hasBlackjack = (cards) => {
    const values = cards.map(card => card.value);
    return (values.includes('10') && values.includes('ACE')) ||
      (values.includes('JACK') && values.includes('ACE')) ||
      (values.includes('QUEEN') && values.includes('ACE')) ||
      (values.includes('KING') && values.includes('ACE'));
  };

  if (hasBlackjack(player1Cards)) {
    console.log('Player 1 has blackjack!');
  }
  if (hasBlackjack(player2Cards)) {
    console.log('Player 2 has blackjack!');
  }
});
