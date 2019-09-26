const questions = () => {
  return fetch('http://localhost:5000/questions')
      .then(response => response.json())
      .then( data => {
        return data.map((q) => ({
            id: q['Question no.'],
            question: {
              hindi: q['Question in hindi'],
              english: q['Question in english']
            },
            answers: [
              {
                hindi: q['option 1 hindi'],
                english: q['option 1 english']
              },
              {
                hindi: q['option 2 hindi'],
                english: q['option 2 english']
              },
              {
                hindi: q['option 3 hindi'],
                english: q['option 3 english']
              },
              {
                hindi: q['option 4 hindi'],
                english: q['option 4 english']
              }
            ],
            correctAnswer: q['correct answer'],
            sequence: q['option has sequence'] !== 0
        }))
      });
}

export default questions;
