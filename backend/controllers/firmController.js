
const multer = require('multer');
const path = require('path');

const Vendor = require('../models/Vendor');
const Firm = require('../models/Firm');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads/'); // Destination folder where the uploaded images will be stored
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); // Generating a unique filename
    }
});

const upload = multer({ storage: storage });

const addFirm = async(req, res) => {
    try {
        const {firmName, area, category, region, offer} = req.body;
        const image = req.file ? req.file.filename : undefined;

        const vendor = await Vendor.findById(req.vendorId);
        if (!vendor) return res.status(404).json({error: "Vendor not found"})

        const firm = new Firm({
            firmName,
            area,
            category,
            region,
            offer,
            image,
            vendor: vendor._id
        })

        const savedFirm = await firm.save();
        console.log("###savedFirm", savedFirm)
        console.log("vendor", vendor)
        vendor.firm.push(savedFirm);

        await vendor.save();


        return res.status(200).json({message: "Firm added successfully"})
    } catch (error) {
        return res.status(500).json({error: "Internal server error"})   
    }
}

const deleteFirmById = async(req,res) => {
    try {
        const firmId = req.params.firmId;

        const deletedFirm = await Firm.findByIdAndDelete(firmId);
        if (!deletedFirm) return res.status(401).json({error: "Firm not found"})

        res.status(200).json({message: "Firm deleted successfully"});
    } catch (error) {
        res.status(500).json({error: "Internal server error"})
    }
}

module.exports = {addFirm:[upload.single('image'), addFirm], deleteFirmById}