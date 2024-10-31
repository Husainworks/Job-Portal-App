import { Company } from "../models/company.model.js";

export const registerCompany = async (req, res) => {
    try {
        const { companyName } = req.body;
        if (!companyName) {
            return res.status(400).json({
                message: "Company Name is Required",
                success: false
            })
        }
        let company = await Company.findOne({ name: companyName });
        if (company) { //if company is true which means there is already a company of the same name hene it cannot be registered twice
            return res.status(400).json({
                message: "Company Can't be Registered Twice",
                success: false
            })
        }
        company = await Company.create({
            name: companyName,
            userId: req.id
        })
        return res.status(201).json({
            message: "Company Registered Successfully",
            company,
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}

export const getCompany = async (req, res) => {
    try {
        const userId = req.id; //logged in user will get all of its registered company/companies
        const companies = await Company.find({ userId });
        if (!companies) {
            return res.status(404).json({
                message: "Companies Not Found",
                success: false
            })
        }

        return res.status(200).json({
            companies,
            success:true
        })
    } catch (error) {
        console.log(error);
    }
}

export const getCompanyById = async (req, res) => {
    try {
        const companyId = req.params.id;
        const company = await Company.findById(companyId);
        if (!company) {
            return res.status(404).json({
                message: "Company Not Found",
                success: false
            })
        }
        return res.status(200).json({
            message: "Company Found",
            company,
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}

export const updateCompany = async (req, res) => {
    try {
        const { name, decription, website, location} = req.body;
        const file = req.file;

        const updateData = { name, decription, website, location};

        let company = await Company.findByIdAndUpdate(req.params.id, updateData, {new:true});

        if (!company) {
            return res.status(404).json({
                message: "Company Not Found",
                success: false
            })
        }

        return res.status(200).json({
            message: "Company information updated Successfully",
            company,
            success: true
        })

    } catch (error) {
        console.log(error);
    }
}