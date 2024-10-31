import { Application } from "../models/application.model.js";
import { Job } from "../models/job.model.js";

export const applyJob = async (req, res) => {
    try {
        const userId = req.id;
        const jobId = req.params.id;
        if (!jobId) {
            return res.status(404).json({
                message: "JobId is required.",
                success: false
            })
        }

        //checking if the user has already applied for the job or not
        const existingApplication = await Application.findOne({ job: jobId, applicant: userId });
        if (existingApplication) {
            return res.status(400).json({
                message: "Already applied for the job",
                success: false
            })
        }

        //check if the job exists or not
        const job = await Job.findById(jobId)
        if (!job) {
            return res.status(404).json({
                message: "No jobs Exists",
                success: false
            })
        }

        //create a new application
        const newApplication = await Application.create({
            job:jobId,
            applicant:userId,
        })
        job.applications.push(newApplication._id);
        await job.save();
        return res.status(201).json({
            message:"Job Applied Successfully",
            success:true
        })
    } catch (error) {
        console.log(error);
    }
}

export const getAppliedJobs = async (req,res) => {
    try {
        const userId = req.id;
        const application = await Application.find({applicant:userId}).sort({createdAt:-1}).populate({
            path:"job",
            options:{sort:{createdAt:-1}},
            populate:{
                path:"company",
                options:{sort:{createdAt:-1}},
            }
        });
        if(!application){
            return res.status(404).json({
                message:"No Applied Jobs",
                success:false
            })
        }
        return res.status(200).json({
            message:"Found Applied Jobs",
            application,
            success:true
        })
    } catch (error) {
        console.log(error);
    }
}

// to get the total number of applicants for the applied job posted by the recruiter
export const getApplicants = async (req,res) => {
    try {
        const jobId = req.params.id;
        const job = await Job.findById(jobId).populate({
            path:"applications",
            options:{sort:{createdAt:-1}},
            populate:{
                path:"applicant",
            }
        });
        if(!job){
            return res.status(404).json({
                message:"No Jobs Found",
                success:false
            })
        }
        return res.status(200).json({
            job,
            success:true
        })
    } catch (error) {
        console.log(error);
    }
}

export const updateStatus = async (req,res) => {
    try {
        const {status} = req.body;
        const applicationId = req.params.id;
        if(!status){
            return res.status(400).json({
                message:"Status is required",
                success:false
            })
        };

        //find the application by applicationId
        const application = await Application.findOne({_id:applicationId})
        if(!application){
            return res.status(404).json({
                message:"Application Not found",
                success:false
            })
        };

        //update status
        application.status = status.toLowerCase();
        await application.save();

        return res.status(200).json({
            message:"Status Updated Successfully",
            success:true
        })        
    } catch (error) {
        console.log(error);
    }
}