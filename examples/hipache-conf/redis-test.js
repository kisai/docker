var redis = require("redis"),
    redis_client = redis.createClient();

redis_client.on("error", function (err) {
    console.log("Error " + err);
});

redis_client.on("connect", function () {
    redis_client.set("foo_rand000000000000", "some fantastic value", redis.print);
    redis_client.get("foo_rand000000000000", redis.print);

    redis_client.del("frontend:www.dotcloud.com", redis.print);

    redis_client.rpush("frontend:www.dotcloud.com", "mywebsite", redis.print);
    redis_client.rpush("frontend:www.dotcloud.com", "http://192.168.0.42:8080", redis.print);

    redis_client.lrange("frontend:www.dotcloud.com", 0,-1, redis.print);
    redis_client.lrange("frontend:www.dotcloud.com", 0,-1, function(err, res) {
	console.log('lrange res: '+res);
    });

    redis_client.keys("*", redis.print);
    redis_client.keys("*", function(err, res) {

            console.log('_proxyStatus: redis keys - ' + res);

            res.forEach(function(k,i) {
                console.log('_proxyStatus: redis key - ' + k);
                redis_client.lrange(k, 0,-1, function(err,res) {
			console.log(k + ' - ' + res);
	        });
            });
   });

   //redis_client.del("frontend:www.dotcloud.com", redis.print);

});
