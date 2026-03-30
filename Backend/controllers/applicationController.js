import Application from "../models/Application.js";
import sendEmail from "../utils/sendEmail.js";
import User from "../models/User.js";

// @desc    Apply for a job
// @route   POST /api/applications
// @access  Private
export const applyToJob = async (req, res) => {
  try {
    const { jobId, resume, coverLetter } = req.body;

    if (!jobId) {
      return res.status(400).json({ message: "Job ID is required" });
    }

    if (!req.user) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    console.log(`User ${req.user._id} applying for job ${jobId}`);

    // Check if user already applied
    const alreadyApplied = await Application.findOne({
      user: req.user._id,
      job: jobId,
    });

    if (alreadyApplied) {
      return res.status(400).json({ message: "You have already applied for this job" });
    }

    const application = await Application.create({
      job: jobId,
      user: req.user._id,
      resume: resume || "",
      coverLetter: coverLetter || "",
    });

    // Send notification email
    try {
      const userObj = await User.findById(req.user._id);
      if (userObj && userObj.email) {
        await sendEmail({
          email: userObj.email,
          subject: "Application Submitted Successfully",
          message: `Hello ${userObj.name},\n\nYour application has been successfully submitted. We will review your application soon.\n\nBest regards,\nJob Sphere Team`,
        });
      }
    } catch (err) {
      console.log('Error sending application email: ', err);
    }

    console.log('Application created:', application._id);
    res.status(201).json(application);
  } catch (error) {
    console.error('Apply error:', error.message);
    if (error.name === 'CastError') {
      return res.status(400).json({ message: "Invalid Job ID format" });
    }
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get user's applications
// @route   GET /api/applications/my-applications
// @access  Private
export const getMyApplications = async (req, res) => {
  try {
    const applications = await Application.find({ user: req.user._id })
      .populate("job", "title company logo location type");
    res.json(applications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
