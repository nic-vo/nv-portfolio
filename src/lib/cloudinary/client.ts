import cloudinary from 'cloudinary';

cloudinary.v2.config({ secure: true });

const client = cloudinary.v2;

export default client;
