import React, { Component } from 'react';
import { GlobalStyle } from './components/styles/GlobalStyle.js';
import { Layout } from './components/styles/Layout.js';

import { Statistics } from './components/Statistics';
import { FeedbackOptions } from './components/FeedbackOptions';
import { Section } from './components/Section';
import { Notification } from './components/Notification';
import { Wrapper } from 'components/styles/Container.js';

class App extends Component {
  state = {
    good: 0,
    neutral: 0,
    bad: 0
  };

  countTotalFeedback = () => {
    const { good, neutral, bad } = this.state;
    return good + neutral + bad;
  };

  countPositiveFeedbackPercentage = () => {
    const { good } = this.state;
    const totalFeedback = this.countTotalFeedback();
    return totalFeedback === 0 ? 0 : (good / totalFeedback) * 100;
  };

  handleFeedback = feedbackType => {
    this.setState(prevState => ({ [feedbackType]: prevState[feedbackType] + 1 }));
  };

  render() {
    const { good, neutral, bad } = this.state;
    const totalFeedback = this.countTotalFeedback();
    const positivePercentage = this.countPositiveFeedbackPercentage();

    return (
      <Layout>
        <Wrapper>
          <Section title="Leave Feedback">
            <FeedbackOptions
              options={['good', 'neutral', 'bad']}
              onLeaveFeedback={this.handleFeedback}
            />
          </Section>

          <Section title="Statistics">
            {totalFeedback === 0 ? (
              <Notification message="There is no feedback" />
            ) : (
              <Statistics
                good={good}
                neutral={neutral}
                bad={bad}
                total={totalFeedback}
                positivePercentage={positivePercentage}
              />
            )}
          </Section>
        </Wrapper>
        <GlobalStyle />
      </Layout>
    );
  }
}

export default App;