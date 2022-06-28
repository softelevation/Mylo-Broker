import React from 'react';
import socketio from 'socket.io-client';
import {config} from './config';

export const socket = socketio(config.Api_Url);
export const SocketContext = React.createContext();
