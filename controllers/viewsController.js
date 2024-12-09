const Tour = require('../models/tourModel');
const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const { resetPassword } = require('./authController');

exports.getOverview = catchAsync(async (req, res, next) => {
  const tours = await Tour.find();

  res.status(200).render('overview', {
    title: 'All Tours',
    tours
  });
});

exports.getTour = catchAsync(async (req, res, next) => {
  const tour = await Tour.findOne({ slug: req.params.slug }).populate({
    path: 'reviews',
    fields: 'review rating user'
  });

  if (!tour) {
    return next(new AppError('There is no tour with that name.', 404));
  }

  res.status(200).render('tour', {
    title: `${tour.name} Tour`,
    tour
  });
});

exports.getLoginForm = (req, res) => {
  res.status(200).render('login', {
    title: 'Log into your account',
    //user: req.user 
  });
};

exports.getAccount = (req, res) => {
  console.log('User:', req.user);  // Log to check if req.user is populated
  res.status(200).render('account', {
    title: 'Your account',
    user: req.user  // Ensure this is populated by the auth middleware
  });
};

exports.updateUserData = catchAsync(async (req, res, next) => {
  console.log('Request body:', req.body);  // Log the incoming request body
  
  if (!req.body.name || !req.body.email) {
    return next(new AppError('Name and email are required!', 400));
  }

  const updatedUser = await User.findByIdAndUpdate(
    req.user.id,
    {
      name: req.body.name,
      email: req.body.email
    },
    {
      new: true,
      runValidators: true
    }
  );

  console.log('Updated user:', updatedUser);  // Log the updated user data

  res.status(200).render('account', {
    title: 'Your account',
    user: updatedUser
  });
});
