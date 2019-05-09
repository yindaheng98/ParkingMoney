function PaymentProcess(how_much,response) {
    return new Promise(function (resolve,reject) {
        console.log('时长:'+how_much);
        return resolve();
    });
}

module.exports=PaymentProcess;