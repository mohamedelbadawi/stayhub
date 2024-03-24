import Redis from "ioredis";

const redis = new Redis({
  host: "localhost",
  port: 6379, // Default Redis port
});

const initRedis = () => {
  redis.on("connect", () => {
    console.log("Connected to Redis");
  });
};

const setToCache = (key: any, value: any, exp: number) => {
  redis.set(key, value);
  redis.expire(key, exp);
};
const getFromCache = (key: any) => {
  return redis.get(key).then((value) => {
    return value;
  });
};
const isCached = (key: any) => {
  return redis.exists(key).then((result) => {
    return result;
  });
};

export { initRedis, setToCache, getFromCache, isCached };
