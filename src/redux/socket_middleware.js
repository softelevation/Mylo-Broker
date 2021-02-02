import {ActionConstants} from './constants';
let ws;
const initialState = {
  value: '',
};
export function wsMiddleWare(state = initialState, action) {
  switch (action.type) {
    case ActionConstants.CREATE_CONNECTION:
      const {id} = action.user;
      console.log(
        `ws://ec2-3-17-10-61.us-east-2.compute.amazonaws.com:8001/driver/${id}`,
        'userID',
      );

      function connect() {
        ws = new WebSocket(
          `ws://ec2-3-17-10-61.us-east-2.compute.amazonaws.com:8001/driver/${id}`,
        );
        console.log(ws, 'ws1');
        ws.onopen = () => {
          console.log('ws opened');
        };
        ws.onclose = () => {
          console.log('ws disconnected');
          connect();
        };
        ws.onerror = (msg) => {
          console.log(msg, 'ws error');
        };
      }
      connect();

      return {
        value: ws,
      };
    case ActionConstants.EMIT_CONNECTION:
      console.log(ws, 'ws2');
      ws.send(action.data);
      return null;
    case ActionConstants.LISTEN_CONNECTION:
      console.log(ws, 'ws3');
      ws.addEventListener('message', () => action.data);
      return null;

    default:
      return state;
  }
}
