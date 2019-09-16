import axios from 'axios';

const instance=axios.create({
    baseURL:'https://react-my-burger-49767.firebaseio.com/'
});

export default instance;