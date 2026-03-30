import User from "../models/User.js";
import Job from "../models/Job.js";
import Application from "../models/Application.js";
import sendEmail from "../utils/sendEmail.js";

// @desc    Get all users
// @route   GET /api/admin/users
// @access  Private/Admin
export const getUsers = async (req, res) => {
  try {
    const users = await User.find({}).select("-password");
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all applications
// @route   GET /api/admin/applications
// @access  Private/Admin
export const getApplications = async (req, res) => {
  try {
    const applications = await Application.find({})
      .populate("user", "name email")
      .populate("job", "title company");
    res.json(applications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update application status and feedback
// @route   PUT /api/admin/applications/:id
// @access  Private/Admin
export const updateApplicationStatus = async (req, res) => {
  try {
    const { status, feedback } = req.body;
    const application = await Application.findById(req.params.id);

    if (application) {
      application.status = status || application.status;
      application.feedback = feedback || application.feedback;

      const updatedApplication = await application.save();
      
      // Notify the user
      try {
        const userObj = await User.findById(application.user);
        if (userObj && userObj.email) {
          await sendEmail({
            email: userObj.email,
            subject: `Application Status Updated: ${application.status}`,
            message: `Hello ${userObj.name},\n\nYour application status has been updated to: ${application.status}.\n\nFeedback: ${application.feedback || "No additional feedback."}\n\nBest regards,\nJob Sphere Team`,
          });
        }
      } catch (err) {
        console.log("Error sending update email: ", err);
      }

      res.json(updatedApplication);
    } else {
      res.status(404).json({ message: "Application not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete job
// @route   DELETE /api/admin/jobs/:id
// @access  Private/Admin
export const deleteJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (job) {
      await job.deleteOne();
      res.json({ message: "Job removed" });
    } else {
      res.status(404).json({ message: "Job not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get dashboard statistics
// @route   GET /api/admin/stats
// @access  Private/Admin
export const getDashboardStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments({});
    const totalJobs = await Job.countDocuments({});
    const totalApplications = await Application.countDocuments({});

    const statusCounts = await Application.aggregate([
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 },
        },
      },
    ]);

    res.json({
      totalUsers,
      totalJobs,
      totalApplications,
      statusCounts,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
