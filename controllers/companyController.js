const company_model = require("../models/companyModel");
const asyncHandler = require("express-async-handler");
const ObjectId = require("mongodb").ObjectId;

//@desc Register new company profile
//@route api/create-company-profile
//@Access private
const createProfile = asyncHandler(async (req, res) => {
  const { companyName, phone, email, link, description, location } = req.body;
  //check all fields
  if (!companyName || !phone || !email || !link || !description || !location) {
    res.status(422);
    throw new Error("Please add all the fields.");
  }

  //Save profile
  try {

    const profile = await company_model.create({
      companyName,
      phone,
      email,
      link,
      description,
      location,
      author:req.user.name,
      user: req.user.id,
 
    });

 if(profile){
  res.status(201).json({
    companyName,
    phone,
    email,
    link,
    description,
    location,
    author: req.user.name,
    _id: profile.id,
  });
 }
 
  
  } catch (error) {

   
      res.status(409);

      throw new Error("Profile already exist.");
    
  }
});

//@desc Edit profile
//@route POST  api/edit-company-profile:id
//@Access private
const editProfile = asyncHandler(async (req, res) => {
  const { email, phone, companyName } = req.body;

  //check if profile is available

  const profile = await company_model.findById(req.params.id);
  if (!profile) {
    res.status(404).send("Profile not found.");
  }

  if (profile.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  try {
    const updatedProfile = await company_model.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );

    res.send(updatedProfile);
  } catch (error) {
    res.status(409);
    throw new Error(error);
  }
});

//@desc Get all profiles
//@route GET  api/get-all-profiles
//@Access private
const getAllProfiles = asyncHandler(async (req, res) => {

  let q = req.query.q 

  if(q==undefined){
q=''
  }
  var page = parseInt(req.query.page);
  var limit = parseInt(req.query.limit);
  var query = {};

  if (page < 0 || page === 0) {
    res.status(400);
    throw new Error("invalid page number, should start with 1");
  }
  query.skip = limit * (page - 1);
  query.limit = limit;

  const totalCount = await company_model.count({});
  if (!totalCount) {
    throw new Error("Error fetching data.");
  }



  const data = await company_model.find({
    "$or":[
      {author:{$regex:q,'$options' : 'i'}},
      {email:{$regex:q,'$options' : 'i'}},
      {companyName:{$regex:q,'$options' : 'i'}},
      {description:{$regex:q,'$options' : 'i'}}
    ]
  }, {}, query);
  if (!data) {
    throw new Error("Error fetching data.");
  }
  console.log(data)

  res.set("x-total-count", totalCount);
  res.json(data);
});

//@desc Delete profile by id
//@route DELETE  api/delelte-profile:id
//@Access private
const deleteProfile = asyncHandler(async (req, res) => {
  const id = req.params.id;
  //check if profile available
  const profile = await company_model.findById(id);
  if (!profile) {
    throw new Error("Profile not found.");
  }

  if (profile.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  const result = await profile.remove();
  if (result) {
    res.status(200);
    res.send("Profile deleted successfully.");
  }
  if (!result) {
    res.status(422);
    res.send("Failed to perform delete action.");
  }
});

//@desc get single profile
//@route GET  api/view-single-profile
//@Access private

const viewSingle = asyncHandler(async (req, res) => {
  const id = req.params.id;

  if (!id) {
    res.status(422);
    throw new Error("No id.");
  }

  const profile = await company_model.findById(id);
  if (!profile) {
    res.status(404);
    throw new Error("Profile not found.");
  }
  res.status(200).json(profile);
});

module.exports = {
  createProfile,
  editProfile,
  getAllProfiles,
  deleteProfile,
  viewSingle,
};
