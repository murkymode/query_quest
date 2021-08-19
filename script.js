import http from 'k6/http';
import { sleep, check } from 'k6';
import { Counter } from 'k6/metrics';

// A simple counter for http requests

export const requests = new Counter('http_reqs');

// you can specify stages of your test (ramp up/down patterns) through the options object
// target is the number of VUs you are aiming for

export const options = {
  stages: [
    { target: 500, duration: '30s' },
    { target: 1400, duration: '30s' },
    { target: 2500, duration: '30s' },
    { target: 10000, duration: '30s' },
    { target: 0, duration: '20s' },
  ],
  thresholds: {
    requests: ['count < 100'],
  },
};

export default function () {
  // our HTTP request, note that we are saving the response to res, which can be accessed later
  const prodId = 1 + Math.floor(Math.random() * 1800);

  const res = http.get(`http://localhost:3000/reviews?product_id=${prodId}`); /* random prod id's */

  sleep(1);

  const checkRes = check(res, {
    'status is 200': (r) => r.status === 200,
    'requests below 50ms': (r) => r.timings.duration < 50,
    'requests below 2000ms': (r) => r.timings.duration < 2000,
  });
}
