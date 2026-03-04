const { createClient } =require('redis');

const redisClient = createClient({
    username: 'default',
    password: process.env.REDIS_PASS,
    socket: {
        host: 'redis-18573.crce283.ap-south-1-2.ec2.cloud.redislabs.com',
        port: 18573
    }
});

module.exports = redisClient;