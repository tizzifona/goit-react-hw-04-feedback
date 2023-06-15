import css from './App.module.css';
import Section from './Section';
import FeedbackOptions from './FeedbackOptions';
import Statistics from './Statistics';
import Notification from './Notification';
import { useState } from 'react';

function App() {
  const [feedback, setFeedback] = useState({ good: 0, neutral: 0, bad: 0 });

  const handleClickButton = (e) => {
    const option = e.target.name;

    setFeedback(prevState => ({
      ...prevState,
      [option]: prevState[option] + 1,
    }));
  };

  const totalFeedback = feedback => feedback.good + feedback.neutral + feedback.bad;

  const countPercentage = () => {
    const total = totalFeedback(feedback);
    const positive = feedback.good;

    if (total > 0) {
      const result = Math.ceil((positive / total) * 100);
      return `${result}%`;
    }
    return '0%';
  };

  return (
    <div className={css.mainContainer}>
      <Section title="Please leave feedback">
        <FeedbackOptions
          options={Object.keys(feedback)}
          onLeaveFeedback={handleClickButton}
        />
      </Section>

      <Section title="Statistics">
        {totalFeedback(feedback) ? (
          <Statistics
            good={feedback.good}
            neutral={feedback.neutral}
            bad={feedback.bad}
            total={totalFeedback(feedback)}
            percentage={countPercentage()}
          />
        ) : (
          <Notification message="There is no feedback" />
        )}
      </Section>
    </div>
  );
}

export default App;
