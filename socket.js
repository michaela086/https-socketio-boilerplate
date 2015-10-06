module.exports = function(io) {
    
    io.on('connection', function (socket) {
  
        socket.on('bid', function (bid) {
            console.log(bid);
        });

    });

};
