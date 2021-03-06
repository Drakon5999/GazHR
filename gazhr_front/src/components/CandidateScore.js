import React from 'react';

const getColorForPercentage = (percent) => {
  const end = 100;
  const start = 0;
  const a = percent,
    b = (end - start) * a,
    c = b + start;

  return 'hsl('+c+', 100%, 50%)';
}

function CandidateScore({score}) {
  const bg = getColorForPercentage(score)
  return <span className="CandidateScore" style={{backgroundColor: bg, marginRight: 5}} >{score}</span>;
}

export default CandidateScore;
