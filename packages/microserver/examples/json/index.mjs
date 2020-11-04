import uWebSockets from 'uWebSockets.js';
import { json } from '../../esm/index.js';

const app = uWebSockets.App().get('/', json({ status: 'success' }));

app.listen(8111, (token) => {
  if (token) {
    console.log('Listening at :8111');
  } else {
    console.log('Failed to listen to :8111');
  }
});
