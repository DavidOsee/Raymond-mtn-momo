import momo from 'mtn-momo'

const { Collections } = momo.create({
  callbackHost: "http://localhost:8000/api/payment-status"

});

const collections = Collections({
  userSecret: process.env.COLLECTIONS_USER_SECRET,
  userId: process.env.COLLECTIONS_USER_ID,
  primaryKey: process.env.COLLECTIONS_PRIMARY_KEY
});


// @desc Return Payment Status 
// @route POST  : /api/callback
const Callback = async (req, res, next) => 
{
  // Grab payload or data sent by MTN MOMO API...
  // AFTER THE USER COMPLETED/REJECTED THE REQUEST TO PAY 

  // STORE THE PAYLOAD IN A REQ GLOBAL VARIABLE 
  if (req.body)
    req.payload = req.body
  
  // Respond to MTN MOMO API that the callback has been received
  res.status(200).send('Callback received');
  
}



// @desc Return Payment Status 
// @route POST  : /api/request-payment
const RequestPayment = async (req, res, next) => 
{

  // Send 400 - Bad request if the body is not provided 
  if (!req.body || Object.keys(req.body).length === 0)
  {
    const err = new Error ('Request body is required')
    err.status = 400
    next(err)
  }
  else 
  {
    // Grabbing Form data 
    const { name, number, cost } = req.body

    // Request to pay
    collections
    .requestToPay({
      amount: "100",
      currency: "EUR",
      externalId: "00004335",
      payer: {
        partyIdType: "MSISDN",
        partyId: "123456"
      },
      payerMessage: "Lorem Ipsum business",
      payeeNote: "Invoice #12345"
    })
    .then(transactionId => {
      console.log({ transactionId });

      // Get transaction status
      const payment_status = collections.getTransaction(transactionId)

      // Callback payload from our BUILT IN CALLBACK
      if (req.payload)
        console.log(req.payload)

      // Send response to the client 
      if (transactionId)
        res.status(200).json(payment_status)
    })
    .catch(error => {
      // Send error to the ErrorHandler middleware 
      const err = new Error (error) 
      next(err)
    })
  }

}

export {RequestPayment, Callback}


