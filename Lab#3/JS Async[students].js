// --------------------------------------------------------------------
// PROMISES
// --------------------------------------------------------------------

const processOrderPromise = (orderId) => {
  return new Promise((resolve, reject) => {
    if (!orderId || typeof orderId !== "number") {
      reject("Invalid order ID");
      return;
    } else {
      setTimeout(() => {
        console.log("Fetched order details for order ID:", orderId);
        resolve({ orderId, status: "Processed" });
      }, 1000);
    }
  });
};

// --------------------------------------------------------------------
// ASYNC/AWAIT
// --------------------------------------------------------------------

const processOrderAwait = async (orderId) => {
  try {
    const orderDetails = await processOrderPromise(orderId);
    console.log("Order details (Async/Await):", orderDetails);
  } catch (error) {
    console.error("Error:", error);
  }
};

// Call processOrderPromise() properly to console log the returned order details and catch any errors
processOrderPromise(100);
  

// Call processOrderPromise() with an invalid order ID to console log the error message
processOrderPromise('invalid')
  .then((orderDetails) => {
    console.log("Order details:", orderDetails);
  })
  .catch((error) => {
    console.error("Error:", error);
  });



// Call processOrderAwait()
processOrderAwait(200);

processOrderAwait("invalid");