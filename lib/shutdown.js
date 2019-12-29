import mongoose from 'mongoose';

const doCleanUp = (callback = null) => {
  mongoose.disconnect();
  if (callback) {
    callback();
    return;
  }
  console.log('We do clean up here');
};

process.on('cleanup', doCleanUp);

process.on('exit', () => {
  process.emit('cleanup');
});

// catch ctrl+c event and exit normally
process.on('SIGINT', () => {
  console.log('Ctrl-C...');
  process.exit(2);
});

// catch uncaught exceptions, trace, then exit normally
process.on('uncaughtException', (e) => {
  console.log('Uncaught Exception...');
  console.log(e.stack);
  process.exit(99);
});

export default doCleanUp;
