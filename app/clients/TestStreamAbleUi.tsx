'use server';

import { createStreamableUI } from 'ai/rsc';
import { createStreamableValue } from 'ai/rsc';

export async function getWeather() {
  const weatherUI = createStreamableUI();

  weatherUI.update(<div style={{ color: 'gray' }}>Loading...</div>);

  setTimeout(() => {
    weatherUI.done(<div>It's a sunny day!</div>);
  }, 4000);

    // add another message after 2 seconds
    setTimeout(() => {
        weatherUI.update(<div>It's a sunny day! But it's getting cloudy...</div>);
    }, 1000);

  return weatherUI.value;
}


export const runThread = async () => {
  const streamableStatus = createStreamableValue('thread.init');

  setTimeout(() => {
    streamableStatus.update('thread.run.create');
    streamableStatus.update('thread.run.update');
    streamableStatus.update('thread.run.end');
    streamableStatus.done('thread.end');
  }, 1000);

  return {
    status: streamableStatus.value,
  };
};