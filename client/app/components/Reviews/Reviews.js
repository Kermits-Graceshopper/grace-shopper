import React from 'react';
const sampleReviews = [
  {
    id: 1,
    userName: 'pauperpeep304',
    comment:
      'Great game. Unique design of antmospere. Enjoyable gameplay. You should buy it and each of your freands)',
    rating: 5,
  },
  {
    id: 2,
    userName: 'Fredrrrick',
    comment:
      'Игра классная. Боевка супер, атмосфера, музыка на высшем уровне. Рекомендую к покупке',
    rating: 3,
  },
  {
    id: 3,
    userName: 'gamefr3@k109',
    comment: `Such a stylish and mind-blowing project! It hasn't been like this for a long time. Amazing optimization and attention to detail. There are flaws, but they can be forgiven, because this is the debut of a new studio.`,
    rating: 5,
  },
  {
    id: 4,
    userName: 'Jdero',
    comment: `When you get the combat down this game is pretty fun. A bit easier than the souls games.`,
    rating: 5,
  },
];
const Reviews = () => {
  return (
    <div>
      {sampleReviews.map((review) => (
        <div className="review">
          <h4>{review.userName}</h4>
          <p>{review.comment}</p>
        </div>
      ))}
    </div>
  );
};

export default Reviews;
