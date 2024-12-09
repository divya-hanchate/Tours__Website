// // const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
// // const Tour = require('../models/tourModel');
// // const Booking = require('../models/bookingModel');
// // const catchAsync = require('../utils/catchAsync');
// // const factory = require('./handlerFactory');

// // exports.getCheckoutSession = catchAsync(async (req, res, next) => {
// //   // 1) Get the currently booked tour
// //   const tour = await Tour.findById(req.params.tourId);
// //   console.log(tour);

// //   // 2) Create checkout session
// //   const session = await stripe.checkout.sessions.create({
// //     payment_method_types: ['card'],
// //     success_url: `${req.protocol}://${req.get('host')}/   `,
// //     // success_url: `${req.protocol}://${req.get('host')}/my-tours/?tour=${
// //     //   req.params.tourId
// //     // }&user=${req.user.id}&price=${tour.price}`,
// //     cancel_url: `${req.protocol}://${req.get('host')}/tour/${tour.slug}`,
// //     customer_email: req.user.email,
// //     client_reference_id: req.params.tourId,
// //     line_items: [
// //       {
// //         name: `${tour.name} Tour`,
// //         description: tour.summary,
// //         images: [`https://www.natours.dev/img/tours/${tour.imageCover}`],
// //         amount: tour.price * 100,
// //         currency: 'usd',
// //         quantity: 1
// //       }
// //     ]
// //   });

// //   // 3) Create session as response
// //   res.status(200).json({
// //     status: 'success',
// //     session
// //   });
// // });



// require('dotenv').config(); // Ensure environment variables are loaded
// const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY); // Initialize Stripe with the secret key
// const Tour = require('../models/tourModel');
// const Booking = require('../models/bookingModel');
// const catchAsync = require('../utils/catchAsync');
// const factory = require('./handlerFactory');
// const AppError = require('../utils/appError'); // If you have a custom error handling class

// // Function to create a checkout session
// exports.getCheckoutSession = catchAsync(async (req, res, next) => {
//   // 1) Get the currently booked tour
//   const tour = await Tour.findById(req.params.tourId);
//   if (!tour) {
//     return next(new AppError('No tour found with that ID', 404)); // Handle missing tour
//   }
//   console.log('Tour fetched:', tour); // Debugging log

//   // 2) Create checkout session
//   const session = await stripe.checkout.sessions.create({
//     payment_method_types: ['card'],
//     success_url: `${req.protocol}://${req.get('host')}/my-tours`, // URL after successful payment
//     cancel_url: `${req.protocol}://${req.get('host')}/tour/${tour.slug}`, // URL after cancellation
//     customer_email: req.user.email, // User's email for the payment
//     client_reference_id: req.params.tourId, // Reference to the tour ID
//     line_items: [
//       {
//         name: `${tour.name} Tour`, // Tour name
//         description: tour.summary, // Short summary of the tour
//         images: [`https://www.natours.dev/img/tours/${tour.imageCover}`], // Image for the tour
//         amount: tour.price * 100, // Price in cents
//         currency: 'usd', // Currency
//         quantity: 1, // Quantity of items
//       },
//     ],
//   });

//   // 3) Send the session as a response
//   res.status(200).json({
//     status: 'success',
//     session,
//   });
// });


// // exports.createBookingCheckout = catchAsync(async (req, res, next) => {
// //   // This is only TEMPORARY, because it's UNSECURE: everyone can make bookings without paying
// //   const { tour, user, price } = req.query;

// //   if (!tour && !user && !price) return next();
// //   await Booking.create({ tour, user, price });

// //   res.redirect(req.originalUrl.split('?')[0]);
// // });

// // exports.createBooking = factory.createOne(Booking);
// // exports.getBooking = factory.getOne(Booking);
// // exports.getAllBookings = factory.getAll(Booking);
// // exports.updateBooking = factory.updateOne(Booking);
// // exports.deleteBooking = factory.deleteOne(Booking);
