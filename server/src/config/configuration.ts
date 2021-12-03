export const configuration = () => ({
  dev: process.env.NODE_ENV !== 'production',
  server: {
    port: parseInt(process.env.PORT, 10) || 5000,
  },
  database: {
    uri: 'mongodb+srv://admin:admin@cluster0.mnmgy.mongodb.net/music-platform?retryWrites=true&w=majority',
  },
  folders: {
    forUserFiles: 'public/users',
  },
});
