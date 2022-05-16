const express = require('express')
const router = express.Router()
const companyControllers = require('../controllers/companyController')
const userController = require('../controllers/userController')
const {protect } = require('./middlewares/private')

router.post('/create-company-profile',protect, companyControllers.createProfile)
router.post('/edit-company-profile/:id',protect,companyControllers.editProfile)
router.get('/get-all-profiles',protect, companyControllers.getAllProfiles)
router.delete('/delete-profile/:id',protect, companyControllers.deleteProfile)
router.get('/view-single-profile/:id',protect,companyControllers.viewSingle)
router.get('/get-category',protect,companyControllers.getCategory)

router.post('/register',userController.registerUser)
router.post('/login',userController.loginUser)
router.post('/me',protect,userController.getMe)

router.all('/forgot-password',userController.forgotPassword )
router.all('/reset-password/:id/:token',userController.resetPassword )




module.exports=router