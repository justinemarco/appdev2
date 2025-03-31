const fs = require('fs');

fs.readFile('sample.txt', 'utf8', (err, data) => {
    if (err) {
      console.error('File does not exist');
    } else {
      console.log('File content:', data);
    }
  });

fs.writeFile('newFile.txt', "This is a new file created by Node.js!", (err) => {
  if (err) {
    console.log(`Error: ${err}`);
  } else {
    console.log(`File is created`);
  }
});

fs.appendFile('sample.txt', "\nAppended content.", (err) => {
  if (err) {
    console.log('Error appending to file:', err);
  } else {
    console.log('Content appended to file');
  }
});

fs.unlink('newFile.txt', (err) => {
  if (err) {
    console.log('Error deleting file', err);
  } else {
    console.log('File deleted successfuly');
  }
});