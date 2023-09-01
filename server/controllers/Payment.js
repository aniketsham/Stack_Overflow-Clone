import Razorpay from 'razorpay';

const instance = new Razorpay({
    key_id: "rzp_test_5GTticfyE0LOm1",
    key_secret: "KOgfsoJZkOA5gDZpnJX8Gbd5",
});


export const orderPayment = async (req, res) => {
    
    try {
      const subsValue=req.params.subsValue
      console.log(subsValue)
   
    if(subsValue==="Free"){
       var amt=0*100
  }
  else if(subsValue==="Silver"){
        var amt=100
  }
  else if(subsValue==='Gold'){
       var amt=1000
  }
        const options = {
          amount:amt*100, // amount == Rs 10
          currency: "INR",
          receipt: "receipt#1",
          payment_capture: 0,
     // 1 for automatic capture // 0 for manual capture
        };
      instance.orders.create(options, async function (err, order) {
        if (err) {
          console.log(err)
          return res.status(500).json({
            message: err,
          });
        }
        console.log(order)
      return res.status(200).json(order);
     });
    } catch (err) {
      console.log(err)
      return res.status(500).json({
        message: "Something Went Wrng",
      });
     }
}

export const capturePayment=async(req,res)=>{
    try {
        console.log(req.body.paymentId)
        return request(
         {
         method: "POST",
         url: `https://${config.RAZOR_PAY_KEY_ID}:${config.RAZOR_PAY_KEY_SECRET}@api.razorpay.com/v1/payments/${req.body.paymentId}/capture`,
         form: {
            amount: 10 * 100, // amount == Rs 10 // Same As Order amount
            currency: "INR",
          },
        },
       async function (err, response, body) {
         if (err) {
          return res.status(500).json({
             message: "Something Went Wrong",
           }); 
         }
          console.log("Status:", response.statusCode);
          console.log("Headers:", JSON.stringify(response.headers));
          console.log("Response:", body);
          return res.status(200).json(body);
        });
      } catch (err) {
        return res.status(500).json({
          message: "Something Went Wrong",
       });
      }
}