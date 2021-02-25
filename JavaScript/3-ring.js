'use strict';

class RingBuffer {
  constructor(size) {
    this.size = size;
    this.buffer = Buffer.alloc(size);
    this.offset = 0;
  }

  write(data) {
    const { size, offset } = this;
    const { length } = data;
    const available = size - offset;
    const end = Math.min(offset + length, size + 1);
    const rest = available - length;
    let position = 0;
    for (let i = offset; i < end; i++) {
      this.buffer[i] = data.charCodeAt(position++);
    }
    this.offset += position;
    if (this.offset > size) this.offset = 0;
    if (rest < 0) this.write(data.slice(rest));
  }
}

// Usage

const ring = new RingBuffer(10);
ring.write('1');
console.log(ring.buffer.toString('utf8'));
ring.write('23');
console.log(ring.buffer.toString('utf8'));
ring.write('4567890A');
console.log(ring.buffer.toString('utf8'));
ring.buffer.write('B');
console.log(ring.buffer.toString('utf8'));
