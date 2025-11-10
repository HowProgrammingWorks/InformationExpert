'use strict';

const buffers = [];

const alloc = (size) => {
  const instance = {
    size,
    buffer: Buffer.alloc(size),
    offset: 0,
  };
  buffers.push(instance);
  return instance;
};

const write = (buf, data) => {
  const { size, offset } = buf;
  const { length } = data;
  const available = size - offset;
  const len = Math.min(available, size, length);
  const rest = available - length;
  buf.buffer.write(data, offset, len);
  buf.offset += len;
  if (buf.offset === size) buf.offset = 0;
  if (rest < 0) write(buf, data.slice(rest));
};

const read = (buf) => buf.buffer.toString('utf8');

module.exports = { alloc, write, read };
