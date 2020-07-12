/* eslint linebreak-style: ["error", "windows"] */
import { makeAuthPlugin } from '../feathers-client';

export default makeAuthPlugin({ userService: 'users' });
