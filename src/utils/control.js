export const control = {
    methods: {
        commControl(that,type){
            let exchange = window.mt_config.exchange.getControl();
            that.$client.subscribe(exchange,function(message){
                const data = JSON.parse(message.body);

                switch (data.intentionId) {
                    case value:
                        break;
                    default:
                        break;
                }
            })
        }
    }
}