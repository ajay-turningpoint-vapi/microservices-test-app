const amqp = require('amqplib');

class RabbitMQ {
  constructor() {
    this.connection = null;
    this.channel = null;
  }

  async connect() {
    const url = process.env.RABBITMQ_URL || 'amqp://localhost';
    try {
      this.connection = await amqp.connect(url);
      this.channel = await this.connection.createChannel();
      console.log('Successfully connected to RabbitMQ');
      
      // Handle connection closure
      this.connection.on('close', () => {
        console.error('RabbitMQ connection closed. Retrying...');
        return setTimeout(() => this.connect(), 5000);
      });
    } catch (error) {
      console.error('RabbitMQ Connection Failed:', error.message);
      return setTimeout(() => this.connect(), 5000); // Retry every 5 seconds
    }
  }

  async publish(queue, message) {
    if (!this.channel) await this.connect();
    await this.channel.assertQueue(queue, { durable: true });
    this.channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)), {
      persistent: true,
    });
  }

  async consume(queue, callback) {
    if (!this.channel) await this.connect();
    await this.channel.assertQueue(queue, { durable: true });
    this.channel.prefetch(1);
    
    this.channel.consume(queue, (msg) => {
      if (msg !== null) {
        const content = JSON.parse(msg.content.toString());
        callback(content);
        this.channel.ack(msg); // Acknowledge only after callback succeeds
      }
    });
  }
}

module.exports = new RabbitMQ();