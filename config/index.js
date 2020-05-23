module.exports = {
  port: process.env.PORT || 3000,
  mongo_uri:
    process.env.MONGO_URI ||
    'mongodb+srv://koftov:koftovkoftov@cluster0-4e7ky.mongodb.net/instaclone?retryWrites=true&w=majority',
  secret: process.env.SECRET || 'koftovhakoltov',
};
