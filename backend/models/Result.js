const mongoose = require("mongoose");

const resultSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    quizId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Quiz",
      required: true,
    },
    totalMarks: {
      type: Number,
      required: true,
    },
    marksObtained: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["Passed", "Failed"],
      required: true,
    },
    submissionDetails: {
      startTime: Date,
      endTime: Date,
      timeSpent: Number,
      submittedBy: {
        type: String,
        enum: ["Student", "System", "Admin"],
        default: "Student",
      },
    },
    violationSummary: {
      cameraViolations: Number,
      fullscreenViolations: Number,
      tabSwitchViolations: Number,
      totalViolations: Number,
    },
    answers: [
      {
        questionId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Question",
        },
        selectedOption: String,
        isCorrect: Boolean,
        timeSpent: Number,
        points: Number,
      },
    ],
    feedback: {
      comment: String,
      reviewedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      reviewedAt: Date,
    },
  },
  { timestamps: true }
);

resultSchema.pre("save", function (next) {
  this.status =
    this.marksObtained >= this.totalMarks * 0.5 ? "Passed" : "Failed";
  if (this.violationSummary) {
    this.violationSummary.totalViolations =
      (this.violationSummary.cameraViolations || 0) +
      (this.violationSummary.fullscreenViolations || 0) +
      (this.violationSummary.tabSwitchViolations || 0);
  }

  next();
});

module.exports = mongoose.model("Result", resultSchema);
