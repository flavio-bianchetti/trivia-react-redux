import md5 from 'crypto-js/md5';
import fetchGravatar from '../services/fetchGravatar';

const getGravatarImage = (email) => fetchGravatar(md5(email).toString());

export default getGravatarImage;
